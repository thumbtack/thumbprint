import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './index.module.scss';

export function List({ children, theme }) {
    const props = {
        className: classNames({
            [styles.root]: true,
            [styles.bullet]: theme === 'bullet',
            [styles.decimal]: theme === 'decimal',
            [styles.alpha]: theme === 'alpha',
        }),
    };

    const elementName = theme === 'bullet' ? 'ul' : 'ol';

    return React.createElement(elementName, props, children);
}

List.propTypes = {
    /**
     * List items to render. Should be instances of `ListItem`.
     */
    children: PropTypes.node,
    /**
     * Controls the theme of the markers applied to each list item.
     */
    theme: PropTypes.oneOf(['bullet', 'decimal', 'alpha']),
};

List.defaultProps = {
    children: undefined,
    theme: 'bullet',
};

export function ListItem({ children }) {
    return <li className={styles.item}>{children}</li>;
}

ListItem.propTypes = {
    /**
     * Item contents to render.
     */
    children: PropTypes.node,
};

ListItem.defaultProps = {
    children: undefined,
};
