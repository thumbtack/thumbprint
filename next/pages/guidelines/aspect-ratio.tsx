import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { ContentPage } from '../../components/mdx/mdx';
import getContentPageStaticProps from '../../utils/get-content-page-static-props';
import { P, H2, Img, UL, LI } from '../../components/mdx/components';

import avatarPro from '../../images/pages/guide/product/aspect-ratio/avatar-pro.png';
import avatarCustomer from '../../images/pages/guide/product/aspect-ratio/avatar-customer.png';
import customerReview from '../../images/pages/guide/product/aspect-ratio/customer-review.png';
import proProfile from '../../images/pages/guide/product/aspect-ratio/pro-profile.png';
import serviceImage from '../../images/pages/guide/product/aspect-ratio/service-image.png';
import hero from '../../images/pages/guide/product/aspect-ratio/hero.png';
import portraitSize from '../../images/pages/guide/product/aspect-ratio/portrait-size.jpg';
import embed from '../../images/pages/guide/product/aspect-ratio/embed.png';
import custom from '../../images/pages/guide/product/aspect-ratio/custom.png';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Aspect ratio"
            description="Consistent proportions for easier development."
            layoutProps={layoutProps}
        >
            <P>
                By designing with an existing aspect ratio, teams are able to quickly build UIs
                using existing classes and components. Though it’s encouraged to use these ratios,
                some are exempt. For example, marketing and other one-off images can use ratios
                required by the design.
            </P>

            <H2>1:1</H2>

            <div className="grid">
                <div className="col-10">
                    <div className="mb2">Used for:</div>
                    <UL>
                        <LI>Avatars for customer and Pros</LI>
                        <LI>Pro Profile thumbnails</LI>
                        <LI>Customer review thumbnails</LI>
                    </UL>
                </div>
                <div className="col-2">
                    <div className="aspect-ratio aspect-ratio-1x1 b-dashed b-black-300" />
                </div>
            </div>

            <div className="l_flex items-end mv4">
                <div className="mb4 l_mb0 l_mr3">
                    <Img {...avatarPro} className="db" alt="" fill={false} />
                    <div className="mt1 tp-body-2">Avatar pro</div>
                </div>
                <div className="mb4 l_mb0 l_mr3">
                    <Img {...avatarCustomer} className="db" alt="" fill={false} />
                    <div className="mt1 tp-body-2">Avatar customer</div>
                </div>
                <div className="mb4 l_mb0 l_mr3">
                    <Img {...customerReview} className="db" alt="" fill={false} />
                    <div className="mt1 tp-body-2">Review thumbs</div>
                </div>
                <div className="mb4 l_mb0">
                    <Img {...proProfile} className="db" alt="" fill={false} />
                    <div className="mt1 tp-body-2">Pro profile thumbs</div>
                </div>
            </div>

            <div className="bb b-gray" />

            <H2>8:5</H2>

            <div className="grid">
                <div className="col-10">
                    <div>Primarily used for Service Card images.</div>
                </div>
                <div className="col-2">
                    <div className="aspect-ratio aspect-ratio-8x5 b-dashed b-black-300" />
                </div>
            </div>
            <div className="mv4">
                <Img {...serviceImage} alt="Service card example" fill={false} />
            </div>

            <div className="bb b-gray" />

            <H2>7:3</H2>

            <div className="grid">
                <div className="col-10">
                    <div>Primarily used for hero images.</div>
                </div>
                <div className="col-2">
                    <div className="aspect-ratio aspect-ratio-7x3 b-dashed b-black-300" />
                </div>
            </div>
            <div className="mv4">
                <Img {...hero} alt="Hero example" />
            </div>
            <div className="bb b-gray" />

            <H2>16:9</H2>

            <div className="grid">
                <div className="col-10">
                    <div>Primarily used for video embeds.</div>
                </div>
                <div className="col-2">
                    <div className="aspect-ratio aspect-ratio-16x9 b-dashed b-black-300" />
                </div>
            </div>
            <div className="mv4">
                <Img {...embed} alt="Video embed example" fill={false} />
            </div>

            <div className="bb b-gray" />

            <H2>10:13</H2>

            <div className="grid">
                <div className="col-10">
                    <div>Portrait-sized images.</div>
                </div>
                <div className="col-2">
                    <div className="aspect-ratio aspect-ratio-10x13 b-dashed b-black-300" />
                </div>
            </div>
            <div className="mv4 mw6">
                <Img {...portraitSize} alt="Portrait size example" fill={false} />
            </div>

            <div className="bb b-gray" />

            <H2>Custom sizes</H2>
            <P>
                Custom illustrations and other images, often used for marketing purposes, do not
                need to fall into one of these aspect ratios.
            </P>

            <div className="mv4">
                <Img {...custom} alt="Custom image" fill={false} />
            </div>
        </ContentPage>
    );
}
