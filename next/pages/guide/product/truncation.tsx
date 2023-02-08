import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPagteStaticProps from '../../../utils/get-content-page-static-props';
import { Code, H2, H3, H4, A, Img, LI, OL, P, UL } from '../../../components/mdx/components';

import listImage from '../../../images/pages/guide/product/truncation/list.png';
import multilineImage from '../../../images/pages/guide/product/truncation/multiline.png';
import readMoreImage from '../../../images/pages/guide/product/truncation/read-more.png';

export const getStaticProps = getContentPagteStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Truncation"
            description="Recommendations when cutting it short."
            layoutProps={layoutProps}
        >
            <P>
                Though truncation should be used infrequently there are situations where the user
                can benefit from seeing a preview of data. For example, a user may want to skim
                through the beginning of multiple reviews before deciding to view one in its
                entirety.
            </P>
            <H2>Types</H2>
            <P>In Thumbtack products there are four types of truncation in use:</P>
            <OL>
                <LI>
                    Strings that are one line long with no UI action to expand the truncated text.
                </LI>
                <LI>
                    Strings between two and three lines long with no UI action to expand the
                    truncated text.
                </LI>
                <LI>
                    Long blocks of text, like user reviews, that can be expanded with a &quot;Read
                    more&quot; link.
                </LI>
                <LI>Lists of items that are extended with a &quot;Show more&quot; link.</LI>
            </OL>
            <H2>Patterns &amp; implementations</H2>
            <H3>1. Single-line strings</H3>

            <div className="ba b-gray-300 pa4">
                <div className="truncate">
                    In our industry, you hear a lot of talk about the future of work. What I’ve come
                    to believe — because I see it every day — is that the entrepreneurial spirit of
                    independent professionals is the most precious resource we have as a society.
                </div>
            </div>

            <H4>Web</H4>
            <P>
                In this case a few lines of well-supported CSS is sufficient. The{' '}
                <Code>truncate</Code> class is available in our{' '}
                <A href="/atomic/#section-truncate">Atomic library</A> to make this easy.
            </P>

            <Code language="css">
                {`
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
`}
            </Code>
            <H3>2. Multiline strings</H3>

            <div className="ba b-gray-300 pa4">
                <Img
                    {...multilineImage}
                    style={{ width: 300 }}
                    alt="Multiline truncation example"
                />
            </div>

            <H4>Web</H4>
            <P>
                This type of truncation is more complicated with no one perfect solution. There are
                a number of Sass and JavaScript approaches but they are often convoluted and
                limited. In this case we recommend a Sass approach that uses{' '}
                <Code>line-height</Code> tokens to calculate a <Code>max-height</Code>.
            </P>

            <Code language="scss">{`
.multiline {
    font-size: $tp-font__title__3__size; // Needed for IE 11
    line-height: $tp-font__title__3__line-height; // Needed for IE 11
    max-height: $tp-font__title__3__line-height * 2; // Needed for IE 11
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
`}</Code>

            <UL>
                <LI>
                    Most users will see an ellipsis if the text overflows the number of lines
                    specified in <Code>-webkit-line-clamp</Code>.
                </LI>
                <LI>
                    Non-supporting browsers, like IE 11, will see no ellipsis and the text will cut
                    off at the last word that fits.
                </LI>
            </UL>

            <H3>3. &quot;Read more&quot;</H3>

            <div className="ba b-gray-300 pa4 mb3">
                <Img {...readMoreImage} alt="Read more example" style={{ width: 614 }} />
            </div>

            <P>
                Because the Sass pattern for multiline truncation described above relies on a{' '}
                <Code>max-height</Code> calculation, it can visually break if the size of the text
                container changes unexpectedly. To insulate against this we recommend the following:
            </P>
            <UL>
                <LI>Truncate the string using a word count.</LI>
                <LI>If the word count threshold is met, append an ellipsis to the string.</LI>
                <LI>The “Read more” link should be on its own line below.</LI>
                <LI>A “Read less” button to undo the reveal action is not needed.</LI>
            </UL>
            <P>
                Note that this approach means that the truncation will often not occur at the end of
                a line.
            </P>
            <H3>4. &quot;Show more&quot;</H3>

            <div className="ba b-gray-300 pa4 mb3">
                <Img {...listImage} alt="Read more example" style={{ width: 163 }} />
            </div>

            <P>
                This is a standard Javascript interaction to show/hide multiple elements in a list.
                The number of elements to hide and reveal should be at the discretion of the
                designer and developer, keeping in the mind the following:
            </P>
            <UL>
                <LI>Include logic to avoid hiding only one element.</LI>
                <LI>Consider whether the user should be able to show and re-hide the content.</LI>
            </UL>
        </ContentPage>
    );
}
