# Changelog

## Unreleased

### Added

-   [Minor] Add `Title` sizes `6`, `7`, and `8`. (#70)

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
