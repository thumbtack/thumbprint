import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Container from '../components/container';
import Wrap from '../components/wrap';
import Featured from '../components/thumbprint-www/featured';
import Notices from '../components/thumbprint-www/notices';
import Hero from '../components/thumbprint-www/hero';

import openGraphImage from './og-image.png';

const description = 'Assets for building high-quality, consistent user experiences at Thumbtack.';

interface IndexPageProps {
    location: Location;
    data: {
        site: {
            siteMetadata: {
                siteUrl: string;
            };
        };
    };
}

export default function IndexPage({ location, data }: IndexPageProps): JSX.Element {
    return (
        <Container location={location}>
            <Helmet>
                <meta name="description" content={description} />
                <meta property="og:description" content={description} />
                <meta name="twitter:description" content={description} />

                <meta
                    property="og:image"
                    content={data.site.siteMetadata.siteUrl + openGraphImage}
                />
                <meta
                    name="twitter:image"
                    content={data.site.siteMetadata.siteUrl + openGraphImage}
                />
            </Helmet>
            <div>
                <Hero />
                <div className="pv5 m_pv6 bg-gray-200 bt bb b-gray-300">
                    <Wrap hasPadding={false}>
                        <Featured />
                    </Wrap>
                </div>
                <div className="pv5 m_pv6">
                    <Wrap hasPadding={false}>
                        <Notices />
                    </Wrap>
                </div>
            </div>
        </Container>
    );
}

export const query = graphql`
    query {
        site {
            siteMetadata {
                siteUrl
            }
        }
    }
`;
