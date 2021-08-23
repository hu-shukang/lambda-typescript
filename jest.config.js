module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '~/([a-zA-Z0-9/.\\-_]*)': '<rootDir>/$1',
    '/^~/(.*)$/': './$1',
  },
  testMatch: ['**/tests/**/*.spec.[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/app/**/*.ts', '<rootDir>/app/**/*.js'],
  testEnvironment: 'jsdom',
}
