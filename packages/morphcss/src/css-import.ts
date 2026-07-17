/**
 * This module is a marker for the MorphCSS bundler plugins.
 *
 * - In **Vite**: resolved to a virtual module by `morphcss/vite` plugin — the plugin
 *   intercepts this import and serves the generated CSS, with HMR support.
 *
 * - In **Next.js**: resolved by the webpack plugin in `morphcss/next` — the loader
 *   intercepts this import and emits the generated CSS as an asset.
 *
 * - In **production**: CSS is appended to the output CSS bundle and this module
 *   becomes an empty stub.
 *
 * You should import this once in your app root:
 * ```ts
 * // main.tsx / app/layout.tsx / root.tsx — same line everywhere
 * import 'morphcss/css';
 * ```
 */

// This file intentionally empty — the plugin intercepts the import before this runs.
export {};
