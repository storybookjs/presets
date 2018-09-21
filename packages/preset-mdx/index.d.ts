import { Configuration, RuleSetCondition } from 'webpack';

interface StorybookMdxOptions {
  showStoryCode?: boolean,
  includeStoryHeadings?: boolean,
  storyLang?: string,
}

interface Options {
  babelLoaderOptions?: object | false,
  mdxLoaderOptions?: object | false,
  mdxOptions?: StorybookMdxOptions,
  rule?: RuleSetCondition,
}

declare interface PresetMdx {
  webpack: (config?: Configuration, options?: Options) => Configuration;
}

export = PresetMdx;
