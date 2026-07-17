import type { MorphCSSObject } from "./types";

/**
 * The result of a `css()` call after compile-time transformation.
 *
 * At build time, the Rust compiler replaces the entire `css({...})` call with
 * a plain object literal: `{ className: "m_abc m_def", style: { "--0": value } }`.
 *
 * The `style` field is only present when the object contains dynamic values
 * (non-literal expressions), which are mapped to CSS custom properties at compile time.
 */
export interface CSSResult {
  className: string;
  style?: Record<string, string | number>;
}

/**
 * Define atomic CSS styles.
 *
 * @example — static styles
 * ```tsx
 * const card = css({
 *   display: 'flex',
 *   padding: 16,
 *   '&:hover': { background: '#eee' },
 *   '@media (max-width: 768px)': { padding: 8 },
 * });
 *
 * <div className={card.className} />
 * ```
 *
 * @example — dynamic styles (runtime CSS variables)
 * ```tsx
 * const button = (color: string) => css({ background: color, padding: 8 });
 *
 * const btn = button('red');
 * <div className={btn.className} style={btn.style} />
 * ```
 *
 * @remarks
 * This function is a compile-time marker. The Rust/NAPI compiler transforms every
 * `css({...})` call into `{ className: "m_...", style?: {...} }` before the browser
 * sees the code. **No CSS is generated at runtime.**
 *
 * Known limitation: object spread inside `css()` is silently ignored.
 * `css({ ...other, padding: 8 })` — the spread is skipped, only `padding` is extracted.
 */
export function css(_styles: MorphCSSObject): CSSResult {
  // This body is a runtime fallback only — the compiler replaces the entire call site.
  // In practice this line should never execute in a correctly configured project.
  return { className: "" };
}
