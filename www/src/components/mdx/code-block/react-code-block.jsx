import React from 'react';
import PropTypes from 'prop-types';
import * as tokens from '@thumbtack/thumbprint-tokens';
import * as thumbprintIcons from '@thumbtack/thumbprint-icons';
import * as thumbprintReact from '@thumbtack/thumbprint-react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { previewThemes, classes } from './styles';
import styles from './index.module.scss';
import prismTheme from './prism-theme';

const ReactCodeBlock = props => {
    const { children, theme } = props;

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
                <LiveEditor className={`${styles.code} ${styles.codeJSX}`} ignoreTabKey />
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
};

ReactCodeBlock.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.oneOf(['dark', 'light', 'white']).isRequired,
};

export default ReactCodeBlock;
