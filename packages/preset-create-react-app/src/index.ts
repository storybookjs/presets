import { join, relative, resolve, dirname } from 'path';
import { Configuration, ResolveLoader, ResolvePlugin } from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import semver from 'semver';
import { logger } from '@storybook/node-logger';
import PnpWebpackPlugin from 'pnp-webpack-plugin';
import ReactDocgenTypescriptPlugin from '@storybook/react-docgen-typescript-plugin';
import { mergePlugins } from './helpers/mergePlugins';
import { getReactScriptsPath } from './helpers/getReactScriptsPath';
import { processCraConfig } from './helpers/processCraConfig';
import { checkPresets } from './helpers/checkPresets';
import { getModulePath } from './helpers/getModulePath';
import { PluginOptions } from './types';

const CWD = process.cwd();

const REACT_SCRIPTS_PATH = getReactScriptsPath();
const OPTION_SCRIPTS_PACKAGE = 'scriptsPackageName';

// Ensures that assets are served from the correct path when Storybook is built.
// Resolves: https://github.com/storybookjs/storybook/issues/4645
if (!process.env.PUBLIC_URL) {
  process.env.PUBLIC_URL = '.';
}

// This loader is shared by both the `managerWebpack` and `webpack` functions.
const resolveLoader: ResolveLoader = {
  modules: ['node_modules', join(REACT_SCRIPTS_PATH, 'node_modules')],
  plugins: [PnpWebpackPlugin.moduleLoader(module)],
};

// TODO: Replace with exported type from Storybook.
export const core = (): { disableWebpackDefaults: boolean } => ({
  disableWebpackDefaults: true,
});

// Don't use Storybook's default Babel config.
export const babelDefault = (): Record<
  string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  (string | [string, object])[]
> => ({
  presets: [],
  plugins: [],
});

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
  options: PluginOptions,
): Configuration => {
  let scriptsPath = REACT_SCRIPTS_PATH;

  // Flag any potentially conflicting presets.
  checkPresets(options);

  // If the user has provided a package by name, try to resolve it.
  const scriptsPackageName = options[OPTION_SCRIPTS_PACKAGE];
  if (typeof scriptsPackageName === 'string') {
    try {
      scriptsPath = dirname(
        require.resolve(`${scriptsPackageName}/package.json`, {
          paths: [options.configDir],
        }),
      );
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
  // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-call
  const craWebpackConfig = require(craWebpackConfigPath)(
    webpackConfig.mode,
  ) as Configuration;

  // Select the relevent CRA rules and add the Storybook config directory.
  logger.info(`=> Modifying Create React App rules.`);
  const craRules = processCraConfig(craWebpackConfig, options);

  // CRA uses the `ModuleScopePlugin` to limit suppot to the `src` directory.
  // Here, we select the plugin and modify its configuration to include Storybook config directory.
  const plugins = [] as any;

  // NOTE: These are set by default in Storybook 6.
  const isStorybook6 = semver.gte(options.packageJson.version || '', '6.0.0');
  const {
    typescriptOptions = {
      reactDocgen: 'react-docgen-typescript',
      reactDocgenTypescriptOptions: {},
    },
  } = options;
  const tsDocgenPlugin =
    !isStorybook6 && typescriptOptions.reactDocgen === 'react-docgen-typescript'
      ? [
          new ReactDocgenTypescriptPlugin(
            typescriptOptions.reactDocgenTypescriptOptions,
          ),
        ]
      : [];

  // Return the new config.
  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [...(filteredRules || []), ...craRules],
    },
    // NOTE: this prioritizes the storybook version of a plugin
    // when there are duplicates between SB and CRA
    plugins: mergePlugins(
      ...(webpackConfig.plugins || []),
      ...(craWebpackConfig.plugins ?? []),
      ...tsDocgenPlugin,
    ),
    resolve: {
      ...webpackConfig.resolve,
      extensions: craWebpackConfig.resolve?.extensions,
      modules: [
        ...((webpackConfig.resolve && webpackConfig.resolve.modules) || []),
        join(REACT_SCRIPTS_PATH, 'node_modules'),
        ...getModulePath(CWD),
      ],
      plugins: [...plugins, PnpWebpackPlugin] as ResolvePlugin[],
    },
    resolveLoader,
  };
};
