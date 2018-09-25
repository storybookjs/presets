const {
  isInvalidNewLine,
  getHeadingText,
  getDefaultStoryKind,
  getDefaultStoryName,
} = require('./helpers');

function handleHeadingsApi(options) {
  const {
    storybookApi,
    defaultStory,
    childNode,
    currentStory,
    stories,
  } = options;

  if (storybookApi !== 'headings') {
    return false;
  }

  // Try to find story kind. Default is the mdx file name
  if (childNode.tagName === 'h1') {
    const newStory = {
      ...defaultStory,
      storyKind: getHeadingText(childNode),
      storyKindHeading: childNode,
      children: [],
    };

    stories.push(newStory);

    return newStory;
  }

  // Try to find story name. Default is the "Default" =)
  if (childNode.tagName === 'h2') {
    let newStory = currentStory;

    if (!currentStory.children.length) {
      newStory.storyName = getHeadingText(childNode);
      newStory.storyNameHeading = childNode;
    }
    else {
      newStory = {
        ...defaultStory,
        storyKind: currentStory.storyKind,
        storyKindHeading: currentStory.storyKindHeading,
        storyName: getHeadingText(childNode),
        storyNameHeading: childNode,
        children: [],
      };

      stories.push(newStory);
    }

    return newStory;
  }

  return false;
}

function handleAnnotationsApi(options) {
  const {
    storybookApi,
    defaultStory,
    childNode,
    currentStory,
    stories,
  } = options;

  if (storybookApi !== 'annotations') {
    return false;
  }

  if (childNode.tagName !== 'storybook') {
    return false
  }

  const { annotationKey, annotationValue } = childNode.properties;

  if (annotationKey === 'storyKind') {
    const newStory = {
      ...defaultStory,
      storyKind: annotationValue,
      children: [],
    };

    stories.push(newStory);

    return newStory;
  }

  if (annotationKey === 'storyName') {
    let newStory = currentStory;

    if (!currentStory.children.length) {
      newStory.storyName = annotationValue;
    }
    else {
      newStory = {
        ...defaultStory,
        storyKind: currentStory.storyKind,
        storyName: annotationValue,
        children: [],
      };

      stories.push(newStory);
    }

    return newStory;
  }

  return false;
}

function extractRootNodeParts(node, mdxOptions, options) {
  const importNodes = [];
  const exportNodes = [];
  const stories = [];

  const { storybookApi = 'annotations' } = mdxOptions;

  const defaultStory = {
    storyKind: getDefaultStoryKind(mdxOptions, options),
    storyName: getDefaultStoryName(mdxOptions, options),
    type: 'root',
  };

  let currentStory = {
    ...defaultStory,
    children: [],
  };

  // Default story, in case there is no any storybook annotation
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

    if (childNode.type === 'element') {
      const apiOptions = { storybookApi, defaultStory, childNode, currentStory, stories };
      const newStory = handleHeadingsApi(apiOptions) || handleAnnotationsApi(apiOptions);

      if (newStory !== false) {
        currentStory = newStory;
        continue;
      }
    }

    if (currentStory) {
      if (isInvalidNewLine(childNode, currentStory)) {
        continue;
      }

      currentStory.children.push(childNode);
    }
  }

  return {
    importNodes,
    exportNodes,
    stories,
  };
}

module.exports = extractRootNodeParts;
