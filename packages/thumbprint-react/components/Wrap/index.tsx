import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

export interface WrapProps {
    /**
     * Component to be wrapped.
     */
    children?: React.ReactNode;
    /**
     * Breakpoint at which the wrapper should remove horizontal margin to bleed to the edge of the
     * viewport. Defaults to `undefined`, in which case it never does this.
     */
    bleedBelow?: 'small' | 'medium' | 'large';
    /**
     * A selector to hook into the React component for use in automated testing environments.
     */
    dataTestId?: string;
    /**
     * A selector to hook into the React component for use in automated testing environments.
     * @deprecated Deprecated in favor of the `dataTestId` prop
     */
    dataTest?: string;
}

export default function Wrap({
    children,
    bleedBelow,
    dataTest,
    dataTestId,
}: WrapProps): JSX.Element {
    return (
        <div
            className={classNames({
                [styles.root]: true,
                [styles.bleedBelowSmall]: bleedBelow === 'small',
                [styles.bleedBelowMedium]: bleedBelow === 'medium',
                [styles.bleedBelowLarge]: bleedBelow === 'large',
            })}
            data-test={dataTest}
            data-testid={dataTestId}
        >
            {children}
        </div>
    );
}
