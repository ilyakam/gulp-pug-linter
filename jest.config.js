module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '*.js',
    '!*config.js',
    '!gulpfile.js',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov'],
  testEnvironment: 'node',
};
