import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

interface ListPropTypes {
    /**
     * List items to render. Should be instances of `ListItem`.
     */
    children?: React.ReactNode;
    /**
     * Controls the theme of the markers applied to each list item.
     */
    theme?: 'bullet' | 'decimal' | 'alpha';
}

export function List({ children, theme = 'bullet' }: ListPropTypes): JSX.Element {
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

interface ListItemPropTypes {
    /**
     * Item contents to render.
     */
    children?: React.ReactNode;
}

export function ListItem({ children }: ListItemPropTypes): JSX.Element {
    return <li className={styles.item}>{children}</li>;
}
