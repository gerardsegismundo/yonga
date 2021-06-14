import React, { useState, useRef } from 'react'
import { gsap } from 'gsap'

import { Link } from 'react-router-dom'

import { ReactComponent as CartIcon } from '../assets/icons/cart.svg'
import { ReactComponent as UserIcon } from '../assets/icons/user.svg'
import CartMenu from './CartMenu'

import { connect } from 'react-redux'
import { toggleNavMenu, toggleCartMenu } from '../redux/actions'
import { toggleScrollbar } from '../utils/helpers'

import { useMenuToggleAnimation, useCartToggleAnimation } from '../utils/animations'
import { useOutsideClick } from '../utils/hooks'

const Navigation = ({ toggleNavMenu, navMenuIsOpen, cartMenuIsOpen, totalQuantity, toggleCartMenu }) => {
  const menu_tl = gsap.timeline()
  const [menuTl] = useState(menu_tl)
  useMenuToggleAnimation(menuTl)

  const cart_tl = gsap.timeline()
  const [cartTl] = useState(cart_tl)
  useCartToggleAnimation(cartTl)

  const handleToggleNavMenu = () => {
    toggleScrollbar(navMenuIsOpen)
    menuTl.reversed(navMenuIsOpen)
    toggleNavMenu()
  }

  const handleToggleCartMenu = () => {
    cartTl.reversed(cartMenuIsOpen)
    toggleCartMenu()
  }

  const cartIconRef = useRef()
  const cartMenuRef = useRef()

  useOutsideClick([cartMenuRef, cartIconRef], [cartMenuIsOpen], () => cartMenuIsOpen && handleToggleCartMenu())

  return (
    <nav className='navigation'>
      <ul>
        <li className='user'>
          <Link to='/account/login'>
            <UserIcon />
          </Link>
        </li>
        <li className='cart'>
          {totalQuantity > 0 && <div className='badge'>{totalQuantity}</div>}
          <div ref={cartIconRef}>
            <CartIcon onClick={handleToggleCartMenu} />
          </div>
          <CartMenu handleToggleCartMenu={handleToggleCartMenu} cartMenuRef={cartMenuRef} />
        </li>
        <li className='menu' id='menu-toggler' onClick={handleToggleNavMenu}>
          <div className='wrapper'>
            <span className='menu-text-closed'>CLOSE</span>
            <span className='menu-text-opened'>MENU</span>
          </div>
        </li>
      </ul>
    </nav>
  )
}

const mapStateToProps = ({ ui, cart }) => ({
  navMenuIsOpen: ui.navMenuIsOpen,
  cartMenuIsOpen: ui.cartMenuIsOpen,
  totalQuantity: cart.totalQuantity
})

export default connect(mapStateToProps, {
  toggleNavMenu,
  toggleCartMenu
})(Navigation)
