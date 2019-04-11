import React from 'react';
import PropTypes from 'prop-types';
import { InlineCode } from '../../../mdx';

const DisplayColor = ({ value }) => (
    <table className="w-100">
        <tbody>
            <tr>
                <td className="flex tr items-center justify-end">
                    <div className="h2 mr4 w4 ba b-gray-300" style={{ backgroundColor: value }} />
                    <InlineCode theme="plain">{value}</InlineCode>
                </td>
            </tr>
        </tbody>
    </table>
);

DisplayColor.propTypes = {
    value: PropTypes.string.isRequired,
};

export default DisplayColor;
