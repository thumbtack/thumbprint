import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './index.module.scss';

const titlePropTypes = {
    /**
     * Text to render.
     */
    children: PropTypes.node,
    /**
     * Size level of the text.
     */
    size: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
    /**
     * Allows you to pass in additional styles to apply to the text. It is intentionally not
     * possible to overwrite `font-size`, `line-height`, and `font-weight`. If you need to do so,
     * consider using the ["Type" tokens](/tokens/#type) from Thumbprint Tokens or working with
     * a designer to use one of the styles on this page.
     */
    className: PropTypes.string,
    /**
     * Level of the heading element (h1 to h6) to render. If omitted, a heading tag is not used,
     * and a div is used instead.
     */
    headingLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    /**
     * Adds a HTML `id` attribute to the text. This is used for linking to a
     * [URL fragment](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href).
     */
    id: PropTypes.string,
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest: PropTypes.string,
};

const titleDefaultProps = {
    children: undefined,
    className: undefined,
    headingLevel: undefined,
    id: undefined,
    dataTest: undefined,
};

export function Title({ children, size, className, headingLevel, dataTest, id }) {
    const elementName = headingLevel ? `h${headingLevel}` : 'div';

    const props = {
        className: classNames(styles[`title${size}`], className),
        'data-test': dataTest,
        id,
    };

    return React.createElement(elementName, props, children);
}

Title.propTypes = titlePropTypes;
Title.defaultProps = titleDefaultProps;

const textPropTypes = {
    /**
     * Text to render.
     */
    children: PropTypes.node,
    /**
     * Size level of the text.
     */
    size: PropTypes.oneOf([1, 2, 3]),
    /**
     * Allows you to pass in additional styles to apply to the text. It is intentionally not
     * possible to overwrite `font-size` and `line-height`. If you need to do so, consider using
     * the ["Type" tokens](/tokens/#type) from Thumbprint Tokens or working with a designer to
     * use one of the styles on this page.
     */
    className: PropTypes.string,
    /**
     * Name of the DOM element to render. Defaults to `p` for a paragraph tag.
     */
    elementName: PropTypes.string,
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest: PropTypes.string,
};

const textDefaultProps = {
    children: undefined,
    size: 1,
    className: undefined,
    elementName: 'p',
    dataTest: undefined,
};

export function Text({ children, size, className, elementName, dataTest }) {
    const props = {
        className: classNames(styles[`text${size}`], className),
        'data-test': dataTest,
    };

    return React.createElement(elementName, props, children);
}

Text.propTypes = textPropTypes;
Text.defaultProps = textDefaultProps;
