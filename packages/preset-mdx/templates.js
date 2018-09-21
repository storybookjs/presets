const mdxToJsx = require('@mdx-js/mdx/mdx-hast-to-jsx.js');

function groupStories(stories, mdxOptions) {
  const { includeStoryHeadings = false } = mdxOptions;

  return stories.reduce((acc, obj) => {
    const { storyKind, children, storyKindHeading, storyNameHeading } = obj;

    if (!children.length) {
      return acc;
    }

    if (includeStoryHeadings && storyNameHeading) {
      children.unshift(storyNameHeading);
    }

    if (includeStoryHeadings && storyKindHeading) {
      children.unshift(storyKindHeading);
    }

    acc[storyKind] = acc[storyKind] || [];
    acc[storyKind].push(obj);
    return acc;
  }, {});
}

function generateStories(stories, mdxOptions, options) {
  const groupedStories = groupStories(stories, mdxOptions);

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