import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

export const SWITCH_COLOR = {
    blue: 'blue',
    green: 'green',
};

export const SWITCH_SIZES = {
    small: 'small',
    large: 'large',
};

export interface SwitchProps {
    /**
     * The `id` is added to the switch as an HTML attribute and passed to the `onChange`
     * function.
     */
    id?: string;
    /**
     * Determines if the switch is checked.
     */
    isChecked?: boolean;
    /**
     * Function that runs when a switch value changes. It receives the new boolean value,
     * and the provided `id` as such:
     * `props.onChange(event.target.checked, props.id)`.
     */
    onChange: (isChecked: boolean, id: string) => void;
    /**
     * Disables the component.
     */
    isDisabled?: boolean;
    /**
     * Determines how the switch sizes. The default size is `small`.
     */
    size?: keyof typeof SWITCH_SIZES;
    /**
     * This adds an `aria-label` to the element.
     * the importance of using labels](https://dequeuniversity.com/rules/axe/4.3/select-name).
     */
    accessibilityLabel?: string;
    /**
     * Determines how the switch colors. The default color is `blue`.
     */
    color?: keyof typeof SWITCH_COLOR;
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTestId?: string;
    /**
     * Switches on a page with the same name will be grouped together when sent to the server.
     */
    name?: string;
}

export default function Switch({
    id = '',
    isDisabled = false,
    isChecked = false,
    onChange,
    dataTestId,
    name,
    accessibilityLabel,
    color = SWITCH_COLOR.blue as keyof typeof SWITCH_COLOR,
    size = SWITCH_SIZES.small as keyof typeof SWITCH_SIZES,
}: SwitchProps): JSX.Element {
    const bgColor = `bg-${color} b-${color}`;

    const onToggle = (): void => {
        onChange(!isChecked, id);
    };
    return (
        <div
            className={classNames(styles.slideToggle, 'ba', {
                [styles.slideToggleLarge]: size === SWITCH_SIZES.large,
                [styles.slideToggleDisabled]: isDisabled,
                [styles.slideToggleChecked]: isChecked,
                [styles.slideToggleLargeChecked]: size === SWITCH_SIZES.large && isChecked,
                [bgColor]: isChecked,
                'bg-gray b-gray-300': !isChecked,
            })}
            onClick={isDisabled ? undefined : onToggle}
            onKeyUp={
                isDisabled
                    ? undefined
                    : (event): void => {
                          if (event.key === 'Enter' || event.keyCode === 13) {
                              onChange(!isChecked, id);
                          }
                      }
            }
        >
            <input
                className="visually-hidden"
                type="checkbox"
                role="switch"
                id={id}
                data-testid={dataTestId}
                disabled={isDisabled}
                checked={isChecked}
                name={name}
                aria-checked={isChecked}
                aria-disabled={isDisabled}
                aria-label={accessibilityLabel}
                onChange={isDisabled ? undefined : onToggle}
            />

            <div
                className={classNames(styles.toggleHandle, 'bg-white ba b-gray-300', {
                    [styles.toggleHandleLarge]: size === SWITCH_SIZES.large,
                })}
            />
        </div>
    );
}
