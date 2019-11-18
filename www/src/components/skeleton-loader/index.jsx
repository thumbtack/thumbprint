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

export default function Skeleton({ isBlock, aspectRatio, width, height }) {
    const inline = {};

    if (aspectRatio) {
        inline.paddingTop = getAspectPercentage(aspectMap[aspectRatio]);
        inline.height = 0;
    }

    if (width && !aspectRatio) {
        inline.width = width;
    }

    if (height && !aspectRatio) {
        inline.height = width;
    }

    return (
        <span
            className={classNames({
                [styles.skeleton]: true,
                db: isBlock || aspectRatio,
            })}
            style={inline}
        />
    );
}

const propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    isBlock: PropTypes.bool,
    aspectRatio: PropTypes.string,
};

const defaultProps = {
    width: null,
    height: null,
    isBlock: false,
    aspectRatio: null,
};

Skeleton.propTypes = propTypes;
Skeleton.defaultProps = defaultProps;
