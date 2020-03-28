module.exports = {
  stories: ['../src/**/*.stories.(ts|mdx)'],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        forkTsCheckerWebpackPluginOptions: {
          colors: false, // disables built-in colors in logger messages
        },
      },
    },
  ],
};
