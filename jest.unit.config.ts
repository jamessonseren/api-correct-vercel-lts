import config from './jest.config';

export default {
  ...config,
  testMatch: [
    "**/**/*.spec.ts"
  ],
  // testPathIgnorePatterns: ['/node_modules/', '\\.e2e-spec\\.ts$'],
};