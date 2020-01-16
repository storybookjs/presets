# Ant Design preset for Storybook

One-line Ant Design configuration for Storybook.

## Basic usage

```
yarn add -D @storybook/preset-ant-design
```

Then add the following to `.storybook/presets.js`:

```js
module.exports = ['@storybook/preset-ant-design'];
```

If used with `preset-create-react-app`, Make sure override the default file loader.

```json
{
  name: '@storybook/preset-create-react-app',
  options: {
    craOverrides: {
      fileLoaderExcludes: ['less']
    }
  }
}
```

## Advanced usage

You can customize theme variable by passing `modifyVars` options into less loader in`.storybook/presets.js`, e.g.:

```js
module.exports = [
  {
    name: '@storybook/preset-ant-design',
    options: {
      lessOptions: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'border-radius-base': '2px',
        },
      },
    },
  },
];
```
