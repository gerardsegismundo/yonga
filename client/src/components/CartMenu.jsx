import React, { useMemo } from 'react'

import CartItem from './CartItem'
import { addComma } from '../utils/helpers'

import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CartMenu = ({ handleToggleCartMenu, cartMenuRef }) => {
  const history = useHistory()

  const { totalPrice, products } = useSelector(({ cart }) => cart)

  const viewCart = () => {
    handleToggleCartMenu()
    history.push('/cart')
  }

  const handleCheckout = () => {
    handleToggleCartMenu()
    history.push('/checkout')
  }

  const cartIsEmpty = useMemo(() => {
    return products.length > 0
  }, [products])

  return (
    <div className='cart-menu' ref={cartMenuRef}>
      <i className='fa fa-close' onClick={handleToggleCartMenu} />
      <div className='cart-items-container'>
        {cartIsEmpty ? (
          products.map(item => <CartItem {...item} key={item._id} />)
        ) : (
          <p className='empty-msg'>Your cart is empty!</p>
        )}
      </div>

      <div className='total-container'>
        <button className='view-cart' onClick={viewCart} disabled={!cartIsEmpty}>
          View Cart
        </button>
        <button className='check-out' onClick={handleCheckout} disabled={!cartIsEmpty}>
          Checkout
        </button>
        <p className='sub-total'>
          <span>Subtotal:</span> ${addComma(totalPrice)}
        </p>
      </div>
    </div>
  )
}

export default CartMenu
