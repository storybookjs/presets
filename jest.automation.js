const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  preset: 'jest-puppeteer',
  testMatch: ['**/*.automation.js'],
};
