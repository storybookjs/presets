import { existsSync } from 'fs';
import { join } from 'path';

const JSCONFIG = 'jsconfig.json';
const TSCONFIG = 'tsconfig.json';

const getModulePath = (appDirectory: string): string[] => {
  // CRA only supports `jsconfig.json` if `tsconfig.json` doesn't exist.
  let configName = '';
  if (existsSync(join(appDirectory, TSCONFIG))) {
    configName = TSCONFIG;
  } else if (existsSync(join(appDirectory, JSCONFIG))) {
    configName = JSCONFIG;
  }

  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
    const { baseUrl } = require(join(appDirectory, configName)).compilerOptions;
    return baseUrl ? [baseUrl] : [];
  } catch (e) {
    return [];
  }
};

export { getModulePath };
