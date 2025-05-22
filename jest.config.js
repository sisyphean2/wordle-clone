module.exports = {
    testEnvironment: "node",
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.json',
        },
    },
    transformIgnorePatterns: [
        "node_modules/(?!troublesome-dependency/.*)",
    ],
    moduleNameMapper: {
      'src/(.*)': '<rootDir>/src/$1',
      'tests/(.*)': '<rootDir>/__tests__/$1',
    },
    roots: [
        "<rootDir>/src"
      ],
      testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
      ],
      transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
      },
  }