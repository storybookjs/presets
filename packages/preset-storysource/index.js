function extendWebpack(webpackConfig = {}, options = {}) {
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

function extendPreview(preview = []) {
  return [
    ...preview,
    require.resolve('./addons.js'),
  ]
}

module.exports = { extendWebpack, extendPreview };
