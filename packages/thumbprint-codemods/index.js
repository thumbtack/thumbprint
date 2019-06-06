#!/usr/bin/env node
/* eslint-disable no-console, global-require */
const meow = require('meow');
const execa = require('execa');
const globby = require('globby');
const { keyBy } = require('lodash');

// The list of codemods that we support. Looks like this:
// {
//    'avatar-import-name': './src/avatar-import-name/index.js',
//    'button-secondary-to-tertiary': './src/button-secondary-to-tertiary/index.js'
// }
const codemods = keyBy(globby.sync('./src/*/index.js'), path => path.split('/')[2]);

const cli = meow({
    help: `
Usage
  $ npx @thumbtack/thumbprint-codemods <files> --codemod '<codemod-name>'

Options
  <files>        [required] Files you want to migrate.
  --codemod      [required] Name of the codemod to run.
  -d, --dry-run  Don't write anything, just show what files would have been changed.
  --version      Prints the version.
  --help         Prints this message.

Examples
  $ npx @thumbtack/thumbprint-codemods **/*.jsx --codemod 'button-secondary-to-tertiary'
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
    return;
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

const p = execa('jscodeshift', [
    ...cli.input,
    '-t',
    codemods[cli.flags.codemod],
    cli.flags.dryRun ? '-d' : ' ',
]);

p.stdout.pipe(process.stdout);
p.stderr.pipe(process.stderr);
