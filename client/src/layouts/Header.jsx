import React from 'react'
import Navigation from '../components/Navigation'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='main-header'>
      <div className='container'>
        <Link to='/' className='brand'>
          Yonga
        </Link>
        <Navigation />
      </div>
    </header>
  )
}

export default Header
