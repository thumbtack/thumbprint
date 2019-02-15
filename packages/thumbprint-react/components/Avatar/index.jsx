import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LazyImage } from '../Image/index.jsx';
import CheckIcon from './static/check.svg';
import Badge from './subcomponents/badge.jsx';
import styles from './index.module.scss';

const getBadgeProps = ({ size, hasUnreadNotifications, isChecked, isOnline }) => {
    const props = {
        size,
    };

    if (hasUnreadNotifications) {
        props.background = 'red';
    } else if (isChecked) {
        props.children = <CheckIcon />;
        props.background = 'green';
    } else if (isOnline) {
        props.background = 'green';
    }

    return props;
};

const shouldShowBadge = ({ size, hasUnreadNotifications, isChecked, isOnline }) =>
    size !== 'xsmall' && (hasUnreadNotifications || isChecked || isOnline);

const EntityAvatar = ({ imageUrl, size, initial, fullName }) => (
    <div
        className={classNames(styles.root, {
            [styles.rootSmall]: size === 'small',
            [styles.rootMedium]: size === 'medium',
            [styles.rootLarge]: size === 'large',
            [styles.rootXlarge]: size === 'xlarge',
        })}
    >
        {imageUrl ? (
            <LazyImage src={imageUrl} alt={fullName ? `Avatar for ${fullName}` : ''}>
                {({ src, alt }) => (
                    <img
                        className={`${styles.baseAvatar} ${styles.squareAvatar} lazyload`}
                        src={src}
                        alt={alt}
                        title={alt}
                    />
                )}
            </LazyImage>
        ) : (
            <span
                className={`${styles.initialsAvatar} ${styles.squareAvatar}`}
                title={fullName && `Avatar for ${fullName}`}
            >
                {initial}
            </span>
        )}
    </div>
);

EntityAvatar.propTypes = {
    /**
     * HTTPS URL that points a user's avatar. The `imageURL` will take
     * precendence over `initials` if both are supplied.
     */
    imageUrl: PropTypes.string,
    /**
     * The entity's initial. This should be passed in as a one character string.
     */
    initial: PropTypes.string,
    /**
     * The user's full name. This is used as `title` and `alt` text.
     */
    fullName: PropTypes.string,
    /**
     * The set of avatar sizes that we support.
     */
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
};

EntityAvatar.defaultProps = {
    imageUrl: undefined,
    initial: undefined,
    fullName: undefined,
    size: 'medium',
};

const Avatar = props => {
    const { imageUrl, fullName, initials, size } = props;

    return (
        <div
            className={classNames(styles.root, {
                [styles.rootXsmall]: size === 'xsmall',
                [styles.rootSmall]: size === 'small',
                [styles.rootMedium]: size === 'medium',
                [styles.rootLarge]: size === 'large',
                [styles.rootXlarge]: size === 'xlarge',
            })}
        >
            {shouldShowBadge(props) && <Badge {...getBadgeProps(props)} />}

            {imageUrl ? (
                <LazyImage src={imageUrl} alt={fullName ? `Avatar for ${fullName}` : ''}>
                    {({ src, alt }) => (
                        <img
                            className={`${styles.baseAvatar} ${styles.circleAvatar} lazyload`}
                            src={src}
                            alt={alt}
                            title={alt}
                        />
                    )}
                </LazyImage>
            ) : (
                <span
                    className={`${styles.initialsAvatar} ${styles.circleAvatar}`}
                    title={fullName && `Avatar for ${fullName}`}
                >
                    {initials}
                </span>
            )}
        </div>
    );
};

export default Avatar;

Avatar.propTypes = {
    /**
     * HTTPS URL that points a user's avatar. The `imageURL` will take
     * precendence over `initials` if both are supplied.
     */
    imageUrl: PropTypes.string,
    /**
     * The user's initials. This should be passed in as a two character string
     * for best results.
     */
    initials: PropTypes.string,
    /**
     * The user's full name. This is used as `title` and `alt` text.
     */
    fullName: PropTypes.string,
    /**
     * The set of avatar sizes that we support.
     */
    size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
    /**
     * Displays a badge of a checkmark next to the `Avatar`.
     */
    isChecked: PropTypes.bool,
    /**
     * Should be true if the user has unread notifications. Displays a badge
     * as an indication.
     */
    hasUnreadNotifications: PropTypes.bool,
    /**
     * Displays a badge if the user is online.
     */
    isOnline: PropTypes.bool,
};

Avatar.defaultProps = {
    imageUrl: undefined,
    initials: undefined,
    fullName: undefined,
    size: 'medium',
    isChecked: false,
    hasUnreadNotifications: false,
    isOnline: undefined,
};

export { EntityAvatar };
