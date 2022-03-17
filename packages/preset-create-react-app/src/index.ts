import { join, relative, dirname } from 'path';
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
import { PluginOptions, CoreConfig } from './types';

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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const core = (existing: { disableWebpackDefaults: boolean }) => ({
  ...existing,
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
export const webpack = async (
  webpackConfig: Configuration = {},
  options: PluginOptions,
): Promise<Configuration> => {
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

  // Select the relevant CRA rules and add the Storybook config directory.
  logger.info(`=> Modifying Create React App rules.`);
  const craRules = processCraConfig(craWebpackConfig, options);

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

  // NOTE: This is code replicated from
  //   https://github.com/storybookjs/storybook/blob/89830ad76384faeaeb0c19df3cb44232cdde261b/lib/builder-webpack5/src/preview/base-webpack.config.ts#L45-L53
  // as we are not applying SB's default webpack config here.
  // We need to figure out a better way to apply various layers of webpack config; perhaps
  // these options need to be in a separate preset.
  const isProd = webpackConfig.mode !== 'development';
  const coreOptions = await options.presets.apply<CoreConfig>('core');
  const builderOptions = coreOptions?.builder?.options;
  const cacheConfig = builderOptions?.fsCache
    ? { cache: { type: 'filesystem' } }
    : {};
  const lazyCompilationConfig =
    builderOptions?.lazyCompilation && !isProd
      ? { experiments: { lazyCompilation: { entries: false } } }
      : {};

  // Return the new config.
  return {
    ...webpackConfig,
    ...cacheConfig,
    ...lazyCompilationConfig,
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
      plugins: [PnpWebpackPlugin as unknown as ResolvePlugin],
    },
    resolveLoader,
  };
};
