const presetStorySource = require('@storybook/preset-storysource');

module.exports = (config) => {
  return presetStorySource(config, {
    rule: { test: /story\.js/ }
  });
};
