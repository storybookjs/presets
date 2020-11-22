<h1>Storybook IE 11 preset</h1>

One-line IE 11 configuration for Storybook.

- [Installation](#installation)
- [Advanced usage](#advanced-usage)
- [Options](#options)
  - [forkTsCheckerWebpackPluginOptions](#forktscheckerwebpackpluginoptions)
  - [include](#include)
  - [transpileManager](#transpilemanager)

## Installation

First, install this preset to your project.

```
npm install -D @storybook/preset-ie11 # or yarn
```

Once installed, add this preset to the appropriate file:

- `./.storybook/main.js` (for Storybook 5.3.0 and newer)

  ```js
  module.exports = {
    addons: ['@storybook/preset-ie11'],
  };
  ```

- `./.storybook/presets.js` (for all Storybook versions)

  ```js
  module.exports = ['@storybook/preset-ie11'];
  ```
