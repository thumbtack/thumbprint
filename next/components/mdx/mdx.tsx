import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import Wrap from '../wrap/wrap';
import PageHeader from '../page-header/page-header';
import Layout from '../layout/layout';
import { LayoutProps } from '../../utils/get-layout-props';
import TabNav, { TabNavItem } from '../tab-nav/tab-nav';
import PackageTable from '../package-table/package-table';
import { ComponentPageProps } from '../../utils/component-page-props';
import PropsTable from '../thumbprint-components/props-table/props-table';
import { H2, H3, H4, P, Pre, LI, OL, UL, Img, Code, Table, TD, TH, HR, Iframe } from './components';

export const MDXRenderer = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <MDXProvider
            components={{
                h2: H2,
                h3: H3,
                h4: H4,
                p: P,
                pre: Pre,
                li: LI,
                ol: OL,
                ul: UL,
                img: Img,
                code: Code,
                table: Table,
                td: TD,
                th: TH,
                hr: HR,
                iframe: Iframe,
            }}
        >
            {children}
        </MDXProvider>
    );
};

interface ContentPageProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    layoutProps: LayoutProps;
}

export const ContentPage = ({
    children,
    title,
    description,
    layoutProps,
}: ContentPageProps): JSX.Element => {
    return (
        <Layout {...layoutProps}>
            <Wrap>
                <PageHeader pageTitle={title} metaTitle={title} description={description} />
                {children}
            </Wrap>
        </Layout>
    );
};

export const MDXComponentPage = ({
    children,
    title,
    description,
    layoutProps,
    componentPageProps,
}: ContentPageProps & { componentPageProps: ComponentPageProps }): JSX.Element => {
    return (
        <MDX title={title} description={description} layoutProps={layoutProps}>
            <TabNav>
                {componentPageProps.componentPlatforms.map(platform => (
                    <TabNavItem
                        isActive={platform === componentPageProps.platformId}
                        key={platform}
                        href={`/components/${componentPageProps.id}/${platform}`}
                    >
                        {platform}
                    </TabNavItem>
                ))}
            </TabNav>
            {componentPageProps.packageTable && (
                <PackageTable
                    version={componentPageProps.packageTable.version}
                    packageName={componentPageProps.packageTable.name}
                    sourceDirectory={componentPageProps.packageTable.sourceDirectory}
                    // deprecated={componentPageProps.packageTable.deprecated}
                    importStatement={componentPageProps.packageTable.importStatement}
                    ecosystem="web"
                />
            )}
            {children}
            {componentPageProps.componentDocgens && (
                <PropsTable data={componentPageProps.componentDocgens} mdxRenderer={MDXRenderer} />
            )}
        </MDX>
    );
};

export default function MDX({
    children,
    title,
    description,
    layoutProps,
}: ContentPageProps): JSX.Element {
    return (
        <ContentPage title={title} description={description} layoutProps={layoutProps}>
            <MDXRenderer>{children}</MDXRenderer>
        </ContentPage>
    );
}
