const sass = require('node-sass');
const fs = require('fs');
const importer = require('node-sass-tilde-importer');
const tmp = require('tmp');

it('throws error if variable is not provided correctly', () => {
    let error = null;

    try {
        sass.renderSync({
            file: 'packages/thumbprint-font-face/_index.scss',
            importer,
        }).css.toString();
    } catch (e) {
        error = e;
    }

    expect(error).not.toBeNull();
});

it('works if variable is provided', () => {
    const file = tmp.fileSync({ dir: process.cwd() });

    fs.writeFileSync(
        file.name,
        `$thumbprint-font-url: 'https://example.com/fonts/';\n${fs.readFileSync(
            'packages/thumbprint-font-face/_index.scss',
            'utf-8',
        )}`,
    );

    const css = sass
        .renderSync({
            file: file.name,
            importer,
        })
        .css.toString();
    expect(css).toMatchSnapshot();

    file.removeCallback();
});
