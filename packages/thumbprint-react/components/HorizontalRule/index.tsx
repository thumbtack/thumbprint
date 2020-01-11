import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

interface PropTypes {
    /**
     * Controls the style of the line rendered for the horizontal rule.
     */
    lineStyle?: 'solid' | 'dotted' | 'dashed';
    /**
     * Controls the color of the line rendered for the horizontal rule.
     */
    color?: 'gray' | 'gray-300';
}

export default function HorizontalRule({
    lineStyle = 'solid',
    color = 'gray',
}: PropTypes): JSX.Element {
    return (
        <hr
            className={classNames({
                [styles.root]: true,
                [styles.gray300]: color === 'gray-300',
                [styles.dashed]: lineStyle === 'dashed',
                [styles.dotted]: lineStyle === 'dotted',
            })}
        />
    );
}
