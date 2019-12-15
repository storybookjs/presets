module.exports = {
  stories: ['../src/**/*.stories.(js|jsx|mdx)'],
  presets: [
    '@storybook/preset-create-react-app',
    {
      name: '@storybook/addon-docs/preset',
      options: {
        configureJSX: true,
      },
    },
  ],
};
