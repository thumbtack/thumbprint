import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

type UiState = 'disabled' | 'error' | 'default';

const getUIState = ({
    isDisabled,
    hasError,
}: Pick<LabelProps, 'isDisabled' | 'hasError'>): UiState => {
    if (isDisabled) {
        return 'disabled';
    }

    if (hasError) {
        return 'error';
    }

    return 'default';
};

export interface LabelProps {
    /**
     * The label text that appears above the form element.
     */
    children?: React.ReactNode;
    /**
     * `id` of the form field that's associated with the `label`. Clicking on the label text will
     * switch the browser's focus to the form field.
     *
     * The Label's `for` and form field's `id` prop must match and be unique to the page. You can
     * use [Lodash's `uniqueId`](https://lodash.com/docs/4.17.10#uniqueId) to generate a unique id.
     */
    for?: string;
    /**
     * Visually disable the label.
     */
    isDisabled?: boolean;
    /**
     * Changes the label text color to red.
     */
    hasError?: boolean;
    /**
     * A selector to hook into the React component for use in automated testing environments.
     */
    dataTestId?: string;
    /**
     * A selector to hook into the React component for use in automated testing environments.
     * @deprecated Deprecated in favor of the `dataTestId` prop
     */
    dataTest?: string;
}

export default function Label({
    isDisabled = false,
    hasError = false,
    for: forProp,
    dataTest,
    dataTestId,
    children = null,
}: LabelProps): JSX.Element {
    const uiState = getUIState({ isDisabled, hasError });

    return (
        // eslint-disable-next-line jsx-a11y/label-has-for
        <label
            htmlFor={forProp}
            className={classNames({
                [styles.text]: true,
                [styles.textUiStateDisabled]: uiState === 'disabled',
                [styles.textUiStateError]: uiState === 'error',
                [styles.textUiStateDefault]: uiState === 'default',
            })}
            data-test={dataTest}
            data-testid={dataTestId}
        >
            {children}
        </label>
    );
}
