import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

interface PropTypes {
    children: React.ReactNode;
    hasPadding?: boolean;
}

export default function Wrap({ hasPadding = true, children }: PropTypes): JSX.Element {
    return (
        <div
            className={classNames(styles.wrap, {
                'pb5 l_pv6': hasPadding,
            })}
            data-algolia="content"
        >
            {children}
        </div>
    );
}
