module.exports = [
  {
    name: '@storybook/preset-create-react-app',
    options: {
      tsDocgenLoaderOptions: {},
    },
  },
  {
    name: require.resolve('@storybook/addon-docs/react/preset'),
    options: {
      configureJSX: true,
      sourceLoaderOptions: null,
    },
  },
];
