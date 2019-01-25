const test = require('../../test-utils');
const rule = require('./');

const valid = ['# Changelog'];

const invalid = [
    `# Changelog

# Changelog`,
];

test({
    rule,
    valid,
    invalid,
});
