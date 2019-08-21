const JSZip = require('jszip');
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

it('outputted Android matches snapshot', () => {
    const output = fs.readFileSync('packages/thumbprint-tokens/dist/android/index.xml', 'utf-8');
    expect(output).toMatchSnapshot();
});

it('outputted iOS matches snapshot', async () => {
    // The output is stored as a `zip`, but we unzip it for the purpose of this test so that we
    // can compare the token file as a string.
    const zipBuffer = fs.readFileSync('packages/thumbprint-tokens/dist/ios.zip');
    const files = await JSZip.loadAsync(zipBuffer);
    const output = await files.file('ThumbprintTokens.swift').async('string');

    expect(output).toMatchSnapshot();
});
