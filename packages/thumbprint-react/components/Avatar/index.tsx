import React, { forwardRef } from 'react';
import classNames from 'classnames';
import isNumber from 'lodash/isNumber';
import * as tokens from '@thumbtack/thumbprint-tokens';
import Badge from './subcomponents/badge';
import styles from './index.module.scss';
import Image from '../Image/index';

const dimensions = {
    xsmall: '32px',
    small: '48px',
    medium: '72px',
    large: '100px',
    xlarge: '140px',
};

const CheckIcon = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 13">
        <path
            d="M17 .943c0 .26-.1.5-.28.69L5.81 12.713c-.18.18-.43.28-.69.29-.26 0-.51-.11-.69-.29 0 0-3.79-3.78-4.16-4.16a.942.942 0 0 1-.27-.69c0-.26.11-.5.3-.68.39-.36 1-.34 1.37.04.26.27 2.33 2.34 3.44 3.44L15.33.293c.37-.38.98-.39 1.37-.03.18.18.29.42.3.68"
            fillRule="evenodd"
        />
    </svg>
);

interface StyleType {
    color: string;
    backgroundColor: string;
}

const STYLES: StyleType[] = [
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

const getStyle = (initials?: string): StyleType =>
    initials
        ? STYLES[initials.charCodeAt(0) % STYLES.length]
        : { color: tokens.tpColorBlack, backgroundColor: tokens.tpColorGray200 };

const EntityAvatar = forwardRef<HTMLElement, EntityPropTypes>(
    (props: EntityPropTypes, outerRef): JSX.Element => {
        const { imageUrl, size = 'small', initial, fullName, isOnline = false } = props;

        return (
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
                        height={typeof size === 'string' ? dimensions[size] : `${size}px`}
                        ref={outerRef}
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
                {isOnline && (
                    <Badge size={typeof size === 'string' ? size : 'medium'} type="entity" />
                )}
            </div>
        );
    },
);

interface EntityPropTypes {
    /**
     * HTTPS URL that points a user's avatar. The `imageURL` will take
     * precendence over `initials` if both are supplied.
     */
    imageUrl?: string;
    /**
     * The entity's initial. This should be passed in as a one character string.
     */
    initial?: string;
    /**
     * The entity's full name. This is used as `title` and `alt` text.
     */
    fullName?: string;
    /**
     * The set of avatar sizes that we support.
     */
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | number;
    /**
     * Displays a badge if the user is online.
     */
    isOnline?: boolean;
}

// Needed because of the `forwardRef`.
EntityAvatar.displayName = 'EntityAvatar';

const UserAvatar = forwardRef<HTMLElement, UserPropTypes>(
    (props: UserPropTypes, outerRef): JSX.Element => {
        const { imageUrl, size = 'small', initials, fullName, isOnline = false, isChecked } = props;

        return (
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
                        height={typeof size === 'string' ? dimensions[size] : `${size}px`}
                        ref={outerRef}
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
                    <Badge size={typeof size === 'string' ? size : 'medium'} type="user">
                        {isChecked && <CheckIcon />}
                    </Badge>
                )}
            </div>
        );
    },
);

interface UserPropTypes {
    /**
     * HTTPS URL that points a user's avatar. The `imageURL` will take
     * precendence over `initials` if both are supplied.
     */
    imageUrl?: string;
    /**
     * The user's initials. This should be passed in as a two character string
     * for best results.
     */
    initials?: string;
    /**
     * The user's full name. This is used as `title` and `alt` text.
     */
    fullName?: string;
    /**
     * The set of avatar sizes that we support.
     */
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | number;
    /**
     * Displays a badge of a checkmark next to the `Avatar`.
     * @deprecated
     */
    isChecked?: boolean;
    /**
     * Displays a badge if the user is online.
     */
    isOnline?: boolean;
}

// Needed because of the `forwardRef`.
UserAvatar.displayName = 'UserAvatar';

export { UserAvatar, EntityAvatar };
