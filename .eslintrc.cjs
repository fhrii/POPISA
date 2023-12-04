module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['airbnb', 'airbnb-typescript', 'plugin:prettier/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['react-refresh', 'simple-import-sort'],
  rules: {
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react'],
          ['^@?\\w'],
          ['^(@|components)(/.*|$)'],
          ['^\\u0000'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.?(css)$'],
        ],
      },
    ],
  },
};
