import { existsSync } from 'fs';
import { join } from 'path';

const JSCONFIG = 'jsconfig.json';
const TSCONFIG = 'tsconfig.json';

const getModulePath = (appDirectory: string) => {
  // CRA only supports `jsconfig.json` if `tsconfig.json` doesn't exist.
  let configName = '';
  if (existsSync(join(appDirectory, TSCONFIG))) {
    configName = TSCONFIG;
  } else if (existsSync(join(appDirectory, JSCONFIG))) {
    configName = JSCONFIG;
  }

  try {
    const { baseUrl } = require(join(appDirectory, configName)).compilerOptions;
    return baseUrl ? [baseUrl] : [];
  } catch (e) {
    return [];
  }
};

export default getModulePath;
