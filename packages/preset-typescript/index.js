function extend(webpackConfig = {}) {
  const { module = {}, resolve = {} } = webpackConfig;

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
