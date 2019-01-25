const test = require('../../test-utils');
const rule = require('./');

const valid = [
    '## Unreleased',
    '## 1.3.2 - ',
    '## 1.3.2-alpha.0 - ',
    `## Unreleased

## 1.3.2 - `,
];

const invalid = ['## 1.2 - ', '## 1.a.0 -'];

test({
    rule,
    valid,
    invalid,
});
