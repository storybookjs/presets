const processCraConfig = (craWebpackConfig, storybookConfigDir) =>
  craWebpackConfig.module.rules.reduce((rules, rule) => {
    const { test, oneOf, include } = rule;

    // Add our `configDir` to support JSX and TypeScript in that folder.
    if (test && test.test('.jsx')) {
      const newRule = {
        ...rule,
        include: [include, storybookConfigDir],
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
            if (oneOfRule.loader && oneOfRule.loader.includes('file-loader')) {
              // EJS must be ignored here as this is used within Storybook.
              return { ...oneOfRule, exclude: [...oneOfRule.exclude, /\.ejs$/] };
            }
            return oneOfRule.include
              ? { ...oneOfRule, include: [oneOfRule.include, storybookConfigDir] }
              : oneOfRule;
          }),
        },
      ];
    }

    return [...rules, rule];
  }, []);

module.exports = processCraConfig;
