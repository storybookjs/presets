const { resolve } = require('path');

module.exports = [
  {
    name: '@storybook/preset-typescript',
    options: {
      tsDocgenLoaderOptions: {
        tsconfigPath: resolve(__dirname, '../tsconfig.json'),
      },
      forkTsCheckerWebpackPluginOptions: {
        colors: false, // disables built-in colors in logger messages
      },
      include: [resolve(__dirname)],
    },
  },
];
