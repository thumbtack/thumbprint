import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import { BlockedFilled, InfoFilled, WarningFilled } from '../../icons';

export interface AlertBannerProps {
    /**
     * Text within the alert
     */
    children: React.ReactNode;
    /**
     * Determines the background color and text color of the component
     */
    theme: 'info' | 'warning' | 'caution';
    /**
     * A React component such as `<MyCustomIcon />` to render as the icon.
     */
    icon?: React.ReactNode;
    /**
     * A selector to hook into the React component for use in automated testing environments.
     */
    dataTestId?: string;
    /**
     * A selector to hook into the React component for use in automated testing environments.
     * @deprecated Deprecated in favor of the `dataTestId` prop
     */
    dataTest?: string;
}

const ALERT_ICONS = {
    // Icon names map to the icon name in Thumbprint, not the theme prop
    caution: <WarningFilled className={styles.icon} />,
    info: <InfoFilled className={styles.icon} />,
    warning: <BlockedFilled className={styles.icon} />,
};
export default function AlertBanner({
    children,
    theme,
    dataTestId,
    dataTest,
    icon,
}: AlertBannerProps): JSX.Element {
    return (
        <div
            className={classNames({
                [styles.root]: true,
                [styles.caution]: theme === 'caution',
                [styles.info]: theme === 'info',
                [styles.warning]: theme === 'warning',
            })}
            data-testid={dataTestId}
            data-test={dataTest}
        >
            {icon || ALERT_ICONS[theme]}
            <div>{children}</div>
        </div>
    );
}
