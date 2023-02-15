import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { AlertBanner } from '@thumbtack/thumbprint-react';
import { MDXComponentPage } from '../../../components/mdx/mdx';
import getComponentPageStaticProps from '../../../utils/get-component-page-static-props';
import { CodeExperimental, H2, H3 } from '../../../components/mdx/components';

export const getStaticProps = () => {
    return getComponentPageStaticProps({
        title: 'Alert Banner',
        description: 'Important account information displayed at the top of a screen',
        componentId: 'alert-banner',
        platformId: 'react',
    });
};

export default function ComponentDocumentationPage({
    layoutProps,
    componentPageProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <MDXComponentPage componentPageProps={componentPageProps} layoutProps={layoutProps}>
            <H2>Themes</H2>

            <H3>Caution</H3>

            <CodeExperimental language="jsx">
                <AlertBanner theme="caution">
                    Your pre-paid credits are running low. Purchase new credits before you run out.{' '}
                    <a href="https://example.com/">Purchase credits</a>
                </AlertBanner>
            </CodeExperimental>

            <H3>Info</H3>

            <CodeExperimental language="jsx">
                <AlertBanner theme="info">
                    You haven’t finish setting up. Add 3 reviews and turn on targeting.{' '}
                    <a href="https://example.com/">Finish setup</a>
                </AlertBanner>
            </CodeExperimental>

            <H3>Warning</H3>

            <CodeExperimental language="jsx">
                <AlertBanner theme="warning">
                    Oops. Your payment failed! Update your payment details to continue using
                    Thumbtack. <a href="https://example.com/">Update payment</a>
                </AlertBanner>
            </CodeExperimental>
        </MDXComponentPage>
    );
}
