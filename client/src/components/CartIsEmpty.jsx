import React from 'react'

import { Link } from 'react-router-dom'

const CartIsEmpty = () => {
  return (
    <div className='cart-is-empty'>
      <p>Your cart is currently empty.</p>
      <Link to='/' className='btn dark-btn'>
        Return to shop
      </Link>
    </div>
  )
}

export default CartIsEmpty
