import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './badge.module.scss';

const sizeClasses = {
    small: {
        small: styles.smallAvatarSmallBadge,
        large: styles.smallAvatarLargeBadge,
    },
    medium: {
        small: styles.mediumAvatarSmallBadge,
        large: styles.mediumAvatarLargeBadge,
    },
    large: {
        small: styles.largeAvatarSmallBadge,
        large: styles.largeAvatarLargeBadge,
    },
    xlarge: {
        small: styles.xlargeAvatarSmallBadge,
        large: styles.xlargeAvatarLargeBadge,
    },
};

const getBadgeSize = children => {
    if (children) {
        return 'large';
    }

    return 'small';
};

const propTypes = {
    background: PropTypes.oneOf(['red', 'green']).isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']).isRequired,
    children: PropTypes.node,
};

const defaultProps = {
    children: undefined,
};

/**
 * `Badge` appears on the top-right corner of an `Avatar`. It is used to either
 * show a checkmark or an indicator that there are unread notifications.
 */
export default function Badge({ background, size, children }) {
    return (
        <div
            className={classNames(
                styles.badge,
                {
                    [styles.badgeRed]: background === 'red',
                    [styles.badgeGreen]: background === 'green',
                },
                sizeClasses[size][getBadgeSize(children)],
            )}
        >
            {children}
        </div>
    );
}
Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;
