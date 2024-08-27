import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { Grid, GridColumn, Text } from '@thumbtack/thumbprint-react';
import * as tokens from '@thumbtack/thumbprint-tokens';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPageStaticProps from '../../../utils/get-content-page-static-props';
import { CodeExperimental, H2, H3, LI, P, UL } from '../../../components/mdx/components';

export const getStaticProps = getContentPageStaticProps;

export default function Accessibility({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Accessibility"
            description="Color support for a more inclusive experience"
            layoutProps={layoutProps}
        >
            <P>
                Color usage plays a key role in how we convey emotions, establishing brand identity,
                and guiding user interactions. Consistent and thoughtful color choices also improve
                usability, highlight important elements, and create a cohesive design language
                across the product.
            </P>

            <H2>Accessibility</H2>
            <P>
                Accessible colors are vital for those with color blindness or other vision
                impairments. By using a high color contrast ratio, you can make sure that your
                design is accessible to as many people as possible.
            </P>
            <H3>Text styling</H3>
            <P>
                All text, including text in images and link text, should have enough contrast to
                stand out. This is especially important for links that aren’t underlined (and should
                apply to all states, including default, hover, and focus). See{' '}
                <a href="https://www.w3.org/TR/WCAG21/#contrast-minimum">
                    WCAG 2.1 AA success criterion
                </a>{' '}
                for contrast for the current requirements.
            </P>
            <H3>Color combinations</H3>
            <P>
                The color system is set up to provide an accessible experience by combining a
                particular range of color values from Thumbprint. The combinations include any{' '}
                <strong>100-level</strong> color paired with any <strong>600-level</strong> color
                values. For example, when using the <strong>blue-100</strong> background color, the{' '}
                <strong>blue-600</strong> color should be used for the text.
            </P>

            <H3>Low emphasis backgrounds</H3>
            <P>
                A common and preferred pattern for non-interactive elements when applying a
                background color uses the <strong>100-level</strong> values for backgrounds. The{' '}
                <strong>600-level</strong> color of the same hue will ensure an accessible color
                contrast ratio combined with this background treatment.{' '}
                <strong>Any value below the 600-level</strong> (500, 400, 300, 200, 100){' '}
                <strong>will not</strong> meet the minimum CCR requirement, and the use of these
                combinations should be avoided.
            </P>

            <div className="br3 overflow-hidden">
                <Grid gutter="flush">
                    <GridColumn aboveSmall={2}>
                        <div className="bg-blue-100 pa3 bt bl bb b-gray-300">
                            <Text size={2} className="blue-600">
                                blue-600
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div className="bg-indigo-100 pa3 bt bb b-gray-300">
                            <Text size={2} className="indigo-600">
                                indigo-600
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div className="bg-purple-100 pa3 bt bb b-gray-300">
                            <Text size={2} className="purple-600">
                                purple-600
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div className="bg-green-100 pa3 bt bb b-gray-300">
                            <Text size={2} className="green-600">
                                green-600
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div className="bg-yellow-100 pa3 bt bb b-gray-300">
                            <Text size={2} className="yellow-600">
                                yellow-600
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div className="bg-red-100 pa3 bt br bb b-gray-300">
                            <Text size={2} className="red-600">
                                red-600
                            </Text>
                        </div>
                    </GridColumn>
                </Grid>
            </div>

            <H3>High emphasis backgrounds</H3>
            <P>
                When moments in the user experience call for bringing more emphasis to the moment,
                then a darker value of of the color system can be used a background. These are more
                commonly going to be used as a 500 (Yellow 600) value. White text or 100-level color
                should be used.
            </P>

            <div className="br3 overflow-hidden">
                <Grid gutter="flush">
                    <GridColumn aboveSmall={2}>
                        <div
                            className="bg-blue-500 pa3 bt bl bb b-gray-300"
                            style={{ background: tokens.tpColorBlue500 }}
                        >
                            <Text size={2} className="white">
                                white
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div
                            className="bg-indigo-500 pa3 bt bb b-gray-300"
                            style={{ background: tokens.tpColorIndigo500 }}
                        >
                            <Text size={2} className="white">
                                white
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div
                            className="bg-purple-500 pa3 bt bb b-gray-300"
                            style={{ background: tokens.tpColorPurple500 }}
                        >
                            <Text size={2} className="white">
                                white
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div
                            className="bg-green-500 pa3 bt bb b-gray-300"
                            style={{ background: tokens.tpColorGreen500 }}
                        >
                            <Text size={2} className="white">
                                white
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div
                            className="bg-yellow-600 pa3 bt bb b-gray-300"
                            style={{ background: tokens.tpColorYellow600 }}
                        >
                            <Text size={2} className="white">
                                white
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div
                            className="bg-red-500 pa3 bt br bb b-gray-300"
                            style={{ background: tokens.tpColorRed500 }}
                        >
                            <Text size={2} className="white">
                                white
                            </Text>
                        </div>
                    </GridColumn>
                </Grid>
            </div>

            <H3>White background</H3>
            <P>
                The foreground text should use the <strong>500 value</strong> when using a{' '}
                <strong>white</strong> background with the exclusion of yellow, which will require
                the use of <strong>yellow-600</strong>. This combination ensures that the color
                contrast ratio meets the 4.5:1 minimum.{' '}
                <strong>Any value below the 500-level</strong> (400, 300, 200, 100){' '}
                <strong>will not</strong> meet the minimum CCR requirement, and the use of these
                combinations should be avoided.
            </P>

            <div className="br3 overflow-hidden">
                <Grid gutter="flush">
                    <GridColumn aboveSmall={2}>
                        <div className="bg-white pa3 bt bl bb b-gray-300">
                            <Text size={2} className="blue-500">
                                blue-500
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div className="bg-white pa3 bt bb b-gray-300">
                            <Text size={2} className="indigo-500">
                                indigo-500
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div className="bg-white pa3 bt bb b-gray-300">
                            <Text size={2} className="purple-500">
                                purple-500
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div className="bg-white pa3 bt bb b-gray-300">
                            <Text size={2} className="green-500">
                                green-500
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div className="bg-white pa3 bt bb b-gray-300">
                            <Text size={2} className="yellow-600">
                                yellow-600
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div className="bg-white pa3 bt bb br b-gray-300">
                            <Text size={2} className="red-500">
                                red-500
                            </Text>
                        </div>
                    </GridColumn>
                </Grid>
            </div>

            <H3>Neutral colors</H3>
            <P>
                When using a combination of neutral colors, not all combinations of colors will
                provide an accessible experience. The following graph represents the minimum color
                combinations expressed by the WCAG AA color contrast ratio and our established color
                palette.
            </P>

            <div className="br3 overflow-hidden">
                <Grid gutter="flush">
                    <GridColumn aboveSmall={2}>
                        <div className="bg-white pa3 bt bl bb b-gray-300">
                            <Text size={2} className="black-300">
                                black-300
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div className="bg-gray-200 pa3 bt bb b-gray-300">
                            <Text size={2} className="black-300">
                                black-300
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div className="bg-gray-300 pa3 bt bb b-gray-300">
                            <Text size={2} className="black">
                                black
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div className="bg-black-300 pa3 bt bb b-gray-300">
                            <Text size={2} className="gray-200">
                                gray-200
                            </Text>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={2}>
                        <div className="bg-black pa3 bt br bb b-gray-300">
                            <Text size={2} className="gray-300">
                                gray-300
                            </Text>
                        </div>
                    </GridColumn>
                </Grid>
            </div>

            <H3>Avoid using color exclusively</H3>
            <P>
                Colors can also be used to convey information. For example, using red for error
                messages or green for success messages can help users understand your interface more
                quickly. Ultimately, accessible colors can help create a better experience for all
                users, regardless of their abilities.
            </P>
            <P>
                However, color alone should not be used exclusively as an indicator for a user
                experience especially when an action or response from the user is required. To
                provide a more inclusive experience, additional information, such as supportive
                text, should be included.
            </P>
            <P>
                For example, when expressing an error state on an input in a form, the input color
                should provide a visual indicator that the element needs attention. However, the
                color change should not be the sole indicator. The color change should be paired
                with supportive text that gives the user more information on how to recover from the
                error state.
            </P>
            <H2>Implementations</H2>
            <UL>
                <LI>
                    All color variables shown here available for SCSS and JS usage in{' '}
                    <a href="/tokens/#section-color">Thumbprint Tokens</a>.
                </LI>
                <LI>
                    The &quot;core&quot; colors, as indicated by{' '}
                    <CodeExperimental>(c)</CodeExperimental>, are available as classes in{' '}
                    <a href="/atomic/#section-color">Thumbprint Atomic</a> for both{' '}
                    <CodeExperimental>color</CodeExperimental> and{' '}
                    <CodeExperimental>background</CodeExperimental> properties.
                </LI>
            </UL>
            <H2>Resources</H2>
            <UL>
                <LI>
                    <a href="https://www.w3.org/TR/WCAG21/#contrast-minimum">
                        WCAG 2.1 AA success criterion for contrast
                    </a>
                    .
                </LI>
                <LI>
                    <a href="https://www.a11yproject.com/checklist/#color-contrast">
                        The A11Y Project Checklist / Color Contrast
                    </a>
                </LI>
            </UL>
        </ContentPage>
    );
}
