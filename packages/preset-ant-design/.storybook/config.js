import { configure } from '@storybook/react';

const loadStories = () => {
  require('./story');
};

configure(loadStories, module);
