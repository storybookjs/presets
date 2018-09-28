const sbCreateCompiler = require('./storybook-mdx-compiler-plugin');
const sbCodeExamplePlugin = require('./storybook-code-example-md-plugin');
const sbMdxSyntaxPlugin = require('./storybook-syntax-md-plugin');
const sbClassNamesPlugin = require('./storybook-classnames-hast-plugin');

function wrapLoader(loader, options) {
  if (options === false) {
    return [];
  }

  if (!options) {
    return [{ loader }];
  }

  return [
    {
      loader,
      options,
    },
  ];
}

function combineMdxLoaderOptions(mdxLoaderOptions, mdxOptions) {
  return {
    ...mdxLoaderOptions,
    mdPlugins: [
      [sbMdxSyntaxPlugin, mdxOptions],
      [sbCodeExamplePlugin, mdxOptions],
      ...(mdxLoaderOptions.mdPlugins || []),
    ],
    hastPlugins: [...(mdxLoaderOptions.hastPlugins || []), sbClassNamesPlugin],
    compilers: [...(mdxLoaderOptions.compilers || []), sbCreateCompiler(mdxOptions)],
  };
}

function webpack(webpackConfig = {}, options = {}) {
  const { module = {} } = webpackConfig;
  const { babelLoaderOptions, mdxOptions, mdxLoaderOptions = {}, rule = {} } = options;

  const combinedMdxLoaderOptions = combineMdxLoaderOptions(mdxLoaderOptions, mdxOptions);

  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [
        ...(module.rules || []),
        {
          test: /.mdx?$/,
          ...rule,
          use: [
            ...wrapLoader('babel-loader', babelLoaderOptions),
            ...wrapLoader('@mdx-js/loader', combinedMdxLoaderOptions),
          ],
        },
      ],
    },
  };
}

module.exports = { webpack };
