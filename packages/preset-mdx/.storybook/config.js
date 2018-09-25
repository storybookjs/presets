import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withActions } from '@storybook/addon-actions';

import '@storybook/preset-mdx/markdown.css';
import 'highlight.js/styles/github.css';

addDecorator(withActions());

function loadStories() {
  require('./index.mdx');

  const req = require.context('./', true, /\.stories\.mdx$/);
  req.keys().forEach(examplePath => req(examplePath));
}

configure(loadStories, module);
