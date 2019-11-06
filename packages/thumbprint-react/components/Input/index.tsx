import React, { useState } from 'react';
import classNames from 'classnames';
import { NavigationCloseSmall } from '../../icons/index.jsx';
import { InputRowContext } from '../InputRow/index.jsx';
import styles from './index.module.scss';

type UiState = 'disabled' | 'readonly' | 'error' | 'default';

type ContextValue = {
    hasValue: boolean;
    size?: 'large' | 'small';
    position: 'left' | 'right';
};

const Context = React.createContext<ContextValue>({
    hasValue: false,
    size: undefined,
    position: 'left',
});

/**
 * Prioritize the mutually exclusive UI states the user may end up in.
 */
const getUIState = ({
    isDisabled,
    isReadOnly,
    hasError,
}: Pick<InputPropTypes, 'isDisabled' | 'isReadOnly' | 'hasError'>): UiState => {
    if (isDisabled) {
        return 'disabled';
    }

    if (isReadOnly) {
        return 'readonly';
    }

    if (hasError) {
        return 'error';
    }

    return 'default';
};

interface InputIconContainerPropTypes {
    children: React.ReactNode;
    style?: { color: string };
}

/**
 * This component is not exported. It wraps the `InputClearButton` and `InputIcon`, applying
 * classes to position the icon. It does this by using `create-react-context`, a ponyfill for
 * React’s context functionality. This makes it easier for consumers to use `InputClearButton` and
 * `InputIcon` because they won’t have to specify as many props.
 * @private
 */
const InputIconContainer = ({ children, style }: InputIconContainerPropTypes): JSX.Element => (
    <Context.Consumer>
        {(theme): JSX.Element => {
            const position = theme && theme.position;
            const size = theme && theme.size;

            return (
                <div
                    className={classNames({
                        [styles.inputIconContainer]: true,
                        // Applies when used on left
                        [styles.inputIconContainerPositionLeft]: position === 'left',
                        [styles.inputIconContainerPositionLeftSizeSmall]:
                            position === 'left' && size === 'small',
                        [styles.inputIconContainerPositionLeftSizeLarge]:
                            position === 'left' && size === 'large',
                        // Applies when used on right
                        [styles.inputIconContainerPositionRight]: position === 'right',
                        [styles.inputIconContainerPositionRightSizeSmall]:
                            position === 'right' && size === 'small',
                        [styles.inputIconContainerPositionRightSizeLarge]:
                            position === 'right' && size === 'large',
                    })}
                    style={style}
                >
                    {children}
                </div>
            );
        }}
    </Context.Consumer>
);

interface InputClearButtonPropTypes {
    onClick: () => void;
}

/**
 * Accessible button that makes it easy to add a "Clear" button to a text input. It should be used
 * with the `innerRight` prop in `Input`.
 */
const InputClearButton = ({ onClick }: InputClearButtonPropTypes): JSX.Element => (
    <InputIconContainer>
        <Context.Consumer>
            {(theme): JSX.Element => (
                <div
                    className={classNames({
                        displayNone: theme && !theme.hasValue,
                    })}
                >
                    <button
                        className={styles.unstyledButton}
                        aria-label="Clear input"
                        onClick={onClick}
                        type="button"
                    >
                        <NavigationCloseSmall />
                    </button>
                </div>
            )}
        </Context.Consumer>
    </InputIconContainer>
);

const ClearButton = InputClearButton;

interface InputIconPropTypes {
    /**
     * Set the icon color with a color from [Thumbprint Tokens](/tokens/).
     * @private
     */
    color?: string;
    /**
     * An icon component from [Thumbprint Icons](/icons/).
     * You should pair "Medium" icons with `large` inputs and "Small" icons with `small` inputs.
     */
    children: React.ReactNode;
}

/**
 * Component that helps position icons within inputs.
 */
const InputIcon = ({ color = 'inherit', children }: InputIconPropTypes): JSX.Element => (
    <InputIconContainer style={{ color }}>{children}</InputIconContainer>
);

interface InputPropTypes {
    /**
     * Adds a HTML `id` attribute to the input. This is used for linking the HTML with a
     * [Label](/components/label/react/).
     */
    id?: string;
    /**
     * Visually and functionally disable the input.
     */
    isDisabled?: boolean;
    /**
     * Adds `readonly` HTML attribute, allowing users to select (but not modify) the input.
     */
    isReadOnly?: boolean;
    /**
     * Adds the `required` HTML attribute.
     */
    isRequired?: boolean;
    /**
     * A regular expression that the `<input>` element's value is checked against when submitting a
     * form.
     */
    pattern?: string;
    /**
     * The maximum number of characters that a user can enter. `onChange` will not fire if a user
     * enters a character that exceeds `maxLength`.
     */
    maxLength?: number;
    /**
     * Makes the text and border color red.
     */
    hasError?: boolean;
    /**
     * Text that appears within the input when there is no `value`.
     */
    placeholder?: string;
    /**
     * Controls the height and padding of the input.
     */
    size?: 'small' | 'large';
    /**
     * Sets the `type` attribute on the input element.
     */
    type?: 'email' | 'password' | 'text' | 'search' | 'tel' | 'number';
    /**
     * A [proposed specification](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)
     * that enables specification of virtual keyboard type in Chrome. Currently only supported in
     * Chrome and Android.
     */
    inputMode?: 'numeric';
    /**
     * The HTML `name` attribute that will be pased to the input. It is required if working with a
     * form that uses `<form action="" method="">` to submit data to a server.
     */
    name?: string;
    /**
     * The current value of the input.
     */
    value?: string | number;
    /**
     * Content that appears within the input on the left.
     */
    innerLeft?: React.ReactNode;
    /**
     * Content that appears within the input on the right.
     */
    innerRight?: React.ReactNode;
    /**
     * The function that is called when the input value changes.
     *
     * It receives two arguments: `onChange(newValue, event)`.
     *
     * The consumer of this component should use that data to update the `value` prop passed in to
     * this component.
     */
    onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Function that fires when you click into the input.
     */
    onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    /**
     * Fires when the input gains focus.
     */
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    /**
     * Fires when the input loses focus, regardless of whether the value has changed.
     */
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    /**
     * Fires when a key is pressed down with the input focused.
     */
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    /**
     * Fires when a key press is released with the input focused.
     */
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    /**
     * Fires when a valid key input is made.
     */
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    /**
     * This tells the browser to give the input focus when the page is loaded. This can [only be
     * used once on a page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autofocus).
     */
    shouldFocusOnPageLoad?: boolean;
    /**
     * A selector hook into the React component for use in automated testing environments. It is
     * applied internally to the `<input />` element.
     */
    dataTest?: string;
    /**
     * This tells the browser whether to attempt autocompletion of the input.
     * [Supports all values](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).
     */
    autoComplete?: React.InputHTMLAttributes<HTMLInputElement>['autoComplete'];
}

const Input = React.forwardRef<HTMLInputElement, InputPropTypes>(
    (
        {
            id,
            type = 'text',
            isDisabled = false,
            isReadOnly = false,
            isRequired = false,
            hasError = false,
            placeholder,
            size = 'large',
            name,
            value = '',
            innerLeft,
            innerRight,
            onClick = (): void => {},
            onChange = (): void => {},
            onFocus = (): void => {},
            onBlur = (): void => {},
            onKeyDown = (): void => {},
            onKeyUp = (): void => {},
            onKeyPress = (): void => {},
            shouldFocusOnPageLoad = false,
            dataTest,
            inputMode,
            pattern,
            maxLength,
            autoComplete,
        }: InputPropTypes,
        outerRef,
    ): JSX.Element => {
        const uiState = getUIState({ isDisabled, isReadOnly, hasError });
        // The input element rendered by this component. We use `useState` instead of
        // `useRef` because callback refs allow us to add more than one `ref` to a DOM node.
        const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);

        const focusInput = (): void => {
            if (inputEl) {
                inputEl.focus();
            }
        };

        /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
        return (
            <div
                className={classNames({
                    [styles.root]: true,
                    [styles.rootUiStateDefault]: uiState === 'default',
                    [styles.rootUiStateReadonly]: uiState === 'readonly',
                    [styles.rootUiStateDisabled]: uiState === 'disabled',
                    [styles.rootUiStateError]: uiState === 'error',
                })}
            >
                {innerLeft && (
                    <Context.Provider
                        value={{
                            hasValue: !!value,
                            size,
                            position: 'left',
                        }}
                    >
                        <div className={styles.inputInnerElement} onClick={focusInput}>
                            {innerLeft}
                        </div>
                    </Context.Provider>
                )}

                <input
                    className={classNames({
                        [styles.input]: true,
                        [styles.inputError]: uiState === 'error',
                        [styles.inputSizeSmall]: size === 'small',
                        [styles.inputSizeLarge]: size === 'large',
                        [styles.inputInnerLeft]: innerLeft,
                        [styles.inputInnerRight]: innerRight,
                    })}
                    disabled={isDisabled}
                    readOnly={isReadOnly}
                    required={isRequired}
                    placeholder={placeholder}
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus={shouldFocusOnPageLoad}
                    name={name}
                    type={type}
                    value={value}
                    onChange={(e): void => onChange(e.target.value, e)}
                    onClick={(e): void => onClick(e)}
                    onFocus={(e): void => onFocus(e)}
                    onBlur={(e): void => onBlur(e)}
                    onKeyDown={(e): void => onKeyDown(e)}
                    onKeyUp={(e): void => onKeyUp(e)}
                    onKeyPress={(e): void => onKeyPress(e)}
                    id={id}
                    ref={(el): void => {
                        setInputEl(el);

                        // `outerRef` is the potential forwarded `ref` passed in from a consumer.
                        // Not all refs are callable functions, so only try and call it if it is.
                        if (typeof outerRef === 'function') {
                            outerRef(el);
                        }
                    }}
                    data-test={dataTest}
                    inputMode={inputMode}
                    pattern={pattern}
                    maxLength={maxLength}
                    autoComplete={autoComplete}
                />

                {innerRight && (
                    <Context.Provider
                        value={{
                            hasValue: !!value,
                            size,
                            position: 'right',
                        }}
                    >
                        <div className={styles.inputInnerElement} onClick={focusInput}>
                            {innerRight}
                        </div>
                    </Context.Provider>
                )}

                <InputRowContext.Consumer>
                    {({
                        isWithinInputRow,
                        isFirstInputRowChild,
                        isLastInputRowChild,
                    }): JSX.Element => (
                        <div
                            className={classNames({
                                [styles.inputStyles]: true,
                                [styles.inputStylesRoundedBordersLeft]:
                                    isFirstInputRowChild || !isWithinInputRow,
                                [styles.inputStylesRoundedBordersRight]:
                                    isLastInputRowChild || !isWithinInputRow,
                                [styles.inputStylesHasNoRightBorder]:
                                    isWithinInputRow && !isLastInputRowChild,
                                [styles.inputStylesUiStateDefault]: uiState === 'default',
                                [styles.inputStylesUiStateReadonly]: uiState === 'readonly',
                                [styles.inputStylesUiStateDisabled]: uiState === 'disabled',
                                [styles.inputStylesUiStateError]: uiState === 'error',
                            })}
                        />
                    )}
                </InputRowContext.Consumer>
            </div>
        );
    },
);
Input.displayName = 'Input';

export default Input;
export { InputIcon, InputClearButton, ClearButton };
