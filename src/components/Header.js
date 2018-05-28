import React from 'react'
import Link from 'gatsby-link'

export default () => {
  return <div className="header__container">
    <div className="header__menu">
      <div className="header__item">
        <Link to='/'>Today I've learnt</Link>
      </div>
      <div className="header__item">
        <Link to='/tags'>Topic</Link>
      </div>
    </div>
  </div>
}
