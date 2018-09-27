const path = require('path');
const fs = require('fs-extra');
const mdx = require('@mdx-js/mdx');
const prettier = require('prettier');
const plugin = require('./storybook-syntax-md-plugin');

function format(code) {
  return prettier.format(code, {
    parser: 'babylon',
    printWidth: 100,
    tabWidth: 2,
    bracketSpacing: true,
    trailingComma: 'es5',
    singleQuote: true,
  });
}

describe('storybook-syntax-md-plugin', () => {
  it('transforms comments to special syntax', async () => {
    const content = await fs.readFile(path.resolve(__dirname, './.storybook/index.mdx'), 'utf8');

    const result = mdx.sync(content, {
      mdPlugins: [plugin],
    });

    const code = format(result);

    expect(code).toMatchSnapshot();
  });

  it('does not transform comments to special syntax when storybookApi !== annotations', async () => {
    const content = await fs.readFile(path.resolve(__dirname, './.storybook/index.mdx'), 'utf8');

    const result = mdx.sync(content, {
      mdPlugins: [[plugin, { storybookApi: 'foo' }]],
    });

    const code = format(result);

    expect(code).toMatchSnapshot();
  });
});
