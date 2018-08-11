function extend(webpackConfig = {}, options = {}) {
  const { module = {}, resolve = {} } = webpackConfig;
  const { tsLoader } = options;

  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [
        ...(module.rules || []),
        {
          test: /\.tsx?$/,
          use: [{
            loader: require.resolve('ts-loader'),
            options: tsLoader,
          }]
        }
      ]
    },
    resolve: {
      ...resolve,
      extensions: [
        ...(resolve.extensions || []),
        '.ts',
        '.tsx',
      ]
    }
  };
}

module.exports = extend;
