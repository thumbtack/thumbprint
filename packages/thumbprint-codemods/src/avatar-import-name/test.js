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
    test('simple avatar', () => {
        expect(
            transform(`
            import React from 'react';
            import { Avatar } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <Avatar />
            )`),
        ).toBe(`
            import React from 'react';
            import { UserAvatar } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <UserAvatar />
            )`);
    });

    test('`Avatar` with renamed import', () => {
        expect(
            transform(`
            import React from 'react';
            import { Avatar as A } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <A />
            )`),
        ).toBe(`
            import React from 'react';
            import { UserAvatar as A } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <A />
            )`);
    });

    test('amongst other imports', () => {
        expect(
            transform(`
            import React from 'react';
            import { Avatar, Button, Input } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <div>
                    <Avatar />
                    <Button />
                    <Input />
                </div>
            )`),
        ).toBe(`
            import React from 'react';
            import { UserAvatar, Button, Input } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <div>
                    <UserAvatar />
                    <Button />
                    <Input />
                </div>
            )`);
    });
});

describe('output should not change', () => {
    test('Thumbprint is imported but `Avatar` is not', () => {
        const code = `
        import React from 'react';
        import { EntityAvatar } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <EntityAvatar />
        )`;
        expect(transform(code)).toBeNull();
    });

    test("Thumbprint is not imported but there's another component called `Avatar`", () => {
        const code = `
        import React from 'react';
        import Avatar from '../my-avatar.jsx';
        const App = (props) => (
            <Avatar />
        )`;
        expect(transform(code)).toBeNull();
    });
});
