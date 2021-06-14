import { useEffect } from 'react'
import NewsLetterForm from './NewsLetterForm'
import { Link, useHistory } from 'react-router-dom'

import { useSelector } from 'react-redux'

const links = [
  [
    { name: 'about', path: '/about' },
    { name: 'contact', path: '/contact' },
    { name: 'children', path: '/product-category/children' },
    { name: 'home', path: '/product-category/home' },
    { name: 'outdoor', path: '/product-category/outdoor' }
  ],
  [
    { name: 'cart', path: '/cart' },
    { name: 'checkout', path: '/checkout' },
    { name: 'terms & conditions', path: '/terms' },
    { name: 'privacy policy', path: '/privacy-policy' }
  ]
]

const MenuContent = () => {
  const history = useHistory()
  const { navMenuIsOpen } = useSelector(({ ui }) => ui)

  useEffect(() => {
    return history.listen(() => {
      navMenuIsOpen && document.getElementById('menu-toggler').click()
    })
  }, [history, navMenuIsOpen])

  return (
    <div className='menu-content'>
      <div className='wrapper'>
        <ul className='menu-list-1'>
          {links[0].map(({ name, path, i }) => (
            <li key={name + i}>
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>

        <ul className='menu-list-2'>
          {links[1].map(({ name, path, i }) => (
            <li key={name + i}>
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>

        <NewsLetterForm />
      </div>

      <div className='menu-list-3'>
        <h2>©&nbsp;&nbsp;&nbsp;Yonga</h2>
        <ul>
          <li>
            <Link to='/terms'>terms & conditions</Link>
          </li>
          <li>
            <Link to='/terms'>privacy policy</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MenuContent
