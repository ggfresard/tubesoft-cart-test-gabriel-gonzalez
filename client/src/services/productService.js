import store from '../store'
import { ProductActions } from '../reducers/productReducer'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const fetchProducts = async () => {
  store.dispatch({ type: ProductActions.RequestProducts })
  try {
    const { data: products } = await axios.get(API_URL + 'products')
    store.dispatch({ type: ProductActions.SetProducts, payload: products })
  } catch (error) {
    console.log('Error fetching products', error)
  }
}

export const productById = (id) => {
  return store
    .getState()
    .productReducer.products.find((product) => product.id === id)
}
