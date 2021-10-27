import { combineReducers } from 'redux'
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import controlReducer from './controlReducer'

const rootReducer = combineReducers({
  productReducer,
  cartReducer,
  controlReducer
})

export default rootReducer
