module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx',],
      },
    },
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2,],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error',],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', {
      arrays: 'always',
      objects: 'always',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    },],
    semi: 'off',
    '@typescript-eslint/semi': 'warn',
    '@typescript-eslint/member-delimiter-style': 'warn',
    quotes: 'off',
    '@typescript-eslint/quotes': ['warn', 'single',],
    'padding-line-between-statements': 'off',
    '@typescript-eslint/padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: '*',
        next: ['interface', 'type', 'function',],
      },
    ],
    'lines-between-class-members': [
      'warn', 'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    'class-methods-use-this': 'off',

    /**
    * Temporery properties
    */
    'max-classes-per-file': ['error', 5,],
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': 'off',
  },
};
