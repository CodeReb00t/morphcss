import fs from "fs";
import path from "path";
import { MorphCompiler } from "@morph-css/node";
import type { Plugin, ViteDevServer } from "vite";
import { MorphCSSOptions, defaultOptions } from "./options";

export type { MorphCSSOptions };

export default function morphcssPlugin(
  userOptions: Partial<MorphCSSOptions> = {},
): Plugin {
  const options = {
    ...defaultOptions,
    ...userOptions,
  };

  let compiler: MorphCompiler | null = null;
  let server: ViteDevServer | null = null;

  let currentCssHash = "";
  let utilitiesLoaded = false;
  
  // Keep track of the real CSS file that contains `@morphcss;`
  let cssMarkerFileId: string | null = null;

  function ensureCompiler() {
    if (!compiler) {
      compiler = new MorphCompiler();
    }
    return compiler;
  }

  function loadUtilities() {
    if (utilitiesLoaded) return;
    utilitiesLoaded = true;

    const utilities = Array.isArray(options.utilities)
      ? options.utilities
      : options.utilities
        ? [options.utilities]
        : [];

    for (const file of utilities) {
      try {
        const resolved = path.resolve(process.cwd(), file);
        const css = fs.readFileSync(resolved, "utf8");
        ensureCompiler().ingestCss(css);
        console.log(`[MorphCSS] utility loaded: ${file}`);
      } catch (err) {
        console.error(`[MorphCSS] failed loading utility ${file}`, err);
      }
    }
  }

  function shouldTransform(id: string) {
    if (!/\.[jt]sx?$/.test(id)) return false;
    if (id.endsWith(".d.ts")) return false;
    if (id.includes("node_modules")) return false;
    if (id.includes("/dist/")) return false;
    if (id.startsWith("\0")) return false;
    return true;
  }

  return {
    name: "vite-plugin-morphcss",
    enforce: "pre",

    configResolved() {
      compiler = new MorphCompiler();
      loadUtilities();
    },

    configureServer(devServer) {
      server = devServer;
    },

    transform(code, id) {
      // 1. Intercept the CSS file containing the marker
      if (id.endsWith(".css") && code.includes("@morphcss;")) {
        cssMarkerFileId = id;
        const generatedCss = ensureCompiler().generateCss();
        
        // Replace the marker with the actual CSS
        return {
          code: code.replace("@morphcss;", generatedCss),
          map: null,
        };
      }

      // 2. Compile source files to extract styles
      if (!shouldTransform(id)) {
        return null;
      }

      const result = ensureCompiler().compile(code, id);
      return {
        code: result.code,
        map: null,
      };
    },

    async handleHotUpdate(ctx) {
      if (!compiler) return;

      const file = ctx.file;

      // 1. Invalidate changed source files
      if (shouldTransform(file)) {
        compiler.invalidate(file);
      }

      // 2. Reload utility CSS files if they change
      const utilities = Array.isArray(options.utilities)
        ? options.utilities
        : options.utilities
          ? [options.utilities]
          : [];

      const utilityChanged = utilities.some(
        (u) => path.resolve(process.cwd(), u) === file,
      );

      if (utilityChanged) {
        const css = await ctx.read();
        compiler.ingestCss(css);
      }

      // 3. Check if the generated MorphCSS actually changed
      const hash = compiler.generateCssHash();
      if (hash !== currentCssHash) {
        currentCssHash = hash;

        // 4. Trigger a Native Vite HMR update on the CSS file!
        if (server && cssMarkerFileId) {
          const mod = server.moduleGraph.getModuleById(cssMarkerFileId);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            // We return the module so Vite natively handles the CSS reload
            return [...(ctx.modules || []), mod];
          }
        }
      }
    },
  };
}