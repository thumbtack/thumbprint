import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

const propTypes = {
    /**
     * Text within the form note.
     */
    children: PropTypes.node,
    /**
     * Renders the form note as red text.
     */
    hasError: PropTypes.bool,
};

const defaultProps = {
    children: null,
    hasError: false,
};

export default function FormNote({ hasError, children }) {
    return (
        <div className={classNames(styles.root, { [styles.rootError]: hasError })}>{children}</div>
    );
}

FormNote.propTypes = propTypes;
FormNote.defaultProps = defaultProps;
