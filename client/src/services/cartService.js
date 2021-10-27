import axios from 'axios'
import { CartActions } from '../reducers/cartReducer'
import store from '../store'

const API_URL = process.env.REACT_APP_API_URL

export const upsertItem = async (item) => {
  store.dispatch({ type: CartActions.UpsertItem, payload: item })
}

export const removeItem = async (product) => {
  store.dispatch({ type: CartActions.RemoveItem, payload: product })
}

export const saveCart = async () => {
  const cart = store.getState().cartReducer.cart
  try {
    if (cart.id) {
      const { data: savedCart } = await axios.patch(
        API_URL + `carts/${cart.id}`,
        cart
      )
      store.dispatch({ type: CartActions.AddCart, payload: savedCart })
    } else {
      const { data: savedCart } = await axios.post(API_URL + `carts`, cart)
      store.dispatch({ type: CartActions.AddCart, payload: savedCart })
    }
    store.dispatch({ type: CartActions.ResetCart })
  } catch (error) {
    console.log('There was a problem saving the cart', cart, error)
  }
}

export const deleteCart = async (cart) => {
  try {
    const { data: deletedCart } = await axios.delete(
      API_URL + `carts/${cart.id}`
    )
    store.dispatch({ type: CartActions.RemoveCart, payload: deletedCart })
  } catch (error) {
    console.log('There was a problem deleting the cart', cart, error)
  }
}

export const fetchCarts = async () => {
  try {
    store.dispatch({ type: CartActions.RequestCarts })
    const { data: carts } = await axios.get(API_URL + 'carts')
    store.dispatch({ type: CartActions.SetCarts, payload: carts })
  } catch (error) {
    console.log('There was a problem fetching carts', error)
  }
}

export const setCart = (cart) => {
  store.dispatch({ type: CartActions.SetCart, payload: cart })
}
