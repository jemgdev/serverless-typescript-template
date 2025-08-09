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
    semi: ['error', 'never']
  }
}
