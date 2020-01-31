import React from 'react';
// import classNames from 'classnames';
// import styles from './index.module.scss';

interface TextFabProps {
    /**
     * Text content to render.
     */
    children: string;
}

export function TextFab({ children }: TextFabProps): JSX.Element {
    return <div>{children}</div>;
}

interface IconFabProps {
    /**
     * Text content to render.
     */
    children: string;
}

export function IconFab({ children }: IconFabProps): JSX.Element {
    return <div>{children}</div>;
}
