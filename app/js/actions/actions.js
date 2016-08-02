import * as actionTypes from '../constants/action_types'
import Auth from '../services/auth'

export function hideHeaderModules () {
  return { type: actionTypes.HIDE_HEADER_MODULES }
}

export function showHeaderModules () {
  return { type: actionTypes.SHOW_HEADER_MODULES, payload: Auth.currentUser().accessible_modules }
}

export function toggleLeftHandNav () {
  return { type: actionTypes.TOGGLE_LEFT_HAND_NAV }
}
