function webpack(webpackConfig = {}, options = {}) {
  const { module = {}, resolve = {} } = webpackConfig;
  const { loaderOptions } = options;

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
          ],
        },
      ],
    },
    resolve: {
      ...resolve,
      extensions: [...(resolve.extensions || []), '.ts', '.tsx'],
    },
  };
}

module.exports = { webpack };
