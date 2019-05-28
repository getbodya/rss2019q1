module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
  moduleFileExtensions: [
    'js',
  ],
  moduleNameMapper: {

    '\\.css$': '<rootDir>/src/views/AppView/index.js',
  },
};
