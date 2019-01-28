import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { tpColorGray200 } from '@thumbtack/thumbprint-tokens';
import Container from '../components/container';
import Wrap from '../components/wrap';
import Featured from '../components/thumbprint-www/featured';
import Hero from '../components/thumbprint-www/hero';

const description = 'Assets for building high-quality, consistent user experiences at Thumbtack.';

const IndexPage = ({ location }) => (
    <Container location={location}>
        <Helmet>
            <meta name="description" content={description} />
            <style type="text/css">{`
                body {
                    background-color: ${tpColorGray200};
                }
            `}</style>
        </Helmet>
        <div>
            <Hero />
            <div className="pt4 m_pt6">
                <Wrap hasPadding={false}>
                    <Featured />
                </Wrap>
            </div>
        </div>
    </Container>
);

IndexPage.propTypes = {
    location: PropTypes.shape({}).isRequired,
};

export default IndexPage;
