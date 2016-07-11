import { TOGGLE_LEFT_HAND_NAV } from '../actions/actions.js'

const initialState = {
  visible: true,
}

export default function analyticsApp (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LEFT_HAND_NAV:
      return Object.assign({}, state, {visible: !state.visible})
    default:
      return state
  }
}
