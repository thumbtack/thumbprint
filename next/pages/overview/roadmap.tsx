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
} from '../../components/thumbprint-roadmap/overview/overview';
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

interface Roadmap {
    browserLink: string;
    createdAt: string;
    href: string;
    id: string;
    index: number;
    name: string;
    type: string;
    updatedAt: string;
    values: {
        Task: string;
        Description: string;
        Status: string;
        'Release Date': string;
    };
}

export default function Components({
    roadmaps,
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
    return (
        <ContentPage
            title="Roadmap"
            description="What's ahead for Thumbprint."
            layoutProps={layoutProps}
        >
            {roadmaps.length === 0 && (
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

            <ComponentTable>
                {roadmaps.map(item => {

                    return (
                        <ComponentRow
                            task={item.values.Task}
                            description={item.values.Description}
                            status={item.values.Status}
                            releaseDate={item.values['Release Date']}
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
        `https://coda.io/apis/v1/docs/bXyUQb2tJW/tables/PublicRoadmap/rows?useColumnNames=true`,
        {
            headers: {
                Authorization: `Bearer ${process.env.CODA_API_TOKEN}`,
            },
        },
    );

    const data = listRowsRes.ok ? await listRowsRes.json() : null;
    const roadmaps: Roadmap[] = data ? data.items : [];

    // const groupedImplementations = groupBy(roadmaps, implementation => {
    //     return implementation.values.Name;
    // });

    // const groupedAndSortedImplementations = Object.keys(groupedImplementations)
    //     .sort()
    //     .map(key => {
    //         return groupedImplementations[key];
    //     });

    return {
        props: {
            layoutProps: getLayoutProps(),
            roadmaps: roadmaps,
        },
    };
};
