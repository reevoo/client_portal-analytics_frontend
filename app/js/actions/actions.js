import Auth from '../services/auth'

export const HIDE_HEADER_MODULES = 'HIDE_HEADER_MODULES'
export const SHOW_HEADER_MODULES = 'SHOW_HEADER_MODULES'
export const TOGGLE_LEFT_HAND_NAV = 'TOGGLE_LEFT_HAND_NAV'

export function hideHeaderModules () {
  return { type: HIDE_HEADER_MODULES }
}

export function showHeaderModules () {
  return { type: SHOW_HEADER_MODULES, payload: Auth.currentUser().accessible_modules }
}

export function toggleLeftHandNav () {
  return { type: TOGGLE_LEFT_HAND_NAV }
}
