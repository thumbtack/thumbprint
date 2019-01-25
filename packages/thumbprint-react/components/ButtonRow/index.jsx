import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

const ButtonRow = ({ children, justify, dataTest, isStackedBelowSmall }) => (
    <div
        className={classNames({
            [styles.root]: true,
            [styles.stackBelowSmall]: isStackedBelowSmall,
            [styles.justifyCenter]: justify === 'center',
            [styles.justifyLeft]: justify === 'left',
            [styles.justifyRight]: justify === 'right',
        })}
        data-test={dataTest}
    >
        {React.Children.map(children, child => (
            <div className={styles.item}>{child}</div>
        ))}
    </div>
);

ButtonRow.propTypes = {
    /**
     * `Button` components to render.
     */
    children: PropTypes.node,
    /**
     * Controls the horizontal alignment of buttons within the container.
     */
    justify: PropTypes.oneOf(['center', 'left', 'right']),
    /**
     * Stack items below the small breakpoint. This pairs well with `width="full-below-small"`
     * for buttons
     */
    isStackedBelowSmall: PropTypes.bool,
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest: PropTypes.string,
};

ButtonRow.defaultProps = {
    children: null,
    justify: 'left',
    isStackedBelowSmall: false,
    dataTest: undefined,
};

export default ButtonRow;
