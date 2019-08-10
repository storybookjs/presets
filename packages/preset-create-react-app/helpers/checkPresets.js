const path = require('path');
const { logger } = require('@storybook/node-logger');

const incompatiblePresets = ['@storybook/preset-scss', '@storybook/preset-typescript'];

const checkPresets = configDir => {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const presets = require(path.join(configDir, 'presets.js'));

    presets.forEach(preset => {
      const presetName = preset.name || preset;
      if (incompatiblePresets.includes(presetName)) {
        logger.warn(
          `\`${presetName}\` may not be compatible with \`@storybook/preset-create-react-app\``
        );
      }
    });
  } catch (e) {
    // NOOP
  }
};

module.exports = checkPresets;
