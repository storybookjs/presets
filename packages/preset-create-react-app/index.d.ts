import { Configuration, RuleSetCondition } from 'webpack';

interface Options {
  /**
   * Optionally set the package name of a react-scripts fork.
   * In most cases, the package is located automatically by this preset.
   */
  scriptsPackageName?: string;
}

declare interface PresetCreateReactApp {
  webpack: (config?: Configuration, options?: Options) => Configuration;
}

export = PresetCreateReactApp;
