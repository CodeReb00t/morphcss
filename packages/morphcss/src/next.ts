import path from "path";
import { getCompiler, resetCompiler } from "./loader";

/**
 * The virtual module ID that `import 'morphcss/css'` resolves to in Next.js/webpack.
 * The webpack plugin intercepts this and serves the generated CSS.
 */
const VIRTUAL_CSS_MODULE = "morphcss/css";
const VIRTUAL_CSS_RESOLVED = path.join(__dirname, "css-import.js");

import fs from "fs";

/**
 * Wrap your Next.js config with MorphCSS support.
 */
export function withMorphCSS(nextConfig: any = {}): any {
  return {
    ...nextConfig,
    webpack(webpackConfig: any, options: any) {
      const loaderPath = path.join(__dirname, "loader.js");

      const cacheDir = path.resolve(process.cwd(), 'node_modules/.cache/morphcss');
      const cacheFile = path.join(cacheDir, 'morph.css');
      
      // Ensure the cache file exists before Webpack even starts resolving
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }
      if (!fs.existsSync(cacheFile)) {
        fs.writeFileSync(cacheFile, '');
      }

      // Transform css() calls in all JS/TS source files
      webpackConfig.module.rules.push({
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [{ loader: loaderPath }],
      });

      // Reset compiler at the start of each compilation (watch mode)
      webpackConfig.plugins = webpackConfig.plugins ?? [];
      webpackConfig.plugins.push({
        apply(compiler: any) {
          compiler.hooks.beforeCompile.tap("MorphCSSReset", () => {
            resetCompiler();
          });
        }
      });

      // Resolve '@morph-css/kit/css' to the actual CSS cache file
      webpackConfig.resolve = webpackConfig.resolve ?? {};
      webpackConfig.resolve.alias = {
        ...(webpackConfig.resolve.alias ?? {}),
        "@morph-css/kit/css": cacheFile,
      };

      // Chain with the user's own webpack customization if they have one
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(webpackConfig, options);
      }

      return webpackConfig;
    },
  };
}
