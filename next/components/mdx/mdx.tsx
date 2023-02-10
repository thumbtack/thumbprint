import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { isString, get, find } from 'lodash';
import { Text } from '@thumbtack/thumbprint-react';

import Wrap from '../wrap/wrap';
import PageHeader from '../page-header/page-header';
import Layout from '../layout/layout';
import { LayoutProps } from '../../utils/get-layout-props';
import TabNav, { TabNavItem } from '../tab-nav/tab-nav';
import PackageTable from '../package-table/package-table';
import { ComponentPageProps } from '../../utils/component-page-props';
import { H2, H3, H4, P, Pre, LI, OL, UL, Img, Code, Table, TD, TH, HR, Iframe } from './components';
import InlineCode from '../inline-code/inline-code';
import PropType from '../thumbprint-components/props-table/prop-type';
import Tag from '../tag/tag';

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
                // Not worth fixing this at the moment since we're moving away from MDX.
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
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
                        isActive={platform.id === componentPageProps.platformId}
                        key={platform.id}
                        href={`/components/${componentPageProps.id}/${platform.id}`}
                    >
                        {platform.name}
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
                <React.Fragment>
                    <H2>Props</H2>
                    {componentPageProps.componentDocgens.map(component => (
                        <div key={component.displayName} className="ph5 pb3 mb5 ba br2 b-gray-300">
                            <H3>{component.displayName}</H3>
                            {component.description && (
                                <div className="mb3">
                                    <MDXRenderer>{component.description}</MDXRenderer>
                                </div>
                            )}
                            <ul>
                                {Object.keys(component.props)
                                    .sort((a, b) => {
                                        const propA = component.props[a];
                                        const propB = component.props[b];
                                        if (propA.required === propB.required) {
                                            return 0;
                                        }

                                        if (propA.required && !propB.required) {
                                            return -1;
                                        }

                                        return 1;
                                    })
                                    .map(propName => {
                                        const prop = component.props[propName];

                                        const deprecated = find(
                                            prop.description.tags,
                                            o => o.title === 'deprecated',
                                        );

                                        return (
                                            <li className="pv4 bt b-gray-300" key={propName}>
                                                <div className="flex">
                                                    <div className="b">
                                                        <InlineCode
                                                            shouldCopyToClipboard
                                                            theme="plain"
                                                        >
                                                            {propName}
                                                        </InlineCode>
                                                    </div>
                                                    {prop.required && (
                                                        <div className="ml2">
                                                            <Tag type="required" />
                                                        </div>
                                                    )}
                                                    {deprecated && (
                                                        <div className="ml2">
                                                            <Tag type="deprecated" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="black-300 mw8 mb2">
                                                    {prop.description && (
                                                        <MDXRenderer>
                                                            {prop.description.description}
                                                        </MDXRenderer>
                                                    )}

                                                    {deprecated &&
                                                        isString(deprecated.description) && (
                                                            <p>
                                                                <b>Note:</b>{' '}
                                                                {deprecated.description}
                                                            </p>
                                                        )}
                                                </div>
                                                <div className="flex">
                                                    {prop.tsType && (
                                                        <Text
                                                            size={2}
                                                            className="mr4 w-50 s_w-40 m_w-30 m_w-20"
                                                            elementName="div"
                                                        >
                                                            <div className="b black-300">Type</div>
                                                            <PropType
                                                                type={prop.tsType.name}
                                                                value={prop.tsType.elements}
                                                            />
                                                        </Text>
                                                    )}
                                                    {get(prop.defaultValue, 'value') && (
                                                        <Text
                                                            size={2}
                                                            className="mr4 w-50 s_w-40 m_w-30 m_w-20"
                                                            elementName="div"
                                                        >
                                                            <div className="b black-300">
                                                                Default
                                                            </div>
                                                            <div className="black-300">
                                                                <InlineCode theme="plain">
                                                                    {get(
                                                                        prop.defaultValue,
                                                                        'value',
                                                                    )}
                                                                </InlineCode>
                                                            </div>
                                                        </Text>
                                                    )}
                                                </div>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    ))}
                </React.Fragment>
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
