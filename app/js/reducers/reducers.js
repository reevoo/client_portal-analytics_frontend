import { TOGGLE_LEFT_HAND_NAV } from '../actions/actions.js'

const initialState = {
  leftHandNavVisible: true,
}

export default function analyticsApp (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LEFT_HAND_NAV:
      return { ...state, leftHandNavVisible: !state.leftHandNavVisible }
    default:
      return state
  }
}
