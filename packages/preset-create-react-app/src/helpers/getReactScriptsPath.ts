import { dirname } from 'path';

export const getReactScriptsPath = (): string => {
  /*
   * Try to find the `react-scripts` package by name (won't catch forked scripts packages).
   */
  try {
    const scriptsPath = require.resolve('react-scripts/package.json');
    return dirname(scriptsPath);
  } catch (e) {
    // NOOP
  }
  return '';
};

export const getReactScriptsPathWithYarnPnp = (
  packageName = 'react-scripts',
): string => {
  /*
   * Use Plug'n'Play API to introspect the dependency tree at runtime.
   * See https://yarnpkg.com/advanced/pnpapi for more.
   */
  // eslint-disable-next-line import/no-unresolved, @typescript-eslint/no-var-requires, global-require
  const pnpApi = require('pnpapi');

  // Get list of all dependencies of the project
  const { packageDependencies } = pnpApi.getPackageInformation({
    name: null,
    reference: null,
  });

  /*
   * Get location of the package named `packageName`, this package must be
   * listed as dependency to be able to find it's location (and no more just
   * be present in node_modules folder)
   */
  const { packageLocation } = pnpApi.getPackageInformation(
    pnpApi.getLocator(packageName, packageDependencies.get(packageName)),
  );

  return packageLocation;
};
