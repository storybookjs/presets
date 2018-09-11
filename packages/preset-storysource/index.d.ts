import { Configuration, RuleSetCondition } from 'webpack';

interface Options {
  loaderOptions?: object,
  rule?: RuleSetCondition,
}

declare interface PresetStorySource {
  webpack: (config?: Configuration, options?: Options) => Configuration;
  manager: (entry?: Array<string>) => Array<string>;
}

export = PresetStorySource;
