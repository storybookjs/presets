import { Configuration, RuleSetCondition } from 'webpack';

interface Options {
  styleLoaderOptions?: object | false,
  cssLoaderOptions?: object | false,
  sassLoaderOptions?: object | false,
  rule?: RuleSetCondition,
}

declare function extend(config?: Configuration, options?: Options): Configuration;

export = extend;
