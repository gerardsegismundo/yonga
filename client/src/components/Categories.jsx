import React from 'react'

import children from '../assets/images/categories/children.png'
import home from '../assets/images/categories/home.png'
import outdoor from '../assets/images/categories/outdoor.png'

import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const categoryList = [
  { name: 'children', imageURL: children },
  { name: 'home', imageURL: home },
  { name: 'outdoor', imageURL: outdoor }
]

const Categories = () => {
  const history = useHistory()
  const { filteredProducts } = useSelector(({ products }) => products)

  const itemCount = category => {
    return (
      filteredProducts &&
      filteredProducts[category] &&
      filteredProducts[category].length
    )
  }

  return (
    <ul className='categories'>
      {categoryList.map((c, i) => (
        <li
          className={c.name}
          key={i + c.name}
          onClick={() => history.push(`/product-category/${c.name}`)}
        >
          <figure style={{ backgroundImage: `url(${c.imageURL})` }}>
            <figcaption>{`${c.name} (${itemCount(c.name)})`}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}

export default Categories
