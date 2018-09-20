import { Configuration, RuleSetCondition } from 'webpack';

interface Options {
  babelLoaderOptions?: object | false,
  mdxLoaderOptions?: object | false,
  rule?: RuleSetCondition,
}

declare interface PresetMdx {
  webpack: (config?: Configuration, options?: Options) => Configuration;
}

export = PresetMdx;
