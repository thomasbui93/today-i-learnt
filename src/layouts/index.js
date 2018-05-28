import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Header from './../components/Header'
import './../styles/app.scss'

export default ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header/>
    <div className="content">{children()}</div>
  </div>
)

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
