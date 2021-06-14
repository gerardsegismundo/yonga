import React from 'react'
import LightWood from '../assets/images/wood.pattern.jpg'
import Flowers from '../assets/images/hangingflowers.png'

const LandingImage = () => {
  return (
    <div
      className='landing-image'
      style={{ backgroundImage: `url(${LightWood})` }}
    >
      {/* <div className='frame-border' /> */}
      <img className='flower-img' src={Flowers} alt='Flowers' />
      <div className='text-wrapper'>
        <h2>Calypso</h2>
        <h3>Hanging basket.</h3>
        <span>$50.99</span>
      </div>
    </div>
  )
}

export default LandingImage
