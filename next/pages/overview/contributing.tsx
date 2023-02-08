import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { ContentPage } from '../../components/mdx/mdx';
import getContentPagteStaticProps from '../../utils/get-content-page-static-props';
import { P, A, H2, H3 } from '../../components/mdx/components';

export const getStaticProps = getContentPagteStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Contributing"
            description="Help us improve Thumbprint."
            layoutProps={layoutProps}
        >
            <P>
                A design system only works when there’s input from a wider team. We encourage
                contributions both big and small from designers and developers.
            </P>

            <H2>Ways to contribute</H2>

            <H3>1. Suggest a design change or bug fix</H3>

            <P>
                See something that needs a tweak or uncover a bug in one of our components? Let us
                know and we will determine how best to get your concern addressed. You can also{' '}
                <A href="https://github.com/thumbtack/thumbprint/issues/new"> file an issue</A> in
                the Thumbprint GitHub repository.
            </P>

            <H3>2. Propose guidelines or components</H3>

            <P>
                Each quarter we tackle new <A href="/guide/product/toolkits/">Toolkits</A>, but we
                welcome suggestions for new or existing ones. Capturing existing use cases while
                allowing for future flexibility is always a challenge and we want to know if we’ve
                missed the mark.
            </P>

            <H3>3. Volunteer to work on a Toolkit</H3>

            <P>
                If you have a particular area of interest and would like to work on the design or
                development of a Toolkit reach out to us. We’ll help you determine how to get
                started and the steps to completion.
            </P>

            <H2>Developers</H2>

            <P>
                In our GitHub repository we maintain a{' '}
                <A href="https://github.com/thumbtack/thumbprint/blob/master/CONTRIBUTING.md">
                    CONTRIBUTING.md
                </A>{' '}
                file that contains developer-specific instructions for contributing code to
                Thumbprint.
            </P>
        </ContentPage>
    );
}
