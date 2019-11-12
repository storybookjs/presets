module.exports = [
  {
    name: '@storybook/preset-scss',
    options: {
      cssLoaderOptions: {
        modules: true,
        localIdentName: '[name]__[local]--[hash:base64:5]',
      },
    },
  },
];
