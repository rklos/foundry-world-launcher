module.exports = {
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'only-warn',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'max-len': [ 1, {
      code: 120,
      comments: 150,
      ignoreStrings: true,
    }],
    'array-bracket-spacing': [ 1, 'always', {
      arraysInArrays: false,
      objectsInArrays: false,
    }],
    'import/extensions': [ 2, {
      tsx: 'never',
    }],
    'no-unused-vars': 0,
    'no-await-in-loop': 0,
    'no-plusplus': 0,
    'class-methods-use-this': 0,
    'lines-between-class-members': [ 1, { enforce: [{ blankLine: 'always', prev: 'method', next: 'method' }] }],
    'import/prefer-default-export': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/require-default-props': 0,
    'react/jsx-first-prop-new-line': [ 1, 'never' ],
    'react/jsx-closing-bracket-location': [ 1, 'after-props' ],
    'react/jsx-indent-props': [ 2, 'first' ],
    'react/jsx-filename-extension': [ 1, { extensions: [ '.jsx', '.tsx' ] }],
    'react/jsx-curly-spacing': [ 1, { when: 'always', children: true, objectLiterals: 'never' }],
    // Doesn't work: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/511
    'jsx-a11y/label-has-associated-control': 0,
    '@typescript-eslint/consistent-type-definitions': [ 1, 'interface' ],
    '@typescript-eslint/consistent-type-imports': 1,
    '@typescript-eslint/member-delimiter-style': 1,
  },
};
