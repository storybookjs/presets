module.exports = {
  stories: ['../src/**/*.stories.(js|jsx|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
  ],
};
