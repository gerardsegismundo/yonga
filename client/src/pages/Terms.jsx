import React from 'react'
import { Link } from 'react-router-dom'

const Terms = () => {
  return (
    <div className='terms'>
      <div className='row'>
        <p className='label'>Operating company</p>
        <p className='details'>TO YONGA Inc.</p>
      </div>
      <div className='row'>
        <p className='label'>Operation manager</p>
        <p className='details'>Booky Roverse</p>
      </div>
      <div className='row'>
        <p className='label'>Location</p>
        <p className='details'>
          150-0001 3-25-18-202
          <br />
          Conomi, Cocoyashi Village
        </p>
      </div>
      <div className='row'>
        <p className='label'>Contact Email</p>
        <Link to='/terms'>information@yonga.com</Link>
      </div>
      <div className='row'>
        <p className='label'>Necessary charges other than the product price</p>
        <p className='details'>Shipping fee (nationwide uniform $20)</p>
      </div>
      <div className='row'>
        <p className='label'>Defective product</p>
        <p className='details'>
          If it is unnecessary from the beginning or if there is a difference in content, we will exchange it for an
          equivalent product. However, if the product is out of stock, it will be refunded.
        </p>
      </div>
      <div className='row'>
        <p className='label'>Returns / Exchanges</p>
        <p className='details'>
          Please check <Link to='/terms'>about returns and exchanges.</Link>
        </p>
      </div>
      <div className='row'>
        <p className='label'>Sales quantity</p>
        <p className='details'>
          Depending on the product, the number of items in stock is limited. Please check the product page for
          availability.
        </p>
      </div>
      <div className='row'>
        <p className='label'>Delivery time</p>
        <p className='details'>We usually ship within 3 business days of receiving your order.</p>
      </div>
      <div className='row'>
        <p className='label'>Payment method</p>
        <p className='details'>Direct bank transfer, check payments, cash on delivery, Paypal</p>
      </div>
    </div>
  )
}

export default Terms
