/* eslint-disable no-console */
const shell = require('shelljs');

if (shell.exec('git status --porcelain').stdout.trim() !== '') {
  console.error('Git repo is dirty, please consider updating lockfiles by running `yarn install`');
  process.exit(1);
}
