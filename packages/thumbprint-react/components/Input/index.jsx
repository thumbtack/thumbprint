import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import classNames from 'classnames';
import { NavigationCloseSmall } from '../../icons/index.jsx';
import { InputRowContext } from '../InputRow/index.jsx';
import styles from './index.module.scss';

const Context = React.createContext();

/**
 * Prioritize the mutually exclusive UI states the user may end up in.
 */
const getUIState = ({ isDisabled, isReadOnly, hasError }) => {
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

/**
 * This component is not exported. It wraps the `InputClearButton` and `InputIcon`, applying
 * classes to position the icon. It does this by using `create-react-context`, a ponyfill for
 * React’s context functionality. This makes it easier for consumers to use `InputClearButton` and
 * `InputIcon` because they won’t have to specify as many props.
 * @private
 */
const InputIconContainer = props => (
    <Context.Consumer>
        {theme => {
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
                >
                    {props.children}
                </div>
            );
        }}
    </Context.Consumer>
);

InputIconContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

/**
 * Accessible button that makes it easy to add a "Clear" button to a text input. It should be used
 * with the `innerRight` prop in `Input`.
 */
const InputClearButton = props => (
    <InputIconContainer>
        <Context.Consumer>
            {theme => (
                <div
                    className={classNames({
                        displayNone: theme && !theme.hasValue,
                    })}
                >
                    <button
                        className={styles.unstyledButton}
                        aria-label="Clear input"
                        onClick={props.onClick}
                        type="button"
                    >
                        <NavigationCloseSmall />
                    </button>
                </div>
            )}
        </Context.Consumer>
    </InputIconContainer>
);

InputClearButton.propTypes = {
    /**
     * Function that runs when the clear button is clicked on. This should set `Input`’s `value` to
     * an empty string.
     */
    onClick: PropTypes.func.isRequired,
};

const ClearButton = InputClearButton;

/**
 * Component that helps position icons within inputs.
 */
const InputIcon = ({ color, children }) => (
    <InputIconContainer style={{ color }}>{children}</InputIconContainer>
);

InputIcon.propTypes = {
    /**
     * Set the icon color with a color from [Thumbprint Tokens](/tokens/).
     * @private
     */
    color: PropTypes.string,
    /**
     * An icon component from [Thumbprint Icons](/icons/).
     *
     * You should pair "Medium" icons with `large` inputs and "Small" icons with `small` inputs.
     */
    children: PropTypes.node.isRequired,
};

InputIcon.defaultProps = {
    color: 'inherit',
};

/**
 * @default
 */
class Input extends React.Component {
    constructor(props) {
        super(props);

        this.focusInput = this.focusInput.bind(this);
    }

    /**
     * Focus the `input` element. This is used to focus on the input when clicking on `innerLeft`
     * or `innerRight`.
     */
    focusInput() {
        this.input.focus();
    }

    render() {
        const {
            id,
            type,
            isDisabled,
            isReadOnly,
            isRequired,
            hasError,
            placeholder,
            size,
            name,
            value,
            innerLeft,
            innerRight,
            onClick,
            onChange,
            onFocus,
            onBlur,
            onKeyDown,
            onKeyUp,
            shouldFocusOnPageLoad,
            dataTest,
            inputMode,
            pattern,
            maxLength,
            autoComplete,
        } = this.props;

        const uiState = getUIState({ isDisabled, isReadOnly, hasError });

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
                        <div className={styles.inputInnerElement} onClick={this.focusInput}>
                            {innerLeft}
                        </div>
                    </Context.Provider>
                )}

                <input
                    className={classNames({
                        [styles.input]: true,
                        [styles.inputSizeSmall]: size === 'small',
                        [styles.inputSizeLarge]: size === 'large',
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
                    onChange={e => onChange(e.target.value, e)}
                    onClick={e => isFunction(onClick) && onClick(e)}
                    onFocus={e => isFunction(onFocus) && onFocus(e)}
                    onBlur={e => isFunction(onBlur) && onBlur(e)}
                    onKeyDown={e => isFunction(onKeyDown) && onKeyDown(e)}
                    onKeyUp={e => isFunction(onKeyUp) && onKeyUp(e)}
                    id={id}
                    ref={el => {
                        this.input = el;
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
                        <div className={styles.inputInnerElement} onClick={this.focusInput}>
                            {innerRight}
                        </div>
                    </Context.Provider>
                )}

                <InputRowContext.Consumer>
                    {({ isWithinInputRow, isFirstInputRowChild, isLastInputRowChild }) => (
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
    }
}

Input.propTypes = {
    /**
     * Adds a HTML `id` attribute to the input. This is used for linking the HTML with a
     * [Label](/components/label/react/).
     */
    id: PropTypes.string,
    /**
     * Visually and functionally disable the input.
     */
    isDisabled: PropTypes.bool,
    /**
     * Adds `readonly` HTML attribute, allowing users to select (but not modify) the input.
     */
    isReadOnly: PropTypes.bool,
    /**
     * Adds the `required` HTML attribute.
     */
    isRequired: PropTypes.bool,
    /**
     * A regular expression that the `<input>` element's value is checked against when submitting a
     * form.
     */
    pattern: PropTypes.string,
    /**
     * The maximum number of characters that a user can enter. `onChange` will not fire if a user
     * enters a character that exceeds `maxLength`.
     */
    maxLength: PropTypes.string,
    /**
     * Makes the text and border color red.
     */
    hasError: PropTypes.bool,
    /**
     * Text that appears within the input when there is no `value`.
     */
    placeholder: PropTypes.string,
    /**
     * Controls the height and padding of the input.
     */
    size: PropTypes.oneOf(['small', 'large']),
    /**
     * Sets the `type` attribute on the input element.
     */
    type: PropTypes.oneOf(['email', 'password', 'text', 'search', 'tel', 'number']),
    /**
     * A [proposed specification](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)
     * that enables specification of virtual keyboard type in Chrome. Currently only supported in
     * Chrome and Android.
     */
    inputMode: PropTypes.oneOf(['numeric']),
    /**
     * The HTML `name` attribute that will be pased to the input. It is required if working with a
     * form that uses `<form action="" method="">` to submit data to a server.
     */
    name: PropTypes.string,
    /**
     * The current value of the input.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // eslint-disable-line react/require-default-props
    /**
     * Content that appears within the input on the left.
     */
    innerLeft: PropTypes.node,
    /**
     * Content that appears within the input on the right.
     */
    innerRight: PropTypes.node,
    /**
     * The function that is called when the input value changes.
     *
     * It receives two arguments: `onChange(newValue, event)`.
     *
     * The consumer of this component should use that data to update the `value` prop passed in to
     * this component.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Function that fires when you click into the input.
     */
    onClick: PropTypes.func,
    /**
     * Fires when the input gains focus.
     */
    onFocus: PropTypes.func,
    /**
     * Fires when the input loses focus, regardless of whether the value has changed.
     */
    onBlur: PropTypes.func,
    /**
     * Fires when a key is pressed down with the input focused.
     */
    onKeyDown: PropTypes.func,
    /**
     * Fires when a key press is released with the input focused.
     */
    onKeyUp: PropTypes.func,
    /**
     * This tells the browser to give the input focus when the page is loaded. This can [only be
     * used once on a page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autofocus).
     */
    shouldFocusOnPageLoad: PropTypes.bool,
    /**
     * A selector hook into the React component for use in automated testing environments. It is
     * applied internally to the `<input />` element.
     */
    dataTest: PropTypes.string,
    /**
     * This tells the browser whether to attempt autocompletion of the input.
     * [Supports all values](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).
     */
    autoComplete: PropTypes.string,
};

Input.defaultProps = {
    id: undefined,
    type: 'text',
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    hasError: false,
    placeholder: undefined,
    size: 'large',
    name: undefined,
    value: '',
    innerLeft: undefined,
    innerRight: undefined,
    onClick: undefined,
    onFocus: undefined,
    onBlur: undefined,
    onKeyDown: undefined,
    onKeyUp: undefined,
    shouldFocusOnPageLoad: false,
    dataTest: undefined,
    inputMode: undefined,
    pattern: undefined,
    maxLength: undefined,
    autoComplete: undefined,
};

export default Input;
export { InputIcon, InputClearButton, ClearButton };
