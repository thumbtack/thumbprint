import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { ContentPage } from '../../components/mdx/mdx';
import getContentPageStaticProps from '../../utils/get-content-page-static-props';
import { P, H2, H3, UL, OL, LI, A } from '../../components/mdx/components';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Developers"
            description="How to code with Thumbprint."
            layoutProps={layoutProps}
        >
            <P>
                Thumbprint provides code in a number of technologies. React and SCSS components,
                <a href="https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421">
                    design tokens
                </a>
                , mixins, atomic CSS, and custom SCSS are all available as tools to build UIs. But
                knowing what to use and when to use them isn’t always clear, especially to those new
                to Thumbprint. We’ve put together this guide to help make those decisions.
            </P>

            <H2>React projects</H2>

            <P>Here’s the order of Thumbprint technologies to try when building React projects.</P>

            <OL>
                <LI>React components</LI>
                <LI>Atomic CSS</LI>
                <LI>Tokens in JS and Sass</LI>
                <LI>Custom Sass/CSS</LI>
            </OL>

            <H3>1. React</H3>

            <P>
                First check if a Thumbprint React component is available for your needs. A component
                may also already exist in your project.
            </P>

            <H3>2. Atomic CSS</H3>

            <P>
                If your layout requires tweaks not available in the React component, look to our{' '}
                <a href="/atomic/usage/">Atomic library</a> for the classes you need. This is a
                large collection of responsive classes to help build a UI without needing to write
                custom CSS. It’s especially helpful for adding color, spacing, borders, and
                constructing common flexbox layouts.
            </P>

            <H3>3. Tokens</H3>

            <P>
                There will be layouts where using Atomic is too cumbersome or incomplete. In these
                cases <A href="/tokens/">Thumbprint Tokens</A> can be used to retain visual
                consistency. You’ll be using the same variables used in Thumbprint React and Sass
                components and the Atomic library. Available as JS and SCSS variables, you can be
                confident that any future updates to token values will be applied to your code.
            </P>

            <H3>4. Custom Sass/CSS</H3>

            <P>
                Lastly, there are the occasional layouts where values must be hardcoded. For
                instance, if an image needs to be absolutely positioned in a unique way. In these
                situations it’s okay to use hardcoded values. But leave a comment explaining why so
                code reviewers and future developers will understand.
            </P>

            <H2>Non-React projects</H2>

            <P>
                If you cannot use React but want to include Thumbprint styling, for example,
                integrations with third party tools or HTML prototyping, we have a CSS-only option.
                Contact us on Slack and we’ll determine how best to help.
            </P>

            <H2>Component deviations</H2>

            <P>
                In some cases, like an experiment or a permanent one-off variation, you may want to
                change the appearance or behavior of Thumbprint component in an unsupported way. In
                this case you should avoid altering the Thumbprint SCSS or React components in your
                project and instead create a custom component. This is because future changes to the
                Thumbprint component could break altered instances.
            </P>

            <H2>Package updates</H2>

            <H3>Changelogs</H3>

            <P>
                All released and unreleased changes to our React, SCSS, and Atomic packages are
                tracked in their respective `CHANGELOG.md` files and is the best resource to
                determine the current status of the package.
            </P>

            <UL>
                <LI>
                    <A href="https://github.com/thumbtack/thumbprint/blob/master/packages/thumbprint-react/CHANGELOG.md">
                        React changelog
                    </A>
                </LI>
                <LI>
                    <A href="https://github.com/thumbtack/thumbprint/blob/master/packages/thumbprint-scss/CHANGELOG.md">
                        SCSS Changelog
                    </A>
                </LI>
                <LI>
                    <A href="https://github.com/thumbtack/thumbprint/blob/master/packages/thumbprint-atomic/CHANGELOG.md">
                        Atomic Changelog
                    </A>
                </LI>
                <LI>
                    <A href="https://github.com/thumbtack/thumbprint-icons/blob/master/CHANGELOG.md">
                        Icons Changelog
                    </A>
                </LI>
            </UL>

            <P>
                Unreleased changes are often{' '}
                <A href="https://github.com/thumbtack/thumbprint/blob/master/RELEASING.md">
                    published to npm
                </A>{' '}
                within a day or two of merging into their packages.
            </P>

            <H3>Consumer updates</H3>

            <P>
                In most cases Design Systems team will update the package in our primary website,
                thumbtack.com, within a day or two of being published to npm. We handle this task
                because there are often migrations of varying complexity that we have the best
                context on. However, on occasion we may ask developers to do the update if the
                package’s changes are closely tied to a project they are working on.
            </P>
        </ContentPage>
    );
}
