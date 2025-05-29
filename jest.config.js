/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  modulePathIgnorePatterns: ['<rootDir>/.serverless/'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.serverless/',
    '<rootDir>/undefined/',
    '<rootDir>/build/',
    '<rootDir>/dist/',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      functions: 80,
      branches: 80,
      lines: 80,
    },
  },
  silent: false,
  detectOpenHandles: true,
  verbose: true,
  cache: false,
}
