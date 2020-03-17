import { join, resolve } from 'path';
import { logger } from '@storybook/node-logger';
import { Preset, Options } from '../options';

const incompatiblePresets = [
  '@storybook/preset-scss',
  '@storybook/preset-typescript',
];

export const checkPresets = (options: Options): void => {
  let presetsList: Preset[] = options.presetsList || [];

  // Look for a legacy presets file if one exists.
  if (!options.presetsList) {
    try {
      const configDir = resolve(options.configDir);
      // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
      presetsList = require(join(configDir, 'presets.js'));
    } catch (e) {
      // NOOP
    }
  }

  presetsList.forEach((preset: string | { name: string }) => {
    const presetName = typeof preset === 'string' ? preset : preset.name;
    if (incompatiblePresets.includes(presetName)) {
      logger.warn(
        `\`${presetName}\` may not be compatible with \`@storybook/preset-create-react-app\``,
      );
    }
  });
};
