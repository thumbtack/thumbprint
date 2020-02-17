const tmp = require('tmp');
const fs = require('fs');
const countComponentInstances = require('./count-component-instances');

const countPill = contents => {
    const file = tmp.fileSync();
    const filePath = file.name;

    fs.writeFileSync(filePath, contents);

    const count = countComponentInstances('Pill', filePath);

    file.removeCallback();

    return count;
};

test('component is imported but not used', () => {
    expect(
        countPill(`
        import React from 'react';
        import { Pill } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <Avatar />
        )`),
    ).toBe(0);
});

test('component is imported and used in JSX', () => {
    expect(
        countPill(`
        import React from 'react';
        import { Pill } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <Pill />
        )`),
    ).toBe(1);

    expect(
        countPill(`
        import React from 'react';
        import { Pill } from '@thumbtack/thumbprint-react';
        const App = (props) => (
            <div>
                <Pill />
                <Pill />
                <Pill />
            </div>
        )`),
    ).toBe(3);
});

test('component is imported and used in a conditional outside of JSX', () => {
    expect(
        countPill(`
        import React from 'react';
        import { Pill } from '@thumbtack/thumbprint-react';
        const App = (props) => {
            const CoolPill = props.isCool ? Pill : 'div';
            return (
                <div>
                    <CoolPill />
                    <CoolPill />
                    <CoolPill />
                </div>
            )
        }`),
    ).toBe(1);

    expect(
        countPill(`
        import React from 'react';
        import { Pill } from '@thumbtack/thumbprint-react';
        const App = (props) => {
            const CoolPill = props.isCool ? 'div' : Pill;
            return (
                <div>
                    <CoolPill />
                    <CoolPill />
                    <CoolPill />
                </div>
            )
        }`),
    ).toBe(1);

    expect(
        countPill(`
        import React from 'react';
        import { Pill } from '@thumbtack/thumbprint-react';

        export default function PillBadges() {
            const pillBadgeProps = {
                icon: Icon ? <Icon /> : undefined,
            };

            const PillBadge = tooltipText ? PillWithTooltip : Pill;

            return (
                <PillBadge {...pillBadgeProps} />
            );
        }
        `),
    ).toBe(1);
});

test('component is in a console.log outside of JSX', () => {
    expect(
        countPill(`
        import React from 'react';
        import { Pill } from '@thumbtack/thumbprint-react';
        const App = (props) => {
            console.log(Pill)

            return (
                <div />
            )
        }`),
    ).toBe(1);
});

test('component is renamed in the import', () => {
    expect(
        countPill(`
        import React from 'react';
        import { Pill as TrickyPill } from '@thumbtack/thumbprint-react';
        const App = (props) => {
            return (
                <div>
                    <TrickyPill />
                    <TrickyPill />
                    <TrickyPill />
                </div>
            )
        }`),
    ).toBe(3);

    expect(
        countPill(`
        import React from 'react';
        import { Pill as TrickyPill } from '@thumbtack/thumbprint-react';
        const App = (props) => {
            const Pill = <div />
            return (
                <div>
                    <TrickyPill />
                    <TrickyPill />
                    <Pill />
                </div>
            )
        }`),
    ).toBe(2);
});
