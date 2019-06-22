async function webpack(webpackConfig = {}, options = {}) {
  const { module = {}, resolve = {} } = webpackConfig;
  const { tsLoaderOptions, tsDocgenLoaderOptions, include, presets } = options;

  const loaderOptions = await presets.apply('tsLoaderOptions', tsLoaderOptions, { presets });

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
              options: loaderOptions,
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
  const { module = {}, resolve = {} } = webpackConfig;
  const { tsLoaderOptions, include, transpileManager = false } = options;

  if (!transpileManager) {
    return webpackConfig;
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
