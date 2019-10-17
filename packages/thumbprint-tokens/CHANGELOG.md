# Changelog

## Unreleased

## 8.3.3 - 2019-10-17

### Added

-   [Minor] Add TypeScript definitions to the CJS and ESM tokens, and switch to using the TypeScript compiler to generate these files.

## 8.3.2 - 2019-09-17

### Changed

-   [Patch] Upgrade `handlebars`, a `devDependency`. This does not affect the outputted code.

## 8.3.1 - 2019-09-03

### Changed

-   [Patch] Upgrade `fs-extra`, a `devDependency`. This does not affect the outputted code.

## 8.3.0 - 2019-08-21

### Added

-   [Minor] Add shadow tokens for web.

### Deprecated

-   [Patch] Deprecate `shadow-card` token for web. It has been replaced by `shadow-100`, `shadow-200`, `shadow-300`, and `shadow-400`

## 8.2.0 - 2019-07-31

### Added

-   [Minor] Create an Android output.

## 8.1.1 - 2019-07-15

### Changed

-   [Patch] Refactor source files to document iOS tokens. This does not affect the "dist" files.

## 8.1.0 - 2019-07-01

### Added

-   [Minor] Add iOS output and publish as the `ThumbprintTokens` CocoaPod.

## 8.0.2 - 2019-06-03

### Changed

-   [Patch] Remove the temporary tokens added in `8.0.1`.

## 8.0.1 - 2019-05-28

### Changed

-   [Patch] Temporarily bring back removed Tokens to make it easier to migrate to `8.0.0`.

## 8.0.0 - 2019-05-24

### Changed

-   [Major] Rename [a handful of SCSS and JavaScipt tokens](https://github.com/thumbtack/thumbprint/pull/242).
-   [Patch] Change the internals of how tokens are stored and generated. This does not affect the outputted code.

## 7.0.0 - 2019-05-17

### Removed

-   [Major] Remove all deprecated tokens. Old values can be found on [a previous version of the Thumbprint site](https://5cdc5c977a1bb7000855f899--thumbprint.netlify.com/tokens/scss/).

## 6.3.4 - 2019-05-15

### Changed

-   [Patch] Remove the "name" field from tokens in their source files. This does not affect the outputted code.

## 6.3.3 - 2019-04-08

### Changed

-   [Minor] Add supported platforms to each token (#198)

## 6.3.2 - 2019-04-02

### Changed

-   [Patch] Simplify script that generates tokens.
-   [Patch] Under-the-hood changes that will allow for future tokens without a `tp` prefix.

## 6.3.1 - 2019-03-11

### Changed

-   [Patch] Remove notion of "private" tokens. They now all documented and can be used. (#145)

## 6.3.0 - 2019-02-07

### Added

-   [Minor] Add title type styles for sizes 6, 7, and 8. (#70)

## 6.2.4 - 2019-01-30

### Changed

-   [Patch] Use Apache License 2.0.

## 6.2.3 - 2018-11-27

### Changed

-   [Patch] Publish package to public NPM.

### Deprecated

-   [Patch] Deprecate the tokens in the "Avatar" section.
