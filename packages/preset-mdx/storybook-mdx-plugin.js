const path = require('path');
const mdxToJsx = require('@mdx-js/mdx/mdx-hast-to-jsx');
const { generateStories, generateJsx } = require('./templates');

const {
  isInvalidNewLine,
  storybookImport,
  createCodeNode,
} = require('./helpers');

function toStory(node, options) {
  if (node.type === 'root') {
    const {
      importNodes,
      exportNodes,
      stories
    } = getRootParts(node, options);

    return [
      storybookImport(),
      ...generateJsx(importNodes, options),
      ...generateJsx(exportNodes, options),
      ...generateStories(stories, { ...options, skipExport: true }),
    ].join('\n');
  }

  return mdxToJsx.toJSX(node, {}, options);
}

function getRootParts(node, options) {
  const { filepath } = options;
  const importNodes = [];
  const exportNodes = [];
  const stories = [];

  const defaultStory = {
    storyKind: path.basename(filepath),
    storyName: 'Default',
    type: 'root',
  };

  let currentStory = {
    ...defaultStory,
    children: [],
  };

  // default story, in case there is not H1 and H2 in the mdx
  stories.push(currentStory);

  for (const childNode of node.children) {
    if (childNode.type === 'import') {
      importNodes.push(childNode);
      continue
    }

    if (childNode.type === 'export') {
      exportNodes.push(childNode);
      continue
    }

    if (childNode.type === 'element' && childNode.tagName === 'h1') {
      currentStory = {
        ...defaultStory,
        storyKind: childNode.children[0].value,
        children: [],
      };

      stories.push(currentStory);
      continue;
    }

    if (childNode.type === 'element' && childNode.tagName === 'h2') {
      if (!currentStory.children.length) {
        currentStory.storyName = childNode.children[0].value;
      }
      else {
        currentStory = {
          ...defaultStory,
          storyKind: currentStory.storyKind,
          storyName: childNode.children[0].value,
          children: [],
        };

        stories.push(currentStory);
      }

      continue;
    }

    if (currentStory) {
      if (isInvalidNewLine(childNode, currentStory)) {
        continue;
      }

      currentStory.children.push(childNode);
    }
  }

  return {
    importNodes,
    exportNodes,
    stories,
  };
}

function md(options = {}) {
  return function (tree) {
    const newTree = {
      ...tree,
      children: [],
    };

    for (const childNode of tree.children) {
      newTree.children.push(childNode);

      if (childNode.type === 'html') {
        newTree.children.push(createCodeNode(childNode.value));
      }
    }

    return newTree;
  }
}

function compiler(options = {}) {
  this.Compiler = tree => toStory(tree, options)
}

module.exports = {
  md,
  compiler,
};
