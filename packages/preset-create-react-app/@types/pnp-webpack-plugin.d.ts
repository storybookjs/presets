declare module 'pnp-webpack-plugin' {
  import { ResolvePlugin } from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies

  const moduleLoader: (module: NodeModule) => ResolvePlugin;
}
