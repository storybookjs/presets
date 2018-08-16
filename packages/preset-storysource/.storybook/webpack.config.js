const presetStorySource = require('@storybook/preset-storysource');

module.exports = (config) => {
  return presetStorySource.extendWebpack(config, {
    rule: { test: /story\.js/ }
  });
};
