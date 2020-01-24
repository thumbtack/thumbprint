import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { InlineCode } from '../../../mdx';

const TokenExample = ({ exampleData, displayText, format }) => {
    const shouldRenderAsTwoLines = displayText.length > 30;
    let children;

    if (exampleData && format === 'color') {
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
                                style={{ backgroundColor: exampleData }}
                            />
                            <InlineCode theme="plain">{displayText}</InlineCode>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    } else {
        children = <InlineCode theme="plain">{displayText}</InlineCode>;
    }

    return <div>{children}</div>;
};

TokenExample.propTypes = {
    format: PropTypes.string,
    exampleData: PropTypes.string,
    displayText: PropTypes.node.isRequired,
};

TokenExample.defaultProps = {
    format: undefined,
    exampleData: undefined,
};

export default TokenExample;
