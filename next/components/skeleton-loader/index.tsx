import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

const getAspectPercentage = (value: number): string => {
    return `${value * 100}%`;
};

type AspectRatio = '1:1' | '3:2' | '7:3' | '8:5' | '10:13';

const aspectMap: Record<AspectRatio, number> = {
    '1:1': 1 / 1,
    '3:2': 2 / 3,
    '7:3': 3 / 7,
    '8:5': 5 / 8,
    '10:13': 13 / 10,
};

interface PropTypes {
    width?: string;
    height?: string;
    type?: 'block' | 'text';
    aspectRatio?: AspectRatio;
    className?: string;
}

export default function Skeleton({
    type = 'block',
    aspectRatio,
    width,
    height,
    className,
}: PropTypes): JSX.Element {
    const inlineStyles: {
        paddingTop?: string;
        height?: string;
        width?: string;
    } = {};

    if (aspectRatio) {
        inlineStyles.paddingTop = getAspectPercentage(aspectMap[aspectRatio]);
        inlineStyles.height = '0';
    }

    if (width) {
        inlineStyles.width = width;
    }

    if (height) {
        inlineStyles.height = height;
    }

    return (
        <span
            className={classNames(className, styles.skeleton, {
                dib: type === 'text',
            })}
            style={inlineStyles}
        />
    );
}
