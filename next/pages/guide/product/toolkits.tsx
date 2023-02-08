import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { Title, Grid, GridColumn } from '@thumbtack/thumbprint-react';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPagteStaticProps from '../../../utils/get-content-page-static-props';
import { H2, Img, LI, P, UL } from '../../../components/mdx/components';

import toolkit1Image from '../../../images/pages/guide/product/toolkits/toolkit-1.png';
import toolkit2Image from '../../../images/pages/guide/product/toolkits/toolkit-2.png';
import toolkit3Image from '../../../images/pages/guide/product/toolkits/toolkit-3.png';
import toolkit4Image from '../../../images/pages/guide/product/toolkits/toolkit-4.png';

export const getStaticProps = getContentPagteStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Toolkits"
            description="The building blocks of a design system."
            layoutProps={layoutProps}
        >
            <P>At Thumbtack toolkits are the primary output of Design Systems team.</P>
            <UL>
                <LI>
                    Each toolkit focuses on a single concept and to be considered complete must pass
                    through four phases.
                </LI>
                <LI>
                    The scope of the toolkits can be broad and foundational, LIke color and type, or
                    narrowly focused on specific components, LIke notifications and progress bars.
                </LI>
                <LI>
                    Work on the toolkits is prioritized through a combination of team requests and
                    the judgment of the Design System team.
                </LI>
            </UL>
            <H2>Toolkit phases</H2>

            <Grid gutter="wide">
                <GridColumn aboveSmall={6}>
                    <div className="mb3 ba bw-2 b-gray-300">
                        <Img {...toolkit1Image} alt="Screenshot of tooklit design phase" />
                    </div>
                    <Title size={5} headingLevel={3} className="mb1">
                        1. Design
                    </Title>
                    <p className="mb4 black-300">
                        In the first phase a designer audits and consolidates existing examples
                        found in our products, researches best practices, considers feedback from
                        designers, writers and engineers, and creates the user interface
                        specifications and usage guidelines.
                    </p>
                </GridColumn>
                <GridColumn aboveSmall={6}>
                    <div className="mb3 ba bw-2 b-gray-300">
                        <Img {...toolkit2Image} alt="Screenshot of tooklit build phase" />
                    </div>
                    <Title size={5} headingLevel={3} className="mb1">
                        2. Build
                    </Title>
                    <p className="mb4 black-300">
                        A Design Systems engineer creates the required code in phase two. This
                        usually includes Sass, HTML, and React but may also necessitate new
                        infrastructure. For example, our icon system required a build system to
                        support multiple platforms.
                    </p>
                </GridColumn>
                <GridColumn aboveSmall={6}>
                    <div className="mb3 ba bw-2 b-gray-300">
                        <Img {...toolkit3Image} alt="Screenshot of tooklit documentation phase" />
                    </div>
                    <Title size={5} headingLevel={3} className="mb1">
                        3. Documentation
                    </Title>
                    <p className="mb4 black-300">
                        Once the toolkit is built, product teams need to know how to use it. This
                        phase documents the specifications and usage guidelines for designers and
                        writers along with the API instructions for engineers.
                    </p>
                </GridColumn>
                <GridColumn aboveSmall={6}>
                    <div className="mb3 ba bw-2 b-gray-300">
                        <Img {...toolkit4Image} alt="Screenshot of tooklit release phase" />
                    </div>
                    <Title size={5} headingLevel={3} className="mb1">
                        4. Release
                    </Title>
                    <p>
                        In the final phase the Design Systems team announces that the toolkit is
                        available. This means all pattern and API documentation from previous phases
                        is published online and any code is versioned and released.
                    </p>
                </GridColumn>
            </Grid>
        </ContentPage>
    );
}
