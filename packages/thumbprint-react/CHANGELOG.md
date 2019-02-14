# Changelog

## Unreleased

### Changed

-   [Patch] Use a red border in the `caution` button focus state. (#116)

### Fixed

-   [Patch] Fix contents div in ModalDefault with sticky ModalFooter having no height in IE11. (#115)

## 0.2.1 - 2019-02-08

### Changed

-   [Patch] Fix SCSS imports by adding the file extension at the end of the imports.

## 0.2.0 - 2019-02-07

### Added

-   [Minor] Add `Title` sizes `6`, `7`, and `8`. (#70)

### Changed

-   [Patch] Use `@thumbtack/thumbprint-scss` instead of `@thumbtack/tp-ui-core-mixin` and `@thumbtack/tp-ui-core-function`. This is a behind-the-scenes change that doesn't affect the the output. (#38)

### Fixed

-   [Patch] Add `tpColorGray` to fix disabled state of label. It was not grayed out as expected. (#85)
-   [Patch] Bring back `InputRowContext` context that was accidentally removed during consolidation into one NPM package. (#8)
-   [Patch] Revert regression in `StarRating` that was introduced when running it through SVGO.

## 0.1.4 - 2019-01-30

### Changed

-   [Patch] Minimize SVG used in `StarRating` component.
-   [Patch] Use Apache License 2.0.
-   [Patch] Remove two unnecessary comments disabling eslint rules.
-   [Patch] Remove duplicated `rollup` packages in `package.json`.

## 0.1.3 - 2019-01-25

### Changed

-   [Patch] Update links to GitHub Issues/PRs so that they point to our archived repo.

## 0.1.2 - 2019-01-24

### Changed

-   [Patch] Change comments in source files to point to new documentation URLs. This does not affect consumers of Thumbprint React.
-   [Patch] Move close icon into the repo.

## 0.1.1 - 2019-01-10

### Added

-   [Patch] Move all React component source files into this package.

## 0.1.0 - 2019-01-09

### Added

-   [Minor] Created package for Thumbprint React. (#1050)
