import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const getAspectPercentage = value => {
    return `${value * 100}%`;
};

const aspectMap = {
    '1:1': 1 / 1,
    '3:2': 2 / 3,
    '7:3': 3 / 7,
    '8:5': 5 / 8,
    '10:13': 13 / 10,
};

const Skeleton = ({ isBlock, aspectRatio, width, height, className }) => {
    const inlineStyles = {};

    if (aspectRatio) {
        inlineStyles.paddingTop = getAspectPercentage(aspectMap[aspectRatio]);
        inlineStyles.height = 0;
    }

    if (width && !aspectRatio) {
        inlineStyles.width = width;
    }

    if (height && !aspectRatio) {
        inlineStyles.height = width;
    }

    return (
        <span
            className={classNames({
                [styles.skeleton]: true,
                [className]: className,
                db: isBlock || aspectRatio,
            })}
            style={inlineStyles}
        />
    );
};

Skeleton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    isBlock: PropTypes.bool,
    aspectRatio: PropTypes.string,
    className: PropTypes.string,
};

Skeleton.defaultProps = {
    width: null,
    height: null,
    isBlock: false,
    aspectRatio: null,
    className: null,
};

export default Skeleton;
