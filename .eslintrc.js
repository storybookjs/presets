const error = 2;
const warn = 1;
const off = 0;

module.exports = {
  root: true,
  extends: ['airbnb', 'plugin:jest/recommended', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    project: './packages/*/tsconfig.json',
  },
  globals: {
    browser: true,
    context: true,
    jestPuppeteer: true,
    page: true,
  },
  env: {
    es6: true,
    node: true,
    'jest/globals': true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions,
      rules: {
        'import/no-default-export': 2,
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
      },
    },
  ],
};
