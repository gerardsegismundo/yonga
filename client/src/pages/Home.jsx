import React from 'react'

import Categories from '../components/Categories'
import LatestItems from '../components/LatestItems'
import LandingImage from '../components/LandingImage'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div className='home'>
      <LandingImage />
      <Categories />
      <LatestItems />
      <NewsLetter />
    </div>
  )
}

export default Home
