const test = require('../../test-utils');
const rule = require('./');

const valid = ['## Unreleased'];

const invalid = [
    '## UNRELEASED',
    `## Unreleased

## Unreleased`,
];

test({
    rule,
    valid,
    invalid,
});
