import React from 'react';
import classNames from 'classnames';
import { Text } from '@thumbtack/thumbprint-react';

import { InlineCode } from '../../mdx';

import styles from './index.module.scss';

interface SwatchProps {
    name: string;
    hex: string;
    isCore: boolean;
    hasBorder: boolean;
}

export default function Swatch({ name, hex, isCore, hasBorder }: SwatchProps): JSX.Element {
    return (
        <div
            className={classNames(`s_col-2 mb3`, {
                // If empty swatch, hide it at small breakpoint
                'dn s_db': name === undefined,
            })}
        >
            <div
                className={classNames(`h3 br2 flex ${styles.root}`, {
                    // If empty swatch or white add border
                    'ba b-gray-300': hasBorder,
                })}
                style={{ background: hex }}
            />
            {name && (
                <Text size={3} elementName="span">
                    <InlineCode theme="plain">{name}</InlineCode>
                    {
                        isCore && <InlineCode theme="plain">(c)</InlineCode> // If a core color, add an indicator
                    }
                </Text>
            )}
        </div>
    );
}
