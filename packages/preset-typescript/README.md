<h1>Storybook TypeScript preset</h1>

One-line TypeScript configuration for Storybook.

- [Installation](#installation)
- [Advanced usage](#advanced-usage)
- [Options](#options)
  - [forkTsCheckerWebpackPluginOptions](#forktscheckerwebpackpluginoptions)
  - [include](#include)
  - [transpileManager](#transpilemanager)

## Installation

First, install this preset to your project.

```
npm install -D @storybook/preset-typescript ts-loader fork-ts-checker-webpack-plugin # or yarn
```

Once installed, add this preset to the appropriate file:

- `./.storybook/main.js` (for Storybook 5.3.0 and newer)

  ```js
  module.exports = {
    addons: ['@storybook/preset-typescript'],
  };
  ```

- `./.storybook/presets.js` (for all Storybook versions)

  ```js
  module.exports = ['@storybook/preset-typescript'];
  ```

## Advanced usage

You can also pass extra configuration options to configure the preset. For example:

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
        forkTsCheckerWebpackPluginOptions: {
          colors: false, // disables built-in colors in logger messages
        },
        include: [path.resolve(__dirname, '../src')],
        transpileManager: true,
      },
    },
  ],
};
```

All available options are described in the [Options](#options) section below.

## Options

### forkTsCheckerWebpackPluginOptions

Type: `Object`

<h5>Default value</h5>

```js
undefined;
```

[fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#options) options. `transpileOnly` flag needs to be set to `true` in `tsLoaderOptions` to be able to set options for this webpack plugin.

### include

Type: [Rule condition](https://webpack.js.org/configuration/module/#rule-conditions)

<h5>Default value</h5>

```js
undefined;
```

[include rule](https://webpack.js.org/configuration/module/#ruleinclude) for `/\.tsx?$/`.

### transpileManager

Type: `Boolean`

<h5>Default value</h5>

```js
false;
```

Toggles TypeScript transpilation on [manager](https://storybook.js.org/docs/addons/writing-addons/) side.
