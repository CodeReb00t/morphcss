import type { Properties } from "csstype";

export type CSSVariables = Record<`--${string}`, string | number>;

export type MorphCSSObject = Properties<string | number> & CSSVariables;
