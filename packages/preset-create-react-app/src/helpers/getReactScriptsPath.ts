import { readFileSync, realpathSync } from 'fs';
import { join } from 'path';

const getReactScriptsPath = (): string => {
  const cwd = process.cwd();
  const scriptsBinPath = join(cwd, '/node_modules/.bin/react-scripts');

  if (process.platform === 'win32') {
    /*
     * Try to find the scripts package on Windows by following the `react-scripts` CMD file.
     * https://github.com/storybookjs/storybook/issues/5801
     */
    try {
      const content = readFileSync(scriptsBinPath, 'utf8');
      // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
      const packagePathMatch = content.match(
        /"\$basedir[\\/](\S+?)[\\/]bin[\\/]react-scripts\.js"/i,
      );

      if (packagePathMatch && packagePathMatch.length > 1) {
        const scriptsPath = join(
          cwd,
          '/node_modules/.bin/',
          packagePathMatch[1],
        );
        return scriptsPath;
      }
    } catch (e) {
      // NOOP
    }
  } else {
    /*
     * Try to find the scripts package by following the `react-scripts` symlink.
     * This won't work for Windows users, unless within WSL.
     */
    try {
      const resolvedBinPath = realpathSync(scriptsBinPath);
      const scriptsPath = join(resolvedBinPath, '..', '..');
      return scriptsPath;
    } catch (e) {
      // NOOP
    }
  }

  /*
   * Try to find the `react-scripts` package by name (won't catch forked scripts packages).
   */
  try {
    const scriptsPath = require.resolve('react-scripts');
    return scriptsPath;
  } catch (e) {
    // NOOP
  }

  return '';
};

const getReactScriptsPathWithYarnPnp = (
  packageName = 'react-scripts',
): string => {
  // Use Plug'n'Play API to introspect the dependency tree at runtime, see: https://yarnpkg.com/advanced/pnpapi
  // eslint-disable-next-line import/no-unresolved,@typescript-eslint/no-var-requires,global-require
  const pnpApi = require('pnpapi');

  // Get list of all dependencies of the project
  const { packageDependencies } = pnpApi.getPackageInformation({
    name: null,
    reference: null,
  });

  // Get location of the package named `packageName`, this package must be
  // listed as dependency to be able to find it's location (and no more just
  // be present in node_modules folder)
  const { packageLocation } = pnpApi.getPackageInformation(
    pnpApi.getLocator(packageName, packageDependencies.get(packageName)),
  );

  return packageLocation;
};

export { getReactScriptsPath, getReactScriptsPathWithYarnPnp };
