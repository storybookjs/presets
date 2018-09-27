function wrapLoader(loader, options) {
  if (options === false) {
    return [];
  }

  return [
    {
      loader,
      options,
    },
  ];
}

function webpack(webpackConfig = {}, options = {}) {
  const { module = {} } = webpackConfig;
  const { styleLoaderOptions, cssLoaderOptions, sassLoaderOptions, rule = {} } = options;

  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [
        ...(module.rules || []),
        {
          test: /\.s[ca]ss$/,
          ...rule,
          use: [
            ...wrapLoader('style-loader', styleLoaderOptions),
            ...wrapLoader('css-loader', cssLoaderOptions),
            ...wrapLoader('sass-loader', sassLoaderOptions),
          ],
        },
      ],
    },
  };
}

module.exports = { webpack };
