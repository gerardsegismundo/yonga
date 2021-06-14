import React from 'react'

import ProductItem from './ProductItem'

import { useSelector } from 'react-redux'

const LatestItems = () => {
  const products = useSelector(({ products }) => products.items)
  const latestItems = products.slice(0, 6)

  return (
    <div className='latest-items'>
      <div className='divider'>
        <span className='divider-left'></span>
        <span className='divider-content'>latest items</span>
        <span className='divider-right'></span>
      </div>

      <ul className='item-list'>
        {latestItems.map(product => (
          <ProductItem product={product} key={product._id} />
        ))}
      </ul>
    </div>
  )
}

export default LatestItems
