function extend(webpackConfig = {}, options = {}) {
  const { module = {} } = webpackConfig;
  const { loaderOptions, rule = {} } = options;

  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [
        ...(module.rules || []),
        {
          test: [/\.stories\.(jsx?$|tsx?$)/],
          ...rule,
          enforce: 'pre',
          use: [
            {
              loader: require.resolve('@storybook/addon-storysource/loader'),
              options: loaderOptions,
            }
          ]
        }
      ]
    }
  };
}

module.exports = extend;
