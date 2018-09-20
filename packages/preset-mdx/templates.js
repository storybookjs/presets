const mdxToJsx = require('@mdx-js/mdx/mdx-hast-to-jsx.js');

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

function generateJsx(nodes, options) {
  return nodes
    .map(childNode => mdxToJsx.toJSX(childNode, {}, options));
}

module.exports = {
  generateStories,
  generateJsx,
};