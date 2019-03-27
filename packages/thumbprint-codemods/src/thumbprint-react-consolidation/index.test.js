const codemod = require('./index');

test('transforms basic import', () => {
    const fixture = `
import React from 'react';
import Input from '@thumbtack/tp-ui-react-input';
import DropdownButton from './DropdownButton';
`.trim();
    const expected = `
import React from 'react';
import { Input } from "@thumbtack/thumbprint-react";
import DropdownButton from './DropdownButton';
`.trim();

    expect(codemod(fixture)).toBe(expected);
});

test('handles newlines at start/end of file', () => {
    const fixture = `
import React from 'react';
import Input from '@thumbtack/tp-ui-react-input';
import DropdownButton from './DropdownButton';
`;
    const expected = `
import React from 'react';
import { Input } from "@thumbtack/thumbprint-react";
import DropdownButton from './DropdownButton';
`;

    expect(codemod(fixture)).toBe(expected);
});

test('handles comment at start of file', () => {
    const fixture = `
// eslint-disable
import React from 'react';
import Input from '@thumbtack/tp-ui-react-input';
import DropdownButton from './DropdownButton';
`.trim();
    const expected = `
// eslint-disable
import React from 'react';
import { Input } from "@thumbtack/thumbprint-react";
import DropdownButton from './DropdownButton';
`.trim();

    expect(codemod(fixture)).toBe(expected);
});

test('transforms destructure import', () => {
    const fixture = `
import React from 'react';
import { Text } from '@thumbtack/tp-ui-react-type';
import DropdownButton from './DropdownButton';
`.trim();
    const expected = `
import React from 'react';
import { Text } from "@thumbtack/thumbprint-react";
import DropdownButton from './DropdownButton';
`.trim();

    expect(codemod(fixture)).toBe(expected);
});

test('transforms multiple import', () => {
    const fixture = `
import React from 'react';
import { Text, Title } from '@thumbtack/tp-ui-react-type';
import DropdownButton from './DropdownButton';
`.trim();
    const expected = `
import React from 'react';
import { Text, Title } from "@thumbtack/thumbprint-react";
import DropdownButton from './DropdownButton';
`.trim();

    expect(codemod(fixture)).toBe(expected);
});

test('transforms multiple import statements', () => {
    const fixture = `
import React from 'react';
import Input from '@thumbtack/tp-ui-react-input';
import Select from '@thumbtack/tp-ui-react-select';
import DropdownButton from './DropdownButton';
`.trim();
    const expected = `
import React from 'react';
import { Input, Select } from "@thumbtack/thumbprint-react";
import DropdownButton from './DropdownButton';
`.trim();

    expect(codemod(fixture)).toBe(expected);
});

test('transforms alias import', () => {
    const fixture = `
import React from 'react';
import { Text as BodyCopy } from '@thumbtack/tp-ui-react-type';
import DropdownButton from './DropdownButton';
`.trim();
    const expected = `
import React from 'react';
import { Text as BodyCopy } from "@thumbtack/thumbprint-react";
import DropdownButton from './DropdownButton';
`.trim();

    expect(codemod(fixture)).toBe(expected);
});

test('transforms multiline import', () => {
    const fixture = `
import React from 'react';
import {
  Type
} from '@thumbtack/tp-ui-react-type';
import DropdownButton from './DropdownButton';
`.trim();
    const expected = `
import React from 'react';
import { Type } from "@thumbtack/thumbprint-react";
import DropdownButton from './DropdownButton';
`.trim();

    expect(codemod(fixture)).toBe(expected);
});

test('handles no spaces', () => {
    const fixture = `
import React from 'react';
import {Type} from '@thumbtack/tp-ui-react-type';
import DropdownButton from './DropdownButton';
`.trim();
    const expected = `
import React from 'react';
import { Type } from "@thumbtack/thumbprint-react";
import DropdownButton from './DropdownButton';
`.trim();

    expect(codemod(fixture)).toBe(expected);
});

test('handles no Thumbprint imports', () => {
    const fixture = `
import React from 'react';
import DropdownButton from './DropdownButton';
`.trim();
    const expected = false;

    expect(codemod(fixture)).toBe(expected);
});

test('does not transform random imports', () => {
    const fixture = `
import React from 'react';
import { Text } from '@thumbtack/tp-ui-react-type';
import DropdownButton from './DropdownButton';

function test() {
  return "import { Text } from '@thumbtack/thumbprint-react'"
}
`.trim();
    const expected = `
import React from 'react';
import { Text } from "@thumbtack/thumbprint-react";
import DropdownButton from './DropdownButton';

function test() {
  return "import { Text } from '@thumbtack/thumbprint-react'"
}
`.trim();

    expect(codemod(fixture)).toBe(expected);
});

test('handles all the things', () => {
    const fixture = `
import React from 'react';
import ModalDefault, {
  ModalFooter as Footer,
} from '@thumbtack/tp-ui-react-modal-default'
import Input from '@thumbtack/tp-ui-react-input';
import Select from '@thumbtack/tp-ui-react-select';
import { Title } from '@thumbtack/tp-ui-react-type';
import DropdownButton from './DropdownButton';
`.trim();
    const expected = `
import React from 'react';
import { ModalDefault, ModalFooter as Footer, Input, Select, Title } from "@thumbtack/thumbprint-react";
import DropdownButton from './DropdownButton';
`.trim();

    expect(codemod(fixture)).toBe(expected);
});

test('supports parsing new ES syntax', () => {
    const fixture = `
import React from 'react';
import Input from '@thumbtack/tp-ui-react-input';
import DropdownButton from './DropdownButton';

const a = do { if (true) { 'hi' } }
`.trim();
    const expected = `
import React from 'react';
import { Input } from "@thumbtack/thumbprint-react";
import DropdownButton from './DropdownButton';

const a = do { if (true) { 'hi' } }
`.trim();

    expect(codemod(fixture)).toBe(expected);
});

test('transforms mismatched default exports', () => {
    const fixture = `
import React from 'react';
import MyCoolModal from '@thumbtack/tp-ui-react-modal-default'
import DropdownButton from './DropdownButton';
`.trim();
    const expected = `
import React from 'react';
import { ModalDefault as MyCoolModal } from "@thumbtack/thumbprint-react";
import DropdownButton from './DropdownButton';
`.trim();

    expect(codemod(fixture)).toBe(expected);
});
