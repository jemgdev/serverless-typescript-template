/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.serverless/',
    '<rootDir>/undefined/',
    '<rootDir>/build/',
    '<rootDir>/dist/',
  ],
  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@usecases/(.*)$': '<rootDir>/src/usecases/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  coverageThreshold: {
    global: {
      statements: 80,
      functions: 80,
      branches: 80,
      lines: 80,
    },
  },
};