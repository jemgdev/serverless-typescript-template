module.exports = {
  extends: ['standard-with-typescript'],
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: [
    'dist/**',
    'node_modules/**',
    'test/**'
  ],
  rules: {
    semi: ['error', 'never'],
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      { allowNullableObject: true }
    ],
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/no-extraneous-class': 'off'
  }
}
