const path = require('path');
const fs = require('fs-extra');
const mdx = require('@mdx-js/mdx');
const plugin = require('./storybook-syntax-md-plugin');

describe('storybook-syntax-md-plugin', () => {
  it('transforms comments to special syntax', async () => {
    const content = await fs.readFile(path.resolve(__dirname, './.storybook/index.mdx'), 'utf8');

    const result = mdx.sync(content, {
      mdPlugins: [plugin]
    });

    expect(result).toMatchSnapshot();
  });
});