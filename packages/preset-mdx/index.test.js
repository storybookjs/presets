const plugin = require('./');

describe('plugin', () => {
  it('should merge to empty initial config', () => {
    const result = plugin.webpack();
    expect(result).toMatchSnapshot();
  });

  it('should merge to initial config with a few things', () => {
    const webpack = {
      entry: {},
      module: {
        rules: [
          {
            test: /\.css/,
            use: 'style-loader',
          },
        ],
      },
      optimization: {},
    };

    const result = plugin.webpack(webpack);
    expect(result).toMatchSnapshot();
  });

  it('should override "test" when rule is defined', () => {
    const webpack = {
      entry: {},
      module: {
        rules: [
          {
            test: /\.css/,
            use: 'style-loader',
          },
        ],
      },
      optimization: {},
    };

    const options = {
      rule: {
        test: /(.mdx)|(.mdy)?$/,
        exclude: ['foo.mdx'],
      },
    };

    const result = plugin.webpack(webpack, options);
    expect(result).toMatchSnapshot();
  });

  it('should add babelLoaderOptions when is defined', () => {
    const webpack = {
      entry: {},
      module: {
        rules: [
          {
            test: /\.css/,
            use: 'style-loader',
          },
        ],
      },
      optimization: {},
    };

    const options = {
      babelLoaderOptions: {
        babelrc: false,
      },
    };

    const result = plugin.webpack(webpack, options);
    expect(result).toMatchSnapshot();
  });

  it('should exclude babel loader when babelLoaderOptions = false', () => {
    const webpack = {
      entry: {},
      module: {
        rules: [
          {
            test: /\.css/,
            use: 'style-loader',
          },
        ],
      },
      optimization: {},
    };

    const options = {
      babelLoaderOptions: false,
    };

    const result = plugin.webpack(webpack, options);
    expect(result).toMatchSnapshot();
  });

  it('should combine mdx loader options when mdxLoaderOptions is defined', () => {
    const webpack = {
      entry: {},
      module: {
        rules: [
          {
            test: /\.css/,
            use: 'style-loader',
          },
        ],
      },
      optimization: {},
    };

    const options = {
      mdxLoaderOptions: {
        mdPlugins: ['a'],
        hastPlugins: ['b'],
        compilers: ['c'],
      },
    };

    const result = plugin.webpack(webpack, options);
    expect(result).toMatchSnapshot();
  });
});
