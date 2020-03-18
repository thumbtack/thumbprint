import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';
import { Text, TextInput } from '@thumbtack/thumbprint-react';
import styles from './index.module.scss';

export default function ComponentOverview({ data, currentPlatform }) {
    const [searchFilter, setSearchFilter] = useState(undefined);

    return (
        <div>
            <div className="flex mb5">
                <TextInput
                    size="small"
                    onChange={newValue => setSearchFilter(newValue)}
                    value={searchFilter}
                />
                <div className="ba b-gray br2 ml3 flex">
                    <Link
                        to={
                            currentPlatform === 'react'
                                ? '/components/overview/'
                                : '/components/overview/react/'
                        }
                        className={classNames({
                            [styles.platformButton]: true,
                            'br b-gray': true,
                            [styles.isActive]: currentPlatform === 'react',
                        })}
                    >
                        React
                    </Link>
                    <Link
                        to={
                            currentPlatform === 'ios'
                                ? '/components/overview/'
                                : '/components/overview/ios/'
                        }
                        className={classNames({
                            [styles.platformButton]: true,
                            'br b-gray': true,
                            [styles.isActive]: currentPlatform === 'ios',
                        })}
                    >
                        iOS
                    </Link>
                    <Link
                        to={
                            currentPlatform === 'android'
                                ? '/components/overview/'
                                : '/components/overview/android/'
                        }
                        className={classNames({
                            [styles.platformButton]: true,
                            'br b-gray': true,
                            [styles.isActive]: currentPlatform === 'android',
                        })}
                    >
                        Android
                    </Link>
                    <Link
                        to={
                            currentPlatform === 'scss'
                                ? '/components/overview/'
                                : '/components/overview/scss/'
                        }
                        className={classNames({
                            [styles.platformButton]: true,
                            'br b-gray': true,
                            [styles.isActive]: currentPlatform === 'scss',
                        })}
                    >
                        SCSS
                    </Link>
                    <Link
                        to={
                            currentPlatform === 'email'
                                ? '/components/overview/'
                                : '/components/overview/email/'
                        }
                        className={classNames({
                            [styles.platformButton]: true,
                            [styles.isActive]: currentPlatform === 'email',
                        })}
                    >
                        Email
                    </Link>
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
                        return component.edges.some(platform =>
                            [
                                'To-do',
                                'In progress',
                                'Done / Uses built in OS component',
                                'Done / Deprecated',
                                'Done / Merged',
                            ].includes(platform.node.data.values.Development_status),
                        );
                    })
                    .filter(component => {
                        // Filter results if the user has entered a search query.
                        if (!searchFilter) {
                            return true;
                        }

                        const componentName = component.fieldValue.toLowerCase().replace(/ /g, '');
                        const searchTerm = searchFilter.toLowerCase().replace(/ /g, '');

                        return componentName.includes(searchTerm);
                    })
                    .map(component => {
                        const componentForCurrentPlatform = currentPlatform
                            ? component.edges[0].node.data.values
                            : null;

                        const status = componentForCurrentPlatform
                            ? componentForCurrentPlatform.Development_status
                            : null;

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
