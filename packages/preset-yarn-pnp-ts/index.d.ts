import { Configuration } from 'webpack';

interface Options {
  tsLoaderOptions?: object;
  tsDocgenLoaderOptions?: object;
  include?: string[];
}

declare interface PresetYarnPnpTypescript {
  webpack: (config?: Configuration, options?: Options) => Configuration;
  managerWebpack: (config?: Configuration, options?: Options) => Configuration;
}

export = PresetYarnPnpTypescript;
