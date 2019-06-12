#!/usr/bin/env node
/* eslint-disable no-console, global-require */
const meow = require('meow');
const execa = require('execa');
const globby = require('globby');
const { keyBy } = require('lodash');
const path = require('path');

// `path.join` and `__dirname` are needed so that this script can be run from other folders.
const globbedCodemods = globby.sync(path.join(__dirname, './src/*/index.js'));

// The list of codemods that we support. Looks like this:
// {
//    'avatar-import-name': './src/avatar-import-name/index.js',
//    'button-secondary-to-tertiary': './src/button-secondary-to-tertiary/index.js'
// }
const codemods = keyBy(globbedCodemods, p => {
    const pathSplitArr = p.split('/');
    return pathSplitArr[pathSplitArr.length - 2];
});

const cli = meow({
    help: `
Usage
  $ npx @thumbtack/thumbprint-codemods <folder> --codemod '<codemod-name>'

Options
  <folder>       [required] Folder that you recursively want to migrate.
  --codemod      [required] Name of the codemod to run.
  -d, --dry-run  Don't write anything, just show what files would have been changed.
  --version      Prints the version.
  --help         Prints this message.

Examples
  $ npx @thumbtack/thumbprint-codemods ./path/to/folder --codemod 'button-secondary-to-tertiary'
  `.trim(),
    flags: {
        'dry-run': {
            type: 'boolean',
            default: false,
            alias: 'd',
        },
        codemod: {
            type: 'string',
        },
    },
});

// A glob is required
if (cli.input.length === 0) {
    cli.showHelp();
    process.exit();
}

// Throw an error if the codemod name isn't valid
if (!cli.flags.codemod || !codemods[cli.flags.codemod]) {
    const validCodeModsList = Object.keys(codemods)
        .map(c => `• ${c}`)
        .join('\n');

    throw Error(
        `The \`codemod\` argument is required and must be one of these:\n\n${validCodeModsList}\n`,
    );
}

const commandArgs = [
    'jscodeshift',
    ...cli.input,
    '--extensions',
    'js,jsx',
    '-t',
    codemods[cli.flags.codemod],
];

if (cli.flags.dryRun) {
    commandArgs.push('-d');
}

// Use `npx` since the person may not have jscodeshift installed globally.
const p = execa('npx', commandArgs);

p.stdout.pipe(process.stdout);
p.stderr.pipe(process.stderr);
