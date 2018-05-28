import React from 'react'
import Link from 'gatsby-link'

export default class Header extends React.Component {
  render() {
    return <div className="header__container">
        <div className="header__menu">
          <div className="header__item">
            <Link 
              to='/' 
              >Today I've learnt</Link>
          </div>
          <div className="header__item">
            <Link to='/tags' activeStyle={{
                color: '#e74c3c'
              }}>Topic</Link>
          </div>
        </div>
    </div>
  }
}
