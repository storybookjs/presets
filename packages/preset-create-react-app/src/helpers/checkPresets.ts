import { join } from 'path';
import { logger } from '@storybook/node-logger';

const incompatiblePresets = [
  '@storybook/preset-inline-svg',
  '@storybook/preset-scss',
  '@storybook/preset-typescript',
];

const checkPresets = (configDir: string): void => {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
    const presets = require(join(configDir, 'presets.js'));

    // TODO: Create a shared type for presets.
    presets.forEach((preset: string | { name: string }) => {
      const presetName = typeof preset === 'string' ? preset : preset.name;
      if (incompatiblePresets.includes(presetName)) {
        logger.warn(
          `\`${presetName}\` may not be compatible with \`@storybook/preset-create-react-app\``,
        );
      }
    });
  } catch (e) {
    // NOOP
  }
};

export { checkPresets };
