const path = require('path');
const fs = require('fs-extra');
const mdx = require('@mdx-js/mdx');
const prettier = require('prettier');
const plugin = require('./storybook-code-example-md-plugin');

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

describe('storybook-code-example-md-plugin', () => {
  it('generates code example', async () => {
    const content = await fs.readFile(path.resolve(__dirname, './test.mdx'), 'utf8');

    const result = mdx.sync(content, {
      mdPlugins: [plugin],
    });

    const code = format(result);

    expect(code).toMatchSnapshot();
  });

  it('does not generate code examples when showStoryCode = false', async () => {
    const content = await fs.readFile(path.resolve(__dirname, './test.mdx'), 'utf8');

    const result = mdx.sync(content, {
      mdPlugins: [[plugin, { showStoryCode: false }]],
    });

    const code = format(result);

    expect(code).toMatchSnapshot();
  });
});
