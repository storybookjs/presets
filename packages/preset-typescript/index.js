const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require("path");
const includePaths = [path.resolve('./')];
const excludePaths = [path.resolve('./node_modules')];

function webpack(webpackConfig = {}, options = {}) {
  const { module = {}, resolve = {}, plugins = [] } = webpackConfig;
  const {
    tsLoaderOptions = { transpileOnly: true },
    tsDocgenLoaderOptions = {},
    forkTsCheckerWebpackPluginOptions,
    include = includePaths,
    exclude = excludePaths
  } = options;

  if (tsLoaderOptions.transpileOnly) {
    plugins.push(
      new ForkTsCheckerWebpackPlugin(forkTsCheckerWebpackPluginOptions),
    );
  }

  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [
        ...(module.rules || []),
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: require.resolve('ts-loader'),
              options: tsLoaderOptions,
            },
            {
              loader: require.resolve('react-docgen-typescript-loader'),
              options: tsDocgenLoaderOptions,
            },
          ],
          include,
          exclude
        },
      ],
    },
    resolve: {
      ...resolve,
      extensions: [...(resolve.extensions || []), '.ts', '.tsx'],
    },
  };
}

function managerWebpack(webpackConfig = {}, options = {}) {
  const { module = {}, resolve = {}, plugins = [] } = webpackConfig;
  const {
    tsLoaderOptions = { transpileOnly: true },
    forkTsCheckerWebpackPluginOptions,
    include = includePaths,
    exclude = excludePaths,
    transpileManager = false,
  } = options;

  if (!transpileManager) {
    return webpackConfig;
  }

  if (tsLoaderOptions.transpileOnly) {
    plugins.push(
      new ForkTsCheckerWebpackPlugin({ forkTsCheckerWebpackPluginOptions }),
    );
  }

  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [
        ...(module.rules || []),
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: require.resolve('ts-loader'),
              options: tsLoaderOptions,
            },
          ],
          include,
          exclude
        },
      ],
    },
    resolve: {
      ...resolve,
      extensions: [...(resolve.extensions || []), '.ts', '.tsx'],
    },
  };
}

module.exports = { webpack, managerWebpack };
