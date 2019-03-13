import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

export function BlockListItemLink({ children, to, className }) {
    return (
        <a
            href={to}
            className={classNames({
                [styles.itemLink]: true,
                [className]: className !== undefined,
            })}
        >
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
                [styles.listBorderGroup]: border === 'group',
                [styles.listBorderBottom]: border === 'bottom',
            })}
        >
            {children}
        </div>
    );
}

BlockList.propTypes = {
    /**
     * Add a border to the bottom or surround the entire list.
     */
    border: PropTypes.oneOf(['bottom', 'group']),
    /**
     * Remove padding on left and right side of each list item.
     */
    flush: PropTypes.bool,
    /**
     * The list items and any item links.
     */
    children: PropTypes.node.isRequired,
};

BlockList.defaultProps = {
    border: undefined,
    flush: false,
};

BlockListItem.propTypes = {
    /**
     * The content of the list item.
     */
    children: PropTypes.node.isRequired,
};

BlockListItemLink.propTypes = {
    /**
     * URL pointing to the item link destination.
     */
    to: PropTypes.string.isRequired,
    /**
     * The content of the item link.
     */
    children: PropTypes.node.isRequired,
    /**
     * Classes for extra styling options.
     */
    className: PropTypes.string,
};

BlockListItemLink.defaultProps = {
    className: undefined,
};
