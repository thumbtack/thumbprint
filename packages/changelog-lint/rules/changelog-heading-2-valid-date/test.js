const test = require('../../test-utils');
const rule = require('./');

const valid = ['## 2012-03-03'];

const invalid = [
    '## 2012-03-90',
    '## 1.1.1 - 20133-01-01',
    '## 1.1.1 - 2013-13-01',
    '## 1.1.1 - 2013-12-32',
    '## 1.1.1 - 2013-1-20',
    '## 1.1.1 - 2013-01-1',
    '## 1.1.1 - 2013-1-1',
];

test({
    rule,
    valid,
    invalid,
});
