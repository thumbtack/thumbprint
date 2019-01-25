import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

const LoaderDots = ({ assistiveText, size, theme }) => {
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
};

LoaderDots.propTypes = {
    /**
     * Text that describes the current status and is only visible to
     * screenreaders.
     */
    assistiveText: PropTypes.string,
    /**
     * Controls the size of the dots.
     */
    size: PropTypes.oneOf(['small', 'medium']),
    /**
     * Changes the dot colors.
     */
    theme: PropTypes.oneOf(['brand', 'inverse', 'muted']),
};

LoaderDots.defaultProps = {
    assistiveText: 'Loading',
    size: 'medium',
    theme: 'brand',
};

export default LoaderDots;
