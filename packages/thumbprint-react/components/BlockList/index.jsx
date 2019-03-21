import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

export function BlockListItemLink({ className, children, ...rest }) {
    return (
        <a
            {...rest}
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

export function BlockList({ children, border }) {
    return (
        <div
            className={classNames({
                [styles.list]: true,
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
     * The list items and any item links.
     */
    children: PropTypes.node.isRequired,
};

BlockList.defaultProps = {
    border: undefined,
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
    href: PropTypes.string.isRequired,
    /**
     * Classes for extra styling options.
     */
    className: PropTypes.string,
    /**
     * Content of the link.
     */
    children: PropTypes.node.isRequired,
};

BlockListItemLink.defaultProps = {
    className: undefined,
};
