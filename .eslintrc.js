module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-useless-escape': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0 // 允许在尾部使用! 断定对象非null
  },

  overrides: [
    {
      files: ['server/*'],
      parserOptions: {
        ecmaVersion: 13,
        parser: 'espree'
      },
      rules: {
        '@typescript-eslint/no-var-requires': 0
      }
    }
  ]
};
