import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { MDXComponentPage } from '../../../components/mdx/mdx';
import getComponentPageStaticProps from '../../../utils/get-component-page-static-props';
import { A, CodeExperimental, H2, Img, P } from '../../../components/mdx/components';

import iosActionSheet from '../../../images/pages/components/action-sheet/ios/ios-action-sheet.png';

export const getStaticProps = () => {
    return getComponentPageStaticProps({
        title: 'Action Sheet',
        description: 'Modal prompt for making an important choice',
        componentId: 'action-sheet',
        platformId: 'ios',
    });
};

export default function ComponentDocumentationPage({
    layoutProps,
    componentPageProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <MDXComponentPage componentPageProps={componentPageProps} layoutProps={layoutProps}>
            <H2>Summary</H2>
            <P>
                Action sheets on iOS are implemented with the built-in UIKit component{' '}
                <CodeExperimental>UIAlertController</CodeExperimental> with{' '}
                <CodeExperimental>preferredStyle: .actionSheet</CodeExperimental>.
            </P>
            <P>
                Note that on iPhones, action sheets slide up from the bottom of the screen, while on
                iPads they are displayed as popovers.
            </P>
            <P>
                <Img {...iosActionSheet} alt="iOS action sheet" />
            </P>
            <H2>Public API</H2>
            <P>
                See Apple documentation on{' '}
                <A href="https://developer.apple.com/documentation/uikit/uialertcontroller">
                    UIAlertController
                </A>{' '}
                for the public API.
            </P>
        </MDXComponentPage>
    );
}
