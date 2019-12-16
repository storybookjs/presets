const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function webpack(webpackConfig = {}, options = {}) {
  const { module = {}, resolve = {}, plugins = [] } = webpackConfig;
  const {
    tsLoaderOptions = { transpileOnly: true },
    tsDocgenLoaderOptions = {},
    forkTsCheckerWebpackPluginOptions,
    include = [],
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
    include,
    forkTsCheckerWebpackPluginOptions,
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
