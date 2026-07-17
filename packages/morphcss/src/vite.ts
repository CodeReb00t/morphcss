import { MorphCompiler } from "@morph-css/node";
import type { Plugin, ResolvedConfig, ViteDevServer } from "vite";

/**
 * The virtual module ID users import in their app root:
 *
 * ```ts
 * // main.tsx or app/layout.tsx
 * import 'morphcss/css';
 * ```
 *
 * In dev: resolved to a virtual module that returns the current generated CSS.
 * In prod: CSS is appended to the output CSS bundle — this import becomes a no-op stub.
 */
const VIRTUAL_CSS_ID = "morphcss/css";
const RESOLVED_CSS_ID = "\0virtual:morphcss/css";

function shouldTransform(id: string): boolean {
  if (!/\.[jt]sx?$/.test(id)) return false;
  if (id.endsWith(".d.ts")) return false;
  if (id.includes("node_modules")) return false;
  if (id.startsWith("\0")) return false;
  return true;
}

/**
 * MorphCSS Vite plugin.
 *
 * Add to your `vite.config.ts`:
 * ```ts
 * import { morphcss } from 'morphcss/vite';
 *
 * export default defineConfig({
 *   plugins: [morphcss()],
 * });
 * ```
 *
 * Then in your app root (`main.tsx` / `app/layout.tsx` / etc.):
 * ```ts
 * import 'morphcss/css';
 * ```
 *
 * That's it. No other configuration needed.
 */
export function morphcss(): Plugin {
  let compiler: MorphCompiler;
  let server: ViteDevServer | null = null;
  let config: ResolvedConfig;

  return {
    name: "morphcss",
    enforce: "pre",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
      compiler = new MorphCompiler();
    },

    configureServer(devServer) {
      server = devServer;
    },

    // ─── Virtual module resolution ─────────────────────────────────────────
    // Makes `import 'morphcss/css'` work in dev by serving generated CSS as a
    // virtual module tracked by Vite's module graph.

    resolveId(id) {
      if (id === VIRTUAL_CSS_ID) return RESOLVED_CSS_ID;
    },

    load(id) {
      if (id === RESOLVED_CSS_ID) {
        // Return CSS as a JS string injection so Vite can HMR it as a module.
        // We emit it as a CSS string that gets injected into a <style> tag by
        // Vite's own CSS handling when imported as a side-effect.
        const css = compiler.generateCss();
        return `
const css = ${JSON.stringify(css)};
let el = document.getElementById('__morphcss');
if (!el) {
  el = document.createElement('style');
  el.id = '__morphcss';
  document.head.appendChild(el);
}
el.textContent = css;

if (import.meta.hot) {
  import.meta.hot.accept();
}
`;
      }
    },

    // ─── Transform css() calls ────────────────────────────────────────────
    // The Rust/NAPI compiler parses every JS/TS file and replaces css({...})
    // call expressions with { className: "m_abc ...", style?: {...} }.

    transform(code, id) {
      if (!shouldTransform(id)) return null;

      const result = compiler.compile(code, id);
      return {
        code: result.code,
        map: null,
      };
    },

    // ─── HMR ─────────────────────────────────────────────────────────────
    // When a source file changes, invalidate the compiler cache for that file,
    // then invalidate the virtual CSS module so Vite re-fetches it.
    // This triggers a hot update of the injected <style> without a full page reload.

    handleHotUpdate(ctx) {
      if (!compiler || !server) return;

      if (shouldTransform(ctx.file)) {
        compiler.invalidate(ctx.file);
      }

      const virtualMod = server.moduleGraph.getModuleById(RESOLVED_CSS_ID);
      if (virtualMod) {
        server.moduleGraph.invalidateModule(virtualMod);
        // Return the module so Vite knows to hot-update it
        return [virtualMod, ...ctx.modules];
      }
    },

    // ─── Production build ────────────────────────────────────────────────
    // The `import 'morphcss/css'` in user code resolves to an empty stub at
    // build time (since the virtual module is dev-only). We append the generated
    // CSS to the existing CSS output chunk instead.

    generateBundle(_, bundle) {
      if (config.command !== "build") return;

      const css = compiler.generateCss();
      if (!css.trim()) return;

      // Find an existing CSS asset to append to
      const existingCssChunk = Object.values(bundle).find(
        (chunk) => chunk.type === "asset" && chunk.fileName.endsWith(".css"),
      );

      if (existingCssChunk && existingCssChunk.type === "asset") {
        existingCssChunk.source =
          (existingCssChunk.source as string) + "\n" + css;
      } else {
        // No CSS file yet — emit one
        this.emitFile({
          type: "asset",
          fileName: "morphcss.css",
          source: css,
        });
      }
    },
  };
}
