import jestPlugin from 'eslint-plugin-jest'
import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'
import globals from 'globals'

export default tseslint.config(
  tseslint.configs.recommended,
  eslint.configs.recommended,
  {
    ignores: [
      'jest.config.js',
      'node_modules',
      '.serverless',
      'undefinded',
      'coverage',
      'dist',
      'build',
    ],
  },
  {
    files: ['src/**/*.ts', 'test/**/*.test.ts'],
  },
  {
    files: ['src/**/*.ts', 'test/**/*.test.ts'],
    languageOptions: { globals: globals.jest },
    plugins: {
      ...jestPlugin,
    },
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    env: {
      node: true,
      jest: true,
    },
    rules: {
      SemicolonPreference: 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-undef': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console': ['warn', { allow: ['log', 'warn'] }],
      'no-unused-vars': 'off',
    },
  },
)
