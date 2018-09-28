const path = require('path');
const fs = require('fs-extra');
const mdx = require('@mdx-js/mdx');
const prettier = require('prettier');
const plugin = require('./storybook-mdx-compiler-plugin');

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

describe('storybook-mdx-compiler-plugin', () => {
  describe('annotations api', () => {
    it('generates stories from the mdx', async () => {
      const filePath = path.resolve(__dirname, './test.mdx');
      const content = await fs.readFile(filePath, 'utf8');

      const result = mdx.sync(content, {
        filepath: filePath,
        compilers: [plugin({})],
      });

      const code = format(result);

      expect(code).toMatchSnapshot();
    });
  });

  describe('headings api', () => {
    it('generates stories from the mdx', async () => {
      const filePath = path.resolve(__dirname, './test.mdx');
      const content = await fs.readFile(filePath, 'utf8');

      const result = mdx.sync(content, {
        filepath: filePath,
        compilers: [plugin({ storybookApi: 'headings' })],
      });

      const code = format(result);

      expect(code).toMatchSnapshot();
    });

    it('generates stories from the mdx and includeStoryHeadings = true', async () => {
      const filePath = path.resolve(__dirname, './test.mdx');
      const content = await fs.readFile(filePath, 'utf8');

      const result = mdx.sync(content, {
        filepath: filePath,
        compilers: [plugin({ storybookApi: 'headings', includeStoryHeadings: true })],
      });

      const code = format(result);

      expect(code).toMatchSnapshot();
    });
  });
});
