#!/usr/bin/env node

const fse = require('fs-extra');
const sass = require('sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
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

    const outputFileName = fromFile.replace('src/', 'dist/').replace('.scss', '.css');

    return fse.outputFile(outputFileName, processedCss);
};

(async () => {
    // Create a single CSS file with all the code.
    await compileSass('src/atomic.scss');
})();
