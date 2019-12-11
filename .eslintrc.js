const error = 2;
const warn = 1;
const off = 0;

module.exports = {
  root: true,
  extends: ['airbnb', 'plugin:jest/recommended', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    'jest/globals': true,
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
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './{packages,examples}/*/tsconfig.json',
      },
      rules: {
        'import/extensions': off, //[warn, { ts: 'never', tsx: 'never' }],
        'import/no-default-export': error,
        'import/prefer-default-export': off,
        'react/jsx-filename-extension': off,
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
