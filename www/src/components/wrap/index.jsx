import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

const Wrap = ({ hasPadding, children }) => (
    <div
        className={classNames(styles.wrap, {
            'ph4 l_ph6 center': true,
            l_pv6: hasPadding,
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
