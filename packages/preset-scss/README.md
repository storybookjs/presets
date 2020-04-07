# SCSS preset for Storybook

One-line SCSS configuration for storybook.

## Basic usage

```
yarn add -D @storybook/preset-scss css-loader sass-loader style-loader
```

Then add the following to `.storybook/presets.js`:

```js
module.exports = ['@storybook/preset-scss'];
```

## Advanced usage

You can pass configurations into the preset's webpack loaders using `styleLoaderOptions`, `cssLoaderOptions`, and `sassLoaderOptions` keys. See documentation for each respective loader to learn about valid options.

For example:

```js
module.exports = [
  {
    name: '@storybook/preset-scss',
    options: {
      cssLoaderOptions: {
        modules: true,
        localIdentName: '[name]__[local]--[hash:base64:5]',
      },
    },
  },
];
```

## Advanced usage with main.js
Using `.storybook/presets.js` with `.storybook/main.js` is not possible anymore. You can pass the configurations through `main.js` by using Object addon declaration under the `addons` key. You can register other addons through the string declaration as normal.
```
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
