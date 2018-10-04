import { Configuration, RuleSetCondition } from 'webpack';

interface Options {
  loaderOptions?: object,
  rule?: RuleSetCondition,
}

declare interface PresetStorySource {
  webpack: (config?: Configuration, options?: Options) => Configuration;
  addons: (entry?: Array<string>) => Array<string>;
}

export = PresetStorySource;
