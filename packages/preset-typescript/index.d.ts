import { Configuration } from 'webpack';

interface Options {
  loaderOptions?: object;
}

declare interface PresetTypeScript {
  webpack: (config?: Configuration, options?: Options) => Configuration;
}

export = PresetTypeScript;
