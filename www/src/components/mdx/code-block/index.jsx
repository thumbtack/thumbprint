import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Handlebars from 'handlebars';
import ReactCodeBlock from './react-code-block';
import { previewThemes, classes } from './styles';
import prismTheme from './prism-theme';
import styles from './index.module.scss';
import '../../../../../packages/thumbprint-email/src/thumbprint-email-docs.scss'; // TEMP

const compileEmail = async emailSnippet => {
    const { default: tpAvatar } = await import(
        `raw-loader!../../../../../packages/thumbprint-email/src/components/tpAvatar/index.hbs`
    );
    const { default: tpButton } = await import(
        `raw-loader!../../../../../packages/thumbprint-email/src/components/tpButton/index.hbs`
    );
    const { default: tpCard } = await import(
        `raw-loader!../../../../../packages/thumbprint-email/src/components/tpCard/index.hbs`
    );
    const { default: tpIcon } = await import(
        `raw-loader!../../../../../packages/thumbprint-email/src/components/tpIcon/index.hbs`
    );
    const { default: tpImage } = await import(
        `raw-loader!../../../../../packages/thumbprint-email/src/components/tpImage/index.hbs`
    );
    const { default: tpSpacer } = await import(
        `raw-loader!../../../../../packages/thumbprint-email/src/components/tpSpacer/index.hbs`
    );
    const { default: tpServiceCard } = await import(
        `raw-loader!../../../../../packages/thumbprint-email/src/components/tpServiceCard/index.hbs`
    );

    Handlebars.registerPartial('tpAvatar', tpAvatar);
    Handlebars.registerPartial('tpButton', tpButton);
    Handlebars.registerPartial('tpCard', tpCard);
    Handlebars.registerPartial('tpIcon', tpIcon);
    Handlebars.registerPartial('tpImage', tpImage);
    Handlebars.registerPartial('tpSpacer', tpSpacer);
    Handlebars.registerPartial('tpServiceCard', tpServiceCard);

    Handlebars.registerHelper({
        equal: function equal(source, target, options) {
            if (_.isObject(source) || _.isObject(target)) {
                throw new TypeError('Cannot compare non-primitive types in #equal');
            }

            return String(source) === String(target) ? options.fn(this) : '';
        },
    });

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
