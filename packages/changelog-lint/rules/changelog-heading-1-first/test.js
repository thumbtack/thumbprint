const test = require('../../test-utils');
const rule = require('./');

const valid = ['# Changelog'];
const invalid = [
    `foo

# Changelog`,
    `> Hi There!

# Changelog`,
];

test({
    rule,
    valid,
    invalid,
});
