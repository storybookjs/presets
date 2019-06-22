import { configure } from '@storybook/react';

function loadStories() {
  require('./story');
}

configure(loadStories, module);
