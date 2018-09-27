const path = require('path');
const fs = require('fs-extra');
const mdx = require('@mdx-js/mdx');
const prettier = require('prettier');
const plugin = require('./storybook-classnames-hast-plugin');

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

describe('storybook-classnames-hast-plugin', () => {
  it('adds "storybook-mdx-XX" class name to every element', async () => {
    const content = await fs.readFile(path.resolve(__dirname, './test.mdx'), 'utf8');

    const result = mdx.sync(content, {
      hastPlugins: [plugin],
    });

    const code = format(result);

    expect(code).toMatchSnapshot();
  });
});
