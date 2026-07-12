export interface MorphCSSOptions {
  utilities?: string | string[];
  output?: string;
  emitFile?: boolean;
  dev?: boolean;
  hmr?: boolean;
}

export const defaultOptions: Required<MorphCSSOptions> = {
  utilities: [],
  output: "morph.css",
  emitFile: true,
  dev: false,
  hmr: true,
};
