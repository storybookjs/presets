const webpack = (webpackConfig = {}, options = { lessOptions: {} }) => {
  const { module = {} } = webpackConfig;
  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [
        ...(module.rules || []),
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions : {
                  ...options.lessOptions,
                  javascriptEnabled: true,
                }
              },
            },
          ],
        },
      ],
    },
  };
};

const babel = (config = {}) => {
  const { plugins = [] } = config;
  return {
    ...config,
    plugins: [
      ...plugins,
      [
        'import',
        {
          libraryName: 'antd',
          style: true,
        },
      ],
    ],
  };
};

module.exports = { webpack, babel };
