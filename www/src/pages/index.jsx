import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Container from '../components/container';
import Wrap from '../components/wrap';
import Featured from '../components/thumbprint-www/featured';
import Noticies from '../components/thumbprint-www/noticies';
import Hero from '../components/thumbprint-www/hero';
import openGraphImage from './og-image.png';

const description = 'Assets for building high-quality, consistent user experiences at Thumbtack.';

const IndexPage = ({ location, data }) => (
    <Container location={location}>
        <Helmet>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />

            <meta property="og:image" content={data.site.siteMetadata.siteUrl + openGraphImage} />
            <meta name="twitter:image" content={data.site.siteMetadata.siteUrl + openGraphImage} />
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
                    <Noticies />
                </Wrap>
            </div>
        </div>
    </Container>
);

IndexPage.propTypes = {
    location: PropTypes.shape({}).isRequired,
    data: PropTypes.shape({}).isRequired,
};

export default IndexPage;

export const query = graphql`
    query {
        site {
            siteMetadata {
                siteUrl
            }
        }
    }
`;
