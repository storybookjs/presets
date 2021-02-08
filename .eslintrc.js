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
        tsconfigRootDir: __dirname,
        project: './{packages,examples}/**/tsconfig.json',
      },
      rules: {
        'import/extensions': off, // [warn, { ts: 'never', tsx: 'never' }],
        'import/no-default-export': error,
        'import/prefer-default-export': off,
        'react/jsx-filename-extension': off,
        'no-use-before-define': warn,
        '@typescript-eslint/no-unsafe-member-access': warn,
        '@typescript-eslint/no-unsafe-call': warn,
        '@typescript-eslint/no-unsafe-assignment': warn,
        '@typescript-eslint/prefer-regexp-exec': warn,
        '@typescript-eslint/no-floating-promises': warn,
        'react/require-default-props': warn,
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
