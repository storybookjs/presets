const mdxToJsx = require('@mdx-js/mdx/mdx-hast-to-jsx');
const extractRootNodeParts = require('./extractRootNodeParts');
const { generateStories, generateJsx } = require('./templates');
const { storybookImport } = require('./helpers');

function toStory(node, options, mdxOptions) {
  if (node.type !== 'root') {
    return mdxToJsx.toJSX(node, {}, options);
  }

  const {
    importNodes,
    exportNodes,
    stories
  } = extractRootNodeParts(node, mdxOptions, options);

  return [
    storybookImport(),
    ...generateJsx(importNodes, options),
    ...generateJsx(exportNodes, options),
    ...generateStories(stories, mdxOptions, {...options, skipExport: true}),
  ].join('\n');
}

module.exports = toStory;
