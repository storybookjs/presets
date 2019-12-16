# Create React App preset for Storybook

One-line [Create React App](https://github.com/facebook/create-react-app) configuration for Storybook.

This preset is designed to use alongside [`@storybook/react`](https://github.com/storybookjs/storybook/tree/master/app/react).

## Basic usage

First, install this preset to your project.

```
# Yarn
yarn add -D @storybook/preset-create-react-app

# npm
npm install -D @storybook/preset-create-react-app
```

Once installed, add this preset to the appropriate file:

- `./.storybook/main.js` (for Storybook 5.3.0 and newer)

  ```js
  module.exports = {
    presets: ['@storybook/preset-create-react-app'],
  };
  ```

- `./.storybook/presets.js` (for all Storybook versions)

  ```js
  module.exports = ['@storybook/preset-create-react-app'];
  ```

## CRA overrides

This preset uses CRA's Webpack/Babel configurations, so that Storybook's behavior matches your app's behavior.

However, there may be some cases where you'd rather override CRA's default behavior. If that is something you need, you can use the `craOverrides` object.

| Option               | Default          | Behaviour | Type       | Description                                                                                                        |
| -------------------- | ---------------- | --------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `fileLoaderExcludes` | `['ejs', 'mdx']` | Extends   | `string[]` | Excludes file types (by extension) from CRA's `file-loader` configuration. The defaults are required by Storybook. |

Here's how you might configure this preset to ignore PDF files so they can be processed by another preset or loader:

```js
module.exports = [
  {
    name: '@storybook/preset-create-react-app',
    options: {
      craOverrides: {
        fileLoaderExcludes: ['pdf'],
      },
    },
  },
];
```

## Advanced usage

In most cases, this preset will find your `react-scripts` package, even if it's a fork of the offical `react-scripts`.

In the event that it doesn't, you can set the package's name with `scriptsPackageName`.

You can also enable and configure [`react-docgen-typescript-loader`](https://github.com/strothj/react-docgen-typescript-loader) with `tsDocgenLoaderOptions`.

If set to `{}`, it will be enabled with default Create React App settings.

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

Alternatively, you can pass your own configuration:

```js
const path = require('path');

module.exports = [
  {
    name: '@storybook/preset-create-react-app',
    options: {
      scriptsPackageName: '@my/react-scripts',
      tsDocgenLoaderOptions: {
        tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
      },
    },
  },
];
```

## Resources

- [Walkthrough to set up Storybook Docs with CRA & typescript](https://gist.github.com/shilman/bc9cbedb2a7efb5ec6710337cbd20c0c)
- [Example projects (used for testing this preset)](https://github.com/storybookjs/presets/tree/master/examples)
