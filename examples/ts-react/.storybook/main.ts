// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path');

module.exports = {
  stories: ['../src/**/*.stories.(tsx|mdx)'],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        forkTsCheckerWebpackPluginOptions: {
          colors: false, // disables built-in colors in logger messages
        },
        include: [resolve('../src')],
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
  ],
};
