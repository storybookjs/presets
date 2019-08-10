const mergePlugins = (basePlugins, additionalPlugins) =>
  [...basePlugins, ...additionalPlugins].reduce((plugins, plugin) => {
    if (
      plugins.some(includedPlugin => includedPlugin.constructor.name === plugin.constructor.name)
    ) {
      return plugins;
    }
    return [...plugins, plugin];
  }, []);

module.exports = mergePlugins;
