import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

export interface FormNoteProps {
    /**
     * Text within the form note.
     */
    children?: React.ReactNode;
    /**
     * Renders the form note as red text.
     */
    hasError?: boolean;
}

export default function FormNote({
    hasError = false,
    children = null,
}: FormNoteProps): JSX.Element {
    return (
        <div className={classNames(styles.root, { [styles.rootError]: hasError })}>{children}</div>
    );
}
