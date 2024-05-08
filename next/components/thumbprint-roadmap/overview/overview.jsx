/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Text, Pill } from '@thumbtack/thumbprint-react';
import { tpColorGray300 } from '@thumbtack/thumbprint-tokens';
import styles from './overview.module.scss';

export const ComponentRow = ({ task, description, status, releaseDate}) => (
    <>
        <tr className="bb b-gray-300 bw-2 tl">
            <td className="">
                {task}
            </td>
            <td className="pa2">
                {description}
            </td>
            <td className="pa2">
                <Pill color="blue">{status}</Pill>
            </td>
            <td className="pa2">
                {releaseDate}
            </td>
        </tr>
    </>
);

ComponentRow.propTypes = {
    task: String,
    description: String,
    status: String,
    releaseDate: String,
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
                    <Text size={2}>Name</Text>
                </th>
                <th
                    className="pt3 ph2 pb2 v-top top0 bg-white"
                    style={{
                        position: 'sticky',
                        boxShadow: `0px 2px 0px 0px ${tpColorGray300}`,
                    }}
                >
                    <Text size={2}>Description</Text>
                </th>
                <th
                    className="pt3 ph2 pb2 v-top top0 bg-white"
                    style={{
                        position: 'sticky',
                        boxShadow: `0px 2px 0px 0px ${tpColorGray300}`,
                    }}
                >
                    <Text size={2}>Status</Text>
                </th>
                <th
                    className="pt3 ph2 pb2 v-top top0 bg-white"
                    style={{
                        position: 'sticky',
                        boxShadow: `0px 2px 0px 0px ${tpColorGray300}`,
                    }}
                >
                    <Text size={2}>Release date</Text>
                </th>
            </tr>
        </thead>
        <tbody>{children}</tbody>
    </table>
);

ComponentTable.propTypes = {
    children: PropTypes.node.isRequired,
};
