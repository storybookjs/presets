import { Configuration, RuleSetLoader, RuleSetUse } from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Options } from '../options';

const isLoader = (ruleSetUse: RuleSetUse): ruleSetUse is RuleSetLoader =>
  typeof ruleSetUse === 'object';

const tsExtensions = ['.ts', '.tsx'];

export const processConfig = (
  webpackConfig: Configuration = {},
  options: Options,
): Configuration => {
  const { resolve = {}, plugins = [], module } = webpackConfig;
  const { forkTsCheckerWebpackPluginOptions, include = [] } = options;

  const rules = module?.rules.map(rule => {
    // Find the rule containing 'babel-loader'
    const isBabelRule =
      Array.isArray(rule.use) &&
      rule.use.find(
        use => isLoader(use) && use.loader?.includes('babel-loader'),
      );

    // If this is the
    if (isBabelRule) {
      return {
        ...rule,
        include: [...rule.include, ...include],
        test: new RegExp(
          `\\.(${['mjs', 'js', 'jsx', ...tsExtensions]
            .join('|')
            .replace(/\./g, '')})$`,
        ),
      };
    }

    return rule;
  });

  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: rules || [],
    },
    plugins: [
      ...plugins,
      new ForkTsCheckerWebpackPlugin(forkTsCheckerWebpackPluginOptions),
    ],
    resolve: {
      ...resolve,
      extensions: [...(resolve.extensions || []), ...tsExtensions],
    },
  };
};
