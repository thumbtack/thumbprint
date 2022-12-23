import React from 'react';
import classNames from 'classnames';
import { InputsThumbsUpSmall, InputsThumbsDownSmall } from '@thumbtack/thumbprint-icons';
import styles from './index.module.scss';

interface PropTypes {
    children: React.ReactNode;
    type?: 'do' | 'dont';
    coloredHeading?: boolean;
    isTable?: boolean;
}

export default function DoDont({
    type,
    children,
    coloredHeading,
    isTable,
}: PropTypes): JSX.Element {
    return isTable ? (
        <table
            className={classNames('mb5', {
                [styles.coloredHeading]: coloredHeading,
                [styles.isTable]: isTable,
            })}
        >
            <thead>
                <tr>
                    <th className="do">
                        <div className="flex items-center pb2">
                            <InputsThumbsUpSmall />
                            <div className="ml2 b">Do</div>
                        </div>
                    </th>
                    <th className="dont bl b-white">
                        <div className="flex items-center pb2">
                            <InputsThumbsDownSmall />
                            <div className="ml2 b">Don’t</div>
                        </div>
                    </th>
                </tr>
            </thead>
            {children}
        </table>
    ) : (
        <div
            className={classNames('mb5', {
                [styles[`${type}`]]: true,
                [styles.coloredHeading]: coloredHeading,
            })}
        >
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

            <div className="overflow-hidden ba b-gray-300 pa3 relative">{children}</div>
        </div>
    );
}
