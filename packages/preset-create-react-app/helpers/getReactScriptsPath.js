const fs = require('fs');
const path = require('path');

const getReactScriptsPath = () => {
  const cwd = process.cwd();
  const scriptsBinPath = path.join(cwd, '/node_modules/.bin/react-scripts');

  if (process.platform === 'win32') {
    /*
     * Try to find the scripts package on Windows by following the `react-scripts` CMD file.
     * https://github.com/storybookjs/storybook/issues/5801
     */
    try {
      const content = fs.readFileSync(scriptsBinPath, 'utf8');
      const packagePathMatch = content.match(
        /"\$basedir[\\/]([^\s]+?[\\/]bin[\\/]react-scripts\.js")/i
      );

      if (packagePathMatch && packagePathMatch.length > 1) {
        const scriptsPath = path.join(cwd, '/node_modules/.bin/', packagePathMatch[1]);
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
      const resolvedBinPath = fs.realpathSync(scriptsBinPath);
      const scriptsPath = path.join(resolvedBinPath, '..', '..');
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

module.exports = getReactScriptsPath;
