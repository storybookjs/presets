import { Configuration } from 'webpack';

interface Options {
  webpackConfigPath?: string;
  webpackConfigIndex?: number,
  webpackConfigFnParams?: any,
}

declare interface PresetScss {
  extendWebpack: (config?: Configuration, options?: Options) => Configuration;
}

export = PresetScss;
