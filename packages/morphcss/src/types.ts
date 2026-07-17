import type { Properties } from "csstype";

export type CSSVariables = Record<`--${string}`, string | number>;

/**
 * A condition key for nested selectors.
 *
 * Supports:
 *  - Ampersand pseudo-selectors: `"&:hover"`, `"&:focus"`, `"& > span"`, `"&[disabled]"`
 *  - At-rules: `"@media (max-width: 768px)"`, `"@supports (display: grid)"`
 */
type NestedCondition = `&${string}` | `@${string}`;

export type MorphCSSObject = Properties<string | number> &
  CSSVariables & {
    [K in NestedCondition]?: Properties<string | number> & CSSVariables;
  };
