import { join, relative, resolve, dirname } from 'path';
import { Configuration } from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import { logger } from '@storybook/node-logger';
import PnpWebpackPlugin from 'pnp-webpack-plugin';
import { mergePlugins } from './helpers/mergePlugins';
import {
  getReactScriptsPath,
  getReactScriptsPathWithYarnPnp,
} from './helpers/getReactScriptsPath';
import { processCraConfig } from './helpers/processCraConfig';
import { checkPresets } from './helpers/checkPresets';
import { getModulePath } from './helpers/getModulePath';
import { Options } from './options';

const CWD = process.cwd();
// When operating under PnP environments, this value will be set to a number
// indicating the version of the PnP standard, see: https://yarnpkg.com/advanced/pnpapi#processversionspnp
const IS_USING_YARN_PNP = typeof process.versions.pnp !== 'undefined';
const REACT_SCRIPTS_PATH = IS_USING_YARN_PNP
  ? getReactScriptsPathWithYarnPnp()
  : getReactScriptsPath();
const OPTION_SCRIPTS_PACKAGE = 'scriptsPackageName';

// This loader is shared by both the `managerWebpack` and `webpack` functions.
const resolveLoader = {
  modules: ['node_modules', join(REACT_SCRIPTS_PATH, 'node_modules')],
  plugins: [PnpWebpackPlugin.moduleLoader(module)],
};

// Ensure that loaders are resolved from react-scripts.
export const managerWebpack = (
  webpackConfig: Configuration = {},
): Configuration => ({
  ...webpackConfig,
  resolveLoader,
});

// Update the core Webpack config.
export const webpack = (
  webpackConfig: Configuration = {},
  options: Options,
): Configuration => {
  let scriptsPath = REACT_SCRIPTS_PATH;

  // Flag any potentially conflicting presets.
  checkPresets(options);

  // If the user has provided a package by name, try to resolve it.
  const scriptsPackageName = options[OPTION_SCRIPTS_PACKAGE];
  if (typeof scriptsPackageName === 'string') {
    try {
      scriptsPath = IS_USING_YARN_PNP
        ? getReactScriptsPathWithYarnPnp(scriptsPackageName)
        : dirname(require.resolve(`${scriptsPackageName}/package.json`));
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
  // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
  const craWebpackConfig = require(craWebpackConfigPath)(webpackConfig.mode);

  // Select the relevent CRA rules and add the Storybook config directory.
  logger.info(`=> Modifying Create React App rules.`);
  const craRules = processCraConfig(craWebpackConfig, options);

  // CRA uses the `ModuleScopePlugin` to limit suppot to the `src` directory.
  // Here, we select the plugin and modify its configuration to include Storybook config directory.
  const plugins = craWebpackConfig.resolve.plugins.map(
    (plugin: { appSrcs: string[] }) => {
      if (plugin.appSrcs) {
        // Mutate the plugin directly as opposed to recreating it.
        // eslint-disable-next-line no-param-reassign
        plugin.appSrcs = [...plugin.appSrcs, resolve(options.configDir)];
      }
      return plugin;
    },
  );

  // Return the new config.
  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [...(filteredRules || []), ...craRules],
    },
    plugins: mergePlugins(webpackConfig.plugins, craWebpackConfig.plugins),
    resolve: {
      ...webpackConfig.resolve,
      extensions: craWebpackConfig.resolve.extensions,
      modules: [
        ...((webpackConfig.resolve && webpackConfig.resolve.modules) || []),
        join(REACT_SCRIPTS_PATH, 'node_modules'),
        ...getModulePath(CWD),
      ],
      plugins: [...plugins, PnpWebpackPlugin],
    },
    resolveLoader,
  };
};
