import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

interface TabsPropTypes {
    /**
     * Children within the component
     */
    children: React.ReactNode;
    /**
     * Prop description
     */
    optionalOneOfProp?: 'default' | 'wide';
}

export default function Tabs({
    children,
    optionalOneOfProp = 'default',
}: TabsPropTypes): JSX.Element {
    return <div>{children}</div>;
}
