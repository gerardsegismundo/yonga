import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { round } from 'lodash'
import { removeOne } from '../redux/actions'

import { addComma, slugifyProduct } from '../utils/helpers'

const CartItem = ({ _id, name, quantity, imageURL, price, removeOne }) => {
  const productLink = slugifyProduct(name)

  const handleRemoveFromCart = () => removeOne(_id)

  return (
    <div className='cart-item'>
      <figure style={{ backgroundImage: `url(${imageURL})` }} />
      <Link to={productLink} className='name'>
        {name}
      </Link>
      <p className='info'>
        quantity: {quantity} &nbsp;&times;&nbsp; ${addComma(price)}
      </p>

      <p className='total-price'>${addComma(round(quantity * price, 2))}</p>
      <i className='close-icon' onClick={handleRemoveFromCart}>
        {quantity > 1 ? '−' : '×'}
      </i>
    </div>
  )
}

export default connect(null, { removeOne })(CartItem)
