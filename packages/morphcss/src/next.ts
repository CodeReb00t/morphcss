import path from "path";
import type { NextConfig } from "next";
import { getCompiler, resetCompiler } from "./loader";

/**
 * The virtual module ID that `import 'morphcss/css'` resolves to in Next.js/webpack.
 * The webpack plugin intercepts this and serves the generated CSS.
 */
const VIRTUAL_CSS_MODULE = "morphcss/css";
const VIRTUAL_CSS_RESOLVED = path.join(__dirname, "css-import.js");

/**
 * Webpack plugin that handles `import 'morphcss/css'` and emits generated CSS.
 */
class MorphCSSWebpackPlugin {
  apply(compiler: any) {
    const pluginName = "MorphCSSWebpackPlugin";

    // Reset compiler at the start of each webpack compilation
    // so watch mode gets a fresh accumulation
    compiler.hooks.beforeCompile.tap(pluginName, () => {
      resetCompiler();
    });

    // After all modules are built, emit the generated CSS as an asset
    compiler.hooks.emit.tapAsync(
      pluginName,
      (compilation: any, callback: () => void) => {
        const css = getCompiler().generateCss();
        if (css.trim()) {
          compilation.assets["morphcss.css"] = {
            source: () => css,
            size: () => css.length,
          };
        }
        callback();
      },
    );
  }
}

/**
 * Wrap your Next.js config with MorphCSS support.
 *
 * ```ts
 * // next.config.ts
 * import { withMorphCSS } from 'morphcss/next';
 *
 * export default withMorphCSS({
 *   // your existing Next.js config
 * });
 * ```
 *
 * Then in your root layout, add the CSS import once:
 * ```tsx
 * // app/layout.tsx
 * import 'morphcss/css';
 * ```
 *
 * That's it. The webpack loader will transform all `css()` calls and inject styles
 * automatically. No flash, no runtime CSS generation.
 */
export function withMorphCSS(nextConfig: NextConfig = {}): NextConfig {
  return {
    ...nextConfig,
    webpack(webpackConfig: any, options: any) {
      const loaderPath = path.join(__dirname, "loader.js");

      // Transform css() calls in all JS/TS source files
      webpackConfig.module.rules.push({
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [{ loader: loaderPath }],
      });

      // Handle `import 'morphcss/css'` — resolve to empty stub,
      // actual CSS is emitted as an asset by MorphCSSWebpackPlugin
      webpackConfig.plugins = webpackConfig.plugins ?? [];
      webpackConfig.plugins.push(new MorphCSSWebpackPlugin());

      // Resolve 'morphcss/css' to the stub so webpack doesn't try to
      // find it as a real file and crash
      webpackConfig.resolve = webpackConfig.resolve ?? {};
      webpackConfig.resolve.alias = {
        ...(webpackConfig.resolve.alias ?? {}),
        [VIRTUAL_CSS_MODULE]: VIRTUAL_CSS_RESOLVED,
      };

      // Chain with the user's own webpack customization if they have one
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(webpackConfig, options);
      }

      return webpackConfig;
    },
  };
}
