import { TOGGLE_LEFT_HAND_NAV, SHOW_HEADER_MODULES, HIDE_HEADER_MODULES } from '../actions/actions.js'

const initialState = {
  leftHandNavVisible: true,
  headerModulesVisible: false,
  accessibleModules: [],
}

import adminImagePath from 'client_portal-assets/dist/images/app_icons/large/admin.png'
import analyticsImagePath from 'client_portal-assets/dist/images/app_icons/large/analytics.png'
import fastResponseImagePath from 'client_portal-assets/dist/images/app_icons/large/fast_response.png'
import reevooAdminImagePath from 'client_portal-assets/dist/images/app_icons/large/reevoo_admin.png'
import vettingImagePath from 'client_portal-assets/dist/images/app_icons/large/vetting.png'
import helpImagePath from 'client_portal-assets/dist/images/app_icons/large/help.png'

export const modules = (accessibleModules) => {
  const availableModules = {
    admin: {
      url: '/admin',
      name: 'Admin',
      imageUrl: adminImagePath,
    },
    analytics: {
      url: '/analytics',
      name: 'Analytics',
      imageUrl: analyticsImagePath,
    },
    fast_response: {
      url: '/fast_response',
      name: 'Fast Response',
      imageUrl: fastResponseImagePath,
    },
    reevoo_admin: {
      url: '/reevoo_admin',
      name: 'Reevoo Admin',
      imageUrl: reevooAdminImagePath,
    },
    vetting: {
      url: '/vetting',
      name: 'Vetting',
      imageUrl: vettingImagePath,
    },
    help: {
      url: '/admin/help',
      name: 'Help & FAQ',
      imageUrl: helpImagePath,
    },
  }

  let orderedModules = accessibleModules
    .filter((name) => name !== 'help' && !!availableModules[name]) // Filter out modules which aren't available
    .sort()
    .map((name) => availableModules[name])

  /* Everyone has access to the 'help' module, but we want to display it at the end of lists,
   * so filter it out above and then just push it on here... Yes, it is a bit crap so please
   * do improve if you have better brains than us
   */
  if (accessibleModules.indexOf('help') > -1) {
    orderedModules.push(availableModules.help)
  }

  return orderedModules
}

export default function analyticsApp (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LEFT_HAND_NAV:
      return { ...state, leftHandNavVisible: !state.leftHandNavVisible }
    case SHOW_HEADER_MODULES:
      return {
        ...state,
        headerModulesVisible: true,
        accessibleModules: modules(action.payload),
      }
    case HIDE_HEADER_MODULES:
      return { ...state, headerModulesVisible: false }
    default:
      return state
  }
}
