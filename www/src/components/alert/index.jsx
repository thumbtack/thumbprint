import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Text } from '@thumbtack/thumbprint-react';
import {
    NotificationAlertsInfoFilledSmall,
    NotificationAlertsWarningFilledSmall,
} from '@thumbtack/thumbprint-icons';
import styles from './index.module.scss';

const alertStyles = {
    boxShadow: '0 2px 4px rgba(0,0,0,.1)',
    maxWidth: '580px',
};

const iconStyles = 'db relative -top-2';

const Alert = ({ type, title, children, className }) => (
    <div
        className={classNames(`pv3 ph4 pr2 bt bw-3 br1 br--bottom relative mb5 ${className}`, {
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
        <Text size={2} className={`black-300 ${styles.children}`}>
            {children}
        </Text>
    </div>
);

Alert.propTypes = {
    className: PropTypes.string,
    title: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['warning', 'note']).isRequired,
};

Alert.defaultProps = {
    className: undefined,
};

export default Alert;
