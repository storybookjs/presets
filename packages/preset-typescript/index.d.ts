import { Configuration } from 'webpack';

interface Options {
  loaderOptions?: object;
  include?: string[];
}

declare interface PresetTypescript {
  webpack: (config?: Configuration, options?: Options) => Configuration;
}

export = PresetTypescript;
