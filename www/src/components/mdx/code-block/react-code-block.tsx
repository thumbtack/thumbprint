import React from 'react';
import * as tokens from '@thumbtack/thumbprint-tokens';
import * as thumbprintIcons from '@thumbtack/thumbprint-icons';
import * as thumbprintReact from '@thumbtack/thumbprint-react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { previewThemes, classes } from './styles';
import styles from './index.module.scss';
import prismTheme from './prism-theme';

interface PropTypes {
    children: string;
    theme: 'dark' | 'light' | 'white';
}

export default function ReactCodeBlock({ children, theme }: PropTypes): JSX.Element {
    return (
        <LiveProvider
            code={children.trim()}
            scope={{ tokens, ...thumbprintReact, ...thumbprintIcons }}
            className="relative"
            theme={prismTheme}
        >
            <React.StrictMode>
                <LivePreview className={`${classes.preview} ${previewThemes[theme]}`} />
            </React.StrictMode>

            <div className={classes.codeContainer}>
                <LiveEditor className={`${styles.code} ${styles.codeJSX}`} />
            </div>

            <pre>
                <LiveError
                    className="pa3 ba b-gray-300 bw-2 overflow-auto"
                    style={{
                        fontSize: tokens.tpFontBody2Size,
                        backgroundColor: tokens.tpColorRed100,
                    }}
                />
            </pre>
        </LiveProvider>
    );
}
