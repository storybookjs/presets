const classNamePrefix = 'storybook-mdx';

function createClassName(className) {
  return `${classNamePrefix}-${className}`;
}

function applyClassName(node) {
  const { properties } = node;

  const storybookTagClassName = createClassName(node.tagName);

  if (!properties.className) {
    properties.className = [storybookTagClassName];
  }
  else if (typeof properties.className === 'string') {
    properties.className += ' ' + storybookTagClassName;
  }
  else if (Array.isArray(properties.className)) {
    properties.className = [
      ...properties.className,
      ...properties.className.map(createClassName),
      storybookTagClassName
    ];
  }
}

function shouldSkipNode(node) {
  if (node.type !== 'element') {
    return true;
  }

  return node.tagName === 'storybook';
}

function visit(nodes) {
  if (!nodes || !nodes.length) {
    return;
  }

  for (const childNode of nodes) {
    if (shouldSkipNode(childNode)) {
      continue;
    }

    applyClassName(childNode);

    visit(childNode.children);
  }
}

function hast() {
  return function (tree) {
    visit(tree.children);
  }
}

module.exports = hast;