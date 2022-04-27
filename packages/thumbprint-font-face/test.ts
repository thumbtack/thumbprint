/**
 * dart-sass only runs in the Jest `node` environment.
 * See: https://github.com/sass/dart-sass/issues/710
 * @jest-environment node
 */

import sass, { LegacyImporter } from 'sass';
import fs from 'fs';
import importer from 'node-sass-tilde-importer';
import tmp from 'tmp';

it('throws error if variable is not provided correctly', () => {
    let error = null;

    try {
        sass.renderSync({
            file: 'packages/thumbprint-font-face/_index.scss',
            importer: importer as LegacyImporter<'sync'>,
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
            importer: importer as LegacyImporter<'sync'>,
        })
        .css.toString();
    expect(css).toMatchSnapshot();

    file.removeCallback();
});
