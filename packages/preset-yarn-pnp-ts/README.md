# Yarn Pnp + Typescript preset for Storybook

Configure storybook to understand typescript and typescript docgen, and support Yarn Pnp.

## Basic usage

```
yarn add @storybook/preset-typescript react-docgen-typescript-loader ts-loader pnp-webpack-plugin -D
```

Then add the following to `.storybook/presets.js`:

```js
module.exports = ["@storybook/preset-yarn-pnp-ts"];
```

## Advanced usage

You can pass configurations into the typescript or docgen loaders using the `tsLoaderOptions`, `tsDocgenLoaderOptions`, and `include` options in `.storybook/presets.js`, e.g.:

```js
const path = require("path");

module.exports = [
  {
    name: "@storybook/preset-yarn-pnp-ts",
    options: {
      tsDocgenLoaderOptions: {
        tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
      },
      include: [path.resolve(__dirname, "../src")]
    }
  }
];
```
