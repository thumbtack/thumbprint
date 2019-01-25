import React from 'react';
import PropTypes from 'prop-types';
import * as tokens from '@thumbtack/thumbprint-tokens';
import classNames from 'classnames';
import styles from './index.module.scss';

const iconColor = {
    disabled: tokens.tpColorGray,
    default: tokens.tpColorBlack,
    error: tokens.tpColorRed,
};

const getUIState = ({ isDisabled, hasError }) => {
    if (isDisabled) {
        return 'disabled';
    }

    if (hasError) {
        return 'error';
    }

    return 'default';
};

const Select = ({
    children,
    dataTest,
    hasError,
    id,
    isDisabled,
    isFullWidth,
    isRequired,
    name,
    onChange,
    onClick,
    size,
    value,
}) => {
    const uiState = getUIState({ isDisabled, hasError });
    return (
        <div
            className={classNames({
                [styles.root]: true,
                [styles.rootWidthFull]: isFullWidth,
            })}
        >
            <select
                className={classNames({
                    [styles.select]: true,
                    [styles.selectStateDisabled]: uiState === 'disabled',
                    [styles.selectStateError]: uiState === 'error',
                    [styles.selectStateDefault]: uiState === 'default',
                    [styles.selectSizeSmall]: size === 'small',
                    [styles.selectSizeLarge]: size === 'large',
                })}
                id={id}
                disabled={isDisabled}
                required={isRequired}
                value={value}
                onClick={() => onClick && onClick()}
                onChange={e => onChange(e.target.value)}
                data-test={dataTest}
                name={name}
            >
                {children}
            </select>

            {/**
                Should be using Thumbprint Icons but blocked by:
                https://github.com/thumbtack/thumbprint-archive/issues/687
            */}
            <svg
                className={styles.caret}
                fill={iconColor[uiState]}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                data-thumbprint-id="navigation-caret-down--small"
            >
                <path d="M14.646 6.764L9 13 3.311 6.725a1 1 0 0 1 1.342-1.482L9 10l4.285-4.699c.2-.187.435-.301.715-.301a1 1 0 0 1 1 1c0 .306-.151.537-.354.764z" />
            </svg>
        </div>
    );
};

Select.propTypes = {
    /**
     * A collection of [HTML `<option>` elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option).
     */
    children: PropTypes.node,
    /**
     * Adds a HTML `id` attribute to the select. This is used for linking the HTML with a
     * [Label](/components/label/react/).
     */
    id: PropTypes.string,
    /**
     * Visually and functionally disables the select dropdown.
     */
    isDisabled: PropTypes.bool,
    /**
     * Adds `required` HTML attribute to element, indicating that an option with a non-empty string
     * value must be selected.
     */
    isRequired: PropTypes.bool,
    /**
     * Makes the radio and text color red.
     */
    hasError: PropTypes.bool,
    /**
     * Changes the select’s font-size, height, and padding.
     */
    size: PropTypes.oneOf(['small', 'large']),
    /**
     * Set the `<select>`'s width to `100%` as opposed to the default behavior
     * of only taking up the necessary width.
     */
    isFullWidth: PropTypes.bool,
    /**
     * The `value` of the `<option>` that is selected. See [React documentation
     * on `<select>` and controlled components](https://facebook.github.io/react/docs/forms.html#the-select-tag)
     * to learn more.
     */
    value: PropTypes.string.isRequired,
    /**
     * Function that is fired when the value of the select changes.
     */
    onClick: PropTypes.func,
    /**
     * A function that is fired when the value of the select changes. The
     * new `value` is passed to the function.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest: PropTypes.string,
    /**
     * Adds `name` HTML attribute to element, indicating the property name associated with the selected value.
     */
    name: PropTypes.string,
};

Select.defaultProps = {
    children: undefined,
    id: undefined,
    isDisabled: false,
    isRequired: false,
    hasError: false,
    isFullWidth: false,
    size: 'large',
    onClick: undefined,
    dataTest: undefined,
    name: undefined,
};

export default Select;
