const webpackFinal = (webpackConfig = {}, options = {}) => {
  const { module = {} } = webpackConfig;
  const { svgLoaderOptions } = options;
  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [
        ...(module.rules || []).map(rule => {
          const ruleTestString = rule.test.toString();
          if (/svg\|?/.test(ruleTestString)) {
            return {
              ...rule,
              test: new RegExp(
                ruleTestString
                  .replace(/svg\|?/, '') // Remove other svg rules
                  .replace(/\//, ''), // No "/" needed when creating a new RegExp
              ),
            };
          }
          return rule;
        }),
        {
          test: /\.svg$/i,
          use: [
            {
              loader: 'svg-inline-loader',
              options: svgLoaderOptions,
            },
          ],
        },
      ],
    },
  };
};

module.exports = { webpackFinal };
