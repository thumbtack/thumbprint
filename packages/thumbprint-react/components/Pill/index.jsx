import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './index.module.scss';

export default function Pill({ color, icon, children }) {
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

Pill.propTypes = {
    /**
     * Text content to render.
     */
    children: PropTypes.string.isRequired,
    /**
     * "Tiny" size icon to render.
     */
    icon: PropTypes.node,
    /**
     * Color of the pill text and background.
     */
    color: PropTypes.oneOf(['green', 'red', 'indigo', 'blue', 'yellow', 'purple']),
};

Pill.defaultProps = {
    icon: undefined,
    color: undefined,
};
