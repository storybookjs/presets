import { Configuration } from 'webpack';

interface Options {
  tsLoader?: object;
}

declare function extend(config?: Configuration, options?: Options): Configuration;

export = extend;
