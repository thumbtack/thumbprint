import React from 'react';
import PropTypes from 'prop-types';
import * as tokens from '@thumbtack/thumbprint-tokens';
import warning from 'warning';
import styles from './index.module.scss';

const labelCursor = {
    error: 'pointer',
    disabled: 'default',
    default: 'pointer',
};

const color = {
    error: {
        unchecked: tokens.tpColorRed,
        checked: tokens.tpColorRed,
        indeterminate: tokens.tpColorRed,
    },
    disabled: {
        unchecked: tokens.tpColorGray,
        checked: tokens.tpColorGray,
        indeterminate: tokens.tpColorGray,
    },
    default: {
        unchecked: 'inherit',
        checked: tokens.tpColorWhite,
        indeterminate: tokens.tpColorWhite,
    },
};

const borderColor = {
    error: {
        unchecked: tokens.tpColorRed,
        checked: tokens.tpColorRed,
        indeterminate: tokens.tpColorRed,
    },
    disabled: {
        unchecked: tokens.tpColorGray300,
        checked: tokens.tpColorGray300,
        indeterminate: tokens.tpColorGray300,
    },
    default: {
        unchecked: tokens.tpColorGray,
        checked: tokens.tpColorBlue,
        indeterminate: tokens.tpColorBlue,
    },
};

const backgroundColor = {
    error: {
        unchecked: tokens.tpColorWhite,
        checked: tokens.tpColorWhite,
        indeterminate: tokens.tpColorWhite,
    },
    disabled: {
        unchecked: tokens.tpColorGray200,
        checked: tokens.tpColorGray200,
        indeterminate: tokens.tpColorGray200,
    },
    default: {
        unchecked: tokens.tpColorWhite,
        checked: tokens.tpColorBlue,
        indeterminate: tokens.tpColorBlue,
    },
};

const textColor = {
    error: tokens.tpColorRed,
    disabled: tokens.tpColorGray,
    default: 'inherit',
};

const getCheckedState = ({ isChecked, isIndeterminate }) => {
    if (isChecked) {
        return 'checked';
    }

    if (isIndeterminate) {
        return 'indeterminate';
    }

    return 'unchecked';
};

const getFunctionalState = ({ isDisabled, hasError }) => {
    if (isDisabled) {
        return 'disabled';
    }

    if (hasError) {
        return 'error';
    }

    return 'default';
};

const Checkbox = ({
    children,
    dataTest,
    hasError,
    id,
    isChecked,
    isDisabled,
    isIndeterminate,
    labelPadding,
    name,
    onChange,
}) => {
    const functionalState = getFunctionalState({ isDisabled, hasError });
    const checkedState = getCheckedState({ isChecked, isIndeterminate });

    warning(
        children || id,
        'If `children` is not provided to `Checkbox`, the `id` prop must be used to link the `Checkbox` to a `label` element.',
    );

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
        <label
            className={styles.root}
            style={{ cursor: labelCursor[functionalState], padding: labelPadding }}
        >
            <input
                className={styles.input}
                aria-checked={isIndeterminate ? 'mixed' : isChecked}
                data-test={dataTest}
                type="checkbox"
                id={id}
                name={name}
                checked={isChecked}
                onChange={e => onChange(e.target.checked, id)}
                disabled={isDisabled}
            />

            <div
                className={styles.checkboxImage}
                style={{
                    color: color[functionalState][checkedState],
                    backgroundColor: backgroundColor[functionalState][checkedState],
                    borderColor: borderColor[functionalState][checkedState],
                }}
            >
                {isChecked && !isIndeterminate && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        data-thumbprint-id="contentactions-check--small"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14.5810763,3.19812449 C14.132085,2.85681117 13.5060971,2.96739243 13.1851033,3.44586905 L8.01720309,11.1408364 L4.52827048,8.83245251 C4.05827956,8.52197434 3.44229146,8.67402358 3.1502971,9.17270255 C2.85930272,9.67138151 3.00329993,10.3274261 3.47229088,10.6379043 L8.55419272,14 L14.8130718,4.68246529 C15.1350656,4.20398867 15.0300676,3.53943781 14.5810763,3.19812449"
                        />
                    </svg>
                )}
                {isIndeterminate && (
                    <svg
                        width="10"
                        height="2"
                        viewBox="0 0 10 2"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect x="0" y="0" width="10" height="2" />
                    </svg>
                )}
            </div>

            {children && (
                <span style={{ color: textColor[functionalState] }} className={styles.text}>
                    {children}
                </span>
            )}
        </label>
    );
};

Checkbox.propTypes = {
    /**
     * Disables the input and the label.
     */
    isDisabled: PropTypes.bool,
    /**
     * Determines if the checkbox is checked.
     */
    isChecked: PropTypes.bool,
    /**
     * Makes the radio and text color red.
     */
    hasError: PropTypes.bool,
    /**
     * Text or elements that appear within the label. If `children` is not provided, the developer
     * must use the `Radio`'s `id` prop to associate it with a custom `<label>` element.
     */
    children: PropTypes.node,
    /**
     * The `id` is added to the checkbox as an HTML attribute and passed to the `onChange`
     * function.
     */
    id: PropTypes.string,
    /**
     * Checkboxes on a page with the same name will be grouped together when sent to the server.
     * The browser will only send the value of checkboxes that are checked.
     */
    name: PropTypes.string,
    /**
     * Determine that padding that gets applied to the label. This can be used
     * to increase the label's click target. The value supplied should be a
     * string with a unit such as `8px` or `8px 16px`.
     */
    labelPadding: PropTypes.string,
    /**
     * Function that runs when a checkbox value changes. It receives the new boolean value and
     * the provided `id` as such: `props.onChange(e.target.checked, props.id)`.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Shows a horizontal line to represent an indeterminate input.
     */
    isIndeterminate: PropTypes.bool,
    /**
     * A selector hook into the React component for use in automated testing environments. It is
     * applied internally to the `<input />` element.
     */
    dataTest: PropTypes.string,
};

Checkbox.defaultProps = {
    isDisabled: false,
    children: null,
    id: null,
    isChecked: false,
    hasError: false,
    name: null,
    labelPadding: '14px 0',
    isIndeterminate: false,
    dataTest: undefined,
};

export default Checkbox;
