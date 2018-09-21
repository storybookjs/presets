const highlight = require('remark-highlight.js');

module.exports = [
  {
    name: '@storybook/preset-mdx',
    options: {
      mdxOptions: {
        showStoryCode: true,
        includeStoryHeadings: true,
      },
      mdxLoaderOptions: {
        mdPlugins: [highlight],
      }
    }
  }
];
