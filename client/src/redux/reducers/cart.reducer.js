import { round } from 'lodash'

const initialState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
  shippingOption: 'flat_rate',
  isCheckingOut: false,
  checkOutDetails: null
}

if (localStorage.products) {
  initialState.products = [...JSON.parse(localStorage.getItem('products'))]
  initialState.totalQuantity = JSON.parse(localStorage.getItem('totalQuantity'))
  initialState.totalPrice = JSON.parse(localStorage.getItem('totalPrice'))
}

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_TO_CART':
      const { quantity, price } = payload

      const payloadTotal = price * quantity

      const totalQuantity = state.totalQuantity + quantity

      const totalPrice = round(payloadTotal + state.totalPrice, 2)

      //  Check if item is already in the cart.
      const includedIndex = state.products.findIndex(item => item._id === payload._id)

      localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))

      localStorage.setItem('totalPrice', JSON.stringify(totalPrice))

      // If not, add to cart
      if (includedIndex < 0) {
        localStorage.setItem('products', JSON.stringify([...state.products, payload]))

        return {
          ...state,
          products: [...state.products, payload],
          totalQuantity,
          totalPrice
        }
      }

      // Finds the bought product then creates a copy
      const boughtProduct = state.products[includedIndex]

      // Adds bought quantity to the copied item
      boughtProduct.quantity = boughtProduct.quantity + quantity

      // Updates cart products
      // Replace & update bought product
      const updatedProducts = [
        ...state.products.slice(0, includedIndex),
        boughtProduct,
        ...state.products.slice(includedIndex + 1)
      ]

      localStorage.setItem('products', [JSON.stringify(updatedProducts)])

      return {
        ...state,
        products: updatedProducts,
        totalQuantity,
        totalPrice
      }

    case 'REMOVE_ONE':
      const removedItem = state.products.filter(item => item._id === payload)[0]

      const difference = round(state.totalPrice - removedItem.price, 2)

      const removedItemIndex = state.products.indexOf(removedItem)

      localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity - 1))
      localStorage.setItem('totalPrice', JSON.stringify(difference))

      // If only one left in the product, remove from cart
      if (removedItem.quantity <= 1) {
        localStorage.setItem('products', [
          JSON.stringify([...state.products.slice(0, removedItemIndex), ...state.products.slice(removedItemIndex + 1)])
        ])

        return {
          ...state,
          products: [...state.products.slice(0, removedItemIndex), ...state.products.slice(removedItemIndex + 1)],
          totalQuantity: state.totalQuantity - 1,
          totalPrice: difference
        }
      }

      // else SUBSTRACT QUANTITY of the item
      const substractedItem = state.products[removedItemIndex]
      substractedItem.quantity = state.products[removedItemIndex].quantity - 1

      localStorage.setItem('products', [
        JSON.stringify([
          ...state.products.slice(0, removedItemIndex),
          substractedItem,
          ...state.products.slice(removedItemIndex + 1)
        ])
      ])

      return {
        ...state,
        products: [
          ...state.products.slice(0, removedItemIndex),
          substractedItem,
          ...state.products.slice(removedItemIndex + 1)
        ],
        totalQuantity: state.totalQuantity - 1,
        totalPrice: difference
      }

    case 'REMOVE_MANY':
      const removedManyItem = state.products.filter(item => item._id === payload)[0]

      const reducedItems = [...state.products.filter(item => item._id !== payload)]
      const reducedQuantity = state.totalQuantity - removedManyItem.quantity

      const reducedTotalPrice = round(state.totalPrice - removedManyItem.price * removedManyItem.quantity, 2)

      localStorage.setItem('products', JSON.stringify(reducedItems))
      localStorage.setItem('totalQuantity', JSON.stringify(reducedQuantity))
      localStorage.setItem('totalPrice', JSON.stringify(reducedTotalPrice))

      return {
        ...state,
        products: reducedItems,
        totalQuantity: reducedQuantity,
        totalPrice: reducedTotalPrice
      }

    case 'UPDATE_QUANTITY': {
      const productIndex = state.products.findIndex(p => p._id === payload.id)

      const oldProduct = state.products[productIndex]
      const oldProductQuantity = oldProduct.quantity

      const oldProductTotalPrice = round(oldProduct.price * oldProduct.quantity, 2)

      const newProduct = state.products[productIndex]
      const newProductQuantity = payload.quantity
      newProduct.quantity = newProductQuantity

      const updatedTotalPrice = round(newProduct.price * newProduct.quantity, 2)

      return {
        ...state,
        products: [...state.products.slice(0, productIndex), newProduct, ...state.products.slice(productIndex + 1)],
        totalQuantity: state.totalQuantity - oldProductQuantity + newProductQuantity,
        totalPrice: state.totalPrice - oldProductTotalPrice + updatedTotalPrice
      }
    }

    case 'CHOOSE_SHIPPING_OPTION':
      return { ...state, shippingOption: payload }

    case 'CHECK_OUT':
      localStorage.removeItem('products')
      localStorage.removeItem('totalQuantity')
      localStorage.removeItem('totalPrice')

      return {
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
        shippingOption: 'flat_rate',
        isCheckingOut: true,
        checkOutDetails: payload
      }

    case 'CLEAR_CHECKOUT':
      return {
        ...state,
        isCheckingOut: false,
        checkOutDetails: null
      }

    default:
      return state
  }
}

export default cartReducer
