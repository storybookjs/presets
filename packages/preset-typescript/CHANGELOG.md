## 2.1.0

- Improve compatibility with Vue [#108](https://github.com/storybookjs/presets/pull/108)

## 2.0.0

- Remove builtin support for `react-docgen-typescript-loader`, which is React-specific [#68](https://github.com/storybookjs/presets/pull/68)

**NOTE:** React users, we are recommending moving to `babel-plugin-react-docgen`, which is bundled as part of `@storybook/react` and now supports Typescript. If you need to manually configure your setup to add back `react-docgen-typescript-loader`, add the following to your `.storybook/main.js`:

```js
module.exports = {
  webpack: async (config, { configType }) => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {}, // your options here
        },
    }
  }
}
```

## 1.2.2

- Don't default to empty include option [#106](https://github.com/storybookjs/presets/pull/106)
