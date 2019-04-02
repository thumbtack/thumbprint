import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

class ServiceCardImage extends React.Component {
    componentDidMount() {
        // These imports are only needed client-side and allow for lazy-loading images. They should
        // be changed to `import()` once Gatsby 2 launches. We're currently limited by the version
        // of Webpack that Gatsby uses.
        // https://github.com/gatsbyjs/gatsby/issues/461
        // https://github.com/thumbtack/thumbprint-archive/issues/960
        /* eslint-disable global-require */
        require('lazysizes/plugins/unveilhooks/ls.unveilhooks');
        require('lazysizes');
        // `ls.attrchange.js` re-renders the image when the props change:
        // https://github.com/aFarkas/lazysizes/issues/339
        require('lazysizes/plugins/attrchange/ls.attrchange.js');
        /* eslint-enable */
    }

    render() {
        const { url, alt } = this.props;

        return (
            <div className={`${styles.image} lazyload`} data-bg={url} role="img" aria-label={alt} />
        );
    }
}

function ServiceCardTitle({ children }) {
    return (
        <div className={styles.title} title={children}>
            {children}
        </div>
    );
}

function ServiceCardDescription({ iconColor, icon, children }) {
    return (
        <div
            className={classNames(styles.descriptionWrap, {
                [styles.iconBlue]: iconColor === 'blue',
                [styles.iconGreen]: iconColor === 'green',
            })}
        >
            {icon}
            <div className={styles.description}>{children}</div>
        </div>
    );
}

export default function ServiceCard({ url, children }) {
    return (
        <a href={url} className={styles.root}>
            {children}
        </a>
    );
}

ServiceCard.propTypes = {
    /**
     * URL pointing to the card link destination.
     */
    url: PropTypes.string.isRequired,
    /**
     * Accepts content of `ServiceCardImage`, `ServiceCardTitle`, `ServiceCardDescription`.
     */
    children: PropTypes.node.isRequired,
};

ServiceCardImage.propTypes = {
    /**
     * URL pointing to image to be displayed.
     */
    url: PropTypes.string.isRequired,
    /**
     * Image alt tag that's passed to `aria-label` for better accessibility.
     */
    alt: PropTypes.string,
};

ServiceCardImage.defaultProps = {
    alt: undefined,
};

ServiceCardTitle.propTypes = {
    /**
     * Service title.
     */
    children: PropTypes.node.isRequired,
};

ServiceCardDescription.propTypes = {
    /**
     * Service description or other service info.
     */
    children: PropTypes.node.isRequired,
    /**
     * Icon from [Thumbprint Icons](/icons/) to render within the
     * service card. It must be one of the small icons.
     */
    icon: PropTypes.node,
    /**
     * Color options for icon. Only required if you want to override default color.
     */
    iconColor: PropTypes.oneOf(['blue', 'green']),
};

ServiceCardDescription.defaultProps = {
    icon: undefined,
    iconColor: 'blue',
};

export { ServiceCardDescription, ServiceCardTitle, ServiceCardImage };
