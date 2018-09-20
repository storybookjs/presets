function isInvalidNewLine(childNode, currentStory) {
  return childNode.type === 'text' &&
    childNode.value === '\n' &&
    !currentStory.children.length;
}

function storybookImport() {
  return `import { storiesOf } from '@storybook/react'`;
}

function createNewLineNode() {
  return {
    type: 'text',
    value: '\n',
  };
}

function createCodeNode(code, language = 'js') {
  return {
    type: 'element',
    tagName: 'pre',
    properties: {},
    children: [
      {
        type: 'element',
        tagName: 'code',
        properties: {
          className: [`language-${language}`]
        },
        children: [
          {
            type: 'text',
            value: code,
          }
        ]
      }
    ]
  }
}

module.exports = {
  isInvalidNewLine,
  storybookImport,
  createCodeNode,
  createNewLineNode,
};
