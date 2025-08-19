/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  modulePathIgnorePatterns: ['<rootDir>/.serverless/'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.serverless/',
    '<rootDir>/undefined/',
    '<rootDir>/build/',
    '<rootDir>/dist/'
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      functions: 80,
      branches: 80,
      lines: 80
    }
  },
  silent: false,
  detectOpenHandles: true,
  verbose: true,
  cache: false,
  moduleNameMapper: {
    // More specific user paths first
    '^@user/value-objects/(.*)$': '<rootDir>/src/user/domain/value-objects/$1',
    '^@user/domain/(.*)$': '<rootDir>/src/user/domain/$1',
    '^@user/application/(.*)$': '<rootDir>/src/user/application/$1',
    '^@user/usecases/(.*)$': '<rootDir>/src/user/application/usecases/$1',
    '^@user/ports/(.*)$': '<rootDir>/src/user/application/ports/$1',
    '^@user/mappers/(.*)$': '<rootDir>/src/user/application/mappers/$1',
    '^@user/dtos/(.*)$': '<rootDir>/src/user/application/dtos/$1',
    '^@user/infrastructure/(.*)$': '<rootDir>/src/user/infrastructure/$1',
    '^@user/driven/(.*)$': '<rootDir>/src/user/infrastructure/driven/$1',
    '^@user/driving/(.*)$': '<rootDir>/src/user/infrastructure/driving/$1',
    // General user path last
    '^@user/(.*)$': '<rootDir>/src/user/$1',

    // More specific shared paths first
    '^@shared/libraries/(.*)$': '<rootDir>/src/shared/libraries/$1',
    '^@shared/logger/(.*)$': '<rootDir>/src/shared/libraries/logger/$1',
    '^@shared/utils/(.*)$': '<rootDir>/src/shared/utils/$1',
    '^@shared/constants/(.*)$': '<rootDir>/src/shared/utils/constants/$1',
    // General shared path last
    '^@shared/(.*)$': '<rootDir>/src/shared/$1'
  }
}