import React from 'react';
import PropTypes from 'prop-types';
import * as tokens from '@thumbtack/thumbprint-tokens';
import * as thumbprintIcons from '@thumbtack/thumbprint-icons';
import * as thumbprintReact from '@thumbtack/thumbprint-react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { previewThemes, classes } from './styles';

const ReactCodeBlock = props => {
    const { children, theme } = props;

    return (
        <LiveProvider
            code={children}
            scope={{ tokens, ...thumbprintReact, ...thumbprintIcons }}
            mountStylesheet={false}
            className="relative"
            data-focus-visible-added
        >
            <React.StrictMode>
                <LivePreview className={`${classes.preview} ${previewThemes[theme]}`} />
            </React.StrictMode>
            <div className={classes.codeContainer}>
                <LiveEditor className={classes.code} />
            </div>
            <pre>
                <LiveError
                    className="pa3 bl bb br b-gray-300 bw-2 overflow-auto"
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
    theme: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default ReactCodeBlock;
