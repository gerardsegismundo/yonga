import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { ReactComponent as AddtoCartIcon } from '../assets/icons/cart-plus.svg'
import { ReactComponent as CartCheckIcon } from '../assets/icons/cart-check.svg'

import { addToCart } from '../redux/actions'
import { addToCartAnimation } from '../utils/animations'
import { slugifyProduct } from '../utils/helpers'

const ProductItem = ({ product }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { name, price, imageURL } = product

  const handleAddToCart = e => {
    e.stopPropagation()
    addToCartAnimation(e)
    dispatch(addToCart({ ...product, quantity: 1 }))
  }

  const handleOnClick = () => history.push(slugifyProduct(product.name))

  return (
    <li className='product-item' onClick={handleOnClick}>
      <figure style={{ backgroundImage: `url(${imageURL})` }}>
        <figcaption>
          <label>{name}</label>
          <span>${price.toFixed(2)}</span>
          <i className='cart-plus'>
            <AddtoCartIcon onClick={handleAddToCart} />
          </i>
          <i className='cart-check' onClick={e => e.stopPropagation(e)}>
            <p className='added-notification'>Added to cart.</p>
            <CartCheckIcon />
          </i>
        </figcaption>
      </figure>
    </li>
  )
}

export default ProductItem
