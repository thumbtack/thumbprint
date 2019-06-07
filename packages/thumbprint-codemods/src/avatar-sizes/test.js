/* eslint-disable no-console */
const jscodeshift = require('jscodeshift');
const codemod = require('./index');

const transform = source =>
    codemod(
        {
            source,
            path: __filename,
        },
        {
            jscodeshift,
            stats: () => {},
        },
    );

describe('output should change', () => {
    test('simple avatars', () => {
        expect(
            transform(`
import React from 'react';
import { Avatar } from '@thumbtack/thumbprint-react';
const App = (props) => (
    <>
        <Avatar size="large" />
        <Avatar size="medium" />
        <Avatar size="small" />
    </>
)`),
        ).toBe(`
import React from 'react';
import { Avatar } from '@thumbtack/thumbprint-react';
const App = (props) => (
    <>
        <Avatar size="medium" />
        <Avatar size="small" />
        <Avatar size="xsmall" />
    </>
)`);
    });

    test('renamed avatars', () => {
        expect(
            transform(`
import React from 'react';
import { Avatar as A } from '@thumbtack/thumbprint-react';
const App = (props) => (
    <>
        <A size="large" />
        <A size="medium" />
        <A size="small" />
    </>
)`),
        ).toBe(`
import React from 'react';
import { Avatar as A } from '@thumbtack/thumbprint-react';
const App = (props) => (
    <>
        <A size="medium" />
        <A size="small" />
        <A size="xsmall" />
    </>
)`);
    });
});

describe('output should change but also throw a console error', () => {
    beforeEach(() => {
        console.error = jest.fn();
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    test('one "large" theme and one "xlarge" theme', () => {
        const codeBefore = `import React from 'react';
        import { Avatar } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <>
                <Avatar size="xlarge" />
                <Avatar size="large" />
            </>
        )`;

        const codeAfter = `import React from 'react';
        import { Avatar } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <>
                <Avatar size="xlarge" />
                <Avatar size="medium" />
            </>
        )`;

        expect(transform(codeBefore)).toBe(codeAfter);
        expect(console.error).toHaveBeenCalledTimes(1);
    });
});

describe('output should not change', () => {
    test('from a different package', () => {
        const code = `
import React from 'react';
import { Avatar } from './my-avatar.jsx';
const App = (props) => (
    <>
        <Avatar size="large" />
        <Avatar size="medium" />
        <Avatar size="small" />
    </>
)`;
        expect(transform(code)).toBeNull();
    });
});
