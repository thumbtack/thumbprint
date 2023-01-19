import React from 'react';
// eslint-disable-next-line camelcase
import { Source_Code_Pro } from '@next/font/google';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as tokens from '@thumbtack/thumbprint-tokens';
import styles from './inline-code.module.scss';

const sourceCodePro = Source_Code_Pro({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
});

export default function InlineCode({
    shouldCopyToClipboard = false,
    children,
    theme = 'default',
}: {
    shouldCopyToClipboard?: boolean;
    children?: React.ReactNode;
    theme?: 'plain' | 'default';
}): JSX.Element {
    const plainStyles = {
        fontFamily: tokens.tpFontFamilyMonospace,
        fontSize: '95%',
    };

    const extendedStyles = {
        background: '#f5f7f7',
        padding: '1px 4px',
        color: tokens.tpColorBlack,
        borderRadius: '5px',
    };

    let inlineStyles = plainStyles;

    if (theme !== 'plain') {
        inlineStyles = { ...plainStyles, ...extendedStyles };
    }

    const { className } = sourceCodePro;

    return shouldCopyToClipboard ? (
        <CopyToClipboard text={children} className={styles.inlineCodeClipboard}>
            <code style={inlineStyles} className={className}>
                {children}
            </code>
        </CopyToClipboard>
    ) : (
        <code style={inlineStyles} className={className}>
            {children}
        </code>
    );
}
