import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import NotificationManager from 'react-notifications/lib/NotificationManager'
import _ from 'lodash'

import { ReactComponent as CloseIcon } from '../assets/icons/close.svg'
import { removeMany, updateQuantity } from '../redux/actions'
import { slugifyProduct, addComma } from '../utils/helpers'

const TableCartItem = product => {
  const { _id, name, price, quantity, imageURL, countInStock } = product

  const productLink = slugifyProduct(name)

  const dispatch = useDispatch()

  const handleOnChange = e => {
    dispatch(updateQuantity({ id: _id, quantity: parseInt(e.target.value) }))
  }

  const handleOnKeyUp = async e => {
    const itemCount = parseInt(e.target.value)

    if (!_.isNumber(itemCount) || !itemCount || itemCount < 0) {
      return dispatch(updateQuantity({ id: _id, quantity: 1 }))
    }

    if (itemCount > countInStock) {
      NotificationManager.error(`${_.capitalize(e.target.name)} has only ${countInStock} stocks available`, `Sorry`)

      return dispatch(updateQuantity({ id: _id, quantity: parseInt(countInStock) }))
    }
  }

  const handleRemoveMany = () => dispatch(removeMany(_id))

  return (
    <tr key={_id}>
      <td className='remove'>
        <CloseIcon onClick={handleRemoveMany} />
      </td>
      <td className='thumbnail'>
        <figure style={{ backgroundImage: `url(${imageURL})` }} />
        &nbsp;
      </td>
      <td className='name'>
        <Link to={productLink}>{name}</Link>
      </td>
      <td className='price'>${price}</td>
      <td className='quantity'>
        <input
          name={name}
          onKeyUp={handleOnKeyUp}
          type='number'
          value={quantity}
          onChange={handleOnChange}
          min='1'
          max={countInStock}
        />
      </td>
      <td className='subtotal'>${addComma(parseFloat(quantity * price).toFixed(2))}</td>
    </tr>
  )
}

export default TableCartItem
