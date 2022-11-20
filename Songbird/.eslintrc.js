module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'CallExpression[callee.object.name="console"][callee.property.name!=/^(log|warn|error|info|trace)$/]',
        message: 'Unexpected property on console object was called',
      },
    ],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      }],
    'no-param-reassign': [
      'error',
      {
        props: false,
      }],
    'guard-for-in': 0,
  },
};
