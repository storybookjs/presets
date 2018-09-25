import React from 'react';
import { configure } from '@storybook/react';

import 'highlight.js/styles/github.css';

function loadStories() {
  require('./index.mdx');

  const req = require.context('./', true, /\.stories\.mdx$/);
  req.keys().forEach(examplePath => req(examplePath));
}

configure(loadStories, module);
