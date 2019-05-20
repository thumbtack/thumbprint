import React from 'react';
import PropTypes from 'prop-types';
import { InlineCode } from '../../../mdx';

const DisplayColor = ({ value, platform }) => {
    let backgroundColor;

    switch (platform) {
        case 'ios':
            // Check that the color is in a format that we can convert to an inline background
            // color. By throwing an error, we can prevent the documentation build from passing CI
            // if an invalid color format is added.
            if (/UIColor\(red.*green.*blue.*alpha.*/.test(value) === false) {
                throw Error(
                    `Color tokens for iOS must follow the following format:\n\nUIColor(red: 0.000, green: 0.624, blue: 0.851, alpha: 1.000)\n\nPlease update the token with the value \`${value}\``,
                );
            }

            // Converts "UIColor(red: 0.000, green: 0.624, blue: 0.851, alpha: 1.000)" to
            // "rgba(0, 159, 217, 1.000)" so that it can be used as a CSS inline style.
            backgroundColor = value
                .replace(
                    /(?:red|blue|green): (\d\..*?)[,)]/g,
                    // Convert the `red`, `blue`, and `green` values from `0.624` to `217`.
                    (match, string) => Math.round(parseFloat(string, 10) * 255) + match.slice(-1),
                )
                .replace('UIColor', 'rgba')
                .replace('red: ', '')
                .replace('green: ', '')
                .replace('blue: ', '')
                .replace('alpha: ', '');
            break;
        default:
            backgroundColor = value;
            break;
    }

    return (
        <table className="w-100">
            <tbody>
                <tr>
                    <td className="flex tr items-center justify-end">
                        <div className="h2 mr4 w4 ba b-gray-300" style={{ backgroundColor }} />
                        <InlineCode theme="plain">{value}</InlineCode>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

DisplayColor.propTypes = {
    value: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
};

export default DisplayColor;
