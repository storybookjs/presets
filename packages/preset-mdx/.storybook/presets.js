const highlight = require('remark-highlight.js');
const gridTables = require('remark-grid-tables');

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
        mdPlugins: [highlight, gridTables],
      }
    }
  }
];
