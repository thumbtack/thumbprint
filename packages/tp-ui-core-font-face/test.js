const sass = require('node-sass');
const fs = require('fs');
const importer = require('node-sass-tilde-importer');

it('throws error if variable is not provided correctly', () => {
    let error = null;

    try {
        sass.renderSync({
            file: 'packages/tp-ui-core-font-face/_index.scss',
            importer,
        }).css.toString();
    } catch (e) {
        error = e;
    }

    expect(error).not.toBeNull();
});

it('works if variable is provided', () => {
    const css = sass
        .renderSync({
            data: `$thumbprint-font-url: 'https://example.com/fonts/';\n${fs.readFileSync(
                'packages/tp-ui-core-font-face/_index.scss',
                'utf-8',
            )}`,
            importer,
        })
        .css.toString();
    expect(css).toMatchSnapshot();
});
