import React from 'react'

const Orders = ({ orders }) => {
  return (
    <div>
      <h2>Orders</h2>
      <p>Your recent orders:</p>

      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <p>Order # {order._id}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Orders
