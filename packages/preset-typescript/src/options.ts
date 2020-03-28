import { PluginItem } from '@babel/core'; // eslint-disable-line import/no-extraneous-dependencies
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export type Preset = string | { name: string };

export interface Options {
  /**
   * Optionally set include paths.
   */
  include?: string[];

  /**
   * Provide settings for ForkTsCheckerWebpackPlugin.
   */
  forkTsCheckerWebpackPluginOptions?: Partial<
    ForkTsCheckerWebpackPlugin.Options
  >;

  /**
   * Enable compilation within the manager.
   */
  transpileManager?: boolean;

  // TODO: Expose these from Storybook.
  babelOptions: {
    extends: string | null;
    plugins: PluginItem[] | null;
    presets: PluginItem[] | null;
  };
  framework: 'angular' | 'react' | 'vue'; // NOTE: Non-exhaustive list.

  // TODO: Proper typing
  tsLoaderOptions: any;
}
