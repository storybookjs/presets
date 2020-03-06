import { resolve } from 'path';
import { Configuration, RuleSetRule } from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import semver from 'semver';
import { Options } from '../options';

const isRegExp = (value: RegExp | unknown): value is RegExp =>
  value instanceof RegExp;

const isString = (value: string | unknown): value is string =>
  typeof value === 'string';

// This handles arrays in Webpack rule tests.
const testMatch = (rule: RuleSetRule, string: string): boolean => {
  if (!rule.test) return false;
  return Array.isArray(rule.test)
    ? rule.test.some(test => isRegExp(test) && test.test(string))
    : isRegExp(rule.test) && rule.test.test(string);
};

const processCraConfig = (
  craWebpackConfig: Configuration,
  options: Options,
): RuleSetRule[] => {
  const configDir = resolve(options.configDir);

  /*
   * NOTE: As of version 5.3.0 of Storybook, Storybook's default loaders are no
   * longer appended when using this preset, meaning less customisation is
   * needed when used alongside that version.
   *
   * When loaders were appended in previous Storybook versions, some CRA loaders
   * had to be disabled or modified to avoid conflicts.
   *
   * See: https://github.com/storybookjs/storybook/pull/9157
   */
  const storybookVersion = semver.coerce(options.packageJson.version) || '';
  const isStorybook530 = semver.gte(storybookVersion, '5.3.0');

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return craWebpackConfig.module!.rules.reduce((rules, rule): RuleSetRule[] => {
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
          oneOf: oneOf.map(
            (oneOfRule: RuleSetRule): RuleSetRule => {
              if (
                isString(oneOfRule.loader) &&
                /[/\\]file-loader[/\\]/.test(oneOfRule.loader)
              ) {
                if (isStorybook530) {
                  const excludes = [
                    'ejs', // Used within Storybook.
                    'md', // Used with Storybook Notes.
                    'mdx', // Used with Storybook Docs.
                    ...(options.craOverrides?.fileLoaderExcludes || []),
                  ];
                  const excludeRegex = new RegExp(
                    `\\.(${excludes.join('|')})$`,
                  );
                  return {
                    ...oneOfRule,
                    exclude: [...oneOfRule.exclude, excludeRegex],
                  };
                }
                return {};
              }

              // This rule causes conflicts with Storybook addons like `addon-info`.
              if (testMatch(oneOfRule, '.css')) {
                return {
                  ...oneOfRule,
                  include: isStorybook530 ? undefined : [configDir],
                  exclude: [oneOfRule.exclude as RegExp, /@storybook/],
                };
              }

              // Used for the next two rules modifications.
              const isBabelLoader =
                isString(oneOfRule.loader) &&
                /[/\\]babel-loader[/\\]/.test(oneOfRule.loader);

              // Target `babel-loader` and add user's Babel config.
              if (
                isBabelLoader &&
                isRegExp(oneOfRule.test) &&
                oneOfRule.test.test('.jsx')
              ) {
                const { include: _include, options: ruleOptions } = oneOfRule;

                const { plugins: rulePlugins = [], presets: rulePresets = [] } =
                  typeof ruleOptions === 'object' ? ruleOptions : {};

                const {
                  extends: _extends,
                  plugins = [],
                  presets = [],
                } = options.babelOptions;

                return {
                  ...oneOfRule,
                  include: [_include as string, configDir],
                  options: {
                    ...(ruleOptions as object),
                    extends: _extends,
                    plugins: [...plugins, ...rulePlugins],
                    presets: [...presets, ...rulePresets],
                  },
                };
              }

              // Target `babel-loader` that processes `node_modules`, and add Storybook config dir.
              if (
                isBabelLoader &&
                isRegExp(oneOfRule.test) &&
                oneOfRule.test.test('.js')
              ) {
                return {
                  ...oneOfRule,
                  include: [configDir],
                };
              }

              return oneOfRule;
            },
          ),
        },
      ];
    }

    return [...rules, rule];
  }, [] as RuleSetRule[]);
};

export { processCraConfig };
