const path = require('path');
const webpackMerge = require('webpack-merge');

function extendWebpack(webpackConfig = {}, options = {}) {

  const {
    webpackConfigPath = './webpack.config.js',
    webpackConfigIndex = 0,
    webpackConfigFnParams,
  } = options;

  const resolvedPath = path.resolve(webpackConfigPath);
  let localConfig = require(resolvedPath);

  if (typeof localConfig === 'function') {
    localConfig = localConfig(webpackConfigFnParams);
  }

  if(Array.isArray(localConfig)) {
    localConfig = localConfig[webpackConfigIndex];
  }

  return webpackMerge(webpackConfig, localConfig);
}

module.exports = { extendWebpack };
