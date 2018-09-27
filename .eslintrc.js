const error = 2;
const warn = 1;
const ignore = 0;

module.exports = {
  root: true,
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'plugin:import/react-native',
    'prettier',
    'prettier/react',
  ],
  plugins: ['prettier', 'jest', 'import', 'react', 'jsx-a11y', 'json'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    'jest/globals': true,
  },
  settings: {
    'import/core-modules': ['enzyme'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? error : ignore,
    'no-continue': ignore,
    'no-restricted-syntax': ignore,
    'no-underscore-dangle': error,
    'class-methods-use-this': ignore,
    'prettier/prettier': [
      warn,
      {
        printWidth: 100,
        tabWidth: 2,
        bracketSpacing: true,
        trailingComma: 'es5',
        singleQuote: true,
      },
    ],
    'import/extensions': [
      error,
      'always',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      error,
      {
        peerDependencies: true,
      }
    ],
    'import/prefer-default-export': ignore,
    'import/default': error,
    'import/named': error,
    'import/namespace': error,
    'react/no-unescaped-entities': ignore,
    'react/jsx-filename-extension': [
      warn,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/jsx-no-bind': [
      error,
      {
        ignoreDOMComponents: true,
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: true,
        allowBind: true,
      },
    ],
  },
};
