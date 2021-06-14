import React, { useState, useEffect } from 'react'

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import ProductItem from '../components/ProductItem'

import sortAnimation from '../utils/animations/sortAnimation'

const options = [
  'Price: Low to High',
  'Price: High to Low',
  'Avg. Customer Rating',
  'Newest Arrival'
]

const Category = () => {
  const filtered = useSelector(({ products }) => products.filteredProducts)
  const { category } = useParams()

  const filteredProducts = filtered[category]

  const [sortedProducts, setSortedProducts] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (filteredProducts) setSortedProducts(filteredProducts)
  }, [filteredProducts])

  const handleOnSelect = e => {
    setSelected(e.value)
    sortAnimation(() => {
      switch (e.value) {
        // Price: Low to High
        case options[0]:
          return setSortedProducts([
            ...filteredProducts.sort(
              (a, b) => parseFloat(a.price) - parseFloat(b.price)
            )
          ])

        // Price: High to Low
        case options[1]:
          return setSortedProducts([
            ...filteredProducts.sort(
              (a, b) => parseFloat(b.price) - parseFloat(a.price)
            )
          ])

        // Avg. Customer Rating
        case options[2]:
          return setSortedProducts([
            ...filteredProducts.sort((a, b) => b.rating - a.rating)
          ])

        // Newest Arrival
        default:
          return setSortedProducts([
            ...filteredProducts.sort((a, b) => b.createdAt - a.createdAt)
          ])
      }
    })
  }

  return (
    <div className='category'>
      {filteredProducts && (
        <>
          <div className='category-header'>
            <h2 className='category-heading'>{category}</h2>
            <p className='category-info'>
              Showing 1–{filteredProducts.length} of {filteredProducts.length}{' '}
              results
            </p>

            <Dropdown
              options={options}
              onChange={handleOnSelect}
              value={selected}
              placeholder='Select an option'
            />
          </div>
          <ol className='category-results'>
            {sortedProducts &&
              sortedProducts.map(product => (
                <ProductItem product={product} key={product._id} />
              ))}
          </ol>
        </>
      )}
    </div>
  )
}

export default Category
