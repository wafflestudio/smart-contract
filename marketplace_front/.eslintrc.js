// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',

    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',

    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/no-named-as-default': 0,
    'react/prop-types': 'off',
    'no-prototype-builtins': 'off',
    'no-useless-escape': 'off',
    'react/display-name': 'off',
    'react/jsx-no-target-blank': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'error',
      {
        groups: ['external', 'builtin', 'object', 'internal', 'parent', 'sibling'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: './*.scss',
            group: 'sibling',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', './*.scss'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
