import React from 'react';
import PropTypes from 'prop-types';
import { startsWith } from 'lodash';
import { parse as urlParse } from 'url';
import { join as pathJoin } from 'path';
import { InlineCode } from '../mdx';
import Tag from '../tag';

/**
 * Finds the link to a changelog on GitHub given a URL like:
 * https://github.com/thumbtack/thumbprint/blob/master/packages/thumbprint-react/#readme
 */
const getChangelogURLFromPackageHomepageURL = homepageURL => {
    const parsedUrl = urlParse(homepageURL);

    return pathJoin(`https://github.com/${parsedUrl.pathname}`, 'CHANGELOG.md');
};

const PackageTable = ({
    version,
    deprecated,
    packageName,
    importStatement,
    sourceDirectory,
    platform,
}) => {
    const isDeprecated = !!deprecated;
    const changelogURL = getChangelogURLFromPackageHomepageURL(sourceDirectory);
    const name = packageName;
    const isStable = startsWith(version, '0');

    let installVersion;

    if (platform === 'ios') {
        // Changes `X.Y.Z` to `X.Y` since iOS Podfiles only care about the first two numbers.
        const splitVersion = version.split('.');
        installVersion = `${splitVersion[0]}.${splitVersion[1]}`;
    } else {
        installVersion = version;
    }

    // Allow users to easily create an issue on GitHub.
    const repoURL = 'https://github.com/thumbtack/thumbprint/';
    const createIssueURL = `${repoURL}issues/new?title=[${encodeURIComponent(packageName)}]:%20`;

    const styles = {
        tr: 'bb b-gray-300 v-top',
        th: 'pv2 pr3 bb b-gray-300 w1 tl black',
        td: 'pv2 pr3 bb b-gray-300 black-300',
    };

    return (
        <div className="flex mb4" id="package">
            <table className="collapse w-100 tp-body-2">
                <tbody>
                    <tr className={styles.tr}>
                        <th className={styles.th}>Version:</th>
                        <td className={styles.td} colSpan="2">
                            <InlineCode theme="plain">{version}</InlineCode>{' '}
                            {isDeprecated && <Tag type="deprecated" />}
                            <span className="mh1">•</span>
                            <a href={sourceDirectory} target="_blank" rel="noopener noreferrer">
                                View source
                            </a>
                            <span className="mh1">•</span>
                            <a href={changelogURL} target="_blank" rel="noopener noreferrer">
                                Changelog
                            </a>
                            <span className="mh1">•</span>
                            <a href={createIssueURL} target="_blank" rel="noopener noreferrer">
                                Report issue
                            </a>
                        </td>
                    </tr>

                    <tr className={styles.tr}>
                        <th className={styles.th}>Install:</th>
                        <td className={styles.td}>
                            {(platform === 'javascript' || platform === 'scss') && (
                                <InlineCode theme="plain" shouldCopyToClipboard>
                                    {`yarn add ${name} ${isStable ? '--exact' : ''}`}
                                </InlineCode>
                            )}
                            {platform === 'ios' && (
                                <InlineCode theme="plain" shouldCopyToClipboard>
                                    {`pod '${name}', '~> ${installVersion}'`}
                                </InlineCode>
                            )}
                        </td>
                    </tr>

                    {importStatement && (
                        <tr className={styles.tr}>
                            <th className={styles.th}>Import:</th>
                            <td className={styles.td}>
                                <InlineCode theme="plain" shouldCopyToClipboard>
                                    {importStatement}
                                </InlineCode>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

PackageTable.propTypes = {
    version: PropTypes.string.isRequired,
    deprecated: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    packageName: PropTypes.string.isRequired,
    platform: PropTypes.oneOf(['scss', 'javascript', 'ios']).isRequired,
    importStatement: PropTypes.string,
    sourceDirectory: PropTypes.string.isRequired,
};

PackageTable.defaultProps = {
    deprecated: false,
    importStatement: undefined,
};

export default PackageTable;
