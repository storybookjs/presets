const { resolve } = require('path');

module.exports = {
  stories: ['./stories/*.stories.*'],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        forkTsCheckerWebpackPluginOptions: {
          colors: false, // disables built-in colors in logger messages
        },
        include: [resolve(__dirname)],
      },
    },
  ],
};
