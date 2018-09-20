const path = require('path');
const mdxToJsx = require('@mdx-js/mdx/mdx-hast-to-jsx.js');

function toStory(node, options) {
  if (node.type === 'root') {
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
        if (childNode.type === 'text' && childNode.value === '\n' && !currentStory.children.length) {
          continue;
        }

        currentStory.children.push(childNode);
      }
    }

    return (
      `import { storiesOf } from '@storybook/react';
      ${importNodes.map(childNode => mdxToJsx.toJSX(childNode, {}, options)).join('\n')}
      ${exportNodes.map(childNode => mdxToJsx.toJSX(childNode, {}, options)).join('\n')}
      ${generateStories(stories, { ...options, skipExport: true }).join('\n')}`
    );
  }

  return mdxToJsx.toJSX(node, {}, options);
}

function generateStories(stories, options) {
  const groupedStories = stories.reduce((acc, obj) => {
    const { storyKind, children } = obj;

    if(!children.length) {
      return acc;
    }

    acc[storyKind] = acc[storyKind] || [];
    acc[storyKind].push(obj);
    return acc;
  }, {});

  return Object
    .keys(groupedStories)
    .map(storyKind =>
      `storiesOf('${storyKind}', module)
        ${groupedStories[storyKind].map(story => generateStory(story, options)).join('\n')};`);
}

function generateStory(story, options) {
  const { storyName } = story;

  return (
    `.add('${storyName}', () => {
      const components = [];
      return (${mdxToJsx.toJSX(story, {}, options)});
    })`
  );
}

function compiler(options = {}) {
  this.Compiler = tree => toStory(tree, options)
}

module.exports = {
  compiler,
};
