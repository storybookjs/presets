const fs = require('fs');
const path = require('path');

const JSCONFIG = 'jsconfig.json';
const TSCONFIG = 'tsconfig.json';

const getModulePath = appDirectory => {
  // CRA only supports `jsconfig.json` if `tsconfig.json` doesn't exist.
  let configName;
  if (fs.existsSync(path.join(appDirectory, TSCONFIG))) {
    configName = TSCONFIG;
  } else if (fs.existsSync(path.join(appDirectory, JSCONFIG))) {
    configName = JSCONFIG;
  }

  try {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const { baseUrl } = require(path.join(appDirectory, configName)).compilerOptions;
    return baseUrl ? [baseUrl] : [];
  } catch (e) {
    return [];
  }
};

module.exports = getModulePath;
