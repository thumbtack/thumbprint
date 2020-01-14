import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

interface PropTypes {
    /**
     * Text content to render.
     */
    children: string;
    /**
     * "Tiny" size icon to render.
     */
    icon?: React.ReactNode;
    /**
     * Color of the pill text and background.
     */
    color?: 'green' | 'red' | 'indigo' | 'blue' | 'yellow' | 'purple';
}

export default function Pill({ color, icon, children }: PropTypes): JSX.Element {
    return (
        <div
            className={classNames({
                [styles.root]: true,
                [styles.pillGreen]: color === 'green',
                [styles.pillRed]: color === 'red',
                [styles.pillIndigo]: color === 'indigo',
                [styles.pillBlue]: color === 'blue',
                [styles.pillYellow]: color === 'yellow',
                [styles.pillPurple]: color === 'purple',
            })}
        >
            <div className={styles.content}>
                {icon && <span className={styles.iconWrap}>{icon}</span>}
                <span>{children}</span>
            </div>
        </div>
    );
}
