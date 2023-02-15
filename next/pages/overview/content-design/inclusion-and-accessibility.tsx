import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPageStaticProps from '../../../utils/get-content-page-static-props';
import { P, A, H2, H3, LI, UL, B, H4 } from '../../../components/mdx/components';
import { DoDontSideBySide, DoDontTable } from '../../../components/dodont';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Inclusion and accessibility"
            description="This section outlines principles and techniques to ensure our content is easy to understand and inclusive of everyone’s lived experiences."
            layoutProps={layoutProps}
        >
            <H2>Plain language</H2>
            <P>
                You should always write in a way that helps people find what they need quickly and
                understand it quickly. Plain language makes it easy for new and existing users to
                understand your products and can reach a wider audience.
            </P>
            <P>
                Plain language has also been proven to increase customer compliance, reduce
                complaints and errors, improve sales, and reduce costs. Learn more about the{' '}
                <A href="https://www.plainlanguage.gov/resources/articles/arguments-in-favor-of-plain-language/">
                    business benefits of plain language
                </A>
                .
            </P>

            <H3>Why use plain language?</H3>

            <UL>
                <LI>
                    <B>Accessibility:</B> Plain language is required under the{' '}
                    <A href="https://www.w3.org/WAI/standards-guidelines/wcag/">
                        Web Content Accessibility Guidelines (WCAG)
                    </A>
                    . It helps users with comprehension as well as secondary language and cognitive
                    challenges. Plain language also makes it easier for assistive technology to
                    parse information correctly.
                </LI>
                <LI>
                    <B>Search Engine Optimization (SEO):</B> Plain language uses the words and
                    phrases that people actually use when searching for content.
                </LI>
                <LI>
                    <B>Online reading:</B> People spend less time reading online content and tend to
                    scan it instead of reading linearly. They&#39;re less likely to drop off when
                    content is easily found and understood.
                </LI>
                <LI>
                    <B>Mobile devices:</B> Plain language can reduce the space content needs so it
                    more easily fits on smaller surfaces. It also helps to group content so it&#39;s
                    easier to navigate in-app.
                </LI>
            </UL>

            <H3>Plain language principles and techniques</H3>
            <H4>Use everyday words</H4>
            <P>
                Common, simple words and phrases help with accessibility and SEO, and are more
                easily understood by readers who don’t speak English as their first language.
                Everyday words are also generally shorter, so they take up less space on mobile
                devices.
            </P>

            <DoDontTable
                examples={[
                    ['Help', 'Assistance'],
                    ['Get', 'Access'],
                    ['Get rid of', 'Eliminate'],
                    ['Help', 'Facilitate'],
                    ['Ask', 'Request'],
                    ['Need', 'Require'],
                    ['To', 'In order to'],
                    ['If', 'In the event that'],
                    ['About', 'In regard to'],
                    ['Pay', 'Make a payment'],
                ]}
            />

            <H4>Use active voice instead of passive voice</H4>
            <P>
                Active sentences are shorter and more straightforward than passive ones. They are
                more easily understood by ESL speakers and easier to remember by people relying on
                screen readers and memory. While there are times when the passive voice is
                appropriate, a quick way to shorten and simplify a sentence is to switch from
                passive to active voice.
            </P>
            <P>
                Our Grammar and mechanics section has more information on{' '}
                <A href="/overview/content-design/grammar-and-mechanics#example-active-vs.-passive-voice">
                    active voice and passive voice construction
                </A>
                .
            </P>
            <H4>Avoid hidden verbs</H4>
            <P>
                Hidden verbs are verbs that have been turned into a noun. This construction leads to
                more passive, indirect sentences. Hidden verbs also use more words and make
                sentences longer than they should be. When writing or proofreading your content,
                think about whether a noun construction could really be simplified into a verb.
            </P>

            <DoDontTable
                examples={[
                    ['Except for', 'With the exception of'],
                    ['Applies to', 'Is applicable to'],
                    ['Review', 'Leave a review'],
                ]}
            />

            <H4>Stay in the present (tense)</H4>
            <P>
                Keep your content conversational by writing in the present tense. Present tense is
                both simple and direct, and is the easiest way to communicate information or
                instructions that users need to act on. While context matters, writing in future or
                conditional tenses are more confusing for users or require more time to understand.
            </P>
            <H4>Write like you talk</H4>
            <P>
                When you write content in a conversational way, it sounds natural. Think about how
                to explain or describe something if you had to say it out loud — this is usually a
                good approach to ensuring your writing is conversational.
            </P>
            <H4>Address your audience with “you”</H4>
            <P>
                Using names or third-person pronouns like “he” or “she” can be confusing for users
                when they want to understand instructions or important information. To keep things
                simple, address the audience as “you”. When you directly address your users, they’re
                able to visualize and relate to the content.
            </P>
            <H4>Keep it short</H4>
            <P>
                When your writing is concise, it’s easier for your audience to read and understand
                your message. Keeping it short is all about numbers; follow these recommended
                limits:
            </P>
            <UL>
                <LI>
                    <B>Word length:</B> no more than 3 syllables. If it’s longer than 3 syllables,
                    try a shorter word.
                </LI>
                <LI>
                    <B>Sentence length:</B> No more than 25 words. If you find you’re using too much
                    punctuation such as commas or semicolons, make smaller sentences instead.
                </LI>
                <LI>
                    <B>Paragraph length</B> No more than 150 words. If your content is getting too
                    long, try a list or table to keep it concise.
                </LI>
            </UL>
            <H4>Use contractions (but avoid negatives)</H4>
            <P>
                Contractions keep content simple and direct. Since they are commonly used,
                contractions are also good for accessibility.
            </P>
            <P>
                However, contractions should also be used appropriately. Negative and conditional
                contractions, such as won’t and could’ve, can be harder to understand for people who
                have reading disabilities or who speak English as a second language.
            </P>
            <P>
                The negative word “not” can also be more clear in certain contexts, such as warning
                labels or instructions where it’s important to emphasize “Do not…”.
            </P>
            <P>
                Our Grammar and mechanics section has more information on{' '}
                <A href="/overview/content-design/grammar-and-mechanics/#section-punctuation">
                    best practices for using contractions
                </A>
                .
            </P>
            <H4>Avoid jargon</H4>
            <P>
                Jargon can intimidate, annoy, and confuse users. If words are specific to a field or
                require specialized knowledge, you can alienate your audience from your content. Be
                mindful of language that refers to internal processes and legal copy. If you need to
                use a Thumbtack-specific term because there is no alternative, define it in context.
            </P>
            <H4>Organize content logically</H4>
            <P>
                Organize content in the order in which users would need the information. If they
                have to read a sentence more than once to understand it, consider if the sequence of
                information needs to change.
            </P>
            <P>
                <B>Tip:</B> For instructions, use the model &quot;to do this...do this&quot;. It
                generally creates shorter content, and it puts the information in the right order so
                it&#39;s easier for the reader to get to the information they need, if they need it.
            </P>

            <DoDontSideBySide
                examples={[
                    ['For help with your scheduling calendar, call 416-123-1234.'],
                    ['Call 416-123-1234 for help with your scheduling calendar.'],
                ]}
            />

            <H4>Structure content with headers</H4>
            <P>
                Headers are an effective way to structure content. A good header clearly
                communicates what the following content will be about, breaks up the content, and
                helps users scan and find information quickly. Headers are also important when using
                assistive technology to parse information.
            </P>
            <P>
                <B>Tip:</B> Headings are a good way to check if content is organized logically. A
                quick test is to remove all body copy, and read the headers on their own. If you can
                still get a general idea of the topic and sequence of information, your headers are
                effective.
            </P>
            <P>
                Our Grammar and mechanics section has more information on{' '}
                <A href="/overview/content-design/grammar-and-mechanics/#section-formatting">
                    how to format headers and header tags
                </A>
                .
            </P>
            <H4>Optimize content with lists</H4>
            <P>
                A list can reduce word count, and make content easy to scan and remember. List
                content should use parallel construction and grammatical structure (i.e. all verbs
                with same ending, all adverbs, same tense, etc.). If it’s important to order the
                information in a sequence, use a numbered list.
            </P>

            <DoDontSideBySide
                examples={[
                    [
                        <div>
                            <P>Active sentences are:</P>
                            <UL>
                                <LI>Shorter and simpler</LI>
                                <LI>More straightforward</LI>
                                <LI>More easily understood by ESL speakers</LI>
                                <LI>Easier to remember</LI>
                            </UL>
                        </div>,
                    ],
                    [
                        'Active sentences are shorter and more straight forward than passively constructed ones. They are more easily understood by ESL speakers and easier to remember by people relying on screen readers and memory.',
                    ],
                ]}
            />
            <H4>Improve readability</H4>
            <P>
                Content should be written at a Grade 8 reading level or lower. This makes your
                writing clear and concise, while still sounding sophisticated for a wide audience.
            </P>
            <P>
                Readability tools determine your content’s reading level. They check elements such
                as sentence length, comprehension, and complexity, and give scores or grades for
                your content. Use the following websites and apps to check your content’s
                readability the next time you write:
            </P>
            <UL>
                <LI>
                    <A href="https://hemingwayapp.com/">Hemingway App</A>
                </LI>
                <LI>
                    <A href="https://www.webfx.com/tools/read-able/">WebFX Readable Tool</A>
                </LI>
                <LI>
                    <A href="https://app.readable.com/text/">Readable</A>
                </LI>
            </UL>
            <H2>Accessibility and person-first language</H2>
            <P>
                Accessible language allows everyone to read and understand content, regardless of
                their abilities. Use person-first language to put a person before their disability,
                while respecting their individual differences.
            </P>
            <H3>How to make your writing accessible and inclusive:</H3>
            <UL>
                <LI>
                    Consider whether a person’s or group’s identity is relevant to the content. Only
                    identify someone’s disability if it adds value and context.
                </LI>
                <LI>
                    While person-first language is best, some users have their own preferences about
                    how they want to be addressed. When in doubt, simply ask.
                </LI>
                <LI>
                    Avoid using “normal&quot; or &quot;healthy&quot; to describe people without
                    disabilities.
                </LI>
                <LI>
                    Don’t imply that individuals with disabilities are victims, such as “suffering
                    from” or “a victim of&quot;.
                </LI>
                <LI>
                    Be descriptive in hyperlinks so people who use screen readers have an easy time
                    understanding what you’re linking to. Link text should be the same as or similar
                    to the page title of the link’s destination
                </LI>
                <LI>
                    Use aria labels for images that provide important information to sighted users.
                </LI>
            </UL>
            <H3>Words and phrases to use and avoid</H3>

            <DoDontTable
                examples={[
                    [
                        <div>
                            <P>A person with a disability</P>
                            <div>Other:</div>
                            <UL>
                                <LI>
                                    people with disabilities (women with disabilities, children with
                                    disabilities,etc)
                                </LI>
                                <LI>has disability</LI>
                                <LI>lives with disability</LI>
                                <LI>has a chronic health condition</LI>
                                <LI>lives with a chronic health condition</LI>
                            </UL>
                        </div>,
                        <div>
                            <P>
                                A disabled or differently abled person, handicapped person,
                                physically challenged, special, special needs, mentally
                                incapacitated/ill
                            </P>
                            <div>Other:</div>
                            <UL>
                                <LI>afflicted by</LI>
                                <LI>crippled by</LI>
                                <LI>diffability</LI>
                                <LI>differently abled</LI>
                                <LI>handicap(ped)</LI>
                                <LI>handicapable</LI>
                                <LI>specially abled</LI>
                                <LI>special needs</LI>
                                <LI>suffers from</LI>
                                <LI>the disabled</LI>
                                <LI>victim of</LI>
                            </UL>
                        </div>,
                    ],
                    [
                        <div>A person who uses a wheelchair</div>,
                        <div>A wheelchair-bound person</div>,
                    ],
                    [
                        <div>
                            <P>A person/people with complete or nearly complete vision loss</P>
                            <div>Other:</div>
                            <div>experiencing vision loss</div>
                        </div>,
                        <div>A blind person</div>,
                    ],
                    [
                        <div>
                            <UL>
                                <LI>Usless</LI>
                                <LI>Intense</LI>
                                <LI>Outrageous</LI>
                                <LI>Silly</LI>
                            </UL>
                        </div>,
                        <div>
                            <UL>
                                <LI>Dumb</LI>
                                <LI>Crazy</LI>
                                <LI>Insane</LI>
                            </UL>
                            <P>
                                (Some catch-all terms have histories of being used to discriminate)
                            </P>
                        </div>,
                    ],
                    [<div>Feeling frustrated about...</div>, <div>Feeling depressed about...</div>],
                    [
                        <div>
                            <UL>
                                <LI>In the menu</LI>
                                <LI>First / before</LI>
                                <LI>Next / after</LI>
                                <LI>Read</LI>
                                <LI>Select / Click</LI>
                            </UL>
                        </div>,
                        <div>
                            <UL>
                                <LI>On the left/right (or other directional language)</LI>
                                <LI>Above / below</LI>
                                <LI>
                                    View / see (don’t assume this is how people are reading content)
                                </LI>
                                <LI>Here (specify clearly what the destination is/will be)</LI>
                            </UL>
                        </div>,
                    ],
                ]}
            />

            <H2>Anti-racist content</H2>
            <P>
                Anti-racist content includes diverse perspectives that are different from our own.
                It’s important that our writing never elevates or excludes any one group over
                another.
            </P>
            <H3>How to make your writing anti-racist:</H3>
            <UL>
                <LI>
                    Identify a person’s race or ethnicity only when it’s relevant. Always ask for a
                    person’s preference and identify them as specifically as possible.
                </LI>
                <LI>
                    Avoid metaphors or expressions that are specific to a culture or class. For
                    example, phrases like “knock it out of the park” or “hit a home run&quot; are
                    not universal.
                </LI>
                <LI>
                    Avoid using language, metaphors and idioms that excludes, offends, or assumes a
                    certain class, culture, ability, age, other privileged status, etc.
                </LI>
                <LI>
                    Avoid culturally insensitive slang or appropriating cultural terminology. Some
                    examples can be found in our list of words and phrases to use and avoid.
                </LI>
                <LI>
                    Don’t speak about people in divisive ways. For example, instead of referring to
                    people as &quot;native speakers&quot; or &quot;non-native speakers&quot; of
                    English, think about whether or not your document needs to discuss this at all.
                </LI>
            </UL>
            <H3>Words and phrases to use and avoid</H3>

            <DoDontTable
                examples={[
                    [
                        'Historically underrepresented groups or people of color',
                        'Minority/minorities, visible minorities',
                    ],
                    [
                        'Discontinued, legacy, defunct, exempt, excluded, special case, special privilege, etc.',
                        'Grandfather, grandfathered, grandfathering (verbs), and grandfather clause (noun)',
                    ],
                    ['Welcome back', 'Long time no see'],
                    ['Sorry, something went wrong', 'No can do'],
                    ['Authority or expert', 'Guru or ninja'],
                    ['Native to the operating system or built-in feature', 'Native'],
                    ['Meeting', 'Powwow'],
                ]}
            />

            <H2>Gender-neutral language</H2>
            <P>
                Gender-neutral language is important so our words don’t enforce biases and
                stereotypes based on sex and gender.
            </P>
            <H3>How to make your writing gender-neutral:</H3>
            <UL>
                <LI>Always use people’s preferred pronouns. When in doubt, it’s better to ask.</LI>
                <LI>
                    Use gender neutral pronouns “they/them/their”. Avoid using “he” or “she” unless
                    you’re referring to a specific person.
                </LI>
                <LI>
                    Avoid gendered titles such as “Mr.”, “Mrs.”, “Miss” and “Ms”. Whenever possible,
                    use the person’s first name. This will also make content more conversational.
                </LI>
                <LI>
                    Use gender-neutral alternatives for gendered words. Refer to our list of words
                    and phrases to use and avoid.
                </LI>
                <LI>
                    When using plural pronouns, you can rewrite the sentence so the nouns are also
                    plural if it improves readability.
                </LI>
                <LI>
                    When specific context is needed, use diverse names, genders, ages and locations
                    for examples or placeholder copy.
                </LI>
            </UL>
            <H3>Words and phrases to use and avoid</H3>

            <DoDontTable
                examples={[
                    [
                        'Parent or parents',
                        <div>
                            <div>Moms</div>
                            <div>Dads</div>
                        </div>,
                    ],
                    [
                        <div>
                            <div>Pronouns</div>
                            <div>What are your pronouns?</div>
                            <div>Prefer not to say / self-describe / respond</div>
                        </div>,
                        <div>
                            <div>Preferred pronouns</div>
                            <div>What are your preferred pronouns?</div>
                            <div>Other (in forms that collect personal data)</div>
                        </div>,
                    ],
                    [
                        'LGBTQ+ community, gay, lesbian, bisexual /pansexual, transgender,transsexual, they /them/their',
                        'Homosexual or the wrong pronoun',
                    ],
                    [
                        <div>
                            <div>Given name</div>
                            <div>Assumed name</div>
                            <div>Legal name</div>
                        </div>,
                        <div>
                            <div>Maiden name</div>
                            <div>Married name</div>
                        </div>,
                    ],
                    [
                        <div>
                            <div>People</div>
                            <div>Everyone</div>
                            <div>Everybody</div>
                        </div>,
                        'Men and women',
                    ],
                    ['Woman/women (this is inclusive of trans women)', 'Female'],
                    [
                        'They/their/them (acceptable gender-neutral singular pronouns)',
                        <div>
                            <div>Him and/or her</div>
                            <div>He and/or she</div>
                        </div>,
                    ],
                    [
                        'Any representative name',
                        <div>
                            <div>John/Jane Doe</div>
                            <div>
                                (These names are typically used to identify anonymous people in
                                court cases, police warrants, and violent crimes.)
                            </div>
                        </div>,
                    ],
                    [
                        <div>
                            <div>Businessperson</div>
                            <div>
                                This could apply to any position, role, or title that is a gendered
                                word.
                            </div>
                        </div>,
                        'Businessman',
                    ],
                    [
                        <div>
                            <div>Staffed</div>
                            <div>Managed</div>
                        </div>,
                        'Manned',
                    ],
                    ['Workforce', 'Manpower'],
                    [
                        <div>
                            <div>Machine-made</div>
                            <div>Artificial</div>
                        </div>,
                        'Man-made',
                    ],
                ]}
            />
        </ContentPage>
    );
}
