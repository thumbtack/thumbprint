import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

interface TextFabProps {
    /**
     * Children content to render.
     */
    children: React.ReactNode;
    /**
     * Theme that decides the style of the button.
     */
    theme?: 'primary' | 'secondary';
    /**
     * Function that will run when the fab is clicked on.
     */
    onClick?: () => void;
    /**
     * Description of the fab content. It is required if the link contains an icon and no
     * descriptive text.
     */
    accessibilityLabel?: string;
}

export function TextFab({
    children,
    theme = 'primary',
    onClick,
    accessibilityLabel,
}: TextFabProps): JSX.Element {
    return (
        <button
            className={classNames(styles.root, styles.textFab, {
                [styles.primary]: theme === 'primary',
                [styles.secondary]: theme === 'secondary',
            })}
            type="button"
            onClick={onClick}
            aria-label={accessibilityLabel}
        >
            {children}
        </button>
    );
}

interface IconFabProps {
    /**
     * Icon from [Thumbprint Icons](/icons/) to render within the button. It must be one of the
     * `medium` icons.
     */
    icon: React.ReactNode;
    /**
     * Theme that decides the style of the button.
     */
    theme?: 'primary' | 'secondary';
    /**
     * Function that will run when the fab is clicked on.
     */
    onClick?: () => void;
    /**
     * Description of the fab content. It is required if the link contains an icon and no
     * descriptive text.
     */
    accessibilityLabel?: string;
}

export function IconFab({
    icon,
    theme = 'primary',
    onClick,
    accessibilityLabel,
}: IconFabProps): JSX.Element {
    return (
        <button
            className={classNames(styles.root, styles.iconFab, {
                [styles.primary]: theme === 'primary',
                [styles.secondary]: theme === 'secondary',
            })}
            type="button"
            onClick={onClick}
            aria-label={accessibilityLabel}
        >
            {icon}
        </button>
    );
}
