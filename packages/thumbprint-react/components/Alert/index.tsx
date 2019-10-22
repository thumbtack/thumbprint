import React from 'react';
import classNames from 'classnames';
import { AlertCheck, AlertNote, AlertWarning } from '../../icons/index.jsx';

import styles from './index.module.scss';

interface BannerPropTypes {
    /**
     * Text within the alert
     */
    children?: React.ReactNode;
    /**
     * Defines the style of the alert
     */
    theme: 'good' | 'bad' | 'warning' | 'note';
    /**
     * A selector to hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}

const BannerAlert = ({ children, theme, dataTest }: BannerPropTypes): JSX.Element => (
    <div
        className={classNames({
            [styles.root]: true,
            [styles.banner]: true,
            [styles.good]: theme === 'good',
            [styles.bad]: theme === 'bad',
            [styles.warning]: theme === 'warning',
            [styles.note]: theme === 'note',
        })}
        data-test={dataTest}
    >
        <div className={styles.text}>{children}</div>
    </div>
);

interface InPagePropTypes {
    /**
     * Text within the alert
     */
    children?: React.ReactNode;
    /**
     * Defines the style of the alert
     */
    theme: 'good' | 'bad' | 'warning' | 'note';
    /**
     * A selector to hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}

const ALERT_ICONS = {
    good: <AlertCheck className={styles.icon} />,
    bad: <AlertWarning className={styles.icon} />,
    warning: <AlertWarning className={styles.icon} />,
    note: <AlertNote className={styles.icon} />,
};

const InPageAlert = ({ children, theme, dataTest }: InPagePropTypes): JSX.Element => (
    <div
        className={classNames({
            [styles.root]: true,
            [styles.good]: theme === 'good',
            [styles.bad]: theme === 'bad',
            [styles.warning]: theme === 'warning',
            [styles.note]: theme === 'note',
        })}
        data-test={dataTest}
    >
        {ALERT_ICONS[theme]}
        <div className={styles.text}>{children}</div>
    </div>
);

export { BannerAlert, InPageAlert };
