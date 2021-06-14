import React from 'react'

import aboutImage1 from '../assets/images/about-img1.jpg'
import aboutImage2 from '../assets/images/about-img2.jpg'

const rows = [
  {
    label: 'products',
    detail:
      'We select only what is really good and what we really need, and make essential products with natural energy and dedication.'
  },
  {
    label: 'essay',
    detail:
      'How to face yourself, the ability to choose important things, a simple and rich way of life. Look into the world from the perspective of people who are familiar with the spirituality of Less is beauty.'
  },
  {
    label: 'sounds',
    detail:
      'A playlist tailored to the 24 solar terms, a SENN original song co-written with an artist. A sound that adds a breeze to your margins.'
  },
  {
    label: 'books',
    detail:
      'Words become actions, habits, and destiny. The recommendation of books that touch the wisdom of ancestors and someone in the distance and sharpen their sensibilities.'
  },
  {
    label: 'meditation',
    detail:
      '	A meditation program with a gentle voice and a peaceful natural sound. Take a deep breath and exhale. Suddenly, I return to the center of myself. A small margin in your daily life.'
  },
  {
    label: 'experience',
    detail:
      'Taste with all five senses, move your hands, and share time. With you, "pause" where you can look at yourself and have a conversation between hearts.'
  }
]

const About = () => {
  return (
    <div className='about'>
      <div className='wrapper'>
        <img src={aboutImage1} alt='swan' />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, aliquam?
          <br /> Sit tempora molestias totam, quod enim animi qui sunt, iusto laudantium blanditiis porro non eius iste
          possimus? <br /> Dolor, sit amet consectetur adipisicing elit. Dolorum fuga earum alias, nihil quosabore
          maxime provident mollitia commodi. cupiditate.
        </p>
      </div>
      <img src={aboutImage2} alt='nature' />
      {rows.map(({ label, detail, index }) => (
        <div className='row' key={index + detail}>
          <p className='col-label'>{label}</p>
          <p className='col-detail'>{detail}</p>
        </div>
      ))}
    </div>
  )
}

export default About
