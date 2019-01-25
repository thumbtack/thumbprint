const toCJS = require('./javascript-cjs');

test('throws an error when no `id` is provided', () => {
    const token = {
        value: '#3f93f3',
        description: 'Primary color used for links',
    };

    expect(() => toCJS('', token)).toThrow();
});

test('throws an error when no `value` is provided', () => {
    const token = {
        id: 'tp-color__link__base',
        description: 'Primary color used for links',
    };

    expect(() => toCJS('', token)).toThrow();
});
