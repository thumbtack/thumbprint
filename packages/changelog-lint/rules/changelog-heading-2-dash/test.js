const test = require('../../test-utils');
const rule = require('./');

const valid = [
    '## Unreleased',
    '## 1.3.2 - 2010-02-02',
    `## Unreleased

## 1.3.2 - 2010-02-02`,
];

const invalid = [
    '## 1.3.2 -2010-02-02',
    '## 1.3.2-2010-02-02',
    '## 1.3.2 -  2010-02-02',
    '## 1.3.2  -  2010-02-02',
    '## 1.3.2 — 2010-02-02',
    '## 1.3.2 -- 2010-02-02',
    '## 1.3.2 2010-02-02',
];

test({
    rule,
    valid,
    invalid,
});
