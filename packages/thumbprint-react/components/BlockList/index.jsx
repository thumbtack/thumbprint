import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

export function BlockListItemLink({ children, to }) {
    return (
        <a href={to} className={styles.itemLink}>
            {children}
        </a>
    );
}

export function BlockListItem({ children }) {
    return <div className={styles.item}>{children}</div>;
}

export function BlockList({ children, flush, border }) {
    return (
        <div
            className={classNames({
                [styles.list]: true,
                [styles.listFlush]: flush === true,
                [styles.listBorderSurround]: border === 'surround',
                [styles.listBorderBottom]: border === 'bottom',
            })}
        >
            {children}
        </div>
    );
}

BlockList.propTypes = {
    border: PropTypes.oneOf(['bottom', 'surround']),
    flush: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

BlockList.defaultProps = {
    border: undefined,
    flush: false,
};

BlockListItem.propTypes = {
    children: PropTypes.node.isRequired,
};

BlockListItemLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
