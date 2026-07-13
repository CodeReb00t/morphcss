export interface MorphCSSOptions {
  utilities?: string | string[];
  output?: string;
}

export const defaultOptions: Required<MorphCSSOptions> = {
  utilities: [],
  output: ".morphcss/morph.css",
};
