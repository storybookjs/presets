import { Configuration } from 'webpack';
import { Options as TSLoaderOptions } from 'ts-loader';
import TSDocgenLoaderOptions from 'react-docgen-typescript-loader/dist/LoaderOptions';

interface Options {
  tsLoaderOptions?: TSLoaderOptions;
  tsDocgenLoaderOptions?: TSDocgenLoaderOptions;
  transpileManager?: boolean;
  include?: string[];
}

declare interface PresetTypescript {
  webpack: (config?: Configuration, options?: Options) => Configuration;
  managerWebpack: (config?: Configuration, options?: Options) => Configuration;
}

export = PresetTypescript;
