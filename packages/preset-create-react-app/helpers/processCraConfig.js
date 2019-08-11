const path = require('path');

// This handles arrays in Webpack rule tests.
const testMatch = (rule, string) => {
  if (!rule.test) return false;
  return Array.isArray(rule.test)
    ? rule.test.some(test => test.test(string))
    : rule.test.test(string);
};

const processCraConfig = (craWebpackConfig, storybookOptions) => {
  const configDir = path.resolve(storybookOptions.configDir);

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
              const { include: _include, loader, options, test } = oneOfRule;
              const {
                extends: _extends,
                plugins = [],
                presets = [],
              } = storybookOptions.babelOptions;

              return {
                test,
                include: [_include, configDir],
                use: [
                  {
                    loader,
                    options: {
                      ...options,
                      extends: _extends,
                      plugins: [...plugins, ...options.plugins],
                      presets: [...presets, ...options.presets],
                    },
                  },
                  {
                    loader: require.resolve('react-docgen-typescript-loader'),
                  },
                ],
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
