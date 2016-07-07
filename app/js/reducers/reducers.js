import { TOGGLE_DRAWER } from '../actions/actions.js'

const initialState = {
  drawerVisible: true,
}

export default function analyticsApp (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return Object.assign({}, state, {drawerVisible: !state.drawerVisible})
    default:
      return state
  }
}
