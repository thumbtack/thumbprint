import React from 'react';
import classNames from 'classnames';
import noop from 'lodash/noop';
import styles from './index.module.scss';

interface TextFabProps {
    /**
     * Children content to render.
     */
    children: React.ReactNode;
    /**
     * Visually highlights the fab if it‘s active.
     */
    active?: boolean;
    /**
     * Function that will run when the fab is clicked on.
     */
    onClick?: () => void;
}

export function TextFab({ children, active = false, onClick = noop }: TextFabProps): JSX.Element {
    return (
        <button
            className={classNames(styles.root, styles.textFab, {
                [styles.active]: active,
                [styles.inactive]: !active,
            })}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

interface IconFabProps {
    /**
     * Icon from [Thumbprint Icons](/icons/) to render within the button. It must be one of the
     * `small` icons.
     */
    icon: React.ReactNode;
    /**
     * Visually highlights the fab if it‘s active.
     */
    active?: boolean;
    /**
     * Function that will run when the fab is clicked on.
     */
    onClick?: () => void;
}

export function IconFab({ icon, active = false, onClick = noop }: IconFabProps): JSX.Element {
    return (
        <button
            className={classNames(styles.root, styles.iconFab, {
                [styles.active]: active,
                [styles.inactive]: !active,
            })}
            type="button"
            onClick={onClick}
        >
            {icon}
        </button>
    );
}
