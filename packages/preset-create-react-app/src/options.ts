import { PluginItem } from '@babel/core'; // eslint-disable-line import/no-extraneous-dependencies

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
  configDir: string;
  babelOptions: {
    extends: string | null;
    plugins: PluginItem[] | null;
    presets: PluginItem[] | null;
  };
  presetsList: Preset[];
  packageJson: {
    version: string;
  };
}
