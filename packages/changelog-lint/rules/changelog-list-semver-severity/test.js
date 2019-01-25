const test = require('../../test-utils');
const rule = require('./');

const valid = [
    '* [Major] ',
    '* [Minor] ',
    '* [Patch] ',
    '* [Major] Foo',
    '* [Minor] Foo',
    '* [Patch] Foo',
];

const invalid = [
    '* Major ',
    '* Minor ',
    '* Patch ',
    '* [Majorr] ',
    '* [Minorr] ',
    '* [Patchh] ',
    '* [Major]',
    '* [Minor]',
    '* [Patch]',
];

test({
    rule,
    valid,
    invalid,
});
