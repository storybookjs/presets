const path = require('path');

// This handles arrays in Webpack rule tests.
const testMatch = (rule, string) => {
  if (!rule.test) return false;
  return Array.isArray(rule.test)
    ? rule.test.some(test => test.test(string))
    : rule.test.test(string);
};

const processCraConfig = (craWebpackConfig, options) => {
  const configDir = path.resolve(options.configDir);

  return craWebpackConfig.module.rules.reduce((rules, rule) => {
    const { oneOf, include } = rule;

    // Add our `configDir` to support JSX and TypeScript in that folder.
    if (testMatch(rule, '.jsx')) {
      const newRule = {
        ...rule,
        include: [include, configDir],
      };
      return [...rules, newRule];
    }

    /*
     * CRA makes use of Webpack's `oneOf` feature.
     * https://webpack.js.org/configuration/module/#ruleoneof
     *
     * Here, we map over those rules and add our `configDir` as above.
     */
    if (oneOf) {
      return [
        ...rules,
        {
          oneOf: oneOf.map(oneOfRule => {
            // EJS must be ignored here as this is used within Storybook.
            if (oneOfRule.loader && oneOfRule.loader.includes('file-loader')) {
              return { ...oneOfRule, exclude: [...oneOfRule.exclude, /\.ejs$/] };
            }

            // This rule causes conflicts with Storybook addons like `addon-info`.
            if (testMatch(oneOfRule, '.css')) {
              return {
                ...oneOfRule,
                exclude: [oneOfRule.exclude, /@storybook/],
              };
            }

            // Target `babel-loader` and add user's Babel config.
            if (
              oneOfRule.loader &&
              oneOfRule.loader.includes('babel-loader') &&
              oneOfRule.test.test('.jsx')
            ) {
              const { include: _include, options: ruleOptions } = oneOfRule;
              const {
                extends: _extends,
                plugins: _plugins = [],
                presets = [],
              } = options.babelOptions;

              let plugins = _plugins;
              let overrides = [];

              // The Babel plugin for docgen conflicts with the TypeScript loader.
              // This limits it to JavaScript files when the TypeScript loader is enabled.
              if (options.tsDocgenLoaderOptions) {
                plugins = _plugins.filter(
                  ([plugin]) => !plugin.includes('babel-plugin-react-docgen')
                );
                overrides = [
                  {
                    test: /\.(js|jsx)$/,
                    plugins: _plugins.filter(([plugin]) =>
                      plugin.includes('babel-plugin-react-docgen')
                    ),
                  },
                ];
              }

              return {
                ...oneOfRule,
                include: [_include, configDir],
                options: {
                  ...ruleOptions,
                  extends: _extends,
                  plugins: [...plugins, ...ruleOptions.plugins],
                  presets: [...presets, ...ruleOptions.presets],
                  overrides,
                },
              };
            }

            return oneOfRule.include
              ? { ...oneOfRule, include: [oneOfRule.include, configDir] }
              : oneOfRule;
          }),
        },
      ];
    }

    return [...rules, rule];
  }, []);
};

module.exports = processCraConfig;
