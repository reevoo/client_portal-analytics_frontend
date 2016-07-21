import * as actionTypes from '../constants/action_types'

export function hideHeaderModules () {
  return { type: HIDE_HEADER_MODULES }
}

export function showHeaderModules () {
  return { type: SHOW_HEADER_MODULES, payload: Auth.currentUser().accessible_modules }
}

export function toggleLeftHandNav () {
  return { type: actionTypes.TOGGLE_LEFT_HAND_NAV }
}
