import React from 'react';
import PropTypes from 'prop-types';
import { InlineCode } from '../../mdx';
import Swatch from '../../swatch';

const cleanSelector = selector =>
    selector
        .replace('.', '')
        .replace(':hover', '')
        .replace(/hover.*:focus/, '')
        .replace(/.*> \*/, '');

const Table = ({ atomicClasses }) => {
    const atomicClassesHackless = atomicClasses.filter(
        // There are `shadow-*, _:-ms-lang(x)` hack selectors in the Atomic source code that
        // provide darker box-shadows for IE/Edge. This filters out those selectors to prevent them
        // from rendering in these docs.
        item => !item.selectors.includes('_:-ms-lang(x)'),
    );
    return (
        <table className="w-100 tp-body-2">
            <tbody>
                {atomicClassesHackless.map(classItem => (
                    <tr key={classItem.selectors.join('')} className="bb b-gray-300">
                        <td className="v-top w-40 pv2">
                            <table>
                                <tbody>
                                    {classItem.selectors.map(v => (
                                        <tr key={v}>
                                            <td data-algolia="include">
                                                <InlineCode theme="plain" shouldCopyToClipboard>
                                                    {cleanSelector(v)}
                                                </InlineCode>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                        <td className="v-top w-60 pv2 black-300">
                            <table>
                                <tbody>
                                    {classItem.declarations.map(v => (
                                        <tr key={v}>
                                            <td>
                                                <InlineCode theme="plain">{v}</InlineCode>
                                                <Swatch value={v} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    atomicClasses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Table;
