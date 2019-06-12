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
    test('simple button', () => {
        expect(
            transform(`
import React from 'react';
import { Button } from '@thumbtack/thumbprint-react';
const App = (props) => (
    <Button theme="secondary" />
)`),
        ).toBe(`
import React from 'react';
import { Button } from '@thumbtack/thumbprint-react';
const App = (props) => (
    <Button theme="tertiary" />
)`);
    });

    test('has two buttons', () => {
        expect(
            transform(`
import React from 'react';
import { Button } from '@thumbtack/thumbprint-react';
const App = (props) => (
    <>
        <Button theme="secondary" />
        <Button theme="secondary" />
    </>
)`),
        ).toBe(`
import React from 'react';
import { Button } from '@thumbtack/thumbprint-react';
const App = (props) => (
    <>
        <Button theme="tertiary" />
        <Button theme="tertiary" />
    </>
)`);
    });

    test('button with other prop that is an expression', () => {
        expect(
            transform(`
import React from 'react';
import { Button } from '@thumbtack/thumbprint-react';
const foo = 123;
const App = (props) => (
    <Button theme="secondary" dataTest={foo} />
)`),
        ).toBe(`
import React from 'react';
import { Button } from '@thumbtack/thumbprint-react';
const foo = 123;
const App = (props) => (
    <Button theme="tertiary" dataTest={foo} />
)`);
    });

    test('`Button` with renamed import', () => {
        expect(
            transform(`
import React from 'react';
import { Button as B } from '@thumbtack/thumbprint-react';
const App = (props) => (
    <B theme="secondary" />
)`),
        ).toBe(`
import React from 'react';
import { Button as B } from '@thumbtack/thumbprint-react';
const App = (props) => (
    <B theme="tertiary" />
)`);
    });

    test('`Button` and a few other Thumbprint imports', () => {
        expect(
            transform(`
import React from 'react';
import { Button, Input } from '@thumbtack/thumbprint-react';
const App = (props) => (
    <div>
        <Button theme="secondary">Foo</Button>
        <Input />
    </div>
)`),
        ).toBe(`
import React from 'react';
import { Button, Input } from '@thumbtack/thumbprint-react';
const App = (props) => (
    <div>
        <Button theme="tertiary">Foo</Button>
        <Input />
    </div>
)`);
    });
});

describe('should be unchanged and throw console error', () => {
    beforeEach(() => {
        console.error = jest.fn();
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    test('`theme` defined outside the `Button`', () => {
        const code = `import React from 'react';
        import { Button, Input } from '@thumbtack/thumbprint-react';
        const theme = "secondary";
        const App = (props) => (
            <div>
                <Button theme={theme} />
                <Input />
            </div>
        )`;

        expect(transform(code)).toBeNull();
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    test('props are spread', () => {
        const code = `import React from 'react';
        import { Button, Input } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <div>
                <Button {...props} />
                <Input />
            </div>
        )`;

        expect(transform(code)).toBeNull();
        expect(console.error).toHaveBeenCalledTimes(1);
    });
});

describe('output should change but also throw a console error', () => {
    test('`theme` defined outside the `Button` and within another `Button`', () => {
        const codeBefore = `import React from 'react';
        import { Button, Input } from '@thumbtack/thumbprint-react';
        const theme = "secondary";
        const App = (props) => (
            <div>
                <Button theme={theme} />
                <Button theme="secondary" />
                <Input />
            </div>
        )`;

        const codeAfter = `import React from 'react';
        import { Button, Input } from '@thumbtack/thumbprint-react';
        const theme = "secondary";
        const App = (props) => (
            <div>
                <Button theme={theme} />
                <Button theme="tertiary" />
                <Input />
            </div>
        )`;

        expect(transform(codeBefore)).toBe(codeAfter);
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    test('props are spread and also has a secondary button', () => {
        const codeBefore = `import React from 'react';
        import { Button, Input } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <div>
                <Button {...props} theme="secondary"/>
                <Button {...props} />
                <Input />
            </div>
        )`;

        const codeAfter = `import React from 'react';
        import { Button, Input } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <div>
                <Button {...props} theme="tertiary"/>
                <Button {...props} />
                <Input />
            </div>
        )`;

        expect(transform(codeBefore)).toBe(codeAfter);
        expect(console.error).toHaveBeenCalledTimes(2);
    });
});

describe('output should not change', () => {
    test('`Button` with `primary` theme', () => {
        const code = `import React from 'react';
        import { Button } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <>
                <Button theme="primary" />
                <Button theme="primary" />
            </>
        )`;

        expect(transform(code)).toBeNull();
    });

    test('`Button` with `tertiary` theme', () => {
        const code = `import React from 'react';
        import { Button } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <Button theme="tertiary" />
        )`;

        expect(transform(code)).toBeNull();
    });

    test('file using an `Input` from Thumbprint', () => {
        const code = `import React from 'react';
        import { Input } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <Input theme="secondary" />
        )`;

        expect(transform(code)).toBeNull();
    });

    test('file not using Thumbprint React', () => {
        const code = `import React from 'react';
        import { Button } from 'material-ui';
        const App = (props) => (
            <Button theme="secondary" />
        )`;

        expect(transform(code)).toBeNull();
    });

    test('file without a `Button`', () => {
        const code = `import React from 'react';
        export default Component =>
            class extends React.Component {
                render() {
                    return (
                        <div />
                    );
                }
            };`;

        expect(transform(code)).toBeNull();
    });
});
