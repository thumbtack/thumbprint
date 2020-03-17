import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';
import { Text, TextInput } from '@thumbtack/thumbprint-react';
import styles from './index.module.scss';

export default function ComponentOverview({ data }) {
    const [filter, setFilter] = useState(undefined);
    const [currentPlatform, setCurrentPlatform] = useState(undefined);

    return (
        <div>
            <div className="flex mb5">
                <TextInput size="small" onChange={newValue => setFilter(newValue)} value={filter} />
                <div className="ba b-gray br2 ml3 flex">
                    <button
                        type="button"
                        onClick={() =>
                            setCurrentPlatform(currentPlatform === 'react' ? null : 'react')
                        }
                        className={classNames({
                            [styles.platformButton]: true,
                            'br b-gray': true,
                            [styles.isActive]: currentPlatform === 'react',
                        })}
                    >
                        <Text size={2}>React</Text>
                    </button>
                    <button
                        type="button"
                        onClick={() => setCurrentPlatform(currentPlatform === 'ios' ? null : 'ios')}
                        className={classNames({
                            [styles.platformButton]: true,
                            'br b-gray': true,
                            [styles.isActive]: currentPlatform === 'ios',
                        })}
                    >
                        <Text size={2}>iOS</Text>
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            setCurrentPlatform(currentPlatform === 'android' ? null : 'android')
                        }
                        className={classNames({
                            [styles.platformButton]: true,
                            'br b-gray': true,
                            [styles.isActive]: currentPlatform === 'android',
                        })}
                    >
                        <Text size={2}>Android</Text>
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            setCurrentPlatform(currentPlatform === 'scss' ? null : 'scss')
                        }
                        className={classNames({
                            [styles.platformButton]: true,
                            'br b-gray': true,
                            [styles.isActive]: currentPlatform === 'scss',
                        })}
                    >
                        <Text size={2}>SCSS</Text>
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            setCurrentPlatform(currentPlatform === 'email' ? null : 'email')
                        }
                        className={classNames({
                            [styles.platformButton]: true,
                            [styles.isActive]: currentPlatform === 'email',
                        })}
                    >
                        <Text size={2}>Email</Text>
                    </button>
                </div>
            </div>

            <div className={styles.componentGrid}>
                {data.allCodaImplementationsTable.group
                    .filter(component => {
                        // If no platform filter is selected, all components should appear
                        if (!currentPlatform) {
                            return true;
                        }

                        // Show only the components for the selected platform that we've either
                        // completed or know that we want to build.
                        return component.edges.some(
                            platform =>
                                platform.node.data.values.Platform.toLowerCase() ===
                                    currentPlatform.toLowerCase() &&
                                [
                                    'To-do',
                                    'In progress',
                                    'Done / Uses built in OS component',
                                    'Done / Deprecated',
                                    'Done / Merged',
                                ].includes(platform.node.data.values.Development_status),
                        );
                    })
                    .map(component => {
                        console.log({ component });
                        console.log({ data });

                        const componentForCurrentPlatform = currentPlatform
                            ? component.edges.find(
                                  platform =>
                                      platform.node.data.values.Platform.toLowerCase() ===
                                      currentPlatform.toLowerCase(),
                              ).node.data.values
                            : null;

                        console.log(componentForCurrentPlatform);

                        const status = componentForCurrentPlatform
                            ? componentForCurrentPlatform.Development_status
                            : null;

                        console.log(
                            'usage',
                            data.allCodaComponentsTable.edges.find(
                                c => c.node.data.values.Usage_documentation,
                            ),
                        );

                        let documentationLink;

                        if (componentForCurrentPlatform) {
                            // When viewing data for a specific platform, link to the documentation
                            // for the component on that platform.
                            documentationLink = componentForCurrentPlatform.Documentation || null;
                        } else {
                            // If no platform filter is selected, link to the component usage
                            // documentation when available.
                            const componentLevelData = data.allCodaComponentsTable.edges.find(
                                c => c.node.data.values.Name === component.fieldValue,
                            );

                            documentationLink =
                                componentLevelData.node.data.values.Usage_documentation || null;
                        }

                        const children = (
                            <>
                                <div className="h5 bg-gray-300 br1 mb1">&nbsp;</div>
                                {status && (
                                    <Text
                                        size={3}
                                        className="absolute top-0 right-0 bg-blue b pv1 ph3 white"
                                    >
                                        {status}
                                    </Text>
                                )}
                                <Text size={2}>{component.fieldValue}</Text>
                            </>
                        );

                        // Some components won't have a page that we can link to. This conditional
                        // handles both cases.
                        return documentationLink ? (
                            <Link
                                to={documentationLink.replace('https://thumbprint.design', '')}
                                className="color-inherit relative"
                                key={component.fieldValue}
                            >
                                {children}
                            </Link>
                        ) : (
                            <div className="color-inherit relative" key={component.fieldValue}>
                                {children}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

// Component.propTypes = {
//     name: PropTypes.string.isRequired,
//     usage: PropTypes.shape({
//         design: documentationStatus.isRequired,
//         development: developmentStatus.isRequired,
//         documentation: documentationStatus.isRequired,
//     }).isRequired,
//     react: PropTypes.shape({
//         design: documentationStatus.isRequired,
//         development: developmentStatus.isRequired,
//         documentation: documentationStatus.isRequired,
//     }).isRequired,
//     scss: PropTypes.shape({
//         design: documentationStatus.isRequired,
//         development: developmentStatus.isRequired,
//         documentation: documentationStatus.isRequired,
//     }).isRequired,
//     ios: PropTypes.shape({
//         design: documentationStatus.isRequired,
//         development: developmentStatus.isRequired,
//         documentation: documentationStatus.isRequired,
//     }).isRequired,
//     android: PropTypes.shape({
//         design: documentationStatus.isRequired,
//         development: developmentStatus.isRequired,
//         documentation: documentationStatus.isRequired,
//     }).isRequired,
// };
