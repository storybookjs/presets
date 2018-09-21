function isInvalidNewLine(childNode, currentStory) {
  return childNode.type === 'text' &&
    childNode.value === '\n' &&
    !currentStory.children.length;
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

module.exports = {
  isInvalidNewLine,
  storybookImport,
  createCodeNode,
};
