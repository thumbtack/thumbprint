import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { InlineCode } from '../../../mdx';

const TokenExample = ({ data, displayText, format }) => {
    const shouldRenderAsTwoLines = displayText.length > 30;
    let children;

    switch (format) {
        case 'color':
            children = (
                <table className="w-100">
                    <tbody>
                        <tr>
                            <td
                                className={className({
                                    flex: true,
                                    'tr items-center justify-end': !shouldRenderAsTwoLines,
                                    'flex-column items-end black-300': shouldRenderAsTwoLines,
                                })}
                            >
                                <div
                                    className={className({
                                        'h2 w4 ba b-gray-300': true,
                                        mr4: !shouldRenderAsTwoLines,
                                        mb1: shouldRenderAsTwoLines,
                                    })}
                                    style={{ backgroundColor: data }}
                                />
                                <InlineCode theme="plain">{displayText}</InlineCode>
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
            break;
        default:
            children = <InlineCode theme="plain">{displayText}</InlineCode>;
            break;
    }

    return <div>{children}</div>;
};

TokenExample.propTypes = {
    format: PropTypes.string,
    data: PropTypes.string.isRequired,
    displayText: PropTypes.node.isRequired,
};

TokenExample.defaultProps = {
    format: undefined,
};

export default TokenExample;
