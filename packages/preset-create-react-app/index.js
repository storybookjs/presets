const path = require('path');
const { logger } = require('@storybook/node-logger');
const mergePlugins = require('./helpers/mergePlugins');
const getReactScriptsPath = require('./helpers/getReactScriptsPath');
const processCraConfig = require('./helpers/processCraConfig');
const checkPresets = require('./helpers/checkPresets');
const getModulePath = require('./helpers/getModulePath');

const CWD = process.cwd();
const REACT_SCRIPTS_PATH = getReactScriptsPath();
const OPTION_SCRIPTS_PACKAGE = 'scriptsPackageName';

// This loader is shared by both the `managerWebpack` and `webpack` functions.
const resolveLoader = {
  modules: ['node_modules', path.join(REACT_SCRIPTS_PATH, 'node_modules')],
};

// Ensure that loaders are resolved from react-scripts.
const managerWebpack = (webpackConfig = {}) => ({
  ...webpackConfig,
  resolveLoader,
});

// Update the core Webpack config.
const webpack = (webpackConfig = {}, options = {}) => {
  const configDir = path.resolve(options.configDir);
  let scriptsPath = REACT_SCRIPTS_PATH;

  checkPresets(configDir);

  // If the user has provided a package by name, try to resolve it.
  if (options[OPTION_SCRIPTS_PACKAGE]) {
    try {
      scriptsPath = require.resolve(options[OPTION_SCRIPTS_PACKAGE]);
    } catch (e) {
      logger.warn(`A \`${OPTION_SCRIPTS_PACKAGE}\` was provided, but couldn't be resolved.`);
    }
  }

  // If there isn't a scripts-path set, return the Webpack config unmodified.
  if (!scriptsPath) {
    logger.error('Failed to resolve a `react-scripts` package.');
    return webpackConfig;
  }

  logger.info(`=> Loading Webpack configuration from \`${path.relative(CWD, scriptsPath)}\``);

  // Remove existing rules related to JavaScript and TypeScript.
  logger.info(`=> Removing existing JavaScript and TypeScript rules.`);
  const filteredRules = webpackConfig.module.rules.filter(
    ({ test }) => !((test && test.test('.js')) || test.test('.ts'))
  );

  // Require the CRA config and set the appropriate mode.
  const craWebpackConfigPath = path.join(scriptsPath, 'config', 'webpack.config');
  const craWebpackConfig = require(craWebpackConfigPath)(webpackConfig.mode); // eslint-disable-line import/no-dynamic-require, global-require

  // Select the relevent CRA rules and add the Storybook config directory.
  logger.info(`=> Modifying Create React App rules.`);
  const craRules = processCraConfig(craWebpackConfig, options);

  const tsDocgenRule = options.useTsDocgenLoader
    ? {
        test: /\.tsx?$/,
        loader: require.resolve('react-docgen-typescript-loader'),
        options: options.tsDocgenLoaderOptions || {},
      }
    : {};

  // Return the new config.
  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [...filteredRules, ...craRules, tsDocgenRule],
    },
    plugins: mergePlugins(webpackConfig.plugins, craWebpackConfig.plugins),
    resolve: {
      ...webpackConfig.resolve,
      extensions: craWebpackConfig.resolve.extensions,
      modules: [
        ...webpackConfig.resolve.modules,
        path.join(REACT_SCRIPTS_PATH, 'node_modules'),
        ...[getModulePath(CWD)],
      ],
    },
    resolveLoader,
  };
};

module.exports = { managerWebpack, webpack };
