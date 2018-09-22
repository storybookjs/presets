import { Configuration, RuleSetCondition } from 'webpack';

interface DefaultStoryNameOptions {
  filepath: string,
}

interface DefaultStoryNameFn {
  (options: DefaultStoryNameOptions): string,
}

interface StorybookMdxOptions {
  showStoryCode?: boolean,
  includeStoryHeadings?: boolean,
  storyLang?: string,
  defaultStoryKind?: DefaultStoryNameFn,
  defaultStoryName?: DefaultStoryNameFn | string,
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
