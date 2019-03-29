import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

const getUIState = ({ hasError, isDisabled }) => {
    if (isDisabled) {
        return 'disabled';
    }

    if (hasError) {
        return 'error';
    }

    return 'default';
};

const Textarea = ({
    dataTest,
    hasError,
    id,
    isDisabled,
    isRequired,
    maxLength,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    value,
    name,
}) => {
    const uiState = getUIState({ hasError, isDisabled });

    return (
        <textarea
            className={classNames({
                [styles.root]: true,
                [styles.rootStateDisabled]: uiState === 'disabled',
                [styles.rootStateError]: uiState === 'error',
                [styles.rootStateDefault]: uiState === 'default',
            })}
            id={id}
            disabled={isDisabled}
            maxLength={maxLength}
            required={isRequired}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value, e)}
            onFocus={onFocus}
            onBlur={onBlur}
            data-test={dataTest}
            name={name}
        />
    );
};

Textarea.propTypes = {
    /**
     * Adds a HTML `id` attribute to the textarea. This is used for linking the HTML with a
     * [Label](/components/label/react/).
     */
    id: PropTypes.string,
    /**
     * Visually and functionally disable the textarea.
     */
    isDisabled: PropTypes.bool,
    /**
     * Adds the `required` HTML attribute to the textarea.
     */
    isRequired: PropTypes.bool,
    /**
     * Makes the textarea border and text color red.
     */
    hasError: PropTypes.bool,
    /**
     * Text that appears within the textarea when there is no `value`.
     */
    placeholder: PropTypes.string,
    /**
     * Adds `name` HTML attribute to element, indicating the property name associated with the selected value.
     */
    name: PropTypes.string,
    /**
     * The current value of the textarea.
     */
    value: PropTypes.string.isRequired,
    /**
     * The maximum number of characters that a user can enter. `onChange` will not fire if a user
     * enters a character that exceeds `maxLength`.
     */
    maxLength: PropTypes.number,
    /**
     * The function that is called when the textarea value changes.
     *
     * It receives two arguments: `onChange(newValue, event)`.
     *
     * The consumer of this component should use that data to update the `value` prop passed in to
     * this component.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Fires when the textarea receives focus.
     */
    onFocus: PropTypes.func,
    /**
     * Fires when the textarea loses focus.
     */
    onBlur: PropTypes.func,
    /**
     * A selector hook into the React component for use in automated testing environments. It is
     * applied internally to the `<textarea />` element.
     */
    dataTest: PropTypes.string,
};

Textarea.defaultProps = {
    id: undefined,
    isDisabled: false,
    isRequired: false,
    hasError: false,
    placeholder: undefined,
    maxLength: undefined,
    onFocus: undefined,
    onBlur: undefined,
    dataTest: undefined,
    name: undefined,
};

export default Textarea;
