#!/usr/bin/env node

// We can't use the Dart Sass CLI directly, since it doesn't support our custom tilde importer.
// So, we have this small wrapper around the Node API that gives us access to it.

import fs from 'fs';
import sass, { LegacyImporter } from 'sass';
import nodeSassImporter from 'node-sass-tilde-importer';

/**
 * Ensures that errors throw an error with a stacktrace.
 */
process.on('unhandledRejection', error => {
    throw error;
});

const compileSass = async (fromFile: string): Promise<void> => {
    // We can't use the new `compile` method because it uses a new API for importers, which don't
    // match our tilde importer. So for now we're stuck with the legacy `renderSync` method.
    const { css } = sass.renderSync({
        file: fromFile,
        // The only difference is in the return type, which doesn't make a difference in practice,
        // so we're safe to typecast here.
        importer: nodeSassImporter as LegacyImporter<'sync'>,
    });

    const outputFileName = fromFile.replace('src/', 'dist/').replace('.scss', '.css');

    return fs.writeFileSync(outputFileName, css);
};

(async (): Promise<void> => {
    // Create a single CSS file with all the code.
    await compileSass('src/thumbprint-global.scss');
})();
