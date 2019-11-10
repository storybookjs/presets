// TODO: Improve types in this file
const mergePlugins = (basePlugins: any, additionalPlugins: any) =>
  [...basePlugins, ...additionalPlugins].reduce((plugins, plugin) => {
    if (
      plugins.some(
        (includedPlugin: any) =>
          includedPlugin.constructor.name === plugin.constructor.name,
      )
    ) {
      return plugins;
    }
    return [...plugins, plugin];
  }, []);

export default mergePlugins;
