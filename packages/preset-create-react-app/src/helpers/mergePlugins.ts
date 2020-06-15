import { Plugin } from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies

export const mergePlugins = (...args: (Plugin | Plugin[])[]): Plugin[] =>
  args.flat().reduce((plugins, plugin) => {
    if (
      plugins.some(
        (includedPlugin) =>
          includedPlugin.constructor.name === plugin.constructor.name,
      )
    ) {
      return plugins;
    }
    return [...plugins, plugin];
  }, [] as Plugin[]);
