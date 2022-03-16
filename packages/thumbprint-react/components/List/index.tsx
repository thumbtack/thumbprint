import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

export interface ListProps {
    /**
     * List items to render. Should be instances of `ListItem`.
     */
    children?: React.ReactNode;
    /**
     * Controls the theme of the markers applied to each list item.
     */
    theme?: 'bullet' | 'decimal' | 'alpha';
}

export function List({ children, theme = 'bullet' }: ListProps): JSX.Element {
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

export interface ListItemProps {
    /**
     * Item contents to render.
     */
    children?: React.ReactNode;
}

export function ListItem({ children }: ListItemProps): JSX.Element {
    return <li className={styles.item}>{children}</li>;
}
