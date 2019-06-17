# Thumbprint Codemods

This package is a collection of codemods that assist with breaking changes in Thumbprint.

## Usage

```
Usage
  $ npx @thumbtack/thumbprint-codemods <folder> --codemod '<codemod-name>'

Options
  <folder>       [required] Folder that you recursively want to migrate.
  --codemod      [required] Name of the codemod to run.
  -d, --dry-run  Don't write anything, just show what files would have been changed.
  --version      Prints the version.
  --help         Prints this message.

Examples
  $ npx @thumbtack/thumbprint-codemods ./path/to/folder --codemod 'button-secondary-to-tertiary'
```

You can find a list of the [codemods in the `src` directory](https://github.com/thumbtack/thumbprint/tree/master/packages/thumbprint-codemods/src). The directory names (`button-secondary-to-tertiary`, for example) are also the codemod names.
