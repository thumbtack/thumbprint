import React from 'react';
import PropTypes from 'prop-types';
import * as tokens from '@thumbtack/thumbprint-tokens';
import classNames from 'classnames';
import styles from './index.module.scss';
import { NavigationCaretDownSmall } from '../../icons/index.jsx';

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
    onFocus,
    onBlur,
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
                onChange={e => onChange(e.target.value, e)}
                onFocus={onFocus}
                onBlur={onBlur}
                data-test={dataTest}
                name={name}
            >
                {children}
            </select>

            <NavigationCaretDownSmall className={styles.caret} fill={iconColor[uiState]} />
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
     * Fires when the select receives focus.
     */
    onFocus: PropTypes.func,
    /**
     * Fires when the select loses focus.
     */
    onBlur: PropTypes.func,
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
    onFocus: undefined,
    onBlur: undefined,
    dataTest: undefined,
    name: undefined,
};

export default Select;
