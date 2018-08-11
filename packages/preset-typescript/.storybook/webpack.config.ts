import { Configuration } from 'webpack'
const tsPreset = require('../');

module.exports = (config: Configuration) => {
  return tsPreset(config);
};
