import React, { useContext } from 'react';
import * as tokens from '@thumbtack/thumbprint-tokens';
import classNames from 'classnames';

import { InputRowContext } from '../InputRow';

import styles from './index.module.scss';

const iconColor = {
    disabled: tokens.tpColorGray,
    default: tokens.tpColorBlack,
    error: tokens.tpColorRed,
};

const getUIState = ({
    isDisabled,
    hasError,
}: {
    isDisabled: boolean;
    hasError: boolean;
}): 'disabled' | 'error' | 'default' => {
    if (isDisabled) {
        return 'disabled';
    }

    if (hasError) {
        return 'error';
    }

    return 'default';
};

export interface DropdownProps<T extends string | number> {
    /**
     * A collection of [HTML `<option>` elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option).
     */
    children?: React.ReactNode;
    /**
     * Adds a HTML `id` attribute to the select. This is used for linking the HTML with a
     * [Label](/components/label/react/).
     */
    id?: string;
    /**
     * Visually and functionally disables the select dropdown.
     */
    isDisabled?: boolean;
    /**
     * Adds `required` HTML attribute to element, indicating that an option with a non-empty string
     * value must be selected.
     */
    isRequired?: boolean;
    /**
     * Makes the radio and text color red.
     */
    hasError?: boolean;
    /**
     * Changes the select’s font-size, height, and padding.
     */
    size?: 'small' | 'large';
    /**
     * Set the `<select>`'s width to `100%` as opposed to the default behavior
     * of only taking up the necessary width.
     */
    isFullWidth?: boolean;
    /**
     * The `value` of the `<option>` that is selected. See [React documentation
     * on `<select>` and controlled components](https://facebook.github.io/react/docs/forms.html#the-select-tag)
     * to learn more.
     */
    value: T;
    /**
     * Function that is fired when the value of the select changes.
     */
    onClick?: (event: React.MouseEvent<HTMLSelectElement, MouseEvent>) => void;
    /**
     * A function that is fired when the value of the select changes. The
     * new `value` is passed to the function.
     */
    onChange: (value: T, event: React.ChangeEvent<HTMLSelectElement>) => void;
    /**
     * Fires when the select receives focus.
     */
    onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    /**
     * Fires when the select loses focus.
     */
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTestId?: string;
    /**
     * A selector hook into the React component for use in automated testing environments.
     * @deprecated Deprecated in favor of the `dataTestId` prop
     */
    dataTest?: string;
    /**
     * Adds `name` HTML attribute to element, indicating the property name associated with the
     * selected value.
     */
    name?: string;
    /**
     * This adds an `aria-label` to the element. It should only be used in cases where the
     * `<Dropdown>` doesn't have or can't be associated with a related `<label>`. [Learn more about
     * the importance of using labels](https://dequeuniversity.com/rules/axe/4.3/select-name).
     */
    accessibilityLabel?: string;
}

export default function Dropdown<T extends string | number = string>({
    accessibilityLabel,
    children,
    dataTest,
    dataTestId,
    hasError = false,
    id,
    isDisabled = false,
    isFullWidth = false,
    isRequired = false,
    name,
    onChange,
    onFocus,
    onBlur,
    onClick = (): void => {},
    size = 'large',
    value,
}: DropdownProps<T>): JSX.Element {
    const uiState = getUIState({ isDisabled, hasError });

    const { isFirstInputRowChild, isWithinInputRow, isLastInputRowChild } = useContext(
        InputRowContext,
    );

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
                    // Styles for when the Dropdown is inside an InputRow
                    [styles.selectRoundedBordersLeft]: isFirstInputRowChild || !isWithinInputRow,
                    [styles.selectRoundedBordersRight]: isLastInputRowChild || !isWithinInputRow,
                    [styles.selectHasNoRightBorder]: isWithinInputRow && !isLastInputRowChild,
                })}
                id={id}
                disabled={isDisabled}
                required={isRequired}
                value={value}
                onClick={onClick}
                onChange={(event): void => onChange(event.target.value as T, event)}
                onFocus={onFocus}
                onBlur={onBlur}
                data-testid={dataTestId}
                data-test={dataTest}
                aria-label={accessibilityLabel}
                name={name}
            >
                {children}
            </select>

            <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                className={styles.caret}
                stroke={iconColor[uiState]}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="6 9 12 15 18 9" />
            </svg>
        </div>
    );
}
