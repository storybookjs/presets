module.exports = [
  {
    name: '@storybook/preset-ant-design',
    options: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': 'red',
          'border-radius-base': '2px',
        },
      },
    },
  },
];
