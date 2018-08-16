import { Configuration } from 'webpack';

interface Options {
  loaderOptions?: object;
}

declare interface PresetTypeScript {
  extendWebpack: (config?: Configuration, options?: Options) => Configuration;
}

export = PresetTypeScript;
