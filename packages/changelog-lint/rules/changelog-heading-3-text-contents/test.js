const test = require('../../test-utils');
const rule = require('./');

const valid = [
    '### Added',
    '### Changed',
    '### Deprecated',
    '### Removed',
    '### Fixed',
    '### Security',
];

const invalid = ['### Add', '### Foo'];

test({
    rule,
    valid,
    invalid,
});
