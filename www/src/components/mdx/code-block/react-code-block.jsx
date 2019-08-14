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
        >
            {/* NOTE(giles): We removed the strict mode check here, because ReactLive uses unsafe
            lifecycle methods in its implementation. We can add it back if they ever remove those
            methods */}
            <LivePreview className={`${classes.preview} ${previewThemes[theme]}`} />

            <div className={classes.codeContainer}>
                <LiveEditor className={classes.code} ignoreTabKey />
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
