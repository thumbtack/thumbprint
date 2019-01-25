import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Text } from '@thumbtack/thumbprint-react';
import Container from '../components/container';
import Wrap from '../components/wrap';
import Featured from '../components/thumbprint-www/featured';
import IntroImage from '../components/thumbprint-www/intro/images/hero.png';
import ThumbprintLogo from '../components/container/thumbprintLogo.svg';

const description = 'Assets for building high-quality, consistent user experiences at Thumbtack.';

const IndexPage = ({ location }) => (
    <Container location={location}>
        <Helmet>
            <meta name="description" content={description} />
        </Helmet>
        <div className="flex flex-column bg-gray-200" style={{ minHeight: '100%' }}>
            <div
                className="bg-white flex items-center l_mt6 bt b-gray-300 l_mt0 l_bn l_overflow-y-hidden"
                style={{ maxHeight: '430px' }}
            >
                <div className="flex-none w-30 m_w-50">
                    <img src={IntroImage} alt="hero" className="db" style={{ maxWidth: '100%' }} />
                </div>
                <div className="ph6">
                    <ThumbprintLogo
                        style={{ width: '202px' }}
                        className="db"
                        alt="Thumbprint logo"
                    />
                    <div className="black-300 mb2" style={{ fontSize: '28px' }}>
                        Design System
                    </div>
                    <Text size={2} className="black-300">
                        {description}
                    </Text>
                </div>
            </div>
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
