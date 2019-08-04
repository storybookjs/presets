import { configure } from '@storybook/react';

const req = require.context('./test-files', true, /.stories.(j|t)sx?$/);
function loadStories () {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
