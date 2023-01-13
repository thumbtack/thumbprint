import React from 'react';
import { InlineCode } from '../../mdx/mdx';
import Swatch from '../../swatch/swatch';

const cleanSelector = (selector: string): string =>
    selector
        .replace('.', '')
        .replace(':hover', '')
        .replace(/hover.*:focus/, '')
        .replace(/.*> \*/, '');

export default function AtomicTable({
    atomicClasses,
}: {
    atomicClasses: {
        selectors: string[];
        declarations: string[];
    }[];
}): JSX.Element {
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
}
