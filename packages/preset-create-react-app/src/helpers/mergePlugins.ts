import { Plugin } from 'webpack';

const mergePlugins = (
  basePlugins: Plugin[] = [],
  additionalPlugins: Plugin[] = [],
): Plugin[] =>
  [...basePlugins, ...additionalPlugins].reduce((plugins, plugin) => {
    if (
      plugins.some(
        includedPlugin =>
          includedPlugin.constructor.name === plugin.constructor.name,
      )
    ) {
      return plugins;
    }
    return [...plugins, plugin];
  }, [] as Plugin[]);

export { mergePlugins };
