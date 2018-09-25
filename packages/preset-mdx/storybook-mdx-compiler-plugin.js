const toStory = require('./mdx-hast-to-story');

function createCompiler(mdxOptions) {
  return function compiler(options = {}) {
    this.Compiler = tree => toStory(tree, options, mdxOptions)
  }
}

module.exports = createCompiler;
