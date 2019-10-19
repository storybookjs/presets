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
module.exports = ["@storybook/preset-create-react-app"];
```

## CRA Overrides

The CRA preset uses CRA's webpack/babel configurations, so that Storybook's behavior matches your app's behavior. However, there are some cases where you'd rather override CRA's default behavior. That's what the `craOverrides` object does.

For example, CRA automatically adds webpack `file-loader` rules for all file types that it doesn't know about. This interferes with Storybook. If you want CRA to ignore certain file extensions so that you can they can be processed by an another preset, you can pass an array of file extensions to ignore, to the option `craOverrides.fileLoaderExcludes`, which appends to the default value `['ejs', 'mdx']` which are needed by Storybook.

Here's how you might configure the preset to ignore PDF files so they can be processed by another preset:

```js
module.exports = [
  {
    name: "@storybook/preset-create-react-app",
    options: {
      scriptsPackageName: "@my/react-scripts",
      craOverrides: {
        fileLoaderExcludes: ["pdf"]
      },
      tsDocgenLoaderOptions: {}
    }
  }
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
    name: "@storybook/preset-create-react-app",
    options: {
      scriptsPackageName: "@my/react-scripts",
      ignoreFileExtensions: ["ejs", "mdx", "psd"],
      tsDocgenLoaderOptions: {}
    }
  }
];
```

Alternatively, you can pass your own configuration:

```js
const path = require("path");

module.exports = [
  {
    name: "@storybook/preset-create-react-app",
    options: {
      scriptsPackageName: "@my/react-scripts",
      tsDocgenLoaderOptions: {
        tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
      }
    }
  }
];
```
