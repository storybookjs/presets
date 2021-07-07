const error = 2;
const warn = 1;
const off = 0;

module.exports = {
  root: true,
  extends: ['airbnb', 'plugin:jest/recommended', 'prettier', 'prettier/react'],
  env: {
    es6: true,
    node: true,
    'jest/globals': true,
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  rules: {
    'react/jsx-filename-extension': off,
    'react/react-in-jsx-scope': off,
    'react/require-default-props': warn,
  },
  overrides: [
    {
      files: ['./examples/**'],
      env: {
        browser: true,
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint',
        'plugin:import/typescript',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './{packages,examples}/**/tsconfig.json',
      },
      rules: {
        '@typescript-eslint/no-floating-promises': warn,
        '@typescript-eslint/no-unsafe-assignment': warn,
        '@typescript-eslint/no-unsafe-call': warn,
        '@typescript-eslint/no-unsafe-member-access': warn,
        '@typescript-eslint/prefer-regexp-exec': warn,
        'import/extensions': off,
        'import/no-default-export': error,
        'import/prefer-default-export': off,
        'no-use-before-define': warn,
        'react/require-default-props': off,
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          ts: {
            directory: './{packages,examples}/*/tsconfig.json',
          },
        },
      },
    },
  ],
};
