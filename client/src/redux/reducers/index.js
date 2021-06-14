import { combineReducers } from 'redux'
import uiReducer from './ui.reducer'
import cartReducer from './cart.reducer'
import userReducer from './user.reducer'
import productReducer from './product.reducer'

export default combineReducers({
  ui: uiReducer,
  user: userReducer,
  cart: cartReducer,
  products: productReducer
})
