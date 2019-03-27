# thumbprint-codemods

This package is a collection of codemods that assist with breaking changes in Thumbprint.

The CLI and the `thumbprint-react-consolidation` codemod are forked from [`segment-migration`](https://github.com/segmentio/evergreen-migration) and customized for Thumbtack's needs.

## Usage

```
Usage
  $ npx @thumbtack/thumbprint-codemods '<glob>' --codemod '<codemod-name>'

Options
  <glob>         [required] Glob of files you want to migrate (\`node_modules\` is automatically ignored).
  codemod        [required] Name of the codemod to run.
  -d, --dry-run  Don't write anything, just show what files would have been changed.
  --version      Prints the version.
  --help         Prints this message.

Examples
  $ npx @thumbtack/thumbprint-codemods '<glob>' --codemod 'thumbprint-react-consolidation'
```

| Name                                                                                                                                                   | Description                                                                             | Date    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------- |
| [`thumbprint-react-consolidation`](https://github.com/thumbtack/thumbprint/tree/master/packages/thumbprint-cdemods/src/thumbprint-react-consolidation) | Changes `@thumbtack/tp-ui-react-*` imports into a `@thumbtack/thumbprint-react` import. | 2019-01 |
