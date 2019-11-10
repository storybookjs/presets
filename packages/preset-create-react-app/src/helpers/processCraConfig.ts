import { resolve } from 'path';
import { Configuration, RuleSetRule } from 'webpack';
import { Options } from '../options';

const isRegExp = (
  ruleSetCondition: RegExp | unknown,
): ruleSetCondition is RegExp => ruleSetCondition instanceof RegExp;

// This handles arrays in Webpack rule tests.
const testMatch = (rule: RuleSetRule, string: string) => {
  if (!rule.test) return false;
  return Array.isArray(rule.test)
    ? rule.test.some((test) => isRegExp(test) && test.test(string))
    : isRegExp(rule.test) && rule.test.test(string);
};

const processCraConfig = (
  craWebpackConfig: Configuration,
  options: Options,
) => {
  const configDir = resolve(options.configDir);

  return craWebpackConfig!.module!.rules.reduce(
    (rules, rule): RuleSetRule[] => {
      const { oneOf, include } = rule;

      // Add our `configDir` to support JSX and TypeScript in that folder.
      if (testMatch(rule, '.jsx')) {
        const newRule = {
          ...rule,
          include: [include as string, configDir],
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
            // TODO: Improve types here.
            oneOf: oneOf.map((oneOfRule: any) => {
              if (
                oneOfRule.loader &&
                oneOfRule.loader.includes('file-loader')
              ) {
                // NOTE: This rules has been disabled as it conflicts with Storybook's `file-loader`.
                /* const excludes = [
                  'ejs', // Used within Storybook.
                  'mdx', // Used with Storybook Docs.
                  ...(options.craOverrides?.fileLoaderExcludes || []),
                ];
                const excludeRegex = new RegExp(`\\.(${excludes.join('|')})$`);
                return {
                  ...oneOfRule,
                  exclude: [...oneOfRule.exclude, excludeRegex],
                }; */
                return {};
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

                let plugins: string[] = _plugins;
                let overrides: any[] = [];

                // The Babel plugin for docgen conflicts with the TypeScript loader.
                // This limits it to JavaScript files when the TypeScript loader is enabled.
                if (options.tsDocgenLoaderOptions) {
                  plugins = _plugins.filter(
                    ([plugin]: string[]) =>
                      !plugin.includes('babel-plugin-react-docgen'),
                  );
                  overrides = [
                    {
                      test: /\.(js|jsx)$/,
                      plugins: _plugins.filter(([plugin]: string[]) =>
                        plugin.includes('babel-plugin-react-docgen'),
                      ),
                    },
                  ];
                }

                return {
                  ...oneOfRule,
                  include: [_include, configDir],
                  options: {
                    ...(ruleOptions as object),
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
    },
    [] as RuleSetRule[],
  );
};

export default processCraConfig;
