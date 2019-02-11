module.exports = {
    testMatch: ['<rootDir>/packages/**/?(*.)test.js?(x)'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
};
