import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import SocialIcons from './SocialIcons'

const Footer = () => {
  const location = useLocation()

  return (
    <>
      {/* Hide top border at home page */}
      <hr className='footer-top-border' style={{ borderColor: location.pathname === '/' && 'transparent' }} />
      <footer className='main-footer'>
        <div className='footer-menu-1'>
          <Link to='/product-category/children'>children</Link>
          <Link to='/product-category/home'>home</Link>
          <Link to='/product-category/outdoor'>outdoor</Link>
        </div>
        <div className='footer-menu-2'>
          <Link to='/about'>about</Link>
          <Link to='/terms'>terms</Link>
          <Link to='/contact'>contact</Link>
        </div>
        <div className='footer-menu-3'>
          <Link to='/account/dashboard'>account</Link>
          <Link to='/cart'>cart</Link>
          <Link to='/checkout'>checkout</Link>
        </div>

        <div className='footer-menu-4'>
          <p>675 Xanadu Way, Oxnard, CA 93036, United States</p>
          <SocialIcons />
        </div>
      </footer>
    </>
  )
}

export default Footer
