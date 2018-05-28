import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div className="grid">
        <Helmet title={siteTitle} />
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div className="card content__actual" key={node.fields.slug}>
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
          )
        })}
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
