module.exports = [
  {
    name: '@storybook/preset-ant-design',
    options: {
      lessOptions: {
        modifyVars: {
          'primary-color': 'red',
          'border-radius-base': '2px',
        },
      },
    },
  },
];
