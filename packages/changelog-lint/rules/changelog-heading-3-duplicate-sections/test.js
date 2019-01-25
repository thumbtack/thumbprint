const test = require('../../test-utils');
const rule = require('./');

const valid = [
    '### Foo',
    `### Foo

### Bar

### Baz`,
];

const invalid = [
    `## 1.2.3 - 2010-02-02

### Foo

### Bar

### Foo`,
];

test({
    rule,
    valid,
    invalid,
});
