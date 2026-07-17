import { defineConfig } from "tsup";

export default defineConfig([
  // Main entries — css(), cx(), vite plugin, next plugin, css-import stub
  {
    entry: {
      index: "src/index.ts",
      "css-import": "src/css-import.ts",
      vite: "src/vite.ts",
      next: "src/next.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    minify: false,
    treeshake: true,
    external: ["vite", "next", "@morph-css/node"],
  },
  // Webpack loader — separate config to use default export cleanly
  {
    entry: { loader: "src/loader.ts" },
    format: ["cjs", "esm"],
    dts: true,
    // webpack loaders require CJS default export
    outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".js" }),
    external: ["@morph-css/node"],
  },
]);
