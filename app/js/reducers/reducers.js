import { TOGGLE_LEFT_HAND_NAV } from '../actions/actions.js'

const initialState = {
  leftHandNavVisible: true,
}

export default function analyticsApp (state = initialState, action) {
  console.log(state)
  console.log(action)
  switch (action.type) {
    case TOGGLE_LEFT_HAND_NAV:
      // return {leftHandNavVisible: !state.leftHandNavVisible}
      return Object.assign({}, state, {leftHandNavVisible: !state.leftHandNavVisible})
    default:
      return state
  }
}
