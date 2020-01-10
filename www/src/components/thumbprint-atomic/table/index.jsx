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
        // If `_:-ms-lang(x)` is a classname, remove it from the array. Also prevents duplicated
        // classname that is in the source code for IE/Edge browsers from rendering in these docs.
        item => item.selectors[1] !== '_:-ms-lang(x)',
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
