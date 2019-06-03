import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InlineCode } from '../../../mdx';

const Color = ({ children, hex }) => {
    const renderAsTwoRows = children.length > 20;
    return (
        <table className="w-100">
            <tbody>
                <tr>
                    <td
                        className={classNames({
                            'flex tr items-center justify-end': !renderAsTwoRows,
                            'black-300': renderAsTwoRows,
                        })}
                    >
                        <div
                            className={classNames({
                                'h2 w4 ba b-gray-300': true,
                                'ml-auto mb1': renderAsTwoRows,
                                mr4: !renderAsTwoRows,
                            })}
                            style={{ backgroundColor: hex }}
                        />
                        <InlineCode theme="plain">{children}</InlineCode>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

Color.propTypes = {
    value: PropTypes.string.isRequired,
};

export default Color;
