import { Configuration } from 'webpack';

interface Options {
  modifyVars?: object;
}

declare interface PresetAntDesign {
  webpack: (config?: Configuration, options?: Options) => Configuration;
}

export = PresetAntDesign;
