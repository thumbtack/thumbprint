module.exports = {
    testMatch: ['<rootDir>/packages/**/?(*.)test.js?(x)'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    transformIgnorePatterns: ['node_modules/(?!lodash-es/)'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
};
