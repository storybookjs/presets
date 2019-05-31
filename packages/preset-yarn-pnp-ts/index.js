const PnpWebpackPlugin = require(require.resolve("pnp-webpack-plugin"));

function webpack(webpackConfig = {}, options = {}) {
  const { module = {}, resolve = {}, resolveLoader = {} } = webpackConfig;
  const { tsLoaderOptions, tsDocgenLoaderOptions, include } = options;

  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [
        ...(module.rules || []),
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: require.resolve("ts-loader"),
              options: PnpWebpackPlugin.tsLoaderOptions({
                "compilerOptions": {
                  "jsx": "react",
                  "skipLibCheck": true,
                  "esModuleInterop": true,
                  "allowSyntheticDefaultImports": true,
                  "strict": false
                }
              })
            },
            {
              loader: require.resolve("react-docgen-typescript-loader"),
              options: tsDocgenLoaderOptions
            }
          ],
          include
        }
      ]
    },
    resolve: {
      ...resolve,
      extensions: [...(resolve.extensions || []), ".ts", ".tsx"],
      plugins: [...(resolve.plugins || []), PnpWebpackPlugin]
    },
    resolveLoader: {
      ...resolveLoader,
      plugins: [
        ...(resolveLoader.plugins || []),
        PnpWebpackPlugin.moduleLoader("@storybook/react")
      ]
    }
  };
}

function managerWebpack(webpackConfig = {}, options = {}) {
  const { module = {}, resolve = {}, resolveLoader = {} } = webpackConfig;
  const { tsLoaderOptions, tsDocgenLoaderOptions, include } = options;

  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [
        ...(module.rules || [])
      ]
    },
    resolve: {
      ...resolve,
      extensions: [...(resolve.extensions || []), ".ts", ".tsx"],
      plugins: [...(resolve.plugins || []), PnpWebpackPlugin]
    },
    resolveLoader: {
      ...resolveLoader,
      plugins: [
        ...(resolveLoader.plugins || []),
        PnpWebpackPlugin.moduleLoader("@storybook/react")
      ]
    }
  };
}

module.exports = { webpack, managerWebpack };
