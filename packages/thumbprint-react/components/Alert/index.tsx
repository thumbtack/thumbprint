import React from 'react';
import classNames from 'classnames';
import { AlertCheck, AlertInfo, AlertWarning } from '../../icons/index.jsx';

import styles from './index.module.scss';

interface BannerPropTypes {
    /**
     * Text within the alert
     */
    children?: React.ReactNode;
    /**
     * Defines the style of the alert
     */
    theme?: 'good' | 'bad' | 'warning' | 'info';
    /**
     * A selector to hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}

export function BannerAlert({
    children = null,
    theme = 'info',
    dataTest,
}: BannerPropTypes): JSX.Element {
    return (
        <div
            className={classNames({
                [styles.root]: true,
                [styles.banner]: true,
                [styles.good]: theme === 'good',
                [styles.bad]: theme === 'bad',
                [styles.warning]: theme === 'warning',
                [styles.info]: theme === 'info',
            })}
            data-test={dataTest}
        >
            <div className={styles.text}>{children}</div>
        </div>
    );
}

interface InPagePropTypes {
    /**
     * Text within the alert
     */
    children?: React.ReactNode;
    /**
     * Defines the style of the alert
     */
    theme?: 'good' | 'bad' | 'warning' | 'info';
    /**
     * A selector to hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}

const ALERT_ICONS = {
    good: <AlertCheck className={styles.icon} />,
    bad: <AlertWarning className={styles.icon} />,
    warning: <AlertWarning className={styles.icon} />,
    info: <AlertInfo className={styles.icon} />,
};

export function InPageAlert({
    children = null,
    theme = 'info',
    dataTest,
}: InPagePropTypes): JSX.Element {
    return (
        <div
            className={classNames({
                [styles.root]: true,
                [styles.good]: theme === 'good',
                [styles.bad]: theme === 'bad',
                [styles.warning]: theme === 'warning',
                [styles.info]: theme === 'info',
            })}
            data-test={dataTest}
        >
            {ALERT_ICONS[theme]}
            <div className={styles.text}>{children}</div>
        </div>
    );
}
