import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

const propTypes = {
    /**
     * Component to be wrapped.
     */
    children: PropTypes.node,
    /**
     * Breakpoint at which the wrapper should remove horizontal margin to bleed to the edge of the
     * viewport. Defaults to `undefined`, in which case it never does this.
     */
    bleedBelow: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest: PropTypes.string,
};

const defaultProps = {
    children: undefined,
    bleedBelow: undefined,
    dataTest: undefined,
};

export default function Wrap({ children, bleedBelow, dataTest }) {
    return (
        <div
            className={classNames({
                [styles.root]: true,
                [styles.bleedBelowSmall]: bleedBelow === 'small',
                [styles.bleedBelowMedium]: bleedBelow === 'medium',
                [styles.bleedBelowLarge]: bleedBelow === 'large',
            })}
            data-test={dataTest}
        >
            {children}
        </div>
    );
}

Wrap.defaultProps = defaultProps;
Wrap.propTypes = propTypes;
