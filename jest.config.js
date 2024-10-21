export default {
  testEnvironment: 'jest-environment-jsdom', // Вказуємо на нове середовище
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.module\\.scss$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  extensionsToTreatAsEsm: ['.jsx'],
};
