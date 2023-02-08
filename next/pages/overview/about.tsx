import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { ContentPage } from '../../components/mdx/mdx';
import getContentPagteStaticProps from '../../utils/get-content-page-static-props';
import { P, H2, H3 } from '../../components/mdx/components';

export const getStaticProps = getContentPagteStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="About"
            description="Thumbprint is the design system for Thumbtack products."
            layoutProps={layoutProps}
        >
            <P>
                Thumbprint is a living system that streamlines the design and development process
                through consolidation, standardization, and documentation. By reducing
                decision-making friction, we free teams to focus on higher-order problems while
                increasing quality and consistency for Thumbtack’s customers.
            </P>

            <H2>Principles</H2>

            <H3>Build with a consistent process</H3>

            <P>
                We use toolkits to help us identify, prioritize, and scope our work. Toolkits
                capture broad concepts, like typography or color, and smaller ones, like pills and
                loaders. We build only what is essential after considering stakeholder feedback,
                accessibility requirements, and future use cases.
            </P>

            <H3>Communicate and document everything</H3>

            <P>
                Providing clear references and dependable tools are critical to the success of
                Thumbprint. This is accomplished by creating a shared language for designers and
                developers, responding quickly to questions, continually communicating changes, and
                refining our documentation to ensure quick and reliable results.
            </P>

            <H3>Encourage collaboration and feedback</H3>

            <P>
                Encouraging contributions and constructive criticism helps establish trust with
                teams and promotes the system as a shared resource with a transparent process. By
                spreading system thinking to a wider, diverse group, we also form greater clarity
                about what to build and, equally important, what not to build.
            </P>
        </ContentPage>
    );
}
