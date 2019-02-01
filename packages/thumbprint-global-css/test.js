const prettier = require('prettier');
const fs = require('fs');

it('compiles correctly', () => {
    const css = fs.readFileSync(
        'packages/thumbprint-global-css/dist/thumbprint-global.css',
        'utf-8',
    );
    // Format the CSS to make it easier to read the diff.
    const formattedCSS = prettier.format(css, {
        parser: 'css',
    });

    expect(formattedCSS).toMatchSnapshot();
});
