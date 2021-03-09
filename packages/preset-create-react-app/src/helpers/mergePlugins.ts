import { Plugin } from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export const mergePlugins = (...args: Plugin[]): Plugin[] =>
  args.reduce((plugins, plugin) => {
    if (
      plugins.some(
        (includedPlugin) =>
          includedPlugin.constructor.name === plugin.constructor.name,
      )
    ) {
      return plugins;
    }
    let updatedPlugin = plugin;
    if (plugin.constructor.name === 'ReactRefreshPlugin') {
      // Storybook uses webpack-hot-middleware
      // https://github.com/storybookjs/presets/issues/177

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      updatedPlugin = new ReactRefreshWebpackPlugin({
        overlay: {
          sockIntegration: 'whm',
        },
      });
    }
    return [...plugins, updatedPlugin];
  }, [] as Plugin[]);
