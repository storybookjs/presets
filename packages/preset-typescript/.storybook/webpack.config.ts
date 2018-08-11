import { Configuration } from 'webpack';
const presetTypescript = require('../');

module.exports = (config: Configuration) => {
  return presetTypescript(config);
};
