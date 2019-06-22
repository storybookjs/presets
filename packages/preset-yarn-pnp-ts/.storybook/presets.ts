const path = require('path');

module.exports = [
  {
    name: '@storybook/preset-typescript',
    options: {
      tsDocgenLoaderOptions: {
        tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
      },
      include: [path.resolve(__dirname)],
    },
  },
  '@storybook/preset-yarn-pnp-ts',
];
