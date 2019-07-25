module.exports = {
    testMatch: ['<rootDir>/packages/**/?(*.)test.(j|t)s?(x)'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(j|t)sx?$': 'ts-jest',
    },
};
