🚨 DEPRECATED: This package in unmaintained and deprecated in favor of [`@storybook/addon-styling-webpack`](https://storybook.js.org/addons/@storybook/addon-styling-webpack)

# SCSS preset for Storybook

One-line SCSS configuration for storybook.

## Basic usage

```
yarn add -D @storybook/preset-scss css-loader@5.2.6 sass sass-loader@10.1.1 style-loader@2.0.0
```

Then add the following to `.storybook/main.js`:

```js
module.exports = {
  addons: ['@storybook/preset-scss'],
};
```

## Advanced usage

You can pass configurations by using Object addon declaration for `@storybook/preset-scss` and adding the configurations under the `options` key. You can pass configurations into the preset's webpack loaders using `styleLoaderOptions`, `cssLoaderOptions`, and `sassLoaderOptions` keys. See documentation for each respective loader to learn about valid options. You can register other addons through the string declaration as normal.

```js
module.exports = {
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
           modules: true,
           localIdentName: '[name]__[local]--[hash:base64:5]',
        }
      }
    },
    // You can add other presets/addons by using the string declaration
    '@storybook/preset-typescript',
    '@storybook/addon-actions',
  ]
}
```
