const PnpWebpackPlugin = require('pnp-webpack-plugin');

function webpack(webpackConfig = {}) {
  const { resolve = {}, resolveLoader = {} } = webpackConfig;

  return {
    ...webpackConfig,
    resolve: {
      ...resolve,
      plugins: [...(resolve.plugins || []), PnpWebpackPlugin],
    },
    resolveLoader: {
      ...resolveLoader,
      plugins: [
        ...(resolveLoader.plugins || []),
        PnpWebpackPlugin.moduleLoader('@storybook/react'),
      ],
    },
  };
}

function tsLoaderOptions() {
  return PnpWebpackPlugin.tsLoaderOptions({
    compilerOptions: {
      jsx: 'react',
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      strict: false,
    },
  });
}

function managerWebpack(webpackConfig = {}) {
  const { module = {}, resolve = {}, resolveLoader = {} } = webpackConfig;

  const extensions = Array.from(new Set([...(resolve.extensions || []), '.ts', '.tsx']));

  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [...(module.rules || [])],
    },
    resolve: {
      ...resolve,
      extensions,
      plugins: [...(resolve.plugins || []), PnpWebpackPlugin],
    },
    resolveLoader: {
      ...resolveLoader,
      plugins: [
        ...(resolveLoader.plugins || []),
        PnpWebpackPlugin.moduleLoader('@storybook/react'),
      ],
    },
  };
}

module.exports = { webpack, managerWebpack, tsLoaderOptions };
