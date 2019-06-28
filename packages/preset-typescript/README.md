# Typescript preset for Storybook

One-line Typescript w/ docgen configuration for storybook.

**NOTE: this preset is not to be used with `create-react-app` apps (see below for details).**

## Basic usage

```
yarn add -D @storybook/preset-typescript react-docgen-typescript-loader ts-loader
```

Then add the following to `.storybook/presets.js`:

```js
module.exports = ["@storybook/preset-typescript"];
```

## Advanced usage

You can pass configurations into the Typescript or Docgen loaders using the `tsLoaderOptions`, `tsDocgenLoaderOptions`, and `include` options in `.storybook/presets.js`, e.g.:

```js
const path = require("path");

module.exports = [
  {
    name: "@storybook/preset-typescript",
    options: {
      tsDocgenLoaderOptions: {
        tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
      },
      include: [path.resolve(__dirname, "../src")]
    }
  }
];
```

You also can enable Typescript transpilation on [manager](https://storybook.js.org/docs/addons/writing-addons/) side, by setting the `transpileManager` option to `true`, e.g.:

```js
const path = require("path");

module.exports = [
  {
    name: "@storybook/preset-typescript",
    options: {
      transpileManager: true
    }
  }
];
```

## create-react-app

If your app is based on `create-react-app` or otherwise uses the `react-scripts` package, you can't use `preset-typescript`. There's currently code inside `@storybook/react` that detects CRA, and removes any webpack rules associated with file extensions CRA takes care of. So the `.tsx` rules added by `preset-typescript` won't show up in the final config ([details](https://github.com/storybookjs/presets/issues/20)).

You should use CRA to configure typescript. If you want to add Docgen support, you can create a custom webpack config in `.storybook/webpack.config.js` (["full control mode"](https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode)) that looks something like this:

```js
const { resolve } = require("path");

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: require.resolve("react-docgen-typescript-loader")
    include: [resolve(__dirname, "../src")]
  });

  return config;
};
```
