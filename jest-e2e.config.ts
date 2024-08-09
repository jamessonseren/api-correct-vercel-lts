import config from './jest.config';

export default {
  ...config,
  testEnvironment: './prisma/prisma-test-environment.ts',
  testMatch: [
    "**/**/*.e2e-spec.ts"
  ],
  // testRegex: '.e2e-spec.ts$',
};