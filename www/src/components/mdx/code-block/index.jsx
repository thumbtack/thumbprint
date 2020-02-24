import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Handlebars from 'handlebars';
import ReactCodeBlock from './react-code-block';
import { previewThemes, classes } from './styles';
import prismTheme from './prism-theme';
import styles from './index.module.scss';

const compileEmail = async (emailSnippet, component) => {
    // Grab the partial for the current component.
    const { default: partial } = await import(
        `raw-loader!../../../../../packages/thumbprint-email/src/components/${component}/index.hbs`
    );

    Handlebars.registerPartial(component, partial);

    const source = emailSnippet;
    const template = Handlebars.compile(source);

    const { default: InkyImport } = await import('../../../../../node_modules/inky/lib/inky');
    const Inky = new InkyImport();

    return Inky.releaseTheKraken(`<container>${template({})}</container>`);
};

const EmailRenderer = ({ theme, code, emailPartial }) => {
    const [transformedCode, setTransformedCode] = useState(undefined);

    compileEmail(code, emailPartial).then(html => setTransformedCode(html));

    return (
        <div
            className={`${classes.preview} ${previewThemes[theme]}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: transformedCode }}
        />
    );
};

EmailRenderer.propTypes = {
    theme: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    emailPartial: PropTypes.string,
};

EmailRenderer.defaultProps = {
    emailPartial: undefined,
};

const CodeBlock = props => {
    const { language, shouldRender, emailPartial, theme, children } = props;

    if (language === 'jsx' && shouldRender) {
        return <ReactCodeBlock {...props} />;
    }

    /* eslint-disable react/no-danger */
    return (
        <div>
            {language === 'email' && shouldRender && emailPartial && (
                <EmailRenderer theme={theme} code={children} emailPartial={emailPartial} />
            )}
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
