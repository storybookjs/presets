function isInvalidNewLine(childNode, currentStory) {
  return childNode.type === 'text' &&
    childNode.value === '\n' &&
    !currentStory.children.length;
}

function storybookImport() {
  return `import { storiesOf } from '@storybook/react'`;
}

module.exports = {
  isInvalidNewLine,
  storybookImport,
};
