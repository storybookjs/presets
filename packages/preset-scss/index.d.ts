import { Configuration, RuleSetCondition } from 'webpack';

interface Options {
  preLoaders?: array;
  styleLoaderOptions?: object | false;
  cssLoaderOptions?: object | false;
  sassLoaderOptions?: object | false;
  postLoaders?: array;
  rule?: RuleSetCondition;
}

declare interface PresetScss {
  webpack: (config?: Configuration, options?: Options) => Configuration;
}

export = PresetScss;
