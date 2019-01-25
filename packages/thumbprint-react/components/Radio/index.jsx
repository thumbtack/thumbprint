import React from 'react';
import PropTypes from 'prop-types';
import * as tokens from '@thumbtack/thumbprint-tokens';
import warning from 'warning';
import styles from './index.module.scss';

const borderColor = {
    disabled: tokens.tpColorGray300,
    checked: tokens.tpColorBlue,
    unchecked: tokens.tpColorGray,
    error: tokens.tpColorRed,
};

const labelCursor = {
    disabled: 'default',
    checked: 'pointer',
    unchecked: 'pointer',
    error: 'pointer',
};

const backgroundColor = {
    disabled: tokens.tpColorGray200,
    checked: tokens.tpColorWhite,
    unchecked: tokens.tpColorWhite,
    error: tokens.tpColorWhite,
};

/**
 * Color of the inner circle when the radio is checked.
 */
const circleColor = {
    disabled: tokens.tpColorGray,
    checked: tokens.tpColorBlue,
    error: tokens.tpColorRed,
};

const textColor = {
    disabled: tokens.tpColorGray,
    checked: 'inherit',
    unchecked: 'inherit',
    error: tokens.tpColorRed,
};

const getUIState = ({ isChecked, isDisabled, hasError }) => {
    if (isDisabled) {
        return 'disabled';
    }

    if (hasError) {
        return 'error';
    }

    if (isChecked) {
        return 'checked';
    }

    return 'unchecked';
};

const Radio = ({
    children,
    dataTest,
    hasError,
    id,
    isChecked,
    isDisabled,
    labelPadding,
    name,
    onChange,
}) => {
    const uiState = getUIState({ isChecked, isDisabled, hasError });

    warning(
        children || id,
        'If `children` is not provided to `Radio`, the `id` prop must be used to link the `Radio` to a `label` element.',
    );

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
        <label
            className={styles.root}
            style={{ padding: labelPadding, cursor: labelCursor[uiState] }}
        >
            <input
                className={styles.input}
                type="radio"
                id={id}
                onChange={e => onChange(e.target.checked, id)}
                checked={isChecked}
                name={name}
                disabled={isDisabled}
                data-test={dataTest}
            />

            <svg
                className={styles.radioImage}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g fill={backgroundColor[uiState]} fillRule="evenodd">
                    <circle stroke={borderColor[uiState]} strokeWidth="2" cx="10" cy="10" r="9" />

                    {isChecked && <circle fill={circleColor[uiState]} cx="10" cy="10" r="6" />}
                </g>
            </svg>

            {children && (
                <span className={styles.text} style={{ color: textColor[uiState] }}>
                    {children}
                </span>
            )}
        </label>
    );
};

Radio.propTypes = {
    /**
     * Disable the input and the label.
     */
    isDisabled: PropTypes.bool,
    /**
     * Text or elements that appear within the label. If `children` is not provided, the developer
     * must use the `Radio`'s `id` prop to associate it with a custom `<label>` element.
     */
    children: PropTypes.node,
    /**
     * The `id` is added to the radio button as an HTML attribute and passed to the `onChange`
     * function.
     */
    id: PropTypes.string,
    /**
     * Boolean that determines if the radio is checked.
     */
    isChecked: PropTypes.bool,
    /**
     * Makes the radio and text color red.
     */
    hasError: PropTypes.bool,
    /**
     * Radio buttons that have the same name attribute are in the same radio button group. Only one
     * radio in a group can be selected at a time. All of the radio buttons in the group must share
     * a value that is unique to the page. This is required for keyboard navigation.
     */
    name: PropTypes.string.isRequired,
    /**
     * Determine that padding that gets applied to the label. This can be used
     * to increase the label’s click target. The value supplied should be a
     * string with a unit such as `8px` or `8px 16px`.
     */
    labelPadding: PropTypes.string,
    /**
     * Function that runs when a new radio button is selected. It receives the new boolean value
     * and the provided `id` as such: `props.onChange(e.target.checked, props.id)`.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * A selector hook into the React component for use in automated testing environments. It is
     * applied internally to the `<input />` element.
     */
    dataTest: PropTypes.string,
};

Radio.defaultProps = {
    children: null,
    id: null,
    isDisabled: false,
    isChecked: false,
    hasError: false,
    labelPadding: '14px 0',
    dataTest: undefined,
};

export default Radio;
