export type Preset = string | { name: string };

export interface Options {
  /**
   * Optionally set the package name of a react-scripts fork.
   * In most cases, the package is located automatically by this preset.
   */
  scriptsPackageName?: string;

  /**
   * Overrides for Create React App's Webpack configuration.
   */
  craOverrides?: {
    fileLoaderExcludes?: string[];
  };

  // TODO: Expose these from Storybook.
  /* eslint-disable @typescript-eslint/no-explicit-any */
  configDir: string;
  babelOptions: {
    extends: any;
    plugins: any;
    presets: any;
  };
  presetsList: Preset[];
  packageJson: {
    version: string;
  };
}
