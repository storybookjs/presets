# TypeScript preset for Storybook

One-line TypeScript w/ docgen configuration for Storybook.

## Basic usage

First, install this preset to your project.

```sh
# Yarn
yarn add -D @storybook/preset-typescript react-docgen-typescript-loader ts-loader fork-ts-checker-webpack-plugin

# npm
npm install -D @storybook/preset-typescript react-docgen-typescript-loader ts-loader fork-ts-checker-webpack-plugin
```

Once installed, add this preset to the appropriate file:

- `./.storybook/main.js` (for Storybook 5.3.0 and newer)

  ```js
  module.exports = {
    addons: ['@storybook/preset-typescript']
  };
  ```

- `./.storybook/presets.js` (for all Storybook versions)

  ```js
  module.exports = ['@storybook/preset-typescript'];
  ```

## Advanced usage

You can pass configurations into the `TypeScript`, `Docgen` loaders or `ForkTsCheckerWebpackPlugin` using the `tsLoaderOptions`, `tsDocgenLoaderOptions`, `include` and `forkTsCheckerWebpackPluginOptions` options.

```js
// ./storybook/main.js
const path = require('path');

module.exports = {
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, './tsconfig.json'),
        },
        tsDocgenLoaderOptions: {
          tsconfigPath: path.resolve(__dirname, './tsconfig.json'),
        },
        forkTsCheckerWebpackPluginOptions: {
          colors: false, // disables built-in colors in logger messages
        },
        include: [path.resolve(__dirname, '../')],
        exclude: [path.resolve(__dirname, '../node_modules')],
      },
    },
  ],
};
```

All available options are described in the [Options](#options) section.

You also can enable TypeScript transpilation on [manager](https://storybook.js.org/docs/addons/writing-addons/) side, by setting the `transpileManager` option to `true`, e.g.:

```js
// ./storybook/main.js
const path = require('path');

module.exports = {
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        transpileManager: true,
      },
    },
  ],
};
```

## Options

### tsLoaderOptions

Type: `Object`

#### Default value

```js
{
  transpileOnly: true,
};
```

[ts-loader](https://github.com/TypeStrong/ts-loader#loader-options) options. If set to `true` [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) gets enabled automatically to run the separate process for type checking.

### tsDocgenLoaderOptions

Type: `Object`

#### Default value

```js
undefined;
```

[react-docgen-typescript-loader](https://github.com/strothj/react-docgen-typescript-loader#loader-options) options.

### forkTsCheckerWebpackPluginOptions

Type: `Object`

#### Default value

```js
undefined;
```

[fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#options) options. `transpileOnly` flag needs to be set to `true` in `tsLoaderOptions` to be able to set options for this webpack plugin.

### include

Type: [Rule condition](https://webpack.js.org/configuration/module/#rule-conditions)

#### Default value

```js
undefined;
```

[include rule](https://webpack.js.org/configuration/module/#ruleinclude) for `/\.tsx?$/`.

### transpileManager

Type: `Boolean`

#### Default value

```js
false;
```

Toggles TypeScript transpilation on [manager](https://storybook.js.org/docs/addons/writing-addons/) side.
