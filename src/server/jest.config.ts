export default {
  name: 'server',
  displayName: 'server',
  coverageProvider: 'v8',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.server.spec.json',
    },
  },
  moduleNameMapper: {
    '@server/(.*)': '<rootDir>/$1',
    '@shared/(.*)': '<rootDir>/$1',
  },
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
