# Changelog

## Unreleased

## 3.4.0 - 2019-11-06

### Added

-   [Minor] Add `10:13` aspect ratio class.

## 3.3.2 - 2019-10-17

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 3.3.1 - 2019-09-17

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 3.3.0 - 2019-09-03

### Added

-   [Minor] Add `box-shadow` classes based on the shadow tokens.

### Changed

-   [Patch] Upgrade `node-sass-tilde-importer`, a `devDependency`. This does not affect the outputted code.

## 3.2.15 - 2019-08-21

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 3.2.14 - 2019-07-31

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 3.2.13 - 2019-07-15

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 3.2.12 - 2019-07-01

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 3.2.11 - 2019-06-20

### Changed

-   [Patch] Update version of the Thumbprint SCSS dependency.

## 3.2.10 - 2019-06-18

### Changed

-   [Patch] Update version of the Thumbprint SCSS dependency.

## 3.2.9 - 2019-06-11

### Changed

-   [Patch] Update version of the Thumbprint SCSS dependency.

## 3.2.8 - 2019-06-03

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 3.2.7 - 2019-05-28

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 3.2.6 - 2019-05-24

### Changed

-   [Patch] Update some token names that were renamed. This doesn't affect the outputted code.

## 3.2.5 - 2019-05-17

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency. This doesn't affect the outputted code.

## 3.2.4 - 2019-05-15

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency. This doesn't affect the outputted code.

## 3.2.3 - 2019-04-08

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 3.2.2 - 2019-04-02

### Changed

-   [Patch] Update version of the Thumbprint SCSS and Thumbprint Tokens dependencies. This doesn't affect the output of Atomic.

## 3.2.1 - 2019-03-28

-   [Patch] Update version of the Thumbprint SCSS dependency. This doesn't affect the output of Atomic.

## 3.2.0 - 2019-03-26

### Added

-   [Minor] Add `pre-line` class for `white-space: pre-line`. (#177)

## 3.1.7 - 2019-03-25

### Changed

-   [Patch] Update version of dependencies (including Autoprefixer).

## 3.1.6 - 2019-03-11

### Changed

-   [Patch] Update version of dependencies. This doesn't affect the output of Atomic.

## 3.1.5 - 2019-02-20

### Changed

-   [Patch] Update version of the Thumbprint SCSS dependency. This doesn't affect the output of Atomic.

## 3.1.4 - 2019-02-08

### Changed

-   [Patch] Use tilde imports in Node Sass with `node-sass-tilde-importer`. This doesn't affect the published code.

## 3.1.3 - 2019-02-07

### Changed

-   [Patch] Backwards compatible update of Tokens version.
-   [Patch] Use `@thumbtack/thumbprint-scss` instead of `@thumbtack/tp-ui-core-mixin`. This is a behind-the-scenes change that doesn't affect the the output. (#38)

## 3.1.2 - 2019-01-30

### Changed

-   [Patch] Use Apache License 2.0.

## 3.1.1 - 2019-01-24

### Changed

-   [Patch] Internal shuffle of files. This does not affect consumers of Thumbprint Atomic.

## 3.1.0 - 2019-01-04

### Added

-   [Minor] Add `color-inherit` class to `color` package in order to replace and deprecate `tp-link--inherit`. (#1412)

## 3.0.0 - 2018-12-14

### Removed

-   [Major] Remove `manifest.json` from `dist`. This is a breaking change but only affects users that were importing the `manifest.json` file.

## 2.2.5 - 2018-11-27

### Changed

-   [Patch] Upgrade version of Thumbprint Tokens.

## 2.2.4 - 2018-11-14

### Changed

-   [Patch] Third attempt to publish to `@thumbtack` org on NPM.

## 2.2.2 - 2018-11-14

### Changed

-   [Patch] Second attempt to publish to `@thumbtack` org on NPM.

## 2.2.1 - 2018-11-14

### Changed

-   [Patch] Publish to `@thumbtack` org on NPM.

## 2.2.0 - 2018-10-22

### Added

-   [Minor] Add aspect ratio classes and documentation.

### Changed

-   [Patch] Add `%` to unitless `flex-basis` for IE 11 compatibility (#1273).

## 2.1.1 - 2018-09-12

### Changed

-   [Patch] Upgrade version of Prettier and Thumbprint Tokens.

## 2.1.0 - 2018-09-04

### Added

-   [Patch] Add snapshot testing to Thumbprint Atomic. (#1129)
-   [Minor] Add redundant `*0` scale classes to `cooordinates` and `height` packages so that the `0` value is available to both the scale and literal value classes. (#1190)

## 2.0.0 - 2018-08-28

### Changed

-   [Major] Changed 6 height classes and their responsive variations that were using the old `/` syntax, e.g., `h-1/4` is now `h-25`. This conversion aligns them with the syntax as other percentage classes.

### Fixed

-   [Patch] Using `css-mqpacker` to group media queries together to prevent specificity overrides. (#1165)
-   [Patch] Because `css-mqpacker` undoes any previously applied minification, `node-sass` options `--source-map true --output-style compressed` were removed and replaced with `cssnano` to minify along with the `--map` flag to generate the sourcemap.

## 1.0.0 - 2018-08-22

### Changed

-   [Major] Changed responsive class syntax from colon to underscore due to incompatibility with the `composes` functionality in CSS Modules. For example, `s:pa3` is now `s_pa3`.

### Added

-   [Patch] Added mising `%` sign from grid `col-7` classes.

## 0.3.3 - 2018-08-17

### Added

-   [Patch] Swapped hard-coded values for spacer tokens in `coordinates`, `grid`, `height`, `margin`, `max-width`, `padding`, and `width` packages.
-   [Patch] Swapped hard-coded values for border radius tokens in `border-radius`.

### Changed

-   [Patch] Use font weights from Thumbprint Tokens.

## 0.3.2 - 2018-08-07

### Changed

-   [Major] Removing fractions from width classes, using `w-N` instead, e.g. `w-30` for `30%`.

## 0.3.1 - 2018-08-03

### Changed

-   [Patch] Separating hover styles into each line instead of two classes sharing declaration.

## 0.3.0 - 2018-08-02

### Added

-   [Minor] Added `grid` package to atomic.

### Changed

-   [Minor] Hardcode percentages in `grid` package because IE Edge doesn't properly calculate `calc`.

### Fixed

-   [Patch] Add missing `!important` to `truncate` package.
-   [Patch] Update examples with `grid` classes instead of `tp-grid`.
-   [Patch] Re-add previously removed `min-width/height` properites, found situation where they are needed.

## 0.2.1 - 2018-07-26

### Changed

-   [Patch] Added `@thumbprint` dependencies accidentally removed from `flexbox` package.
-   [Patch] Remove extra space between `@thumbprint` dependencies in `display` package.

## 0.2.0 - 2018-07-25

### Added

-   [Minor] Added `flex-1`, `flex-2`, and `flex-3` responsive classes.
-   [Minor] Remove `min-width/height` properites, cannot reproduce bugs in browsers that previously required it.
-   [Minor] Publish a manifest that can be consumed by other packages to get a list of the class names in each of the sub-packages.
-   [Minor] Added Tachyons-style `hover-` classes for colors and backgrounds.
-   [Minor] Remove items we don't support: `border-radius: 12px`, `border-width: 5px`, widest `max-width` uses token.

## 0.1.0 - 2018-07-23

### Added

-   [Minor] Created package for Thumbprint Atomic.
