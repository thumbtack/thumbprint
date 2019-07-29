#!/bin/bash
yarn prettier "**/*.{ts,tsx,js,jsx,css,scss,json,md,mdx,html}" --list-different || (c=$?; echo "
⚠️  Some files in this branch have not been formatted with Prettier. Please run 'yarn run format' to format them.
"; (exit $c))
