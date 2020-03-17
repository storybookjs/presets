import { logger } from '@storybook/node-logger';
import { Options } from '../options';

export const isCompatible = (
  { framework }: Options,
  shouldLog = false,
): boolean => {
  if (framework === 'angular') {
    if (shouldLog) {
      logger.warn(
        `\`@storybook/preset-typescript\` is not needed when using Storybook for Angular. No changes will be made`,
      );
    }
    return false;
  }
  return true;
};
