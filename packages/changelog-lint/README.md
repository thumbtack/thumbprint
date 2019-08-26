# `changelog-lint`

This linter ensures that changelogs are following the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) specification.

| Rule | Description | Status |
| --- | --- | --- |
| `changelog-heading-1-first` | enforce that the changelog begins with a top-level heading | ✅ |
| `changelog-heading-1-num-occurences` | disallow more than one top-level heading | ✅ |
| `changelog-heading-1-text` | enforce that the top-level heading says “Changelog” | ✅ |
| `changelog-heading-2-dash` | enforce that the second-level heading contains a dash “-“ separated by one space on each side | ✅ |
| `changelog-heading-2-unreleased-num-occurrences` | enforce that there is one second-level heading that says “Unreleased“ | ✅ |
| `changelog-heading-2-valid-date` | enforce that second-level headings (that aren't “Unreleased“) contain a date formatted as `YYYY-MM-DD` | ✅ |
| `changelog-heading-2-valid-semver` | enforce that second-level headings (that aren't “Unreleased“) contain a version that follows Semantic Versioning | ✅ |
| `changelog-heading-3-duplicate-sections` | enforce that versions don't include duplicate third-level headings | ✅ |
| `changelog-heading-3-text-contents` | enforce that third-level headings contain a valid change type | ✅ |
| `changelog-list-semver-severity` | enforce that list items contain a valid severity label | ✅ |
| `changelog-list-has-change-type` | enforce that a change is part of a valid change type | ❌ |
