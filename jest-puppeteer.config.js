module.exports = {
  launch: {
    headless: process.env.HEADLESS !== 'false',
  },
  server: {
    command: 'yarn workspace @storybook/preset-create-react-app storybook --ci -p 4444',
    port: 4444,
    launchTimeout: 30000,
  },
};
