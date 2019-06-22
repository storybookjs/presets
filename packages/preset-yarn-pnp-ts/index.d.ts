import { Configuration } from 'webpack';
import { Options } from 'ts-loader';

declare interface PresetYarnPnpTypescript {
  webpack: (config?: Configuration) => Configuration;
  managerWebpack: (config?: Configuration) => Configuration;
  tsLoaderOptions: () => Options;
}

export = PresetYarnPnpTypescript;
