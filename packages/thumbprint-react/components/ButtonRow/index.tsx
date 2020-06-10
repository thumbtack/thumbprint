import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

interface PropTypes {
    /**
     * `Button` components to render.
     */
    children?: React.ReactNode;
    /**
     * Controls the horizontal alignment of buttons within the container.
     */
    justify?: 'center' | 'left' | 'right';
    /**
     * Stack items below the small breakpoint. This pairs well with `width="full-below-small"`
     * for buttons
     */
    isStackedBelowSmall?: boolean;
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}

export default function ButtonRow({
    children = null,
    justify = 'left',
    dataTest,
    isStackedBelowSmall = false,
}: PropTypes): JSX.Element {
    return (
        <div
            className={classNames({
                [styles.root]: true,
                [styles.stackBelowSmall]: isStackedBelowSmall,
                [styles.justifyCenter]: justify === 'center',
                [styles.justifyLeft]: justify === 'left',
                [styles.justifyRight]: justify === 'right',
            })}
            data-test={dataTest}
        >
            {React.Children.map(children, child => (
                <div className={styles.item}>{child}</div>
            ))}
        </div>
    );
}
