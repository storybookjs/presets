function webpack(webpackConfig = {}, options = {}) {
  const { module = {}, resolve = {} } = webpackConfig;
  const { tsLoaderOptions, tsDocgenLoaderOptions, include } = options;

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

module.exports = { webpack };
