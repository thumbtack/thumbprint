/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Text, TextInput } from '@thumbtack/thumbprint-react';
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

export const FilterBar = () => {
    const [filter, setFilter] = useState(undefined);
    const [platform, setPlatform] = useState(undefined);

    return (
        <div className="flex mb5">
            <TextInput size="small" onChange={setFilter} value={filter} />
            <div className="ba b-gray br2 ml3 flex">
                <button
                    type="button"
                    onClick={() => setPlatform(platform === 'react' ? undefined : 'react')}
                    className={classNames({
                        [styles.platformButton]: true,
                        'br b-gray': true,
                        [styles.isActive]: platform === 'react',
                    })}
                >
                    <Text size={2}>React</Text>
                </button>
                <button
                    type="button"
                    onClick={() => setPlatform(platform === 'ios' ? undefined : 'ios')}
                    className={classNames({
                        [styles.platformButton]: true,
                        'br b-gray': true,
                        [styles.isActive]: platform === 'ios',
                    })}
                >
                    <Text size={2}>iOS</Text>
                </button>
                <button
                    type="button"
                    onClick={() => setPlatform(platform === 'android' ? undefined : 'android')}
                    className={classNames({
                        [styles.platformButton]: true,
                        'br b-gray': true,
                        [styles.isActive]: platform === 'android',
                    })}
                >
                    <Text size={2}>Android</Text>
                </button>
                <button
                    type="button"
                    onClick={() => setPlatform(platform === 'scss' ? undefined : 'scss')}
                    className={classNames({
                        [styles.platformButton]: true,
                        'br b-gray': true,
                        [styles.isActive]: platform === 'scss',
                    })}
                >
                    SCSS
                </button>
                <button
                    type="button"
                    onClick={() => setPlatform(platform === 'email' ? undefined : 'email')}
                    className={classNames({
                        [styles.platformButton]: true,
                        [styles.isActive]: platform === 'email',
                    })}
                >
                    <Text size={2}>Email</Text>
                </button>
            </div>
        </div>
    );
};

export const ComponentRow = ({ name, react, scss, ios, android }) => (
    <a href="/path/" className={`color-inherit relative ${styles.component}`}>
        <div className="h5 bg-gray-300 br1 mb1">&nbsp;</div>
        <Text size={3} className="absolute top-0 right-0 bg-blue b pv1 ph3 white">
            {react.documentation}
        </Text>
        <Text size={2}>{name}</Text>
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
