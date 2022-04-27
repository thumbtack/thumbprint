#!/usr/bin/env node

import fs from 'fs';
import sass from 'sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import glob from 'glob';
import promiseMap from 'p-map';
import nodeSassImporter from 'node-sass-tilde-importer';

/**
 * Ensures that errors throw an error with a stacktrace.
 */
process.on('unhandledRejection', error => {
    throw error;
});

const compileSass = async fromFile => {
    const { css } = sass.renderSync({
        file: fromFile,
        importer: nodeSassImporter,
    });

    const processedCss = await postcss([autoprefixer, cssnano]).process(css, {
        from: undefined,
    });

    // Naively turns `component.scss` into `component.css` and
    // `scss/alert.scss` into `alert.css`.
    const outputFileName = fromFile.replace('scss/', '').replace('.scss', '.css');

    return fs.writeFileSync(outputFileName, processedCss.css);
};

(async () => {
    // Create a single CSS file with all the code.
    await compileSass('components.scss');

    // Create individual CSS files for each component.
    const individualSassFiles = glob.sync('scss/*.scss');
    await promiseMap(individualSassFiles, compileSass);
})();
