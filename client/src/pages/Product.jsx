import React, { useEffect, useState, useRef } from 'react'
import Rating from '../components/Rating'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import _ from 'lodash'
import { addComma, progress } from '../utils/helpers'
import { getProduct, addToCart } from '../redux/actions'
import { NotificationManager } from 'react-notifications'

import CommentSection from '../components/CommentSection'

const Product = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(({ user }) => user)
  const { selectedProduct } = useSelector(({ products }) => products)

  const { _id, name, imageURL, countInStock } = selectedProduct
  const { description, category, price, totalRating, comments, ratings } = selectedProduct

  const { product_name } = useParams()

  // Unslug
  const productName = product_name.replace(/-/g, ' ')

  const getProductRef = useRef(() => progress(() => dispatch(getProduct(productName))))

  useEffect(() => {
    getProductRef.current()
  }, [productName])

  const handleOnChange = e => setQuantity(e.target.value)

  const handleOnKeyUp = async e => {
    const itemCount = parseInt(e.target.value)

    if (!_.isNumber(itemCount) || !itemCount || itemCount < 0) {
      return setQuantity(1)
    }

    if (itemCount > countInStock) {
      NotificationManager.error(`${_.capitalize(e.target.name)} has only ${countInStock} stocks available`, `Sorry`)

      return setQuantity(countInStock)
    }
  }

  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    dispatch(addToCart({ ...selectedProduct, quantity: parseInt(quantity) }))

    NotificationManager.success(`${_.capitalize(productName)} x ${quantity} has been added to your cart.`)
  }

  const [currentRating, setCurrentRating] = useState({ numberOfRatings: 0, totalRating: 0 })

  useEffect(() => {
    if (ratings) {
      setCurrentRating({ numberOfRatings: ratings.length, totalRating })
    }
  }, [ratings, totalRating])

  const [isHovering, setIsHovering] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)

  return (
    selectedProduct && (
      <div className='product'>
        <section className='info-section'>
          <img src={imageURL} alt={name} />
          <div className='details-wrapper'>
            <h2>{name}</h2>
            <div
              className='feedback-wrapper'
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-is-authenticated={isAuthenticated}
            >
              <Rating
                rating={isHovering && isAuthenticated ? hoverRating : currentRating.totalRating}
                setHoverRating={setHoverRating}
                setCurrentRating={setCurrentRating}
                productId={_id}
              />

              {isHovering && isAuthenticated ? (
                <span>{`Rate Product (${hoverRating}/5)`}</span>
              ) : (
                <span>
                  ({`${currentRating.numberOfRatings} customer${currentRating.numberOfRatings > 1 ? `s` : ''} rating`})
                </span>
              )}
            </div>
            <p className='description'>{description}</p>
            <p className='stock'>stock: {countInStock}</p>
            <p className='categories'>
              Categories: {category && category.map((c, i) => <span key={c + i}> {c}</span>)}
            </p>
            <p className='price'>${addComma(price)}</p>
            <input
              onKeyUp={handleOnKeyUp}
              type='number'
              value={quantity}
              min='1'
              max={countInStock}
              onChange={handleOnChange}
            />
            <button className='dark-btn' onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </section>
        <CommentSection productId={_id} comments={comments} />
      </div>
    )
  )
}

export default Product
