import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isNumber from 'lodash/isNumber';
import * as tokens from '@thumbtack/thumbprint-tokens';
import Badge from './subcomponents/badge.jsx';
import styles from './index.module.scss';
import Image from '../Image/index.jsx';

const dimensions = {
    xsmall: '32px',
    small: '48px',
    medium: '72px',
    large: '100px',
    xlarge: '140px',
};

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 13">
        <path
            d="M17 .943c0 .26-.1.5-.28.69L5.81 12.713c-.18.18-.43.28-.69.29-.26 0-.51-.11-.69-.29 0 0-3.79-3.78-4.16-4.16a.942.942 0 0 1-.27-.69c0-.26.11-.5.3-.68.39-.36 1-.34 1.37.04.26.27 2.33 2.34 3.44 3.44L15.33.293c.37-.38.98-.39 1.37-.03.18.18.29.42.3.68"
            fillRule="evenodd"
        />
    </svg>
);

const STYLES = [
    {
        color: tokens.tpColorIndigo600,
        backgroundColor: tokens.tpColorIndigo100,
    },
    {
        color: tokens.tpColorGreen600,
        backgroundColor: tokens.tpColorGreen100,
    },
    {
        color: tokens.tpColorYellow600,
        backgroundColor: tokens.tpColorYellow100,
    },
    {
        color: tokens.tpColorRed600,
        backgroundColor: tokens.tpColorRed100,
    },
    {
        color: tokens.tpColorPurple600,
        backgroundColor: tokens.tpColorPurple100,
    },
    {
        color: tokens.tpColorBlue600,
        backgroundColor: tokens.tpColorBlue100,
    },
];

const getStyle = initials =>
    initials
        ? STYLES[initials.charCodeAt(0) % STYLES.length]
        : { text: tokens.tpColorBlack, background: tokens.tpColorGray200 };

const EntityAvatar = ({ imageUrl, size, initial, fullName, isOnline }) => (
    <div
        className={classNames(styles.root, {
            [styles.rootXsmall]: size === 'xsmall',
            [styles.rootSmall]: size === 'small',
            [styles.rootMedium]: size === 'medium',
            [styles.rootLarge]: size === 'large',
            [styles.rootXlarge]: size === 'xlarge',
        })}
        style={
            isNumber(size)
                ? { width: size, height: size }
                : { width: dimensions[size], height: dimensions[size] }
        }
    >
        {imageUrl ? (
            <Image
                className={styles.squareAvatar}
                src={imageUrl}
                alt={fullName && `Avatar for ${fullName}`}
                title={fullName && `Avatar for ${fullName}`}
                height={dimensions[size]}
            />
        ) : (
            <span
                className={`${styles.initialsAvatar} ${styles.squareAvatar}`}
                style={getStyle(initial)}
                title={fullName && `Avatar for ${fullName}`}
            >
                {initial}
            </span>
        )}
        {isOnline && <Badge size={size} type="entity" />}
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
    size: PropTypes.oneOfType([
        PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
        PropTypes.number,
    ]),
    /**
     * Displays a badge if the user is online.
     */
    isOnline: PropTypes.bool,
};

EntityAvatar.defaultProps = {
    imageUrl: undefined,
    initial: undefined,
    fullName: undefined,
    size: 'small',
    isOnline: false,
};

const UserAvatar = ({ imageUrl, size, initials, fullName, isOnline, isChecked }) => (
    <div
        className={classNames(styles.root, {
            [styles.rootXsmall]: size === 'xsmall',
            [styles.rootSmall]: size === 'small',
            [styles.rootMedium]: size === 'medium',
            [styles.rootLarge]: size === 'large',
            [styles.rootXlarge]: size === 'xlarge',
        })}
        style={
            isNumber(size)
                ? { width: size, height: size }
                : { width: dimensions[size], height: dimensions[size] }
        }
    >
        {imageUrl ? (
            <Image
                className={styles.circleAvatar}
                src={imageUrl}
                alt={fullName && `Avatar for ${fullName}`}
                title={fullName && `Avatar for ${fullName}`}
                height={dimensions[size]}
            />
        ) : (
            <span
                className={`${styles.initialsAvatar} ${styles.circleAvatar}`}
                style={getStyle(initials)}
                title={fullName && `Avatar for ${fullName}`}
            >
                {initials}
            </span>
        )}
        {(isOnline || isChecked) && (
            <Badge size={size} type="user">
                {isChecked && <CheckIcon />}
            </Badge>
        )}
    </div>
);

UserAvatar.propTypes = {
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
    size: PropTypes.oneOfType([
        PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
        PropTypes.number,
    ]),
    /**
     * @deprecated: Displays a badge of a checkmark next to the `Avatar`.
     */
    isChecked: PropTypes.bool,
    /**
     * Displays a badge if the user is online.
     */
    isOnline: PropTypes.bool,
};

UserAvatar.defaultProps = {
    imageUrl: undefined,
    initials: undefined,
    fullName: undefined,
    size: 'small',
    isChecked: false,
    isOnline: undefined,
};

export { UserAvatar, EntityAvatar };
