import fs from "fs";
import path from "path";

import { MorphCompiler } from "@morph-css/node";
import type {
  Plugin,
  ResolvedConfig,
  ViteDevServer,
} from "vite";

import {
  MorphCSSOptions,
  defaultOptions,
} from "./options";

import {
  RESOLVED_VIRTUAL_MODULE_ID,
  VIRTUAL_MODULE_ID,
} from "./virtual-css";

export type { MorphCSSOptions };

const STYLE_ID = "__morphcss";

export default function morphcssPlugin(
  userOptions: Partial<MorphCSSOptions> = {},
): Plugin {
  const options = {
    ...defaultOptions,
    ...userOptions,
  };

  let compiler: MorphCompiler | null = null;
  let server: ViteDevServer | null = null;
  let config: ResolvedConfig | null = null;

  let currentCssHash = "";
  let utilitiesLoaded = false;

  function ensureCompiler() {
    if (!compiler) {
      compiler = new MorphCompiler();
    }

    return compiler;
  }

  function loadUtilities() {
    if (utilitiesLoaded) {
      return;
    }

    utilitiesLoaded = true;

    const utilities = Array.isArray(options.utilities)
      ? options.utilities
      : options.utilities
        ? [options.utilities]
        : [];

    for (const file of utilities) {
      try {
        const resolved = path.resolve(
          process.cwd(),
          file,
        );

        const css = fs.readFileSync(
          resolved,
          "utf8",
        );

        ensureCompiler().ingestCss(css);

        console.log(
          `[MorphCSS] utility loaded: ${file}`,
        );
      } catch (err) {
        console.error(
          `[MorphCSS] failed loading utility ${file}`,
          err,
        );
      }
    }
  }

  let updateTimeout: NodeJS.Timeout | null = null;

  function pushCssUpdate() {
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }

    updateTimeout = setTimeout(() => {
      if (
        !server ||
        !options.hmr ||
        !compiler
      ) {
        return;
      }

      const css = compiler.generateCss();
      const hash = compiler.generateCssHash();

      if (hash === currentCssHash) {
        return;
      }

      currentCssHash = hash;

      server.ws.send({
        type: "custom",
        event: "morphcss:update",
        data: css,
      });
    }, 50);
  }

  function shouldTransform(id: string) {
    if (!/\.[jt]sx?$/.test(id)) {
      return false;
    }

    if (id.endsWith(".d.ts")) {
      return false;
    }

    if (id.includes("node_modules")) {
      return false;
    }

    if (id.includes("/dist/")) {
      return false;
    }

    if (id.startsWith("\0")) {
      return false;
    }

    return true;
  }

  return {
    name: "vite-plugin-morphcss",

    enforce: "pre",

    configResolved(resolved) {
      config = resolved;

      compiler = new MorphCompiler();

      loadUtilities();
    },

    configureServer(devServer) {
      server = devServer;

      server.ws.on("connection", () => {
        if (!compiler) return;
        
        server?.ws.send({
          type: "custom",
          event: "morphcss:update",
          data: compiler.generateCss(),
        });
      });

      server.middlewares.use((req, res, next) => {
        if (req.url === `/@id/${VIRTUAL_MODULE_ID}`) {
          res.setHeader("Content-Type", "text/css");
          res.end(ensureCompiler().generateCss());
          return;
        }
        next();
      });
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
      return null;
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return ensureCompiler().generateCss();
      }
      return null;
    },

    transform(code, id) {
      if (!shouldTransform(id)) {
        return null;
      }

      const result = ensureCompiler().compile(
        code,
        id
      );

      if (server) {
        pushCssUpdate();
      }

      return {
        code: result.code,
        map: null,
      };
    },

    async handleHotUpdate(ctx) {
      if (!compiler) {
        return;
      }

      const file = ctx.file;

      if (shouldTransform(file)) {
        compiler.invalidate(file);
      }

      const utilities = Array.isArray(
        options.utilities,
      )
        ? options.utilities
        : options.utilities
          ? [options.utilities]
          : [];

      const utilityChanged = utilities.some(
        (u) =>
          path.resolve(process.cwd(), u) === file,
      );

      if (utilityChanged) {
        const css = await ctx.read();

        compiler.ingestCss(css);

        pushCssUpdate();
      }
    },

    transformIndexHtml(html, ctx) {
      const isDev = config?.command === "serve" || options.dev;
      if (!isDev) {
        return [
          {
            tag: "link",
            attrs: {
              rel: "stylesheet",
              href: `/${options.output ?? "morph.css"}`,
            },
            injectTo: "head",
          },
        ];
      }

      if (isDev) {
        return [
          {
            tag: "link",
            attrs: {
              rel: "stylesheet",
              href: `/@id/${VIRTUAL_MODULE_ID}`,
              id: "__morphcss-link",
            },
            injectTo: "head",
          },
          {
            tag: "script",
            attrs: {
              type: "module",
            },
            injectTo: "head",
            children: `
if (import.meta.hot) {
  import.meta.hot.on(
    "morphcss:update",
    (css) => {
      const STYLE_ID = "${STYLE_ID}";
      let style = document.getElementById(STYLE_ID);

      if (!style) {
        style = document.createElement("style");
        style.id = STYLE_ID;
        document.head.appendChild(style);
      }

      style.textContent = css;
    }
  );
}
            `,
          },
        ];
      }

      return [
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: `/${options.output ?? "morph.css"}`,
          },
          injectTo: "head",
        },
      ];
    },

    generateBundle() {
      if (
        !options.emitFile ||
        !compiler
      ) {
        return;
      }

      const css =
        compiler.generateCss();

      if (!css.trim()) {
        return;
      }

      this.emitFile({
        type: "asset",
        fileName:
          options.output ??
          "morph.css",
        source: css,
      });
    },
  };
}