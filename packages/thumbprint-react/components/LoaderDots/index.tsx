import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

interface PropTypes {
    /**
     * Text that describes the current status and is only visible to
     * screenreaders.
     */
    assistiveText?: string;
    /**
     * Controls the size of the dots.
     */
    size?: 'small' | 'medium';
    /**
     * Changes the dot colors.
     */
    theme?: 'brand' | 'inverse' | 'muted';
}

export default function LoaderDots({
    assistiveText = 'Loading',
    size = 'medium',
    theme = 'brand',
}: PropTypes): JSX.Element {
    const dotClasses = classNames({
        [styles.dot]: true,
        [styles.dotThemeBrand]: theme === 'brand',
        [styles.dotThemeInverse]: theme === 'inverse',
        [styles.dotThemeMuted]: theme === 'muted',
        [styles.dotSizeSmall]: size === 'small',
        [styles.dotSizeMedium]: size === 'medium',
    });

    return (
        <ul className={styles.root} role="status">
            <li className={dotClasses} />
            <li className={dotClasses} />
            <li className={dotClasses} />
            <li className={styles.hiddenText}>{assistiveText}</li>
        </ul>
    );
}
