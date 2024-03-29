import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

export interface ButtonRowProps {
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
    dataTestId?: string;
    /**
     * A selector hook into the React component for use in automated testing environments.
     * @deprecated Deprecated in favor of the `dataTestId` prop
     */
    dataTest?: string;
}

export default function ButtonRow({
    children = null,
    justify = 'left',
    dataTestId,
    dataTest,
    isStackedBelowSmall = false,
}: ButtonRowProps): JSX.Element {
    return (
        <div
            className={classNames({
                [styles.root]: true,
                [styles.stackBelowSmall]: isStackedBelowSmall,
                [styles.justifyCenter]: justify === 'center',
                [styles.justifyLeft]: justify === 'left',
                [styles.justifyRight]: justify === 'right',
            })}
            data-testid={dataTestId}
            data-test={dataTest}
        >
            {React.Children.map(children, child => (
                <div className={styles.item}>{child}</div>
            ))}
        </div>
    );
}
