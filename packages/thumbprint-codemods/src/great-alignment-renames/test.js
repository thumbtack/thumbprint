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
    test('one component', () => {
        expect(
            transform(`
            import React from 'react';
            import { ModalDefault } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <ModalDefault />
            )`),
        ).toBe(`
            import React from 'react';
            import { Modal } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <Modal />
            )`);
    });

    test('three components with two renamed imports', () => {
        expect(
            transform(`
            import React from 'react';
            import { Select as S, DatePicker as D, ModalDefaultHeader } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <>
                    <S />
                    <D />
                    <ModalDefaultHeader />
                </>
            )`),
        ).toBe(`
            import React from 'react';
            import { Dropdown as S, Calendar as D, ModalHeader } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <>
                    <S />
                    <D />
                    <ModalHeader />
                </>
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
            import { Avatar, Button, TextInput } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <div>
                    <Avatar />
                    <Button />
                    <TextInput />
                </div>
            )`);
    });
});

describe('output should not change', () => {
    test('only non-renamed components are imported', () => {
        const code = `
        import React from 'react';
        import { Button } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <Button />
        )`;
        expect(transform(code)).toBeNull();
    });

    test("Thumbprint is not imported but there's another component with the same name as one that will be renamed", () => {
        const code = `
        import React from 'react';
        import ModalDefault from '../my-avatar.jsx';
        const App = (props) => (
            <ModalDefault />
        )`;
        expect(transform(code)).toBeNull();
    });
});
