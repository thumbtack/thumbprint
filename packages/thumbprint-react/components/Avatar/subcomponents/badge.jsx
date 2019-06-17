import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './badge.module.scss';

const sizeClasses = {
    xsmall: {
        small: styles.smallAvatarSmallBadge,
        large: styles.smallAvatarLargeBadge,
    },
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

const getBadgeSize = children => (children ? 'large' : 'small');

const propTypes = {
    size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']).isRequired,
    shape: PropTypes.oneOf(['round', 'square']).isRequired,
    children: PropTypes.node,
};

const defaultProps = {
    children: undefined,
};

/**
 * `Badge` appears on the top-right corner of an `Avatar`. It is used to either
 * show a checkmark or an indicator that there are unread notifications.
 */
export default function Badge({ size, shape, children }) {
    return (
        <div
            className={classNames(
                styles.badge,
                {
                    [styles.badgeRound]: shape === 'round',
                    [styles.badgeSquare]: shape === 'square',
                },
                sizeClasses[size][getBadgeSize(children)],
            )}
            style={shape === 'square' ? { top: 0, right: 0 } : {}}
        >
            {children}
        </div>
    );
}
Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;
