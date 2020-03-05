## 2.0.0

- Remove builtin support for `react-docgen-typescript-loader`, which is React-specific [#68](https://github.com/storybookjs/presets/pull/68)

If you want to manually configure it, add the following to your `.storybook/main.js`:

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
