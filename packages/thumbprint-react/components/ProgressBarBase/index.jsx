import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const ProgressBarBase = ({ width }) => (
    <div className={styles.outer}>
        <div
            className={styles.inner}
            style={{ transform: `translateX(-${100 - width}%)` }}
            role="progressbar"
            aria-valuenow={width}
            aria-valuemin="0"
            aria-valuemax="100"
        />
    </div>
);

ProgressBarBase.propTypes = {
    /**
     * A number between 0 and 100.
     */
    width: PropTypes.number,
};

ProgressBarBase.defaultProps = {
    width: 0,
};

export default ProgressBarBase;
