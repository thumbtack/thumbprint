import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { List, ListItem, Text, Title } from '@thumbtack/thumbprint-react';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPagteStaticProps from '../../../utils/get-content-page-static-props';
import { P, H2, H3, LI, UL, H4 } from '../../../components/mdx/components';
import { DoDontSideBySide } from '../../../components/dodont';

export const getStaticProps = getContentPagteStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Grammar and mechanics"
            description="This section outlines our approach to grammar and mechanics across the pro and customer experiences."
            layoutProps={layoutProps}
        >
            <H2>Write using plain language</H2>
            <P>
                Writing in a way people understand helps them accomplish their goals with ease. We
                help both pros and customers find what they need and learn how to use that
                information by making content easy to understand.
            </P>
            <H3>Use conversational language</H3>
            <P>
                Our content should sound approachable and never robotic. Copy that sounds human is
                easier to read and reduces cognitive load.
            </P>
            <H3>Active vs. passive voice</H3>
            <H4>Use active voice by default</H4>
            <P>
                The subject of a sentence performs the action when writing in active voice. Using
                active voice makes our products sound more conversational.
            </P>

            <DoDontSideBySide
                examples={[
                    'Don’t want to request the review directly? Let us email them for you.',
                    'Don’t want to request the review directly? An email can be sent on your behalf.',
                ]}
            />

            <H3>Use passive voice to emphasize the action</H3>
            <P>
                You can opt for passive voice when you want to emphasize the action instead of the
                subject of a sentence. This can be helpful when you want to:
            </P>
            <UL>
                <LI>Avoid blaming the user or system</LI>
                <LI>Avoid referring to Thumbtack</LI>
            </UL>

            <DoDontSideBySide examples={['Unable to save prices', 'We can’t save your prices']} />

            <H3>First vs. third person</H3>
            <P>
                Choosing the best pronoun for a given scenario helps us write copy that’s
                conversational and more inviting.
            </P>
            <H3>Use first person when talking about Thumbtack</H3>

            <DoDontSideBySide
                examples={[
                    'It feels good to get things done. We’re here to help.',
                    'It feels good to get things done. Thumbtack is here to help.',
                ]}
            />

            <H3>Use third person sparingly when talking about Thumbtack</H3>
            <P>
                We typically only use third person when speaking about pros, customers, or products
                as separate entities.
            </P>

            <DoDontSideBySide
                examples={[
                    'We analyzed millions of bids from Thumbtack pros to see what things really cost.',
                    'Thumbtack analyzed millions of bids from Thumbtack pros to see what things really cost.',
                ]}
            />

            <P>
                See{' '}
                <a href="/overview/content-design/inclusion-and-accessibility">
                    Inclusion and accessibility
                </a>{' '}
                content for more information on writing using plain language.
            </P>
            <H2>Formatting</H2>
            <P>
                The way we format and organize information helps people understand the information
                on their screen. This allows people to quickly find what they need and complete
                important tasks.
            </P>
            <H3>Headers</H3>
            <H4>Use sentence casing when formatting headers</H4>
            <P>We’re no longer including periods in headers.</P>

            <DoDontSideBySide
                examples={[
                    <div>
                        <div>Set your hours</div>
                        <div>You’re now signed up for Instant Book</div>
                    </div>,
                    <div>
                        <div>Set Your Hours.</div>
                        <div>You’re Now Signed Up for Instant Book.</div>
                    </div>,
                ]}
            />

            <H4>Use header tags consistently</H4>
            <P>
                Using the right header tags helps people scan the information on theirscreens
                quickly so they can move forward with their tasks. Here are some best practices for
                using header tags:
            </P>
            <UL>
                <LI>
                    Use H1 tags to communicate the title of the page. - Use only one H1 per page.
                </LI>
                <LI>
                    Use H2 tags for second-level headings. - Use H3 tags for third-level headings
                    sparingly.
                </LI>
                <LI>Don’t skip heading levels.</LI>
            </UL>

            <DoDontSideBySide
                examples={[
                    [
                        <Title size={1}>Header 1</Title>,
                        <Title size={2}>Header 2</Title>,
                        <Title size={2}>Header 2</Title>,
                        <Title size={3}>Header 3</Title>,
                    ],
                    [
                        <Title size={1}>Header 1</Title>,
                        <Title size={3}>Header 3</Title>,
                        <Title size={2}>Header 2</Title>,
                        <Title size={1}>Header 1</Title>,
                    ],
                ]}
            />

            <H3>Formatted text</H3>
            <H4>Avoid using bolded, italicized, or underlined text to emphasize a point</H4>
            <P>
                To helppeople scan the content on a page, frontload the important information
                instead of bolding or italicizing it. We should only underline text when it links to
                other content.
            </P>

            <DoDontSideBySide
                examples={[
                    [
                        <div>
                            Get $100 in credits for telling us which tools you use to manage your
                            availability outside of Thumbtack.
                        </div>,
                    ],
                    [
                        <P>
                            Tell us which tools you use to manage your availability outside of
                            Thumbtack and <span className="b">get $100 in credits</span>.{' '}
                        </P>,
                        <P>
                            Tell us which tools you use to manage your availability outside of
                            Thumbtack and <i>get $100 in credits.</i>
                        </P>,
                        <div>
                            Tell us which tools you use to manage your availability outside of
                            Thumbtack and <span className="m_underline">get $100 in credits.</span>
                        </div>,
                    ],
                ]}
            />

            <P>
                See{' '}
                <a href="/overview/content-design/inclusion-and-accessibility">
                    Inclusion and accessibility
                </a>{' '}
                content for more information on formatting content.
            </P>
            <H3>Capitalization</H3>
            <H4>Use sentence casing</H4>
            <P>We use sentence casing for most user-facing content, including:</P>
            <UL>
                <LI>Headlines, headers, and subheads</LI>
                <LI>Body copy</LI>
                <LI>Buttons and links</LI>
                <LI>Form field titles and hint text</LI>
                <LI>Job categories</LI>
                <LI>Most product names*</LI>
            </UL>
            <P>* See title casing section for exceptions to this guideline.</P>
            <H4>Use title casing for specific product names only</H4>
            <P>We only use title casing for specific product names:</P>
            <UL>
                <LI>Help Center</LI>
                <LI>Top Pro</LI>
                <LI>Thumbtack Support</LI>
                <LI>Get Hired Guide</LI>
                <LI>Project Guide</LI>
                <LI>Service Guide</LI>
            </UL>
            <H2>Punctuation</H2>
            <P>
                Improve readability, strike the right tone, and design a consistent experience for
                pros and customers using these punctuation guidelines.
            </P>
            <H3>Use contractions with care</H3>
            <P>
                Contractions make our products sound more conversational, but should be used with
                care depending on the situation so we don’t sound awkward.
            </P>
            <H3>Use positive contractions</H3>
            <P>
                In general, positive contractions are easier to understand and also create a more
                conversational tone.
            </P>
            <H3>Avoid negative contractions</H3>
            <P>Negative contractions are difficult to read and may be easily misread.</P>

            <DoDontSideBySide
                examples={[
                    <UL>
                        <LI>I’ll</LI>
                        <LI>I’m</LI>
                        <LI>It’s</LI>
                        <LI>There’s</LI>
                        <LI>They’re</LI>
                        <LI>We’ll</LI>
                        <LI>We’re</LI>
                    </UL>,
                    <UL>
                        <LI>Can’t</LI>
                        <LI>Couldn’t</LI>
                        <LI>Didn’t</LI>
                        <LI>Don’t</LI>
                        <LI>Shouldn’t</LI>
                        <LI>Weren’t</LI>
                        <LI>Won’t</LI>
                        <LI>Wouldn’t</LI>
                    </UL>,
                ]}
            />

            <H3>Avoid conditional contractions</H3>
            <P>
                These types of contractions create additional cognitive load for users with
                cognitive impairments and lower reading comprehension. Avoid using contractions
                like:
            </P>
            <UL>
                <LI>Could’ve</LI>
                <LI>Should’ve</LI>
                <LI>Would’ve</LI>
            </UL>
            <P>
                See{' '}
                <a href="/overview/content-design/inclusion-and-accessibility">
                    Inclusion and accessibility
                </a>{' '}
                content for more information about contractions.
            </P>
            <H3>Comma usage</H3>
            <H4>Use the Oxford comma</H4>
            <P>
                The Oxford or serial comma should be used to break up a series of three or more
                elements in a sentence.
            </P>

            <DoDontSideBySide
                examples={[
                    'Your base price includes consultation, travel fees, and mount on drywall, plaster, or wood.',
                    'Your base price includes consultation, travel fees and mount on drywall, plaster or wood.',
                ]}
            />

            <H4>Avoid using commas to combine multiple sentences</H4>
            <P>
                To improve readability, try breaking up complex sentences into two or more
                sentences.
            </P>

            <DoDontSideBySide
                examples={[
                    "This is a 60% discount off the current price of instant bookings. We'll let you know in advance before prices change.",
                    "This is a 60% discount off the current price of instant bookings, and we'll let you know in advance before prices change.",
                ]}
            />

            <H4>Use a comma to separate parts of an address</H4>

            <DoDontSideBySide
                examples={[
                    'We’ll arrive at 415 Natoma St., San Francisco, California, on August 5th.',
                    'We’ll arrive at 415 Natoma St., San Francisco, California on August 5th.',
                ]}
            />

            <H3>Dashes</H3>
            <H4>Em dashes</H4>
            <P>Use em dashes to:</P>
            <UL>
                <LI>Show a break in a sentence</LI>
                <LI>Separate a noun or series of nouns from the rest of the sentence</LI>
                <LI>Show an open range, such as a date with no end date</LI>
                <LI>Emphasize a point</LI>
            </UL>
            <H4>Use an em dash with a space before and after</H4>
            <P>Adding a space both before and after the em dash allows for cleaner line breaks.</P>

            <DoDontSideBySide
                examples={[
                    <div>
                        Next, you’ll choose a budget – a max amount you’re able to spend weekly on
                        leads.
                    </div>,
                    <div>
                        <P>
                            Next, you’ll choose a budget–a max amount you’re able to spend weekly on
                            leads.
                        </P>
                        <P>
                            Next, you’ll choose a budget -- a max amount you’re able to spend weekly
                            on leads.
                        </P>
                    </div>,
                ]}
            />

            <H4>Don’t use en dashes for ranges</H4>
            <P>When writing product copy, use a hyphen instead.</P>

            <DoDontSideBySide examples={['8 am - 5 pm', '8 am – 5 pm']} />

            <H4>Hyphens</H4>
            <UL>
                <LI>Use hyphens in prefixes.</LI>
                <LI>Use hyphens to connect 2+ words that should be understood together.</LI>
                <LI>Don’t hyphenate the word “very” and most words that end in -ly.</LI>
            </UL>

            <DoDontSideBySide
                examples={[
                    <UL>
                        <LI>Auto-pay</LI>
                        <LI>Higher-intent customers</LI>
                        <LI>Instantly booked jobs</LI>
                    </UL>,
                    <UL>
                        <LI>Autopay or Auto pay</LI>
                        <LI>Higher intent customers</LI>
                        <LI>Instantly-booked jobs</LI>
                    </UL>,
                ]}
            />

            <H3>Exclamation marks (!)</H3>
            <H4>Use exclamation marks sparingly</H4>
            <P>
                It’s easy to overuse exclamation marks, so only use them when you need to add
                emphasis that won’t overwhelm people. You can add an exclamation mark to celebrate
                with customers and pros, but don’t overdo it.
            </P>

            <DoDontSideBySide examples={['🎉 New direct lead! Howard G.', 'Set your budget!']} />

            <H3>Navigation</H3>
            <P>Avoid using periods in links, buttons, and tabs.</P>

            <DoDontSideBySide
                examples={[
                    <UL>
                        <LI>Opportunities</LI>
                        <LI>Calendar</LI>
                        <LI>View details</LI>
                    </UL>,
                    <UL>
                        <LI>Opportunities.</LI>
                        <LI>Calendar.</LI>
                        <LI>View details.</LI>
                    </UL>,
                ]}
            />

            <H3>Ampersands (&amp;)</H3>
            <H4>Avoid using ampersands</H4>

            <List>
                <ListItem>
                    <Text className="black-300">
                        Avoid using ampersands unless you have a hard character limit.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text className="black-300">Don’t use ampersands after commas.</Text>
                </ListItem>
            </List>

            <DoDontSideBySide
                examples={[
                    'Your base price includes consultation, travel fees, and mount on drywall, plaster, or wood',
                    'Your base price includes consultation, travel fees, & mount on drywall, plaster, or wood',
                ]}
            />

            <H3>Periods</H3>
            <H4>Avoid using periods in headers</H4>

            <DoDontSideBySide
                examples={[
                    <UL>
                        <LI>Set your hours</LI>
                        <LI>Edit your business hours</LI>
                        <LI>You’re now signed up for Instant Book</LI>
                    </UL>,
                    <UL>
                        <LI>Set your hours.</LI>
                        <LI>Edit your business hours.</LI>
                        <LI>You’re now signed up for Instant Book.</LI>
                    </UL>,
                ]}
            />

            <H3>Emails</H3>
            <H4>Avoid using periods in email subject lines</H4>

            <DoDontSideBySide
                examples={[
                    'Required: Review your business hours',
                    'Required: Review your business hours.',
                ]}
            />

            <P>
                See <a href="/content-design/surfaces-and-elements">Surfaces and elements</a> for
                more information about writing email copy.
            </P>
            <H3>Lists</H3>
            <P>Improve readability by breaking up large chunks of text into lists.</P>
            <H4>General guidance</H4>
            <UL>
                <LI>Use a colon to introduce items in a list.</LI>
                <LI>Order list items logically.</LI>
                <LI>Make sure list items are of similar length.</LI>
                <LI>
                    Don’t separate items in the list with commas. This does not apply to using
                    commas within a list item.
                </LI>
            </UL>

            <DoDontSideBySide
                examples={[
                    <div>
                        <P>
                            Instant Book offers better returns for the money you spend on Thumbtack
                            through:
                        </P>
                        <UL>
                            <LI>Higher-intent customers</LI>
                            <LI>Reduced competition</LI>
                            <LI>Less time communicating with customers</LI>
                        </UL>
                    </div>,
                    <div>
                        <P>
                            Instant Book offers better returns for the money you spend on Thumbtack
                            through:
                        </P>
                        <UL>
                            <LI>higher-intent customers,</LI>
                            <LI>reduced competition, and</LI>
                            <LI>less time communicating with customers.</LI>
                        </UL>
                    </div>,
                ]}
            />

            <H3>Use numbered lists when communicating count matters</H3>

            <DoDontSideBySide
                examples={[
                    <div>
                        <P>Customers can instantly book you starting September 19th</P>
                        <ol>
                            <LI>Check your business hours</LI>
                            <LI>Block your calendar</LI>
                            <LI>Get ready for instant bookings</LI>
                        </ol>
                    </div>,
                    <div>
                        <P>
                            Instant Book offers better returns for the money you spend on Thumbtack
                            through:
                        </P>
                        <ol>
                            <LI>Higher-intent customers</LI>
                            <LI>Reduced competition</LI>
                            <LI>Less time communicating with customers</LI>
                        </ol>
                    </div>,
                ]}
            />

            <H2>Numbers</H2>
            <P>
                Help pros and customers understand earnings and payment details, when jobs are
                happening, and how to get in touch with each other by formatting numbers
                consistently across their experience.
            </P>
            <H3>General guidance</H3>

            <List>
                <ListItem>
                    <Text className="black-300">
                        Use ###-###-#### formatting when writing telephone numbers. Don’t use
                        parentheses.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text className="black-300">Spell out small numbers in a sentence.</Text>
                </ListItem>
                <ListItem>
                    <Text className="black-300">
                        Use the actual number only if it’s in a form field, chart, date or other UX
                        value.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text className="black-300">Use the number for 100 and up.</Text>
                </ListItem>
                <LI>
                    For very large numbers, combine the number and word (32 million). Abbreviate
                    ($32M) only if you have a hard character limit.
                </LI>
                <ListItem>
                    <Text className="black-300">Use the % sign for percentages.</Text>
                </ListItem>
            </List>

            <DoDontSideBySide
                examples={[
                    <UL>
                        <LI>555-867-5309</LI>
                        <LI>
                            Pros who have at least 12 hours available each week book more jobs on
                            Thumbtack.
                        </LI>
                        <LI>[H1] Invite five friends to join Thumbtack</LI>
                        <LI>You’ve completed over 200 jobs on Thumbtack</LI>
                        <LI>32 million</LI>
                        <LI>24%</LI>
                    </UL>,
                    <UL>
                        <LI>(555) 867-5309 or 1-867-555-5309</LI>
                        <LI>
                            Pros who have at least twelve hours available each week book more jobs
                            on Thumbtack.
                        </LI>
                        <LI>[H1] Invite 5 friends to join Thumbtack</LI>
                        <LI>You’ve completed over two hundred jobs on Thumbtack</LI>
                        <LI>32,000,000</LI>
                        <LI>24 percent</LI>
                    </UL>,
                ]}
            />

            <H3>Currency</H3>
            <H4>
                Don’t include values after the decimal when referring to dollar amounts
                conversationally
            </H4>
            <P>Round to the nearest dollar amount in:</P>
            <UL>
                <LI>Headings and subject lines</LI>
                <LI>Sentences</LI>
                <LI>User inputs, like bidding mechanisms</LI>
            </UL>

            <DoDontSideBySide
                examples={[
                    <UL>
                        <LI>
                            Limited time offer: Sign up today and get $50 in free leads and
                            bookings.
                        </LI>
                        <LI>Inviting friends can pay off (up to $250)</LI>
                        <LI>$65 / $120 spent</LI>
                    </UL>,
                    <UL>
                        <LI>
                            Limited time offer: Sign up today and get $50.00 in free leads and
                            bookings.
                        </LI>
                        <LI>Inviting friends can pay off (up to $250.00)</LI>
                        <LI>$65.05 / $120 spent</LI>
                    </UL>,
                ]}
            />

            <H4>Use the entire dollar amount, including cents, to:</H4>
            <UL>
                <LI>Communicate payments and earnings</LI>
                <LI>Maintain alignment in the UI</LI>
            </UL>

            <DoDontSideBySide
                examples={[
                    <div>
                        <div>$8.34</div>
                        <div>avg. lead cost</div>
                        <div>Set up direct deposit to receive $154.75 in earnings.</div>
                        <div>Jason sent you $168.75</div>
                    </div>,
                    <div>
                        <div>$8</div>
                        <div>avg. lead cost</div>
                        <div>Set up direct deposit to receive $154 in earnings.</div>
                        <div>Jason sent you $168.</div>
                    </div>,
                ]}
            />

            <H3>Dates and times</H3>
            <UL>
                <LI>Spell out dates instead of using the numerical format whenever possible.</LI>
                <LI>Use shorthand only if you have a hard character limit.</LI>
                <LI>For times, use lower case “am” or “pm” with a space before.</LI>
                <LI>Use a dash to indicate a time range.</LI>
                <LI>
                    Omit the first “am” or “pm” if a time range is within the same part of the day
                </LI>
            </UL>

            <DoDontSideBySide
                examples={[
                    <UL>
                        <LI>July 16, 2023</LI>
                        <LI>8:00 am</LI>
                        <LI>8:00 am - 12:15 pm</LI>
                        <LI>8:00 - 10:15 am</LI>
                    </UL>,
                    <UL>
                        <LI>7/16/23 (unless there’s a character limit)</LI>
                        <LI>8 a.m. or 8am</LI>
                        <LI>8am – 12:15pm</LI>
                    </UL>,
                ]}
            />
        </ContentPage>
    );
}
