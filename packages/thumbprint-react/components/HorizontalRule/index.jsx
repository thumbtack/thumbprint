import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

const propTypes = {
    /**
     * Renders the horizontal rule with the thumbtack styles.
     */
    lineStyle: PropTypes.oneOf(['original', 'dotted', 'dashed']),
    color: PropTypes.oneOf(['gray', 'gray-300']),
};

const defaultProps = {
    lineStyle: 'original',
    color: 'gray',
};

export default function HorizontalRule({ lineStyle, color }) {
    return (
        <hr
            className={classNames({
                [styles.root]: true,
                [styles.gray300]: color === 'gray-300',
                [styles.dashed]: lineStyle === 'dashed',
                [styles.dotted]: lineStyle === 'dotted',
            })}
        />
    );
}

HorizontalRule.propTypes = propTypes;
HorizontalRule.defaultProps = defaultProps;
