const importer = require('node-sass-tilde-importer');

/**
 * This allows us to use the tilde import in Sass. It is supported out of the
 * box with the CSS loader in Webpack environments. This is a separate file
 * (rather than a command line argument) so that we can use Node to look up
 * the path to `node-sass-tilde-importer`. Otherwise, we'd have to use
 * `node-sass --importer=../../node_modules/node-sass-tilde-importer` which
 * could fail if Yarn decided not to hoist it to the project root. This could
 * happen if another package in this monorepo also used
 * `node-sass-tilde-importer` and both of the SemVer ranges didn't overlap.
 */
module.exports = importer;
