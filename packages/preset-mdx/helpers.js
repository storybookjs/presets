const path = require('path');

function isInvalidNewLine(childNode, currentStory) {
  return childNode.type === 'text' && childNode.value === '\n' && !currentStory.children.length;
}

function getHeadingText(node) {
  return node.children[0].value;
}

function storybookImport() {
  return `import { storiesOf } from '@storybook/react'`;
}

function createCodeNode(code, language = 'js') {
  return {
    type: 'code',
    lang: language,
    value: code,
  };
}

function getDefaultStoryKind(mdxOptions = {}, options = {}) {
  const { filepath } = options;
  const { defaultStoryKind } = mdxOptions;

  if (typeof defaultStoryKind === 'function') {
    return defaultStoryKind({ filepath });
  }

  return path.basename(filepath);
}

function getDefaultStoryName(mdxOptions = {}, options = {}) {
  const { filepath } = options;
  const { defaultStoryName } = mdxOptions;

  if (typeof defaultStoryName === 'function') {
    return defaultStoryName({ filepath });
  }

  if (typeof defaultStoryName === 'string') {
    return defaultStoryName;
  }

  return 'Default';
}

function isStorybookAnnotation({ value }) {
  if (!value) {
    return false;
  }

  return value.match(/^<!--\s*(storyKind|storyName)\s*=.*\s*-->$/);
}

function createAnnotationNode(node) {
  const [annotationKey, annotationValue] = node.value
    .replace(/(<!--|-->)/g, '')
    .trim()
    .split('=')
    .map(part => part.trim());

  return {
    type: 'element',
    children: [
      {
        type: 'text',
        value: node.value,
      },
    ],
    value: node.value,
    data: {
      hName: 'storybook',
      hProperties: {
        annotationKey,
        annotationValue,
      },
    },
  };
}

module.exports = {
  isInvalidNewLine,
  isStorybookAnnotation,
  storybookImport,
  createCodeNode,
  createAnnotationNode,
  getHeadingText,
  getDefaultStoryKind,
  getDefaultStoryName,
};
