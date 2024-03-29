import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

type UiState = 'disabled' | 'error' | 'default';

const getUIState = ({
    hasError,
    isDisabled,
}: {
    hasError: boolean;
    isDisabled: boolean;
}): UiState => {
    if (isDisabled) {
        return 'disabled';
    }

    if (hasError) {
        return 'error';
    }

    return 'default';
};

export interface TextAreaProps {
    /**
     * Adds a HTML `id` attribute to the textarea. This is used for linking the HTML with a
     * [Label](/components/label/react/).
     */
    id?: string;
    /**
     * Visually and functionally disable the textarea.
     */
    isDisabled?: boolean;
    /**
     * Adds `readonly` HTML attribute, allowing users to select (but not modify) the input.
     */
    isReadOnly?: boolean;
    /**
     * Adds the `required` HTML attribute to the textarea.
     */
    isRequired?: boolean;
    /**
     * Makes the textarea border and text color red.
     */
    hasError?: boolean;
    /**
     * Text that appears within the textarea when there is no `value`.
     */
    placeholder?: string;
    /**
     * Adds `name` HTML attribute to element, indicating the property name associated with the selected value.
     */
    name?: string;
    /**
     * The current value of the textarea.
     */
    value: string;
    /**
     * The maximum number of characters that a user can enter. `onChange` will not fire if a user
     * enters a character that exceeds `maxLength`.
     */
    maxLength?: number;
    /**
     * The function that is called when the textarea value changes.
     *
     * It receives two arguments: `onChange(newValue, event)`.
     *
     * The consumer of this component should use that data to update the `value` prop passed in to
     * this component.
     */
    onChange: (newValue: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    /**
     * Fires when the textarea receives focus.
     */
    onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    /**
     * Fires when the textarea loses focus.
     */
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    /**
     * A selector hook into the React component for use in automated testing environments. It is
     * applied internally to the `<textarea />` element.
     */
    dataTest?: string;
}

const TextArea = ({
    dataTest,
    hasError = false,
    id,
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    maxLength,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    value,
    name,
}: TextAreaProps): JSX.Element => {
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
            readOnly={isReadOnly}
            maxLength={maxLength}
            required={isRequired}
            placeholder={placeholder}
            value={value}
            onChange={(event): void => onChange(event.target.value, event)}
            onFocus={onFocus}
            onBlur={onBlur}
            data-test={dataTest}
            name={name}
        />
    );
};

export default TextArea;
