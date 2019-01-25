const test = require('../../test-utils');
const rule = require('./');

const valid = ['# Changelog'];
const invalid = ['# Change Log', '# Change  Log', '# Changeee  Log'];

test({
    rule,
    valid,
    invalid,
});
