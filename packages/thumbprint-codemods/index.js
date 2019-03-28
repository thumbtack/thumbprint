#!/usr/bin/env node
/* eslint-disable no-console, global-require */
const meow = require('meow');
const globby = require('globby');
const ora = require('ora');
const fs = require('fs-extra');
const pLimit = require('p-limit');
const chalk = require('chalk');

// The list of codemods that we support.
const codemods = {
    'thumbprint-react-consolidation': require('./src/thumbprint-react-consolidation/index'),
};

// Since we're CPU bound, loading lots of files at the same time just hurts performance
const limit = pLimit(5);
let spinner;

const cli = meow({
    help: `
Usage
  $ thumbprint-codemods '<glob>' --codemod '<codemod-name>'

Options
  <glob>         [required] Glob of files you want to migrate (\`node_modules\` is automatically ignored).
  codemod        [required] Name of the codemod to run.
  -d, --dry-run  Don't write anything, just show what files would have been changed.
  --version      Prints the version.
  --help         Prints this message.

Examples
  $ thumbprint-codemods '**/*.js' --codemod 'thumbprint-react-consolidation'
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

async function main() {
    // A glob is required
    if (cli.input.length === 0) {
        cli.showHelp();
        return;
    }

    if (cli.flags.codemod.length === 0) {
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

    spinner = ora().start();

    const filepaths = await globby([...cli.input, '!**/node_modules/**']);

    if (filepaths.length === 0) {
        spinner.fail('No matching files found');
        process.exitCode = 2;
        return;
    }

    const results = await Promise.all(
        filepaths.map(filepath =>
            limit(async () => {
                // Limit concurrency
                const contents = await fs.readFile(filepath, { encoding: 'utf-8' });

                spinner.text = filepath;
                spinner.render(); // Manually trigger a render before the event loop gets locked

                const codemod = codemods[cli.flags.codemod];
                const newContents = codemod(contents);

                if (newContents) {
                    if (!cli.flags.dryRun) {
                        await fs.writeFile(filepath, newContents);
                    }

                    return chalk.white(filepath);
                }

                return chalk.gray(filepath);
            }),
        ),
    );

    spinner.stop();
    console.log(results.join('\n'));
}

main().catch(err => {
    // Handle uncaught errors gracefully
    if (spinner) {
        spinner.fail();
    }
    console.error(err);
    process.exitCode = 1;
});
