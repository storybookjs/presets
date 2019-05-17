const path = require('path');

module.exports = [
  {
    name: '@storybook/preset-typescript',
    options: {
      include: [path.resolve(__dirname)],
    },
  },
];
