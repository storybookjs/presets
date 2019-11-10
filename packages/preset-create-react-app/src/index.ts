import { join, relative, resolve } from 'path';
import { Configuration } from 'webpack';
import { logger } from '@storybook/node-logger';
import mergePlugins from './helpers/mergePlugins';
import getReactScriptsPath from './helpers/getReactScriptsPath';
import processCraConfig from './helpers/processCraConfig';
import checkPresets from './helpers/checkPresets';
import getModulePath from './helpers/getModulePath';
import { Options } from './options';

const CWD = process.cwd();
const REACT_SCRIPTS_PATH = getReactScriptsPath();
const OPTION_SCRIPTS_PACKAGE = 'scriptsPackageName';

// This loader is shared by both the `managerWebpack` and `webpack` functions.
const resolveLoader = {
  modules: ['node_modules', join(REACT_SCRIPTS_PATH, 'node_modules')],
};

// Ensure that loaders are resolved from react-scripts.
const managerWebpack = (webpackConfig: Configuration = {}) => ({
  ...webpackConfig,
  resolveLoader,
});

// Update the core Webpack config.
const webpack = (webpackConfig: Configuration = {}, options: Options) => {
  const configDir = resolve(options.configDir);
  let scriptsPath = REACT_SCRIPTS_PATH;

  // Flag any potentially conflicting presets.
  checkPresets(configDir);

  // If the user has provided a package by name, try to resolve it.
  const scriptsPackageName = options[OPTION_SCRIPTS_PACKAGE];
  if (typeof scriptsPackageName === 'string') {
    try {
      scriptsPath = require.resolve(scriptsPackageName);
    } catch (e) {
      logger.warn(
        `A \`${OPTION_SCRIPTS_PACKAGE}\` was provided, but couldn't be resolved.`,
      );
    }
  }

  // If there isn't a scripts-path set, return the Webpack config unmodified.
  if (!scriptsPath) {
    logger.error('Failed to resolve a `react-scripts` package.');
    return webpackConfig;
  }

  logger.info(
    `=> Loading Webpack configuration from \`${relative(CWD, scriptsPath)}\``,
  );

  // Remove existing rules related to JavaScript and TypeScript.
  logger.info(`=> Removing existing JavaScript and TypeScript rules.`);
  const filteredRules =
    webpackConfig.module &&
    webpackConfig.module.rules.filter(
      ({ test }) =>
        !(
          test instanceof RegExp &&
          ((test && test.test('.js')) || test.test('.ts'))
        ),
    );

  // Require the CRA config and set the appropriate mode.
  const craWebpackConfigPath = join(scriptsPath, 'config', 'webpack.config');
  const craWebpackConfig = require(craWebpackConfigPath)(webpackConfig.mode);

  // Select the relevent CRA rules and add the Storybook config directory.
  logger.info(`=> Modifying Create React App rules.`);
  const craRules = processCraConfig(craWebpackConfig, options);

  const { tsDocgenLoaderOptions } = options;
  const tsDocgenRule = tsDocgenLoaderOptions
    ? {
        test: /\.tsx?$/,
        loader: require.resolve('react-docgen-typescript-loader'),
        options: Object.keys(tsDocgenLoaderOptions).length
          ? tsDocgenLoaderOptions
          : {
              tsconfigPath: join(CWD, 'tsconfig.json'),
            },
      }
    : {};

  // Return the new config.
  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [...(filteredRules || []), ...craRules, tsDocgenRule],
    },
    plugins: mergePlugins(webpackConfig.plugins, craWebpackConfig.plugins),
    resolve: {
      ...webpackConfig.resolve,
      extensions: craWebpackConfig.resolve.extensions,
      modules: [
        ...(webpackConfig.resolve?.modules || []),
        join(REACT_SCRIPTS_PATH, 'node_modules'),
        ...getModulePath(CWD),
      ],
    },
    resolveLoader,
  };
};

export default { managerWebpack, webpack };
