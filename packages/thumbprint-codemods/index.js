#!/usr/bin/env node
/* eslint-disable no-console, global-require */
const meow = require('meow');
const execa = require('execa');

// The list of codemods that we support.
const codemods = {
    'button-secondary-to-tertiary': require.resolve('./src/button-secondary-to-tertiary/index'),
};

const cli = meow({
    help: `
Usage
  $ npx @thumbtack/thumbprint-codemods <files> --codemod '<codemod-name>'

Options
  <files>        [required] Files you want to migrate.
  codemod        [required] Name of the codemod to run.
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

if (!cli.flags.codemod) {
    throw Error('The `codemod` argument is required.');
}

// Throw an error if the codemod name isn't valid
if (!codemods[cli.flags.codemod]) {
    const validCodeModsList = Object.keys(codemods)
        .map(c => `• ${c}`)
        .join('\n');

    throw Error(
        `'${
            cli.flags.codemod
        }' is not a valid codemod. Valid options include:\n\n${validCodeModsList}`,
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
