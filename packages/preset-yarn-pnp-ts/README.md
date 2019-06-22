# Yarn Pnp + Typescript preset for Storybook

Configure storybook to support Yarn Pnp. This preset is dependant on **@storybook/preset-typescript**

## Basic usage

```
yarn add -D @storybook/preset-yarn-pnp-ts @storybook/preset-typescript react-docgen-typescript-loader ts-loader pnp-webpack-plugin -D
```

Then add the following to `.storybook/presets.js`:

```js
module.exports = [
  "@storybook/preset-typescript",
  "@storybook/preset-yarn-pnp-ts"
];
```
