function webpack(webpackConfig = {}, options = {}) {
  const { module = {}, resolve = {} } = webpackConfig;
  const { loaderOptions, include } = options;

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

module.exports = { webpack };
