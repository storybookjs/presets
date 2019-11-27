import { Configuration } from 'webpack';
import { Options as TSLoaderOptions } from 'ts-loader';

interface Options {
  tsLoaderOptions?: TSLoaderOptions;
  transpileManager?: boolean;
  include?: string[];
}

declare interface PresetTypescript {
  webpack: (config?: Configuration, options?: Options) => Configuration;
  managerWebpack: (config?: Configuration, options?: Options) => Configuration;
}

export = PresetTypescript;
