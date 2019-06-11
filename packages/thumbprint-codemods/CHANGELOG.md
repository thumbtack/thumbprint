# Changelog

## Unreleased

## 0.3.0 - 2019-06-11

### Added

-   [Minor] Add codemod for `Avatar`'s `size` prop breaking change migration. (#25)
-   [Minor] Update Avatar size codemod to support `EntityAvatar`. (#25)
-   [Patch] Refactor out common logic from `avatar-sizes` and `button-secondary-to-tertiary` codemods.

### Changed

-   [Patch] Update version of the Thumbprint SCSS dependency.

## 0.2.3 - 2019-06-06

### Changed

-   [Patch] Add support for passing in folders, not only globs.

## 0.2.2 - 2019-06-06

### Fixed

-   [Patch] Remove empty space from codemod `execa` call that was causing it to fail.
-   [Patch] Use `npx jscodeshift` instead of just `jscodeshift` when running.

## 0.2.1 - 2019-06-06

### Fixed

-   [Patch] Allow codemod CLI to be run from any directory.

## 0.2.0 - 2019-06-06

### Added

-   [Minor] Add codemod for `Button` `secondary` to `tertiary` migration. (#89)

### Changed

-   [Patch] Improve README.
-   [Patch] Simplify maintence of package but dynamically loading the codemods in the CLI rather than hardcoding.

### Removed

-   [Major] Remove the `thumbprint-react-consolidation` since it was using different infrastructure.

## 0.1.0 - 2019-03-28

### Added

-   [Minor] Created package for Thumbprint Codemods.
