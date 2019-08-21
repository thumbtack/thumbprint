import React from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import ReactCodeBlock from './react-code-block';
import { previewThemes, classes } from './styles';
import prismTheme from './prism-theme';
import styles from './index.module.scss';

const CodeBlock = props => {
    const { language, shouldRender, theme, children } = props;

    if (language === 'jsx' && shouldRender) {
        return <ReactCodeBlock {...props} />;
    }

    /* eslint-disable react/no-danger */
    return (
        <div>
            {language === 'html' && shouldRender && (
                <div
                    className={`${classes.preview} ${previewThemes[theme]}`}
                    dangerouslySetInnerHTML={{ __html: children }}
                />
            )}
            <div className={classes.codeContainer}>
                <Highlight
                    {...defaultProps}
                    code={children.trim()}
                    language={language}
                    theme={prismTheme}
                >
                    {({ className, style, tokens: codeTokens, getLineProps, getTokenProps }) => (
                        <pre
                            className={`${className} ${styles.code} ${styles.codeHTML}`}
                            style={style}
                        >
                            {codeTokens.map((line, i) => (
                                <div {...getLineProps({ line, key: i })}>
                                    {line.map((token, key) => (
                                        <span {...getTokenProps({ token, key })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </div>
        </div>
    );
};

CodeBlock.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.oneOf(['light', 'dark', 'white']),
    language: PropTypes.string.isRequired,
    shouldRender: PropTypes.bool,
};

CodeBlock.defaultProps = {
    theme: 'white',
    shouldRender: true,
};

export default CodeBlock;
