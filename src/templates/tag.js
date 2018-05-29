import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Link from 'gatsby-link'

const Tags = ({ pathContext, data }) => {
  const { tag } = pathContext
  const { edges, totalCount } = data.allMarkdownRemark
  const siteTitle = data.site.siteMetadata.title
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <div>
      <Helmet title={`${tag.toUpperCase()} | ${siteTitle}`} />
      <div className="page-header lg-margin">
        <h1 className="page-title">{tagHeader}</h1>
        <Link to="/tags">All tags</Link>
      </div>
      
      <div className="grid">
        {
          edges.map(({ node }) => {
            const { title } = node.frontmatter
            const { slug } = node.fields
            return (
              <div className="card__container grid-12 grid-md-3" key={node.fields.slug}>
                <div className="card content__actual">
                  <div className="card__inner">
                    <h3 className="card__title">
                      <Link to={node.fields.slug}>{title}</Link>
                    </h3>
                    <div className="card__subtitle">{node.frontmatter.date}</div>
                    <div className="card__content" dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                  </div>
                  <div className="card__actions tags">
                    {
                      node.frontmatter.tags.map(tag => (
                        <Link to={`/tags/${tag}`} key={tag}>{tag}</Link>
                      ))
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      
    </div>
  )
}

Tags.propTypes = {
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            excerpt: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired
            })
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            tags
            date(formatString: "DD MMMM, YYYY")
          }
        }
      }
    }
  }
`
