const path = require('path');
const { logger } = require('@storybook/node-logger');
const mergePlugins = require('./helpers/mergePlugins');
const getReactScriptsPath = require('./helpers/getReactScriptsPath');
const processCraConfig = require('./helpers/processCraConfig');
const checkPresets = require('./helpers/checkPresets');

const SCRIPTS_PACKAGE_OPTION = 'scriptsPackageName';

const reactScriptsPath = getReactScriptsPath();
const resolveLoader = {
  modules: ['node_modules', path.join(reactScriptsPath, 'node_modules')],
};

// Ensure that loaders are resolved from react-scripts.
const managerWebpack = (webpackConfig = {}) => ({
  ...webpackConfig,
  resolveLoader,
});

// Update the core Webpack config.
const webpack = (webpackConfig = {}, options = {}) => {
  const storybookConfigDir = path.resolve(options.configDir);
  let scriptsPath = reactScriptsPath;

  checkPresets(storybookConfigDir);

  // If the user has provided a package by name, try to resolve it.
  if (options[SCRIPTS_PACKAGE_OPTION]) {
    try {
      scriptsPath = require.resolve(options[SCRIPTS_PACKAGE_OPTION]);
    } catch (e) {
      logger.warn(`A \`${SCRIPTS_PACKAGE_OPTION}\` was provided, but couldn't be resolved.`);
    }
  }

  // If there isn't a scripts-path set, return the Webpack config unmodified.
  if (!scriptsPath) {
    logger.error('Failed to resolve a `react-scripts` package.');
    return webpackConfig;
  }

  logger.info(
    `=> Loading Webpack configuration from \`${path.relative(process.cwd(), scriptsPath)}\``
  );

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
  const craRules = processCraConfig(craWebpackConfig, storybookConfigDir);

  // Return the new config.
  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [...filteredRules, ...craRules],
    },
    plugins: mergePlugins(webpackConfig.plugins, craWebpackConfig.plugins),
    resolve: {
      ...webpackConfig.resolve,
      extensions: craWebpackConfig.resolve.extensions,
      modules: [...webpackConfig.resolve.modules, path.join(reactScriptsPath, 'node_modules')],
    },
    resolveLoader,
  };
};

module.exports = { managerWebpack, webpack };
