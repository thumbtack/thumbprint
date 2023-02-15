import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { MDXComponentPage } from '../../../components/mdx/mdx';
import getComponentPageStaticProps from '../../../utils/get-component-page-static-props';
import { A, CodeExperimental, H2, H3 } from '../../../components/mdx/components';
import Alert from '../../../components/alert/alert';
import DeprecatedComponentAlert from '../../../components/thumbprint-components/deprecated-component-alert/deprecated-component-alert';
import '@thumbtack/thumbprint-scss/avatar.css';

export const getStaticProps = () => {
    return getComponentPageStaticProps({
        title: 'Avatar',
        description: 'Display user images and badges on Thumbtack.',
        componentId: 'avatar',
        platformId: 'scss',
    });
};

export default function ComponentDocumentationPage({
    layoutProps,
    componentPageProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <MDXComponentPage componentPageProps={componentPageProps} layoutProps={layoutProps}>
            <Alert type="warning" title="Avatar component is out-of-date">
                The sizes and styles available in the SCSS version of the{' '}
                <CodeExperimental>Avatar</CodeExperimental> component{' '}
                <a
                    href="https://github.com/thumbtack/thumbprint/issues/25"
                    title="Details about the recent changes"
                >
                    are out-of-date
                </a>
                . <A href="/components/avatar/react/">Use the React component</A> if possible or{' '}
                <A href="/help/">reach out to the Design Systems team</A> if you are blocked.
            </Alert>

            <H2>Avatar Sizes</H2>

            <H3>Extra Large</H3>

            <CodeExperimental language="html">{`
<div class="tp-avatar tp-avatar--xlarge">
    <img src="https://i.pravatar.cc/140" class="tp-avatar__img" />
</div>
            `}</CodeExperimental>

            <H3>Large</H3>

            <CodeExperimental language="html">{`
<div class="tp-avatar tp-avatar--large">
    <img src="https://i.pravatar.cc/140" class="tp-avatar__img" />
</div>
            `}</CodeExperimental>

            <H3>Medium</H3>

            <CodeExperimental language="html">{`
<div class="tp-avatar tp-avatar--medium">
    <img src="https://i.pravatar.cc/140" class="tp-avatar__img" />
</div>
            `}</CodeExperimental>

            <H3>Small</H3>

            <CodeExperimental language="html">{`
<div class="tp-avatar tp-avatar--small">
    <img src="https://i.pravatar.cc/140" class="tp-avatar__img" />
</div>
            `}</CodeExperimental>

            <H3>Extra Small</H3>
            <CodeExperimental language="html">{`
<div class="tp-avatar tp-avatar--xsmall">
    <img src="https://i.pravatar.cc/140" class="tp-avatar__img" />
</div>
            `}</CodeExperimental>

            <H2>Avatar Badges</H2>

            <DeprecatedComponentAlert>
                Avatar badges are deprecated. Status indicators such as “online” status, hired
                checkmarks, and notification alerts should be implemented as separate elements
                placed next to the avatar.
            </DeprecatedComponentAlert>

            <H3>Hired</H3>

            <CodeExperimental language="html">{`
<div class="tp-avatar tp-avatar--xlarge">
    <img src="https://i.pravatar.cc/140" class="tp-avatar__img" />
    <div class="tp-avatar__badge tp-avatar__badge--hired" />
                </div>
            `}</CodeExperimental>

            <H3>Notification</H3>

            <CodeExperimental language="html">{`
<div class="tp-avatar tp-avatar--xlarge">
    <img src="https://i.pravatar.cc/140" class="tp-avatar__img" />
    <div class="tp-avatar__badge tp-avatar__badge--notification">99</div>
</div>
            `}</CodeExperimental>
        </MDXComponentPage>
    );
}
