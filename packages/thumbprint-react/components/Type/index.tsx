import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

interface TitlePropTypes {
    /**
     * Text to render.
     */
    children: React.ReactNode;
    /**
     * Size level of the text.
     */
    size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    /**
     * Allows you to pass in additional styles to apply to the text. It is intentionally not
     * possible to overwrite `font-size`, `line-height`, and `font-weight`. If you need to do so,
     * consider using the ["Type" tokens](/tokens/#type) from Thumbprint Tokens or working with
     * a designer to use one of the styles on this page.
     */
    className?: string;
    /**
     * Level of the heading element (h1 to h6) to render. If omitted, a heading tag is not used,
     * and a div is used instead.
     */
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * Adds a HTML `id` attribute to the text. This is used for linking to a
     * [URL fragment](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href).
     */
    id?: string;
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}

export function Title({
    children,
    size,
    className,
    headingLevel,
    dataTest,
    id,
}: TitlePropTypes): JSX.Element {
    const elementName = headingLevel ? `h${headingLevel}` : 'div';

    const props = {
        className: classNames(styles[`title${size}`], className),
        'data-test': dataTest,
        id,
    };

    return React.createElement(elementName, props, children);
}

interface TextPropTypes {
    /**
     * Text to render.
     */
    children?: React.ReactNode;
    /**
     * Size level of the text.
     */
    size?: 1 | 2 | 3;
    /**
     * Allows you to pass in additional styles to apply to the text. It is intentionally not
     * possible to overwrite `font-size` and `line-height`. If you need to do so, consider using
     * the ["Type" tokens](/tokens/#type) from Thumbprint Tokens or working with a designer to
     * use one of the styles on this page.
     */
    className?: string;
    /**
     * Name of the DOM element to render. Defaults to `p` for a paragraph tag.
     */
    elementName?: keyof React.ReactHTML;
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}

export function Text({
    children,
    size = 1,
    className,
    elementName = 'p',
    dataTest,
}: TextPropTypes): JSX.Element {
    const props = {
        className: classNames(styles[`text${size}`], className),
        'data-test': dataTest,
    };

    return React.createElement(elementName, props, children);
}
