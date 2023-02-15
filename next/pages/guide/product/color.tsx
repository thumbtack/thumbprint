import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { Grid, GridColumn, Text } from '@thumbtack/thumbprint-react';
import * as tokens from '@thumbtack/thumbprint-tokens';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPageStaticProps from '../../../utils/get-content-page-static-props';
import { Code, H2, H3, LI, P, UL } from '../../../components/mdx/components';
import SwatchUsage from '../../../components/thumbprint-guide/swatch-usage';
import Swatch from '../../../components/thumbprint-guide/swatch';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Color"
            description="A simple system for interfaces and illustrations."
            layoutProps={layoutProps}
        >
            <H2>Naming</H2>
            <P>
                Color names are unambiguous and direct. &quot;Blue&quot; means blue. We do this to
                avoid unneeded abstractions. Extended color names, like <Code>black-300</Code> are
                variations that, like font-weight values, denote increasingly darker (500, 600) and
                increasingly lighter shades (300, 200).
            </P>
            <H2>Palette</H2>
            <UL>
                <LI>
                    Our primary palette consists of &quot;core&quot; colors, as indicated by{' '}
                    <Code>(c)</Code>, and help establish our brand.
                </LI>
                <LI>
                    We have extended this with shades that are reserved primarily for illustrations.
                </LI>
            </UL>

            <div className="grid mt5">
                <Swatch name="blue-100" hex={tokens.tpColorBlue100} />
                <Swatch name="blue-200" hex={tokens.tpColorBlue200} />
                <Swatch hasBorder />
                <Swatch name="blue" hex={tokens.tpColorBlue} isCore />
                <Swatch name="blue-500" hex={tokens.tpColorBlue500} />
                <Swatch name="blue-600" hex={tokens.tpColorBlue600} />
                <Swatch name="indigo-100" hex={tokens.tpColorIndigo100} />
                <Swatch name="indigo-200" hex={tokens.tpColorIndigo200} />
                <Swatch hasBorder />
                <Swatch name="indigo" hex={tokens.tpColorIndigo} isCore />
                <Swatch name="indigo-500" hex={tokens.tpColorIndigo500} />
                <Swatch name="indigo-600" hex={tokens.tpColorIndigo600} />
                <Swatch name="purple-100" hex={tokens.tpColorPurple100} />
                <Swatch name="purple-200" hex={tokens.tpColorPurple200} />
                <Swatch hasBorder />
                <Swatch name="purple" hex={tokens.tpColorPurple} isCore />
                <Swatch name="purple-500" hex={tokens.tpColorPurple500} />
                <Swatch name="purple-600" hex={tokens.tpColorPurple600} />
                <Swatch name="green-100" hex={tokens.tpColorGreen100} />
                <Swatch name="green-200" hex={tokens.tpColorGreen200} />
                <Swatch hasBorder />
                <Swatch name="green" hex={tokens.tpColorGreen} isCore />
                <Swatch name="green-500" hex={tokens.tpColorGreen500} />
                <Swatch name="green-600" hex={tokens.tpColorGreen600} />
                <Swatch name="yellow-100" hex={tokens.tpColorYellow100} />
                <Swatch name="yellow-200" hex={tokens.tpColorYellow200} />
                <Swatch hasBorder />
                <Swatch name="yellow" hex={tokens.tpColorYellow} isCore />
                <Swatch name="yellow-500" hex={tokens.tpColorYellow500} />
                <Swatch name="yellow-600" hex={tokens.tpColorYellow600} />
                <Swatch name="red-100" hex={tokens.tpColorRed100} />
                <Swatch name="red-200" hex={tokens.tpColorRed200} />
                <Swatch hasBorder />
                <Swatch name="red" hex={tokens.tpColorRed} isCore />
                <Swatch name="red-500" hex={tokens.tpColorRed500} />
                <Swatch name="red-600" hex={tokens.tpColorRed600} />
                <Swatch hasBorder />
                <Swatch hasBorder />
                <Swatch name="black-300" hex={tokens.tpColorBlack300} isCore />
                <Swatch name="black" hex={tokens.tpColorBlack} isCore />
                <Swatch hasBorder />
                <Swatch hasBorder />
                <Swatch hasBorder />
                <Swatch name="gray-200" hex={tokens.tpColorGray200} isCore />
                <Swatch name="gray-300" hex={tokens.tpColorGray300} isCore />
                <Swatch name="gray" hex={tokens.tpColorGray} isCore />
                <Swatch hasBorder />
                <Swatch hasBorder />
                <Swatch hasBorder />
                <Swatch hasBorder />
                <Swatch hasBorder />
                <Swatch name="white" hex={tokens.tpColorWhite} isCore hasBorder />
                <Swatch hasBorder />
                <Swatch hasBorder />
            </div>

            <H2>Usage</H2>

            <SwatchUsage
                name="Blue"
                hex={tokens.tpColorBlue}
                doText="Highlights key actions in UI, buttons, links, icons, and branded moments"
                dontText="Success graphics, body copy, headlines"
            />

            <SwatchUsage
                name="Indigo"
                hex={tokens.tpColorIndigo}
                doText="Graphs and data visualizations, tags, pills, status labels, illustrations"
                dontText="Text, icons"
            />

            <SwatchUsage
                name="Purple"
                hex={tokens.tpColorPurple}
                doText="Graphs and data visualizations, tags, pills, status labels, illustrations"
                dontText="Text, icons"
            />

            <SwatchUsage
                name="Green"
                hex={tokens.tpColorGreen}
                doText="Success graphics, completion, and confirmation"
                dontText="Text, background for white text, graphs and data visualizations, icons"
            />

            <SwatchUsage
                name="Yellow"
                hex={tokens.tpColorYellow}
                doText="Stars, review charts, alerts, illustrations"
                dontText="Text, background for white text, graphs and data visualizations, icons"
            />

            <SwatchUsage
                name="Red"
                hex={tokens.tpColorRed}
                doText="Icons, caution buttons, alerts, warning states"
                dontText="Background for white text, icons"
            />

            <SwatchUsage
                name="Black"
                hex={tokens.tpColorBlack}
                doText="Headings, iconography, and small text that supports UI"
                dontText="Buttons, illustrations"
            />

            <SwatchUsage
                name="Black300"
                hex={tokens.tpColorBlack300}
                doText="Subheadings and body copy"
                dontText="Logos, icons, backgrounds, borders"
            />

            <SwatchUsage
                name="Gray"
                hex={tokens.tpColorGray}
                doText="Inactive icons, ghost text"
                dontText="Logos, icons, backgrounds, borders"
            />

            <SwatchUsage
                name="Gray300"
                hex={tokens.tpColorGray300}
                doText="Borders"
                dontText="Text, buttons"
            />

            <SwatchUsage
                name="Gray200"
                hex={tokens.tpColorGray200}
                doText="Backgrounds behind components, like cards"
                dontText="Text, buttons, borders, icons"
            />

            <SwatchUsage
                hasBorder
                name="White"
                hex={tokens.tpColorWhite}
                doText="Text, borders, icons"
                dontText="On light backgrounds"
            />

            <H2>Accessibility</H2>
            <P>
                Accessibility is important for everyone, and it should not forgotten in the design
                process. Accessible colors are vital for those with color blindness or other vision
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
            <H3>100-level background</H3>
            <P>
                A common and preferred pattern for non-interactive elements when applying a
                background color uses the <strong>100-level</strong> values for backgrounds. The{' '}
                <strong>600-level</strong> color of the same hue will ensure an accessible color
                contrast ratio combined with this background treatment.{' '}
                <strong>Any value below the 600-level</strong> (500, 400, 300, 200, 100){' '}
                <strong>will not</strong> meet the minimum CCR requirement, and the use of these
                combinations should be avoided.
            </P>

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

            <H3>Neutral colors</H3>
            <P>
                When using a combination of neutral colors, not all combinations of colors will
                provide an accessible experience. The following graph represents the minimum color
                combinations expressed by the WCAG AA color contrast ratio and our established color
                palette.
            </P>

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
                    The &quot;core&quot; colors, as indicated by <Code>(c)</Code>, are available as
                    classes in <a href="/atomic/#section-color">Thumbprint Atomic</a> for both{' '}
                    <Code>color</Code> and <Code>background</Code> properties.
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
