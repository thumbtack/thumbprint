import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Handlebars from 'handlebars';
import ReactCodeBlock from './react-code-block';
import { previewThemes, classes } from './styles';
import prismTheme from './prism-theme';
import styles from './index.module.scss';
import '../../../../../packages/thumbprint-email/src/thumbprint-email-docs.scss'; // TEMP

const compileEmail = async emailSnippet => {
    const { default: avatar } = await import(
        `raw-loader!../../../../../packages/thumbprint-email/src/components/avatar/index.hbs`
    );
    const { default: button } = await import(
        `raw-loader!../../../../../packages/thumbprint-email/src/components/button/index.hbs`
    );
    const { default: callout } = await import(
        `raw-loader!../../../../../packages/thumbprint-email/src/components/callout/index.hbs`
    );
    const { default: card } = await import(
        `raw-loader!../../../../../packages/thumbprint-email/src/components/card/index.hbs`
    );
    const { default: image } = await import(
        `raw-loader!../../../../../packages/thumbprint-email/src/components/image/index.hbs`
    );

    Handlebars.registerPartial('avatar', avatar);
    Handlebars.registerPartial('button', button);
    Handlebars.registerPartial('callout', callout);
    Handlebars.registerPartial('card', card);
    Handlebars.registerPartial('image', image);

    const source = Handlebars.compile(emailSnippet)();

    const { default: InkyImport } = await import('../../../../../node_modules/inky/lib/inky');
    const Inky = new InkyImport();

    return Inky.releaseTheKraken(
        `<div class="thumbprint-email-example">
            <table class="body">
                <tr>
                    <td class="center" align="center" valign="top">
                        <center>
                            <container>
                                ${source}
                            </container>
                        </center>
                    </td>
                </tr>
            </table>
        </div>`,
    );
};

const EmailRenderer = ({ theme, code }) => {
    const [transformedCode, setTransformedCode] = useState(undefined);

    compileEmail(code).then(html => setTransformedCode(html));

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
};

const CodeBlock = props => {
    const { language, shouldRender, theme, children } = props;

    if (language === 'jsx' && shouldRender) {
        return <ReactCodeBlock {...props} />;
    }

    /* eslint-disable react/no-danger */
    return (
        <div>
            {language === 'email' && shouldRender && (
                <EmailRenderer theme={theme} code={children} />
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
