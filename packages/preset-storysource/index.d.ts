import { Configuration, RuleSetCondition } from 'webpack';

interface Options {
  loaderOptions?: object,
  rule?: RuleSetCondition,
}

declare interface PresetStorySource {
  extendWebpack: (config?: Configuration, options?: Options) => Configuration;
}

export = PresetStorySource;
