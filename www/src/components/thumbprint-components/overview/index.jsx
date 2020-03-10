/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Text } from '@thumbtack/thumbprint-react';
import { tpColorGray300 } from '@thumbtack/thumbprint-tokens';
import styles from './index.module.scss';

const documentationStatus = PropTypes.oneOf([
    'To-do',
    'In progress',
    "Done / Won't build",
    'Done / Deprecated',
    'Done / Merged',
]);

const developmentStatus = PropTypes.oneOf([
    'Needs evaluation',
    'To-do',
    'In progress',
    'Done / Uses built in OS component',
    "Done / Won't build",
    'Done / Deprecated',
    'Done / Merged',
]);

const Dot = ({ status }) => (
    <div
        aria-label={status}
        className={classNames({
            [styles.dot]: true,
            [styles.dotToDo]: ['To-do', 'Needs evaluation'].includes(status),
            [styles.dotInProgress]: status === 'In progress',
            [styles.dotDeprecated]: status === 'Done / Deprecated',
            [styles.dotNotApplicable]: status === "Done / Won't build",
            [styles.dotDone]: ['Done / Merged', 'Done / Uses built in OS component'].includes(
                status,
            ),
        })}
    />
);

Dot.propTypes = {
    status: documentationStatus.isRequired,
};

export const Legend = () => <div>search tools</div>;

export const ComponentRow = ({ name, react, scss, ios, android }) => (
    <a href="/path/" className={`color-inherit pa2 ba b-gray-300 br2 ${styles.component}`}>
        <div className="h4 bg-gray br1 mb1">&nbsp;</div>
        <Text size={2}>{name}</Text>
        <Text size={3} className="black-300">
            <span>Status: </span>
            <span>{react.documentation}</span>
        </Text>
    </a>
);

ComponentRow.propTypes = {
    name: PropTypes.string.isRequired,
    usage: PropTypes.shape({
        design: documentationStatus.isRequired,
        development: developmentStatus.isRequired,
        documentation: documentationStatus.isRequired,
    }).isRequired,
    react: PropTypes.shape({
        design: documentationStatus.isRequired,
        development: developmentStatus.isRequired,
        documentation: documentationStatus.isRequired,
    }).isRequired,
    scss: PropTypes.shape({
        design: documentationStatus.isRequired,
        development: developmentStatus.isRequired,
        documentation: documentationStatus.isRequired,
    }).isRequired,
    ios: PropTypes.shape({
        design: documentationStatus.isRequired,
        development: developmentStatus.isRequired,
        documentation: documentationStatus.isRequired,
    }).isRequired,
    android: PropTypes.shape({
        design: documentationStatus.isRequired,
        development: developmentStatus.isRequired,
        documentation: documentationStatus.isRequired,
    }).isRequired,
};

export const ComponentTable = ({ children }) => (
    <div className={styles.componentGrid}>{children}</div>
);

ComponentTable.propTypes = {
    children: PropTypes.node.isRequired,
};
