import { Configuration, RuleSetCondition } from 'webpack';

interface Options {
  svgLoaderOptions?: object | false;
}

declare interface PresetInlineSvg {
  webpackFinal: (config?: Configuration) => Configuration;
}

export = PresetInlineSvg;
