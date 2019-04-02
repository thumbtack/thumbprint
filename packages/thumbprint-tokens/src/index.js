#!/usr/bin/env node
const _ = require('lodash');
const path = require('path');
const glob = require('glob');
const fse = require('fs-extra');
const handlebars = require('handlebars');

const outputs = [
    { slug: 'javascript-cjs', distName: 'index.js' },
    { slug: 'javascript-es', distName: 'index.js' },
    { slug: 'scss', distName: '_index.scss' },
];

const compile = (output, tokens) => {
    const template = fse.readFileSync(require.resolve(`./templates/${output}.handlebars`), 'utf-8');

    // eslint-disable-next-line import/no-dynamic-require, global-require
    const { formatValue, formatId } = require(`./helpers/${output}`);
    handlebars.registerHelper('formatValue', formatValue);
    handlebars.registerHelper('formatId', formatId);

    return handlebars.compile(template)(tokens);
};

(() => {
    const files = glob.sync(path.resolve(__dirname, './tokens/*.json'));

    const allFiles = files.map(file => fse.readFileSync(file).toString());
    const allFilesJSON = allFiles.map(fileText => JSON.parse(fileText));
    // All of the tokens in a flat array.
    const allTokens = _.flatten(allFilesJSON.map(fileJSON => fileJSON.tokens));

    outputs.forEach(({ slug, distName }) => {
        const contents = compile(slug, allTokens);
        const dist = path.resolve(__dirname, `../dist/${slug}/${distName}`);
        fse.outputFileSync(dist, contents);
    });
})();
