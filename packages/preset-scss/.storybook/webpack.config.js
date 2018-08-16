const presetScss = require('@storybook/preset-scss');

module.exports = (config) => {
  return presetScss.extendWebpack(config, {
    cssLoaderOptions: {
      modules: true,
      localIdentName: '[name]__[local]--[hash:base64:5]'
    }
  });
};
