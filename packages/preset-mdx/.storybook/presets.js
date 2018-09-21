const highlight = require('remark-highlight.js');

module.exports = [
  {
    name: '@storybook/preset-mdx',
    options: {
      mdxLoaderOptions: {
        mdPlugins: [highlight],
      }
    }
  }
];
