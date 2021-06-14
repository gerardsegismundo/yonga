import React from 'react'

import { ReactComponent as FullRate } from '../assets/icons/circle-fullrate.svg'
import { ReactComponent as HalfRate } from '../assets/icons/circle-halfrate.svg'
import { ReactComponent as NoRate } from '../assets/icons/circle-norate.svg'

import { rateProduct } from '../redux/actions'

import { useDispatch } from 'react-redux'
import { progress } from '../utils/helpers'
import { NotificationManager } from 'react-notifications'

const Rating = ({ productId, rating, setHoverRating, setCurrentRating }) => {
  const dispatch = useDispatch()

  const handleOnMouseEnter = e => {
    setHoverRating(e.currentTarget.dataset.value)
  }

  const handleOnClick = e => {
    progress(async () => {
      const { numberOfRatings, totalRating } = await dispatch(rateProduct(productId, e.currentTarget.dataset.value))

      setCurrentRating({ numberOfRatings, totalRating })

      NotificationManager.success('Thank you for rating our product!')
    })
  }

  return (
    <div className='rating'>
      <i onMouseEnter={handleOnMouseEnter} onClick={handleOnClick} data-value={1}>
        {rating >= 1 ? <FullRate /> : rating >= 0.5 ? <HalfRate /> : <NoRate />}
      </i>
      <i onMouseEnter={handleOnMouseEnter} onClick={handleOnClick} data-value={2}>
        {rating >= 2 ? <FullRate /> : rating >= 1.5 ? <HalfRate /> : <NoRate />}
      </i>
      <i onMouseEnter={handleOnMouseEnter} onClick={handleOnClick} data-value={3}>
        {rating >= 3 ? <FullRate /> : rating >= 2.5 ? <HalfRate /> : <NoRate />}
      </i>
      <i onMouseEnter={handleOnMouseEnter} onClick={handleOnClick} data-value={4}>
        {rating >= 4 ? <FullRate /> : rating >= 3.5 ? <HalfRate /> : <NoRate />}
      </i>
      <i onMouseEnter={handleOnMouseEnter} onClick={handleOnClick} data-value={5}>
        {rating >= 5 ? <FullRate /> : rating >= 4.5 ? <HalfRate /> : <NoRate />}
      </i>
    </div>
  )
}

export default Rating
