import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div className='contact'>
      <div className='row'>
        <p>Customer support</p>
        <p>
          If you have any questions or concerns about Yonga products, please feel free to contact Yonga Customer
          Support. Inquiries will be answered between 10:00 and 18:00 on weekdays except Saturdays, Sundays, and
          holidays.
        </p>
        <Link to='/contact'>help@yonga.com</Link>
      </div>
      <div className='row'>
        <p>Press officials</p>
        <p>If you would like to cover Yonga, detailed materials and images, please send an email to the press team.</p>
        <Link to='/contact'>press@yonga.com</Link>
      </div>
      <div className='row'>
        <p>Partner</p>
        <p>
          If you are related to Yonga, or if you have a request for collaboration or tie-up, please send an email to the
          general contact.
        </p>
        <Link to='/contact'>information@yonga.com</Link>
      </div>
    </div>
  )
}

export default Contact
