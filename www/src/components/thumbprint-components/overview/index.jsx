/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Text } from '@thumbtack/thumbprint-react';
import { tpColorGray300 } from '@thumbtack/thumbprint-tokens';
import styles from './index.module.scss';

const documentationStatus = PropTypes.oneOf([
    'to-do',
    'wont-do',
    'done',
    'in-progress',
    'deprecated',
]);

const Dot = ({ status }) => {
    const statusMap = {
        'in-progress': 'In progress',
        'to-do': 'To-do',
        'wont-do': "Won't do",
        deprecated: 'Deprecated',
        done: 'Done',
    };

    return (
        <div
            aria-label={statusMap[status]}
            className={classNames({
                [styles.dot]: true,
                [styles.dotDone]: status === 'done',
                [styles.dotInProgress]: status === 'in-progress',
                [styles.dotToDo]: status === 'to-do',
                [styles.dotWontDo]: status === 'wont-do',
                [styles.dotDeprecated]: status === 'deprecated',
            })}
        />
    );
};

Dot.propTypes = {
    status: documentationStatus.isRequired,
};

export const Legend = () => (
    <ul aria-hidden="true" className="flex black-300 mb2">
        <li className="mr4 flex items-center">
            <Dot status="done" />{' '}
            <Text size={2} className="ml2">
                Done
            </Text>
        </li>
        <li className="mr4 flex items-center">
            <Dot status="in-progress" />{' '}
            <Text size={2} className="ml2">
                In Progress
            </Text>
        </li>
        <li className="mr4 flex items-center">
            <Dot status="to-do" />{' '}
            <Text size={2} className="ml2">
                To-do
            </Text>
        </li>
        <li className="mr4 flex items-center">
            <Dot status="wont-do" />{' '}
            <Text size={2} className="ml2">
                Not applicable
            </Text>
        </li>
        <li className="mr4 flex items-center">
            <Dot status="deprecated" />{' '}
            <Text size={2} className="ml2">
                Deprecated
            </Text>
        </li>
    </ul>
);

export const ComponentRow = ({ name, usage, react, scss, ios, android, note }) => (
    <>
        <tr className="tl bb b-gray-300">
            <th rowSpan={5} className="pr2 pv2 v-top bb b-gray-300 bw-2">
                {name}
            </th>
            <th className="normal ph2 pv1">
                <Text size={2}>Usage</Text>
            </th>
            <td className="pa2 tc">
                <Dot status={usage.design} />
            </td>
            <td className="pa2 tc">
                <Dot status={usage.development} />
            </td>
            <td className="pa2 tc">
                <Dot status={usage.documentation} />
            </td>
            <td rowSpan={5} className="pv2 ph4 v-top black-300 bb b-gray-300 bw-2">
                <Text size={2} className="mw6">
                    {note}
                </Text>
            </td>
        </tr>
        <tr className="bb b-gray-300 tl">
            <th className="normal ph2 pv1">
                <Text size={2}>React</Text>
            </th>
            <td className="pa2 tc">
                <Dot status={react.design} />
            </td>
            <td className="pa2 tc">
                <Dot status={react.development} />
            </td>
            <td className="pa2 tc">
                <Dot status={react.documentation} />
            </td>
        </tr>
        <tr className="bb b-gray-300 tl">
            <th className="normal ph2 pv1">
                <Text size={2}>SCSS</Text>
            </th>
            <td className="pa2 tc">
                <Dot status={scss.design} />
            </td>
            <td className="pa2 tc">
                <Dot status={scss.development} />
            </td>
            <td className="pa2 tc">
                <Dot status={scss.documentation} />
            </td>
        </tr>
        <tr className="bb b-gray-300 tl">
            <th className="normal ph2 pv1">
                <Text size={2}>iOS</Text>
            </th>
            <td className="pa2 tc">
                <Dot status={ios.design} />
            </td>
            <td className="pa2 tc">
                <Dot status={ios.development} />
            </td>
            <td className="pa2 tc">
                <Dot status={ios.documentation} />
            </td>
        </tr>
        <tr className="bb b-gray-300 bw-2 tl">
            <th className="normal ph2 pv1">
                <Text size={2}>Android</Text>
            </th>
            <td className="pa2 tc">
                <Dot status={android.design} />
            </td>
            <td className="pa2 tc">
                <Dot status={android.development} />
            </td>
            <td className="pa2 tc">
                <Dot status={android.documentation} />
            </td>
        </tr>
    </>
);

ComponentRow.propTypes = {
    name: PropTypes.string.isRequired,
    usage: PropTypes.shape({
        design: documentationStatus.isRequired,
        development: documentationStatus.isRequired,
        documentation: documentationStatus.isRequired,
    }).isRequired,
    react: PropTypes.shape({
        design: documentationStatus.isRequired,
        development: documentationStatus.isRequired,
        documentation: documentationStatus.isRequired,
    }).isRequired,
    scss: PropTypes.shape({
        design: documentationStatus.isRequired,
        development: documentationStatus.isRequired,
        documentation: documentationStatus.isRequired,
    }).isRequired,
    ios: PropTypes.shape({
        design: documentationStatus.isRequired,
        development: documentationStatus.isRequired,
        documentation: documentationStatus.isRequired,
    }).isRequired,
    android: PropTypes.shape({
        design: documentationStatus.isRequired,
        development: documentationStatus.isRequired,
        documentation: documentationStatus.isRequired,
    }).isRequired,
};

export const ComponentTable = ({ children }) => (
    <table className="w-100">
        <thead className="tl">
            <tr>
                {/*
                The `boxShadow` is used instead of `border` because of:
                https://stackoverflow.com/q/41882616/316602
            */}
                <th
                    className="pt3 pr2 pb2 v-top top0 bg-white"
                    style={{
                        position: 'sticky',
                        boxShadow: `0px 2px 0px 0px ${tpColorGray300}`,
                    }}
                >
                    <Text size={2}>Component</Text>
                </th>
                <th
                    className="pt3 ph2 pb2 v-top top0 bg-white"
                    style={{
                        position: 'sticky',
                        boxShadow: `0px 2px 0px 0px ${tpColorGray300}`,
                    }}
                >
                    <Text size={2}>Platforms</Text>
                </th>
                <th
                    className="pt3 ph3 pb2 v-top top0 bg-white"
                    style={{
                        width: '1%',
                        position: 'sticky',
                        boxShadow: `0px 2px 0px 0px ${tpColorGray300}`,
                    }}
                >
                    <Text size={2}>Design</Text>
                </th>
                <th
                    className="pt3 ph3 pb2 v-top top0 bg-white"
                    style={{
                        width: '1%',
                        position: 'sticky',
                        boxShadow: `0px 2px 0px 0px ${tpColorGray300}`,
                    }}
                >
                    <Text size={2}>Dev</Text>
                </th>
                <th
                    className="pt3 ph3 pb2 v-top top0 bg-white"
                    style={{
                        width: '1%',
                        position: 'sticky',
                        boxShadow: `0px 2px 0px 0px ${tpColorGray300}`,
                    }}
                >
                    <Text size={2}>Docs</Text>
                </th>
                <th
                    className="pt3 ph4 pb2 v-top top0 bg-white"
                    style={{
                        position: 'sticky',
                        boxShadow: `0px 2px 0px 0px ${tpColorGray300}`,
                    }}
                >
                    <Text size={2}>Notes</Text>
                </th>
            </tr>
        </thead>
        <tbody>{children}</tbody>
    </table>
);

ComponentTable.propTypes = {
    children: PropTypes.node.isRequired,
};
