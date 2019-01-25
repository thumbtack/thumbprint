import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ProgressBarBase from '../ProgressBarBase/index.jsx';
import styles from './index.module.scss';

const ProgressBar = ({ value, shouldShowLabel, labelAlign }) => (
    <div>
        <ProgressBarBase width={value} />

        {shouldShowLabel && (
            <div
                className={classnames({
                    [styles.label]: true,
                    [styles.labelCenter]: labelAlign === 'center',
                })}
            >
                {value}% complete
            </div>
        )}
    </div>
);

ProgressBar.propTypes = {
    /**
     * A number between 0 and 100 that indicates the progress made.
     */
    value: PropTypes.number,
    labelAlign: PropTypes.oneOf(['left', 'center']),
    shouldShowLabel: PropTypes.bool,
};

ProgressBar.defaultProps = {
    value: 0,
    labelAlign: 'left',
    shouldShowLabel: true,
};

export default ProgressBar;
