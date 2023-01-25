import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { groupBy, keyBy } from 'lodash-es';
import { Text } from '@thumbtack/thumbprint-react';
import getLayoutProps from '../../utils/get-layout-props';
import Alert from '../../components/alert/alert';
import InlineCode from '../../components/inline-code/inline-code';
import {
    ComponentRow,
    ComponentTable,
    Dot,
} from '../../components/thumbprint-components/overview/overview';
import { ContentPage } from '../../components/mdx/mdx';

interface Implementation {
    browserLink: string;
    createdAt: string;
    href: string;
    id: string;
    index: number;
    name: string;
    type: string;
    updatedAt: string;
    values: {
        Component: string;
        Platform: string;
        'Ship date': string;
        Source: string;
        Design: string;
        Documentation: string;
        'Start date': string;
        'Row ID': string;
        'JIRA Ticket': string;
        'Name used in implementation': string;
        Developer: string;
        'Start (in days)': string;
        'Development status': string;
        'Design status': string;
        'Documentation status': string;
    };
}

export default function Components({
    implementations,
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
    return (
        <ContentPage
            title="Overview"
            description="Our components and the platforms they're available in"
            layoutProps={layoutProps}
        >
            {implementations.length === 0 && (
                <Alert type="warning" title="Where are the components?">
                    You’ll need to add <InlineCode>CODA_API_TOKEN</InlineCode> environment variable
                    to a <InlineCode>www/.env</InlineCode> file in order to see the component
                    statuses while developing locally. Read the{' '}
                    <a
                        href="https://github.com/thumbtack/thumbprint/blob/master/CONTRIBUTING.md"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        CONTRIBUTING.md
                    </a>{' '}
                    file for help.
                </Alert>
            )}

            <ul aria-hidden="true" className="flex black-300 mb2">
                <li className="mr4 flex items-center">
                    <Dot status="Done" />{' '}
                    <Text size={2} className="ml2">
                        Done
                    </Text>
                </li>
                <li className="mr4 flex items-center">
                    <Dot status="In progress" />{' '}
                    <Text size={2} className="ml2">
                        In Progress
                    </Text>
                </li>
                <li className="mr4 flex items-center">
                    <Dot status="To-do" />{' '}
                    <Text size={2} className="ml2">
                        To-do
                    </Text>
                </li>
                <li className="mr4 flex items-center">
                    <Dot status="Done / Won't build" />{' '}
                    <Text size={2} className="ml2">
                        Not applicable
                    </Text>
                </li>
                <li className="mr4 flex items-center">
                    <Dot status="Done / Deprecated" />{' '}
                    <Text size={2} className="ml2">
                        Deprecated
                    </Text>
                </li>
            </ul>

            <ComponentTable>
                {implementations.map(component => {
                    const platforms = keyBy(component, 'values.Platform');

                    return (
                        <ComponentRow
                            name={component[0].values.Component}
                            key={component[0].values.Component}
                            react={{
                                design: platforms.React.values['Design status'],
                                development: platforms.React.values['Development status'],
                                documentation: platforms.React.values['Documentation status'],
                            }}
                            scss={{
                                design: platforms.SCSS.values['Design status'],
                                development: platforms.SCSS.values['Development status'],
                                documentation: platforms.SCSS.values['Documentation status'],
                            }}
                            ios={{
                                design: platforms.iOS.values['Design status'],
                                development: platforms.iOS.values['Development status'],
                                documentation: platforms.iOS.values['Documentation status'],
                            }}
                            android={{
                                design: platforms.Android.values['Design status'],
                                development: platforms.Android.values['Development status'],
                                documentation: platforms.Android.values['Documentation status'],
                            }}
                        />
                    );
                })}
            </ComponentTable>
        </ContentPage>
    );
}

export const getStaticProps = async () => {
    const listRowsRes = await fetch(
        // https://coda.io/developers/apis/v1#operation/listRows
        `https://coda.io/apis/v1/docs/bXyUQb2tJW/tables/Implementations/rows?useColumnNames=true`,
        {
            headers: {
                Authorization: `Bearer ${process.env.CODA_API_TOKEN}`,
            },
        },
    );

    const data = listRowsRes.ok ? await listRowsRes.json() : null;
    const implementations: Implementation[] = data ? data.items : [];

    const groupedImplementations = groupBy(implementations, implementation => {
        return implementation.values.Component;
    });

    const groupedAndSortedImplementations = Object.keys(groupedImplementations)
        .sort()
        .map(key => {
            return groupedImplementations[key];
        });

    return {
        props: {
            layoutProps: getLayoutProps(),
            implementations: groupedAndSortedImplementations,
        },
    };
};
