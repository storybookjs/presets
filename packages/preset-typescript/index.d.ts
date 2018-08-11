import { Configuration } from 'webpack';

interface Options {
  loaderOptions?: object;
}

declare function extend(config?: Configuration, options?: Options): Configuration;

export = extend;
