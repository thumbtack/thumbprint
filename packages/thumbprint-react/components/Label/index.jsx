import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

const getUIState = ({ isDisabled, hasError }) => {
    if (isDisabled) {
        return 'disabled';
    }

    if (hasError) {
        return 'error';
    }

    return 'default';
};

const Label = ({ isDisabled, hasError, for: forProp, dataTest, children }) => {
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
        >
            {children}
        </label>
    );
};

Label.propTypes = {
    /**
     * The label text that appears above the form element.
     */
    children: PropTypes.node,
    /**
     * `id` of the form field that's associated with the `label`. Clicking on the label text will
     * switch the browser's focus to the form field.
     *
     * The Label's `for` and form field's `id` prop must match and be unique to the page. You can
     * use [Lodash's `uniqueId`](https://lodash.com/docs/4.17.10#uniqueId) to generate a unique id.
     */
    for: PropTypes.string,
    /**
     * Visually disable the label.
     */
    isDisabled: PropTypes.bool,
    /**
     * Changes the label text color to red.
     */
    hasError: PropTypes.bool,
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest: PropTypes.string,
};

Label.defaultProps = {
    children: null,
    isDisabled: false,
    hasError: false,
    for: undefined,
    dataTest: undefined,
};

export default Label;
