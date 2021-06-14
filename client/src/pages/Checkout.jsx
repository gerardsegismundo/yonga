import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Paypal from '../components/Paypal'
import { NotificationManager } from 'react-notifications'
import { round } from 'lodash'
import 'react-dropdown/style.css'

import { useDispatch, useSelector } from 'react-redux'
import CustomTextArea from '../components/custom/CustomTextArea'
import BillingDetailsInputGroup from '../components/BillingDetailsInputGroup'

import { chooseShippingOption, checkout } from '../redux/actions'

import { progress, removeErrorOnChange, addComma } from '../utils/helpers'
import { validateBilling } from '../utils/validations'
import CartIsEmpty from '../components/CartIsEmpty'

const Checkout = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { cart, user } = useSelector(data => data)
  const { products, shippingOption } = cart

  const [form, setForm] = useState({
    name: '',
    companyName: '',
    country: '',
    houseNumAndStrtName: '',
    apartment: '',
    town: '',
    postcode: '',
    phone: '',
    email: '',
    addInfo: ''
  })

  const [userAgreed, setUserAgreed] = useState(false)

  const [error, setError] = useState({
    name: '',
    companyName: '',
    country: '',
    houseNumAndStrtName: '',
    apartment: '',
    town: '',
    postcode: '',
    phone: '',
    email: '',
    addInfo: ''
  })

  const [paymentMethod, setPaymentMethod] = useState(null)
  const [isFormDisabled, setIsFormDisabled] = useState(false)

  let { totalPrice } = cart

  let subtotal = round(totalPrice, 2)

  // Adds flat_rate $10 to total price
  totalPrice = round(shippingOption === 'flat_rate' ? totalPrice + 10 : totalPrice, 2)

  const handleOnChange = e => {
    if (e.target.name === 'paymentMethod') return setPaymentMethod(e.target.value)

    removeErrorOnChange(e, error, setError)

    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleChooseOption = e => dispatch(chooseShippingOption(e.target.name))

  const handlePlaceOrder = async () => {
    if (!userAgreed) {
      return NotificationManager.error('You must agree to website terms and conditions before checkout.')
    }

    if (paymentMethod !== 'paypal') {
      console.log('regular payment')
    }

    const cartProducts = cart.products.map(({ name, imageURL, price, quantity }) => ({
      imageURL,
      name,
      price,
      quantity
    }))

    const checkOutDetails = {
      cartProducts,
      paymentMethod: paymentMethod.replaceAll('_', ' '),
      shippingOption: shippingOption.replaceAll('_', ' '),
      totalPrice,
      addInfo: form.addInfo
    }

    const nonRegisteredUserDetails = !user.isAuthenticated ? form : null

    if (nonRegisteredUserDetails) {
      delete nonRegisteredUserDetails.addInfo
    }

    const checkOutSuccess = await dispatch(checkout({ nonRegisteredUserDetails, checkOutDetails }))

    if (checkOutSuccess) {
      NotificationManager.success('Your order has been received.', 'Thank you!')
      history.push('/order-received')
    } else {
      NotificationManager.error('Something went wrong. Try again later..', 'Ooops.')
    }
  }

  // Billing details validation
  const handleConfirmDetails = () => {
    progress(() => {
      let invalidDeets = validateBilling(form)

      if (invalidDeets) return setError({ ...error, ...invalidDeets })

      setIsFormDisabled(true)
    })
  }

  const handleOnCancel = () => setIsFormDisabled(false)

  if (products && products.length < 1) return <CartIsEmpty />

  return (
    <div className='checkout'>
      <form>
        <BillingDetailsInputGroup
          form={form}
          error={error}
          setForm={setForm}
          setError={setError}
          handleOnChange={handleOnChange}
          isFormDisabled={isFormDisabled}
        />

        <div className='additional-information'>
          <h2>Additional information</h2>
          <CustomTextArea
            label='Order Notes (optional)'
            placeholder='Notes about your order, e.g. special notes for delivery.'
            name='addInfo'
            onChange={handleOnChange}
            value={form.addInfo}
            disabled={isFormDisabled}
          />
        </div>
      </form>

      <div className='your-order'>
        <h2 className='your-order-header'>Your order</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {products.map(i => (
              <tr key={i._id}>
                <td>
                  {i.name} &times; {i.quantity}
                </td>
                {/* <td>${addComma(round(i.quantity * i.price, 2))}</td> */}
                <td>${addComma(round(i.quantity * i.price, 2))}</td>
              </tr>
            ))}
            <tr>
              <td>subtotal</td>
              <td className='total-pr'>${addComma(subtotal)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className='shipping'>
              <th>Shipping</th>
              <td>
                <ul>
                  <li>
                    <label htmlFor='flat_rate'>Flat Rate: $10</label>
                    <input
                      type='radio'
                      name='flat_rate'
                      id='flat_rate'
                      onChange={handleChooseOption}
                      checked={shippingOption === 'flat_rate'}
                      value={shippingOption}
                      disabled={isFormDisabled}
                    />
                  </li>
                  <li>
                    <label htmlFor='free_shipping'>Free Shipping</label>
                    <input
                      type='radio'
                      name='free_shipping'
                      id='free_shipping'
                      onChange={handleChooseOption}
                      checked={shippingOption === 'free_shipping'}
                      value={shippingOption}
                      disabled={isFormDisabled}
                    />
                  </li>
                  <li>
                    <label htmlFor='local_pickup'>Local Pickup</label>
                    <input
                      type='radio'
                      name='local_pickup'
                      id='local_pickup'
                      onChange={handleChooseOption}
                      checked={shippingOption === 'local_pickup'}
                      value={shippingOption}
                      disabled={isFormDisabled}
                    />
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>total</td>
              <td>
                <bdi>${addComma(totalPrice)}</bdi>
              </td>
            </tr>
          </tfoot>
        </table>
        <button className='confirm-btn dark-btn btn' onClick={handleConfirmDetails} disabled={isFormDisabled}>
          confirm details
        </button>

        <div className='after-confirm-wrapper' data-is-disabled={isFormDisabled}>
          <h2 className='payment-header'>Payment method</h2>
          <ul className='payment-options'>
            <li>
              <input
                type='radio'
                name='paymentMethod'
                id='direct_bank_transfer'
                onChange={handleOnChange}
                checked={paymentMethod === 'direct_bank_transfer'}
                value='direct_bank_transfer'
              />
              <label htmlFor='direct_bank_transfer'>Direct bank transfer</label>
              <div className='po-box'>
                <p>
                  Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                  Your order will not be shipped until the funds have cleared in our account.
                </p>
              </div>
            </li>
            <li>
              <input
                type='radio'
                name='paymentMethod'
                id='check_payments'
                onChange={handleOnChange}
                checked={paymentMethod === 'check_payments'}
                value='check_payments'
              />
              <label htmlFor='check_payments'>Check Payments</label>
              <div className='po-box'>
                <p>
                  Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
                </p>
              </div>
            </li>
            <li>
              <input
                type='radio'
                name='paymentMethod'
                id='cash_on_delivery'
                onChange={handleOnChange}
                checked={paymentMethod === 'cash_on_delivery'}
                value='cash_on_delivery'
              />
              <label>Cash on delivery</label>
              <div className='po-box'>
                <p>Pay with cash upon delivery.</p>
              </div>
            </li>
            <li>
              <input
                type='radio'
                name='paymentMethod'
                id='paypal'
                onChange={handleOnChange}
                checked={paymentMethod === 'paypal'}
                value='paypal'
              />
              <label htmlFor='paypal'>Paypal</label>
              <div className='po-box'>
                <img
                  src='https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg'
                  alt='PayPal acceptance mark'
                />
                <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.</p>
              </div>
            </li>
          </ul>

          <div className='input-group'>
            <input
              id='agreement'
              type='checkbox'
              name='agreement'
              checked={userAgreed}
              onChange={() => setUserAgreed(!userAgreed)}
            />

            <label htmlFor='agreement'>I have read and agree to the website terms and conditions *</label>
          </div>

          <div className='btn-wrapper btn' onClick={handlePlaceOrder}>
            <label>Place Order</label>
            {paymentMethod === 'paypal' && userAgreed && (
              <div className='paypal-wrapper'>
                <Paypal total={totalPrice} />
              </div>
            )}
          </div>
          <button className='cancel-btn light-btn' onClick={handleOnCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
