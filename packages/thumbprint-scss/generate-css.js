#!/usr/bin/env node

const fse = require('fs-extra');
const sass = require('node-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const glob = require('glob');
const promiseMap = require('p-map');
const nodeSassImporter = require('./node-sass-importer');

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

    return fse.outputFile(outputFileName, processedCss);
};

(async () => {
    // Create a single CSS file with all the code.
    await compileSass('components.scss');

    // Create individual CSS files for each component.
    const individualSassFiles = glob.sync('scss/*.scss');
    await promiseMap(individualSassFiles, compileSass);
})();
