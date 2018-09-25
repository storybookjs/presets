const {
  isStorybookAnnotation,
  createAnnotationNode,
} = require('./helpers');

const tokenizeStorybookSyntax = (eat, value) => {
  const index = value.indexOf('\n');

  const node = {
    value: value.slice(0, index),
  };

  if (isStorybookAnnotation(node)) {
    return eat(node.value)(createAnnotationNode(node))
  }
};

function applyStorybookSyntax(parser) {
  const { blockMethods, blockTokenizers } = parser.prototype;

  blockTokenizers.storybook = tokenizeStorybookSyntax;
  blockMethods.splice(blockMethods.indexOf('html'), 0, 'storybook');
}

function md(options = {}) {
  const { storybookApi = 'annotations' } = options;

  if (storybookApi !== 'annotations')
    return;

  applyStorybookSyntax(this.Parser);
}

module.exports = md;
