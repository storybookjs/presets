# Inline SVG preset for Storybook

One-line inline svg using `svg-inline-loader` for Storybook.

## Basic usage

```
yarn add -D @storybook/preset-inline-svg svg-inline-loader
```

Then add the following to `.storybook/presets.js`:

```js
module.exports = ['@storybook/preset-inline-svg'];
```

## Advanced usage

You can pass configurations into the preset's webpack loaders using the `svgLoaderOptions` key. See documentation for `svg-inline-loader` to learn about valid options.

For example:

```js
module.exports = [
  {
    name: '@storybook/preset-inline-svg',
    options: {
      svgLoaderOptions: {
        removeTags: true,
        removingTags: ['circle'],
      },
    },
  },
];
```
