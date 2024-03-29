import React from 'react';
import classNames from 'classnames';
import { Text } from '@thumbtack/thumbprint-react';
import {
    NotificationAlertsInfoFilledSmall,
    NotificationAlertsWarningFilledSmall,
} from '@thumbtack/thumbprint-icons';
import styles from './alert.module.scss';

const alertStyles = {
    boxShadow: '0 2px 4px rgba(0,0,0,.1)',
    maxWidth: '580px',
};

const iconStyles = 'db relative -top-2';

interface PropTypes {
    title: React.ReactNode;
    children: React.ReactNode;
    type: 'warning' | 'note';
}

export default function Alert({ type, title, children }: PropTypes): JSX.Element {
    return (
        <div
            className={classNames(`pv3 ph4 pr2 bt bw-3 br1 br--bottom relative mb5 `, {
                'b-green': type === 'note',
                'b-yellow': type === 'warning',
            })}
            style={alertStyles}
        >
            <div className="flex items-center">
                <div className="mr2">
                    {type === 'note' && (
                        <NotificationAlertsInfoFilledSmall className={`green ${iconStyles}`} />
                    )}
                    {type === 'warning' && (
                        <NotificationAlertsWarningFilledSmall className={`yellow ${iconStyles}`} />
                    )}
                </div>
                <Text size={1} className="b black mb1">
                    {title}
                </Text>
            </div>
            <Text className={`black-300 ${styles.children}`} size={2} elementName="div">
                {children}
            </Text>
        </div>
    );
}
