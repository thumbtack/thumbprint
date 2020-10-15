import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import ReactCodeBlock from './react-code-block';
import { previewThemes, classes } from './styles';
import prismTheme from './prism-theme';
import styles from './index.module.scss';

interface PropTypes {
    children: string;
    language?: Language;
    theme?: 'light' | 'dark' | 'white';
    shouldRender?: boolean;
}

export default function CodeBlock({
    children,
    language,
    theme = 'white',
    shouldRender = true,
}: PropTypes): JSX.Element | null {
    if (!language) {
        return null;
    }

    if (language === 'jsx' && shouldRender) {
        return <ReactCodeBlock theme={theme}>{children}</ReactCodeBlock>;
    }

    return (
        <div>
            {(language as Language & 'html') === 'html' && shouldRender && (
                <div
                    className={`${classes.preview} ${previewThemes[theme]}`}
                    // eslint-disable-next-line react/no-danger
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
                    {({
                        className,
                        style,
                        tokens: codeTokens,
                        getLineProps,
                        getTokenProps,
                    }): JSX.Element => (
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
}
