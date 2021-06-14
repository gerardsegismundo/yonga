import React from 'react'

const SocialIcons = () => {
  return (
    <ul className='social-icons'>
      <li>
        <a
          href='https://www.facebook.com/'
          target='_blank'
          className='facebook'
          title='Facebook'
          aria-label='Facebook'
          rel='noopener noreferrer'
        >
          <i className='fa fa-facebook'></i>
        </a>
      </li>
      <li>
        <a
          href='https://twitter.com/'
          target='_blank'
          className='twitter'
          title='Twitter'
          aria-label='Twitter'
          rel='noopener noreferrer'
        >
          <i className='fa fa-twitter'></i>
        </a>
      </li>
      <li>
        <a
          href='https://www.instagram.com/'
          target='_blank'
          className='instagram'
          title='Instagram'
          aria-label='Instagram'
          rel='noopener noreferrer'
        >
          <i className='fa fa-instagram'></i>
        </a>
      </li>
    </ul>
  )
}

export default SocialIcons
