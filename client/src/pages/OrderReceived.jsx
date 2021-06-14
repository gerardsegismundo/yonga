import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { formatDate } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { clearCheckout } from '../redux/actions'

const OrderReceived = () => {
  const dispatch = useDispatch()
  const { cart, user } = useSelector(data => data)

  const { checkOutDetails, isCheckingOut } = cart

  const clearCheckoutRef = useRef(() => dispatch(clearCheckout()))

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => clearCheckoutRef.current()
  }, [])

  if (!isCheckingOut) {
    return <h1>NO purchase</h1>
  }

  if (!checkOutDetails) {
    return <h1>Loading... </h1>
  } else {
    const { _id: orderNumber, cartProducts, paymentMethod, totalPrice, addInfo, createdAt } = checkOutDetails

    const { companyName, apartment, country, email, houseNumAndStrtName, name, phone, postcode, town } =
      checkOutDetails.nonRegisteredUserDetails || user.data

    return (
      <div className='order-received'>
        <div className='payment-details'>
          <table>
            <thead>
              <tr>
                <th>Order number:</th>
                <th>Date:</th>
                <th>Email:</th>
                <th>Total:</th>
                <th>Payment method:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{orderNumber}</td>
                <td>{formatDate(createdAt)}</td>
                <td>{email}</td>
                <td>${totalPrice}</td>
                <td>{paymentMethod}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='order-details'>
          <h2>Order details</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map(({ name, price, quantity, _id }) => (
                <tr key={_id}>
                  <td>
                    {name} &times; {quantity}
                  </td>
                  <td>{price}</td>
                </tr>
              ))}

              <tr>
                <td>Total</td>
                <td>${totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='billing-details'>
          <h2>Billing details</h2>
          <p>{name}</p>
          {companyName && <p>{companyName}</p>}
          <p>{country}</p>
          <p>{houseNumAndStrtName}</p>
          {apartment && <p>{apartment}</p>}
          <p>{town}</p>
          <p>{postcode}</p>
          <p>{phone}</p>
          <p>{email}</p>
        </div>
        {addInfo && (
          <div className='add-info'>
            <h2>Additional information</h2>
            <p>{addInfo}</p>
          </div>
        )}
        <Link className='dark-btn btn' to='/'>
          Back to home
        </Link>
      </div>
    )
  }
}

export default OrderReceived
