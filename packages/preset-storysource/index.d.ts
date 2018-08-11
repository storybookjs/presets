import { Configuration, RuleSetCondition } from 'webpack';

interface Options {
  loaderOptions?: object,
  rule?: RuleSetCondition,
}

declare function extend(config?: Configuration, options?: Options): Configuration;

export = extend;
