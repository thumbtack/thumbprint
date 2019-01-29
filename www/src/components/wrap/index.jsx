import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

const Wrap = ({ hasPadding, children }) => (
    <div
        className={classNames(styles.wrap, {
            'pb5 l_pv6': hasPadding,
        })}
        data-algolia="content"
    >
        {children}
    </div>
);

Wrap.propTypes = {
    children: PropTypes.node,
    hasPadding: PropTypes.bool,
};

Wrap.defaultProps = {
    children: undefined,
    hasPadding: true,
};

export default Wrap;
