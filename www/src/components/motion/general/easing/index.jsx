import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Easing = ({ animation }) => {
    return (
        <div className={styles.root}>
            <div
                className={classNames({
                    [styles.bar]: true,
                    [styles.easeIn]: animation === 'easeIn',
                    [styles.easeOut]: animation === 'easeOut',
                    [styles.easeInOut]: animation === 'easeInOut',
                })}
            />
        </div>
    );
};

Easing.propTypes = {
    animation: PropTypes.oneOf(['easeIn', 'easeOut', 'easeInOut']),
};

Easing.defaultProps = {
    animation: null,
};

export default Easing;
