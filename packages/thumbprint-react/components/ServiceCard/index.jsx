import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from '../Image/index.jsx';
import styles from './index.module.scss';

const ServiceCardImage = forwardRef((props, outerRef) => {
    const { url, src, sources, alt } = props;
    return (
        <Image
            className={styles.image}
            sources={sources}
            containerAspectRatio={8 / 5}
            src={url || src} // `url` deprecated
            alt={alt}
            ref={outerRef}
        />
    );
});

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

export default function ServiceCard({ url, children, onClick, shouldOpenInNewTab }) {
    return (
        <a
            href={url}
            onClick={onClick}
            target={shouldOpenInNewTab ? '_blank' : '_self'}
            className={styles.root}
        >
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
    /**
     * Handler for click events
     */
    onClick: PropTypes.func,
    /**
     * Opens the URL in a new tab when clicked.
     */
    shouldOpenInNewTab: PropTypes.bool,
};

ServiceCard.defaultProps = {
    onClick: null,
    shouldOpenInNewTab: false,
};

ServiceCardImage.propTypes = {
    /**
     * URL pointing to image to be displayed. This image must have an aspect ratio of 8:5.
     * @deprecated Use `src` instead of `url`.
     */
    url: PropTypes.string,
    /**
     * URL pointing to image to be displayed. This image must have an aspect ratio of 8:5.
     */
    src: PropTypes.string,
    /**
     * Allows the browser to choose the best file format and image size based on the device screen
     * density and the width of the rendered image. Images must have an aspect ratio of 8:5.
     */
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['image/webp', 'image/jpeg', 'image/png', 'image/gif'])
                .isRequired,
            srcSet: PropTypes.string.isRequired,
        }),
    ),
    /**
     * Image alt tag that's passed to `aria-label` for better accessibility.
     */
    alt: PropTypes.string,
};

ServiceCardImage.defaultProps = {
    alt: undefined,
    sources: undefined,
    url: undefined,
    src: undefined,
};

// Needed because of the `forwardRef`.
ServiceCardImage.displayName = 'ServiceCardImage';

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
