import axios from 'axios'
import { authAxios } from '../../utils/helpers'

export const addToCart = payload => dispatch => {
  dispatch({ type: 'ADD_TO_CART', payload })
}

export const removeOne = id => dispatch => {
  dispatch({ type: 'REMOVE_ONE', payload: id })
}

export const removeMany = id => dispatch => {
  dispatch({ type: 'REMOVE_MANY', payload: id })
}

export const chooseShippingOption = option => dispatch => {
  dispatch({ type: 'CHOOSE_SHIPPING_OPTION', payload: option })
}

export const updateQuantity = product => dispatch => {
  dispatch({
    type: 'UPDATE_QUANTITY',
    payload: product
  })
}

export const updateTotalQuantity = () => dispatch => {
  dispatch({
    type: 'UPDATE_TOTAL_QUANTITY'
  })
}

export const checkout = ({ nonRegisteredUserDetails, checkOutDetails }) => async dispatch => {
  try {
    const { data } = nonRegisteredUserDetails
      ? await axios.post('/order', { checkOutDetails, nonRegisteredUserDetails })
      : await authAxios.post('/order', { checkOutDetails })

    await dispatch({
      type: 'CHECK_OUT',
      payload: data
    })

    return true
  } catch (error) {
    console.log(error)

    return false
  }
}

export const clearCheckout = () => dispatch => {
  dispatch({
    type: 'CLEAR_CHECKOUT'
  })
}
