import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import MDX from '../mdx';
import { ComponentHeader } from '../thumbprint-components';

const CMS = ({ data, location }) => (
    <MDX
        location={location}
        pageContext={{ frontmatter: data.mdx.frontmatter }}
        header={data.platformNav && <ComponentHeader data={data} />}
    >
        {data.mdx.body}
    </MDX>
);

CMS.propTypes = {
    data: PropTypes.shape({}).isRequired,
    location: PropTypes.string.isRequired,
};

export default CMS;

export const pageQuery = graphql`
    query CmsQuery($id: String!, $relatedComponentsGlob: String, $isComponent: Boolean!) {
        mdx(id: { eq: $id }) {
            id
            body
            frontmatter {
                title
                description
            }
        }
        platformNav: allSitePage(filter: { path: { glob: $relatedComponentsGlob } })
            @include(if: $isComponent) {
            edges {
                node {
                    path
                }
            }
        }
    }
`;
