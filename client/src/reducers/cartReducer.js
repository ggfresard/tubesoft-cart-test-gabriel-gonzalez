const initialState = {
  loading: false,
  cart: { id: null, items: [] },
  carts: []
}

export const CartActions = {
  RequestCarts: 'REQUEST_CARTS',
  AddCart: 'ADD_CART',
  RemoveCart: 'REMOVE_CART',
  SetCarts: 'SET_CARTS',
  UpsertItem: 'ADD_ITEM',
  SetItemQuantity: 'SET_ITEM_QUANTITY',
  RemoveItem: 'REMOVE_ITEM',
  ResetCart: 'RESET_CART',
  SetCart: 'SET_CART'
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CartActions.RequestCarts:
      return { ...state, loading: true }
    case CartActions.SetCarts:
      return {
        ...state,
        carts: payload.sort((a, b) => a.id - b.id),
        loading: false
      }
    case CartActions.AddCart:
      return {
        ...state,
        carts: [
          ...state.carts.filter((cart) => cart.id !== payload.id),
          payload
        ].sort((a, b) => a.id - b.id)
      }
    case CartActions.RemoveCart:
      return {
        ...state,
        carts: [...state.carts.filter((cart) => cart.id !== payload.id)].sort(
          (a, b) => a.id - b.id
        )
      }
    case CartActions.ResetCart:
      return {
        ...state,
        cart: { id: null, items: [] }
      }
    case CartActions.UpsertItem:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [
            ...state.cart.items.filter((i) => i.product !== payload.product),
            {
              product: payload.product,
              quantity: payload.quantity > 0 ? payload.quantity : 1
            }
          ].sort((a, b) => a.product - b.product)
        }
      }
    case CartActions.RemoveItem:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [
            ...state.cart.items.filter((i) => i.product !== payload)
          ].sort((a, b) => a.product - b.product)
        }
      }
    case CartActions.SetCart:
      return { ...state, cart: payload }
    default:
      return state
  }
}

export default reducer
