# Changelog

## Unreleased

## 0.5.5 - 2022-10-06

### Security

-   [Patch] Update version of lodash

## 0.5.4 - 2022-06-23

### Changed

-   [Patch] Remove test comment to test Lerna publishing.

## 0.5.3 - 2022-06-22

### Changed

-   [Patch] Add test comment to test lerna publishing.

## 0.5.2 - 2022-06-22

### Changed

-   [Patch] Fix or disable new ESLint rules.

## 0.5.1 - 2020-06-18

### Changed

-   [Patch] Upgrade version of Prettier.

## 0.5.0 - 2020-01-09

### Added

-   [Minor] Support TypeScript (`.ts`, `.tsx`) files.

### Changed

-   [Patch] Upgrade jscodeshift from `0.6.4` to `0.7.0`.
-   [Patch] Change the formatting in the `package.json` field.

## 0.4.0 - 2019-12-05

### Added

-   [Minor] Write codemod for Great Alignment React renames. (#566)

## 0.3.3 - 2019-09-03

### Changed

-   [Patch] Code formatting tweaks due to Prettier version bump.
-   [Patch] Upgrade dependencies.

## 0.3.2 - 2019-06-12

### Fixed

-   [Patch] Exit instead of returning in the CLI.

## 0.3.1 - 2019-06-11

### Fixed

-   [Patch] Fixed a bug in avatar-sizes codemod where files were being modified even if they did not contain an Avatar. Also internally tidied up library functions to make API consistent.

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
