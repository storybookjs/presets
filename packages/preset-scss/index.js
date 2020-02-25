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
  const {
    preLoaders = [],
    styleLoaderOptions,
    cssLoaderOptions,
    sassLoaderOptions,
    postLoaders = [],
    rule = {},
  } = options;

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
            ...postLoaders,
            ...wrapLoader('style-loader', styleLoaderOptions),
            ...wrapLoader('css-loader', cssLoaderOptions),
            ...wrapLoader('sass-loader', sassLoaderOptions),
            ...preLoaders,
          ],
        },
      ],
    },
  };
}

module.exports = { webpack };
