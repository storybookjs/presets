const { createCodeNode } = require('./helpers');

function md(options = {}) {
  const { showStoryCode = true, storyLang = 'html' } = options;

  return tree => {
    if (!showStoryCode) {
      return tree;
    }

    const newTree = {
      ...tree,
      children: [],
    };

    for (const childNode of tree.children) {
      if (childNode.type !== 'html') {
        newTree.children.push(childNode);
        continue;
      }

      newTree.children.push(childNode);
      newTree.children.push(createCodeNode(childNode.value, storyLang));
    }

    return newTree;
  };
}

module.exports = md;
