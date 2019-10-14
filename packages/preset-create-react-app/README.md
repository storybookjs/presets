# Create React App preset for Storybook

One-line [Create React App](https://github.com/facebook/create-react-app) configuration for Storybook.

This preset is designed to use alongside [`@storybook/react`](https://github.com/storybookjs/storybook/tree/master/app/react).

## A note on custom Babel configs

We temporarily don't support using a custom Babel config with this preset. Support for this will be added shortly.

## Basic usage

```
yarn add -D @storybook/preset-create-react-app
```

Then add the following to `.storybook/presets.js`:

```js
module.exports = ['@storybook/preset-create-react-app'];
```

## Advanced usage

In most cases, this preset will find your `react-scripts` package, even if it's a fork of the offical `react-scripts`.

In the event that it doesn't, you can set the package's name with `scriptsPackageName`.

You can also enable and configure `react-docgen-typescript-loader`.

```js
module.exports = [
  {
    name: '@storybook/preset-create-react-app',
    options: {
      scriptsPackageName: '@my/react-scripts',
      tsDocgenLoaderOptions: {},
    },
  },
];
```
