const initialState = {
  loading: false,
  products: []
}

export const ProductActions = {
  RequestProducts: 'REQUEST_PRODUCTS',
  SetProducts: 'SET_PRODUCTS'
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ProductActions.RequestProducts:
      return { ...state, loading: true }
    case ProductActions.SetProducts:
      return { ...state, products: payload, loading: false }
    default:
      return state
  }
}

export default reducer
