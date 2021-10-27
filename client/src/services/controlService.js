import { ControlActions } from '../reducers/controlReducer'
import store from '../store'

export const setDrawerOpen = (opened) => {
  store.dispatch({ type: ControlActions.SetDrawerOpen, payload: opened })
}
