#!/usr/bin/env node
const path = require('path');
const glob = require('glob');
const fse = require('fs-extra');
const handlebars = require('handlebars');
// This import temporarily exists to help ease the migration from Tokens v7 to v8.
// https://github.com/thumbtack/thumbprint/pull/242
const tempTokens = require('./temp-tokens');

const outputs = [
    { slug: 'javascript-cjs', distName: 'index.js' },
    { slug: 'javascript-es', distName: 'index.js' },
    { slug: 'scss', distName: '_index.scss' },
];

const compile = (output, tokens) => {
    const template = fse.readFileSync(require.resolve(`./templates/${output}.handlebars`), 'utf-8');

    // eslint-disable-next-line import/no-dynamic-require, global-require
    const helpers = require(`./helpers/${output}`);

    // Dynamically register the helpers for each `template`.
    helpers.forEach(({ name, value }) => {
        handlebars.registerHelper(name, value);
    });

    return handlebars.compile(template)(tokens) + tempTokens[output];
};

(() => {
    const files = glob.sync(path.resolve(__dirname, './tokens/*.json'));

    const allFiles = files.map(file => fse.readFileSync(file).toString());

    // All of the files and tokens as a big array.
    const allTokens = allFiles.map(fileText => JSON.parse(fileText));

    outputs.forEach(({ slug, distName }) => {
        const contents = compile(slug, allTokens);
        const dist = path.resolve(__dirname, `../dist/${slug}/${distName}`);
        fse.outputFileSync(dist, contents);
    });
})();
