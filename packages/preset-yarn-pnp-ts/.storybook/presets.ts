const path = require('path');

module.exports = [
  {
    name: '@storybook/preset-yarn-pnp-ts',
    options: {
      tsDocgenLoaderOptions: {
        tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
      },
      include: [path.resolve(__dirname)],
    },
  },
];
