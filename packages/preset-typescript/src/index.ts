import { Configuration, Module, RuleSetRule } from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import { Options } from './options';
import { processConfig } from './helpers/processConfig';
import { isCompatible } from './helpers/isCompatible';

const babelPresetTypeScript = require.resolve('@babel/preset-typescript');

export const babel = (
  config: Options['babelOptions'],
  options: Options,
): Options['babelOptions'] => {
  if (!isCompatible(options, true)) return config;

  const { presets = [] } = config;
  const preset = babelPresetTypeScript;
  return {
    ...config,
    presets: [...presets, preset],
  };
};

export const managerBabel = (
  config: Options['babelOptions'],
  options: Options,
): Options['babelOptions'] => {
  if (!isCompatible(options)) return config;

  const { presets = [] } = config;
  return {
    ...config,
    presets: [...presets, babelPresetTypeScript],
  };
};

export const managerWebpack = (
  webpackConfig: Configuration = {},
  options: Options,
): Configuration => {
  if (!isCompatible(options)) return webpackConfig;

  const { transpileManager } = options;

  if (!transpileManager) return webpackConfig;

  return processConfig(webpackConfig, options);
};

export const webpack = (
  webpackConfig: Configuration = {},
  options: Options,
): Configuration => {
  if (!isCompatible(options)) return webpackConfig;

  if (options.framework === 'vue') {
    const updatedOptions = {
      ...options,
      forkTsCheckerWebpackPluginOptions: {
        ...options.forkTsCheckerWebpackPluginOptions,
        vue: options.forkTsCheckerWebpackPluginOptions?.vue ?? true,
      },
    };

    const { tsLoaderOptions = { transpileOnly: true } } = options;
    tsLoaderOptions.appendTsSuffixTo = [
      ...(tsLoaderOptions.appendTsSuffixTo || []),
      /\.vue$/,
    ];

    const tsLoader: RuleSetRule = {
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: tsLoaderOptions,
        },
      ],
    };

    if (options.include) {
      tsLoader.include = options.include;
    }

    const module: Module = webpackConfig.module || { rules: [] };
    const updatedWebpack = {
      ...webpackConfig,
      module: {
        ...module,
        rules: [...module.rules, tsLoader],
      },
    };
    return processConfig(updatedWebpack, updatedOptions);
  }

  return processConfig(webpackConfig, options);
};
