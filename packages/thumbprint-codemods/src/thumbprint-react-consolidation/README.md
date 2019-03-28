# thumbprint-react-consolidation

> `thumbprint-react-consolidation` is a fork of [`segment-migration`](https://github.com/segmentio/evergreen-migration) that was customized for Thumbtack's needs.

It rewrites the imports in JavaScript files to combine the all separate `@thumbtack/tp-ui-react-*` imports into a single `@thumbtack/thumbprint-react` import.

_Note: only supports ES2015 `import` statements (not CommonJS `require` calls)._

## Usage

```
Usage
  $ npx @thumbtack/thumbprint-codemods '<glob>' --codemod 'thumbprint-react-consolidation'

Options
  <glob>         [required] Glob of files you want to migrate (\`node_modules\` is automatically ignored).
  codemod        [required] Name of the codemod to run.
  -d, --dry-run  Don't write anything, just show what files would have been changed.
  --version      Prints the version.
  --help         Prints this message.

Examples
  $ ./index.js '**/*.js'
```

## Example

```diff
 import * as _ from 'lodash-es';
 import React from 'react';
 import PropTypes from 'prop-types';
-import { Title, Text } from '@thumbtack/tp-ui-react-type';
-import { ThemedLink } from '@thumbtack/tp-ui-react-link';
-import Button from '@thumbtack/tp-ui-react-button';
-import { Grid, GridColumn } from '@thumbtack/tp-ui-react-grid';
-import ModalDefault, {
+import {
+    Title,
+    Text,
+    ThemedLink,
+    Button,
+    Grid,
+    GridColumn,
+    ModalDefault,
     ModalDefaultHeader,
     ModalDefaultTitle,
     ModalDefaultContent,
     ModalDefaultFooter,
-} from '@thumbtack/tp-ui-react-modal-default';
-import LoaderDots from '@thumbtack/tp-ui-react-loader-dots';
+    LoaderDots,
+} from '@thumbtack/thumbprint-react';
 import { ContentActionsBudgetSmall } from '@thumbtack/thumbprint-icons';
 import DurationPicker from './duration-picker.jsx';
 import LocationPicker from './location-picker.jsx';
 import TimePicker from './time-picker.jsx';
```
