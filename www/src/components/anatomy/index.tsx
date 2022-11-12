import React from 'react';
import Badge from '../badge';
import { Text } from '@thumbtack/thumbprint-react';
import styles from './index.module.scss';

interface PropTypes {
    children: React.ReactNode;
}

interface AnatomyItemPropTypes {
    children: React.ReactNode;
    title: string;
    number: string;
}

export function Anatomy({ children }: PropTypes): JSX.Element {
    return <ul className={`flex-row  ${styles.children}`}>{children}</ul>;
}

export function AnatomyItem({ title, number, children }: AnatomyItemPropTypes): JSX.Element {
    return (
        <li className="flex pb3">
            <div className="flex-column">
                <Badge size={2}>{number}</Badge>
            </div>
            <div className="flex-column pl2">
                <div className="flex-row">
                    <Text size={1} className="b">
                        {title}
                    </Text>
                </div>
                <div className="flex-row">{children}</div>
            </div>
        </li>
    );
}

export default { Anatomy };
