import { MorphCompiler } from "@morph-css/node";

/**
 * Singleton compiler instance — shared across all webpack loader invocations
 * in a single build. This matches the Vite plugin's behavior where one MorphCompiler
 * accumulates all css() calls across all files before generating CSS.
 */
let _compiler: MorphCompiler | null = null;

export function getCompiler(): MorphCompiler {
  if (!_compiler) _compiler = new MorphCompiler();
  return _compiler;
}

/**
 * Resets the compiler singleton. Called between webpack builds (e.g. watch mode).
 */
export function resetCompiler(): void {
  _compiler = null;
}

import fs from "fs";
import path from "path";

/**
 * Webpack loader that transforms css() call expressions at build time.
 *
 * Used internally by `withMorphCSS()` in `morphcss/next`.
 * You don't need to add this loader manually.
 */
export default function morphLoader(
  this: {
    resourcePath: string;
    async(): (err: Error | null, result?: string) => void;
  },
  source: string,
): void {
  const callback = this.async();
  try {
    const result = getCompiler().compile(source, this.resourcePath);
    
    // Write CSS to cache file so Next.js can resolve and bundle it normally
    const cacheDir = path.resolve(process.cwd(), 'node_modules/.cache/morphcss');
    const cacheFile = path.join(cacheDir, 'morph.css');
    
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    
    const newCss = getCompiler().generateCss();
    const currentCss = fs.existsSync(cacheFile) ? fs.readFileSync(cacheFile, 'utf8') : '';
    
    if (newCss !== currentCss) {
      fs.writeFileSync(cacheFile, newCss);
    }
    
    callback(null, result.code);
  } catch (err) {
    callback(err instanceof Error ? err : new Error(String(err)));
  }
}
