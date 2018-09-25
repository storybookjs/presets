const highlight = require('remark-highlight.js');

module.exports = [
  {
    name: '@storybook/preset-mdx',
    options: {
      mdxOptions: {
        showStoryCode: true,
        storybookApi: 'annotations',
        // includeStoryHeadings: true,
        // storybookApi: 'headings',
      },
      mdxLoaderOptions: {
        mdPlugins: [highlight],
      }
    }
  }
];
