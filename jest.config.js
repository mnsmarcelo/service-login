module.exports = {
    roots: ['<rootDir>/tests'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/main/**',
        '!<rootDir>/src/**/*-protocols.ts',
        '!**/protocols/**',
        '!**/test/**',
    ],
    setupFiles: ['./setup-tests.ts'],
    preset: '@shelf/jest-mongodb',
    coverageDirectory: 'coverage',
    coverageProvider: 'babel',
    testEnvironment: 'node',
    transform: {
        '.+\\.ts$': 'ts-jest',
    },
    moduleNameMapper: {
        'tests/(.*)': '<rootDir>/tests/$1',
        'src/(.*)': '<rootDir>/src/$1',
    },
    testMatch: ['**/*.spec.ts'],
}
