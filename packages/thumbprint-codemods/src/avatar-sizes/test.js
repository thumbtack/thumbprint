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
            import { Avatar, EntityAvatar } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <>
                    <Avatar size="large" />
                    <Avatar size="medium" />
                    <EntityAvatar size="small" />
                </>
            )`),
        ).toBe(`
            import React from 'react';
            import { Avatar, EntityAvatar } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <>
                    <Avatar size="medium" />
                    <Avatar size="small" />
                    <EntityAvatar size="xsmall" />
                </>
            )`);
    });

    test('renamed avatars', () => {
        expect(
            transform(`
            import React from 'react';
            import { Avatar as A, EntityAvatar as B } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <>
                    <A size="large" />
                    <A size="medium" />
                    <B size="small" />
                </>
            )`),
        ).toBe(`
            import React from 'react';
            import { Avatar as A, EntityAvatar as B } from '@thumbtack/thumbprint-react';
            const App = (props) => (
                <>
                    <A size="medium" />
                    <A size="small" />
                    <B size="xsmall" />
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

    test('`size` defined outside the `Avatar` and within another `Avatar`', () => {
        const codeBefore = `import React from 'react';
        import { Avatar, EntityAvatar, Input } from '@thumbtack/thumbprint-react';
        const size = "large";
        const App = (props) => (
            <div>
                <Avatar size={size} />
                <Avatar size="medium" />
                <EntityAvatar size={size} />
                <Input />
            </div>
        )`;

        const codeAfter = `import React from 'react';
        import { Avatar, EntityAvatar, Input } from '@thumbtack/thumbprint-react';
        const size = "large";
        const App = (props) => (
            <div>
                <Avatar size={size} />
                <Avatar size="small" />
                <EntityAvatar size={size} />
                <Input />
            </div>
        )`;

        expect(transform(codeBefore)).toBe(codeAfter);
        expect(console.error).toHaveBeenCalledTimes(2);
    });

    test('props are spread and also has a large size', () => {
        const codeBefore = `import React from 'react';
        import { Avatar, EntityAvatar, Input } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <div>
                <Avatar {...props} size="large" />
                <Avatar {...props} />
                <EntityAvatar {...props} />
                <Input />
            </div>
        )`;

        const codeAfter = `import React from 'react';
        import { Avatar, EntityAvatar, Input } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <div>
                <Avatar {...props} size="medium" />
                <Avatar {...props} />
                <EntityAvatar {...props} />
                <Input />
            </div>
        )`;

        expect(transform(codeBefore)).toBe(codeAfter);
        expect(console.error).toHaveBeenCalledTimes(2);
    });

    test('one "large" size and one "xlarge" size', () => {
        const codeBefore = `import React from 'react';
        import { Avatar, EntityAvatar } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <>
                <Avatar size="xlarge" />
                <EntityAvatar size="large" />
            </>
        )`;

        const codeAfter = `import React from 'react';
        import { Avatar, EntityAvatar } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <>
                <Avatar size="xlarge" />
                <EntityAvatar size="medium" />
            </>
        )`;

        expect(transform(codeBefore)).toBe(codeAfter);
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    test('throws error if props are spread after a size is defined', () => {
        const codeBefore = `import React from 'react';
        import { Avatar, Input } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <div>
                <Avatar size="large" {...props} />
                <Input />
            </div>
        )`;

        const codeAfter = `import React from 'react';
        import { Avatar, Input } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <div>
                <Avatar size="medium" {...props} />
                <Input />
            </div>
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
        import { EntityAvatar } from './other-avatar.jsx';
        const App = (props) => (
            <>
                <Avatar size="large" />
                <Avatar size="medium" />
                <EntityAvatar size="small" />
            </>
        )`;

        expect(transform(code)).toBeNull();
    });
});
