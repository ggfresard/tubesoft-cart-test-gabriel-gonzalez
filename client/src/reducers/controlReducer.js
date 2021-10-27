const initialState = {
  drawerOpened: false
}

export const ControlActions = {
  SetDrawerOpen: 'SET_DRAWER_OPEN'
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ControlActions.SetDrawerOpen:
      return { ...state, drawerOpened: payload }
    default:
      return state
  }
}

export default reducer
