const fs = require('fs');

it('outputted CommonJS matches snapshot', () => {
    const output = fs.readFileSync(
        'packages/thumbprint-tokens/dist/javascript-cjs/index.js',
        'utf-8',
    );
    expect(output).toMatchSnapshot();
});

it('outputted ES module matches snapshot', () => {
    const output = fs.readFileSync(
        'packages/thumbprint-tokens/dist/javascript-es/index.js',
        'utf-8',
    );
    expect(output).toMatchSnapshot();
});

it('outputted SCSS matches snapshot', () => {
    const output = fs.readFileSync('packages/thumbprint-tokens/dist/scss/_index.scss', 'utf-8');
    expect(output).toMatchSnapshot();
});
