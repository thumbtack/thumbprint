import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Image from '../Image/index';
import styles from './index.module.scss';

type ImageSource = {
    type: 'image/webp' | 'image/jpeg' | 'image/png' | 'image/gif';
    srcSet: string;
};

interface ServiceCardImagePropTypes {
    /**
     * URL pointing to image to be displayed. This image must have an aspect ratio of 8:5.
     * @deprecated Use `src` instead of `url`.
     */
    url?: string;
    /**
     * URL pointing to image to be displayed. This image must have an aspect ratio of 8:5.
     */
    src: string;
    /**
     * Allows the browser to choose the best file format and image size based on the device screen
     * density and the width of the rendered image. Images must have an aspect ratio of 8:5.
     */
    sources?: ImageSource[];
    /**
     * Image alt tag that's passed to `aria-label` for better accessibility.
     */
    alt?: string;
}

const ServiceCardImage = forwardRef<HTMLElement, ServiceCardImagePropTypes>(
    (props: ServiceCardImagePropTypes, outerRef) => {
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
    },
);

// Needed because of the `forwardRef`.
ServiceCardImage.displayName = 'ServiceCardImage';

interface ServiceCardTitlePropTypes {
    children: string;
}

function ServiceCardTitle({ children }: ServiceCardTitlePropTypes): JSX.Element {
    return (
        <div className={styles.title} title={children}>
            {children}
        </div>
    );
}

interface ServiceCardDescriptionPropTypes {
    /**
     * Service description or other service info.
     */
    children: React.ReactNode;
    /**
     * Icon from [Thumbprint Icons](/icons/) to render within the
     * service card. It must be one of the small icons.
     */
    icon?: React.ReactNode;
    /**
     * Color options for icon. Only required if you want to override default color.
     */
    iconColor?: 'blue' | 'green';
}

function ServiceCardDescription({
    iconColor = 'blue',
    icon,
    children,
}: ServiceCardDescriptionPropTypes): JSX.Element {
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

interface ServiceCardPropTypes {
    /**
     * URL pointing to the card link destination.
     */
    url: string;
    /**
     * Accepts content of `ServiceCardImage`, `ServiceCardTitle`, `ServiceCardDescription`.
     */
    children: React.ReactNode;
    /**
     * Handler for click events
     */
    onClick?: () => void;
    /**
     * Opens the URL in a new tab when clicked.
     */
    shouldOpenInNewTab?: boolean;
}

export default function ServiceCard({
    url,
    children,
    onClick,
    shouldOpenInNewTab = false,
}: ServiceCardPropTypes): JSX.Element {
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

export { ServiceCardDescription, ServiceCardTitle, ServiceCardImage };
