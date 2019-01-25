import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

class EntityAvatar extends React.Component {
    componentDidMount() {
        // These imports are only needed client-side and allow for lazy-loading images. They should
        // be changed to `import()` once Gatsby 2 launches. We're currently limited by the version
        // of Webpack that Gatsby uses.
        // https://github.com/gatsbyjs/gatsby/issues/461
        // https://github.com/thumbtack/thumbprint-archive/issues/960
        /* eslint-disable global-require */
        require('lazysizes');
        // `ls.attrchange.js` re-renders the image when the props change:
        // https://github.com/aFarkas/lazysizes/issues/339
        require('lazysizes/plugins/attrchange/ls.attrchange.js');
        // `ls.object-fit.js` polyfills the object-fit and the object-position property
        // in non supporting browsers i.e. IE 11.
        require('lazysizes/plugins/object-fit/ls.object-fit.js');
        /* eslint-enable */
    }

    render() {
        const { imageUrl, size, initial, fullName } = this.props;

        return (
            <div
                className={classNames(styles.root, {
                    [styles.rootSmall]: size === 'small',
                    [styles.rootMedium]: size === 'medium',
                    [styles.rootLarge]: size === 'large',
                    [styles.rootXlarge]: size === 'xlarge',
                })}
            >
                {imageUrl ? (
                    <img
                        className={`${styles.baseAvatar} ${styles.squareAvatar} lazyload`}
                        data-src={imageUrl}
                        alt={fullName && `Avatar for ${fullName}`}
                        title={fullName && `Avatar for ${fullName}`}
                    />
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
    }
}

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

/**
 * @default
 */
export default class Avatar extends React.Component {
    componentDidMount() {
        // These imports are only needed client-side and allow for lazy-loading images. They should
        // be changed to `import()` once Gatsby 2 launches. We're currently limited by the version
        // of Webpack that Gatsby uses.
        // https://github.com/gatsbyjs/gatsby/issues/461
        // https://github.com/thumbtack/thumbprint-archive/issues/960
        /* eslint-disable global-require */
        require('lazysizes');
        // `ls.attrchange.js` re-renders the image when the props change:
        // https://github.com/aFarkas/lazysizes/issues/339
        require('lazysizes/plugins/attrchange/ls.attrchange.js');
        // `ls.object-fit.js` polyfills the object-fit and the object-position property
        // in non supporting browsers i.e. IE 11.
        require('lazysizes/plugins/object-fit/ls.object-fit.js');
        /* eslint-enable */
    }

    render() {
        const { props } = this;
        return (
            <div
                className={classNames(styles.root, {
                    [styles.rootXsmall]: props.size === 'xsmall',
                    [styles.rootSmall]: props.size === 'small',
                    [styles.rootMedium]: props.size === 'medium',
                    [styles.rootLarge]: props.size === 'large',
                    [styles.rootXlarge]: props.size === 'xlarge',
                })}
            >
                {shouldShowBadge(props) && <Badge {...getBadgeProps(props)} />}
                {props.imageUrl ? (
                    <img
                        className={`${styles.baseAvatar} ${styles.circleAvatar} lazyload`}
                        data-src={props.imageUrl}
                        alt={props.fullName && `Avatar for ${props.fullName}`}
                        title={props.fullName && `Avatar for ${props.fullName}`}
                    />
                ) : (
                    <span
                        className={`${styles.initialsAvatar} ${styles.circleAvatar}`}
                        title={props.fullName && `Avatar for ${props.fullName}`}
                    >
                        {props.initials}
                    </span>
                )}
            </div>
        );
    }
}

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
