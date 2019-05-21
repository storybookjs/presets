# Typescript preset for Storybook

Configure storybook to understand typescript and typescript docgen.

## Basic usage

```
yarn add @storybook/preset-typescript react-docgen-typescript-loader ts-loader -D
```

Then add the following to `.storybook/presets.js`:

```js
module.exports = ["@storybook/preset-typescript"];
```

## Advanced usage

You can pass configurations into the typescript or docgen loaders using the `tsLoaderOptions`, `tsDocgenLoaderOptions`, and `include` options in `.storybook/presets.js`, e.g.:

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
