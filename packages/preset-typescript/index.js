const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function webpack(webpackConfig = {}, options = {}) {
  const { module = {}, resolve = {}, plugins = [] } = webpackConfig;
  const {
    tsLoaderOptions = { transpileOnly: true },
    forkTsCheckerWebpackPluginOptions,
    include,
  } = options;

  if (tsLoaderOptions.transpileOnly) {
    plugins.push(
      new ForkTsCheckerWebpackPlugin(forkTsCheckerWebpackPluginOptions),
    );
  }

  if (options.framework === 'vue') {
    tsLoaderOptions.appendTsSuffixTo = [...(tsLoaderOptions.appendTsSuffixTo || []), /\.vue$/];
  }

  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: tsLoaderOptions,
      },
    ],
  };

  if (include) {
    tsLoader.include = include;
  }

  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [...(module.rules || []), tsLoader],
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
