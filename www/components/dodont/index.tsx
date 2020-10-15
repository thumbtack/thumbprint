import React from 'react';
import classNames from 'classnames';
import { InputsThumbsUpSmall, InputsThumbsDownSmall } from '@thumbtack/thumbprint-icons';
import styles from './index.module.scss';

interface PropTypes {
    children: React.ReactNode;
    type: 'do' | 'dont';
}

export default function DoDont({ type, children }: PropTypes): JSX.Element {
    return (
        <div className="mb5">
            {type === 'do' && (
                <div className="flex items-center mb2">
                    <InputsThumbsUpSmall />
                    <div className="ml2 b">Do</div>
                </div>
            )}
            {type === 'dont' && (
                <div className="flex items-center mb2">
                    <InputsThumbsDownSmall />
                    <div className="ml2 b">Don’t</div>
                </div>
            )}

            <div
                className={classNames(`overflow-hidden ba b-gray-300 pa3 relative`, {
                    [styles.dont]: type === 'dont',
                })}
            >
                {children}
            </div>
        </div>
    );
}
