import { Configuration } from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import { PluginItem } from '@babel/core';
import { Options } from './options';
import { processConfig } from './helpers/processConfig';
import { isCompatible } from './helpers/isCompatible';

const babelPresetTypeScript = require.resolve('@babel/preset-typescript');
const babelPresetVueTypeScript = require.resolve('babel-preset-typescript-vue');

export const babel = (
  config: Options['babelOptions'],
  options: Options,
): Options['babelOptions'] => {
  if (!isCompatible(options, true)) return config;

  const { presets = [] } = config;
  const preset =
    options.framework === 'vue'
      ? babelPresetVueTypeScript
      : babelPresetTypeScript;

  const patchedPresets =
    !presets || presets.includes(preset) ? presets : [...presets, preset];

  return {
    ...config,
    presets: patchedPresets as PluginItem[],
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
    presets: [...(presets as PluginItem[]), babelPresetTypeScript],
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
    return processConfig(webpackConfig, updatedOptions);
  }

  return processConfig(webpackConfig, options);
};
