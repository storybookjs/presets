# Addon Storysource preset for Storybook

Utilize addon-storysource, and allow this preset to handle the webpack config changes that are necessary

## Basic Usage

```bash
yarn add @storybook/preset-storysource -D
```

Then add the following to `.storybook/presets.js`

```javascript
module.exports = ['@storybook/preset-storysource']
```

## Advanced Usage

You can pass configurations into the addon-storysource loader in your `.storybook/presets.js` file, e.g.:

```javascript
module.exports = [
  {
    name: '@storybook/preset-storysource',
    options: {
      loaderOptions: {
        prettierConfig: { printWidth: 80, singleQuote: false }
      }
    }
  }
]
```

See [Addon-Storysource](https://www.npmjs.com/package/@storybook/addon-storysource#loader-options) for the complete list of loaderOptions