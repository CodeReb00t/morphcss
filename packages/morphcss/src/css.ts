import type { MorphCSSObject } from "./types";
export interface MorphCSSResult {
  className: string;
  style?: Record<string, string | number>;
}

export function css(styles: MorphCSSObject): MorphCSSResult {
  return styles as unknown as MorphCSSResult;
}
