import React from 'react'
import { Link } from 'react-router-dom'

import TableCartItem from '../components/TableCartItem'

import { addComma } from '../utils/helpers'
import { round } from 'lodash'

import { connect } from 'react-redux'
import { chooseShippingOption } from '../redux/actions'
import CartIsEmpty from '../components/CartIsEmpty'

const Cart = ({ cart, chooseShippingOption }) => {
  const { products, shippingOption } = cart

  let { totalPrice } = cart
  let subtotal = addComma(round(totalPrice, 2))

  // Adds flat_rate $10 to total price
  totalPrice = shippingOption === 'flat_rate' ? parseFloat(totalPrice) + 10 : totalPrice

  const onChange = e => chooseShippingOption(e.target.name)

  if (products && products.length < 1) {
    return <CartIsEmpty />
  }

  return (
    <div className='cart'>
      <table className='cart-table'>
        <thead>
          <tr>
            <th className='remove'>&nbsp;</th>
            <th className='thumbnail'>&nbsp;</th>
            <th className='name'>Product</th>
            <th className='price'>Price</th>
            <th className='quantity'>Quantity</th>
            <th className='subtotal'>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <TableCartItem {...product} key={product._id} />
          ))}
        </tbody>
      </table>
      <div className='cart-totals'>
        <p className='subtotal'>
          Subtotal
          <span>${subtotal}</span>
        </p>
        <p className='shipping'>Shipping</p>
        <label htmlFor='flat_rate'>Flat Rate: $10</label>
        <input
          type='radio'
          name='flat_rate'
          id='flat_rate'
          onChange={onChange}
          checked={shippingOption === 'flat_rate'}
          value={shippingOption}
        />
        <label htmlFor='free_shipping'>Free Shipping</label>
        <input
          type='radio'
          name='free_shipping'
          id='free_shipping'
          onChange={onChange}
          checked={shippingOption === 'free_shipping'}
          value={shippingOption}
        />
        <label htmlFor='local_pickup'>Local Pickup</label>
        <input
          type='radio'
          name='local_pickup'
          id='local_pickup'
          onChange={onChange}
          checked={shippingOption === 'local_pickup'}
          value={shippingOption}
        />
        <p className='total'>
          Total
          <span>${addComma(round(totalPrice, 2))}</span>
        </p>
        <Link to='/checkout' className='proceed-btn btn dark-btn'>
          Proceed to checkout
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = ({ cart }) => ({
  cart
})

export default connect(mapStateToProps, { chooseShippingOption })(Cart)
