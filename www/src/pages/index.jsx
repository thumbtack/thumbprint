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
        <div>
            <div
                className="bg-white flex items-center bt l_bt-0 bb b-gray-300 l_overflow-y-hidden bb b-gray-300"
                style={{ maxHeight: '430px' }}
            >
                <div className="flex-none dn m_db m_w-40 l_w-50 m_mr3">
                    <img src={IntroImage} alt="hero" className="db" style={{ maxWidth: '100%' }} />
                </div>
                <div className="ph4 pv5 m_pv0">
                    <ThumbprintLogo
                        style={{ width: '180px' }}
                        className="db"
                        alt="Thumbprint logo"
                    />
                    <div className="black-300 mb2" style={{ fontSize: '22px' }}>
                        Design System
                    </div>
                    <div className="black-300" style={{ maxWidth: '360px' }}>
                        {description}
                    </div>
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
