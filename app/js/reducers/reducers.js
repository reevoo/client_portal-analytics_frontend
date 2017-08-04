import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import * as actionTypes from '../constants/action_types'
import {
  CP_ADMIN_URL, CP_ANALYTICS_URL, FAST_RESPONSE_URL, REEVOO_ADMIN_URL, VETTING_URL, HELP_URL,
  ERROR_HANDLING_SERVICE_URL,
} from '../constants/app_constants'

const initialState = {
  leftHandNavVisible: true,
  headerModulesVisible: false,
  accessibleModules: [],
  profile: null,
  dashboards: [],
}

import adminImagePath from 'client_portal-assets/dist/images/app_icons/large/admin.png'
import analyticsImagePath from 'client_portal-assets/dist/images/app_icons/large/analytics.png'
import fastResponseImagePath from 'client_portal-assets/dist/images/app_icons/large/fast_response.png'
import reevooAdminImagePath from 'client_portal-assets/dist/images/app_icons/large/reevoo_admin.png'
import vettingImagePath from 'client_portal-assets/dist/images/app_icons/large/vetting.png'
import helpImagePath from 'client_portal-assets/dist/images/app_icons/large/help.png'
import errorHandlingServiceImagePath from 'client_portal-assets/dist/images/app_icons/large/error_handling_service.png'

export const modules = (accessibleModules) => {
  const availableModules = {
    admin: {
      url: CP_ADMIN_URL,
      name: 'Admin',
      imageUrl: adminImagePath,
      position: 1,
    },
    analytics: {
      url: CP_ANALYTICS_URL,
      name: 'Analytics',
      imageUrl: analyticsImagePath,
      position: 2,
    },
    fast_response: {
      url: FAST_RESPONSE_URL,
      name: 'Fast Response',
      imageUrl: fastResponseImagePath,
      position: 3,
    },
    reevoo_admin: {
      url: REEVOO_ADMIN_URL,
      name: 'Reevoo Admin',
      imageUrl: reevooAdminImagePath,
      position: 4,
    },
    vetting: {
      url: VETTING_URL,
      name: 'Vetting',
      imageUrl: vettingImagePath,
      position: 5,
    },
    help: {
      url: HELP_URL,
      name: 'Help & FAQ',
      imageUrl: helpImagePath,
      position: 6,
    },
    error_handling_service: {
      url: ERROR_HANDLING_SERVICE_URL,
      name: 'Error Service',
      imageUrl: errorHandlingServiceImagePath,
      position: 7,
    },
  }

  let filteredModules = accessibleModules
    .filter((name) => !!availableModules[name]) // Filter out modules which aren't available
    .map((name) => availableModules[name])

  let sortedModules = filteredModules.sort((moduleA, moduleB) => {
    return moduleA.position > moduleB.position ? 1 : -1
  })

  return sortedModules
}

const initialUIState = {
  loadingDashboardValues: false,
}

export const ui = (state = initialUIState, action) => {
  switch (action.type) {
    case actionTypes.SET_DASHBOARD_FILTER_INIT:
      return { ...state, loadingDashboardValues: true }
    case actionTypes.SET_DASHBOARD_FILTER:
      return { ...state, loadingDashboardValues: false }

    case actionTypes.SHOW_DASHBOARD_VIEW_INIT:
      return { ...state, loadingDashboardValues: true }
    case actionTypes.SHOW_DASHBOARD_VIEW:
      return { ...state, loadingDashboardValues: false }

    default:
      return state
  }
}

export const analyticsApp = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_LEFT_HAND_NAV:
      return { ...state, leftHandNavVisible: !state.leftHandNavVisible }

    case actionTypes.GET_PROFILE_AND_DASHBOARDS_SUCCESS:
      return {
        ...state,
        profile: { ...action.payload.profile },
        dashboards: [ ...action.payload.dashboards ],
      }

    case actionTypes.SET_WORKBOOK_VALUES:
      return {
        ...state,
        workbook: {
          filters: action.payload.filters,
          views: action.payload.views,
          /**
           * As this is called just on the initial load of a dashboard,
           * we set the defaultView as the selectedView
           */
          selectedView: action.payload.defaultView,
          defaultView: action.payload.defaultView,
        },
      }

    case actionTypes.GET_TABLEAU_API_FOR_DASHBOARD:
      return {
        ...state,
        tableauAPI: action.payload,
      }

    case actionTypes.SET_DASHBOARD_FILTER:
      return {
        ...state,
        workbook: {
          ...state.workbook,
          filters: state.workbook.filters.map((filter) => ({
            ...filter,
            selectedValue: action.payload.name === filter.name ? action.payload.value : filter.selectedValue,
          })),
        },
      }

    case actionTypes.ADD_DASHBOARD_VIEW:
      return {
        ...state,
        workbook: {
          ...state.workbook,
          views: [ ...state.workbook.views, action.payload ],
          selectedView: action.payload,
        },
      }

    case actionTypes.REMOVE_DASHBOARD_VIEW:
      return {
        ...state,
        workbook: {
          ...state.workbook,
          views: state.workbook.views.filter((view) => view !== action.payload),
          selectedView: state.workbook.selectedView !== action.payload
            ? state.workbook.selectedView
            : null,
          defaultView: state.workbook.defaultView !== action.payload
            ? state.workbook.defaultView
            : null,
        },
      }

    case actionTypes.SET_DEFAULT_DASHBOARD_VIEW:
      return {
        ...state,
        workbook: {
          ...state.workbook,
          filters: action.payload.filters,
          defaultView: action.payload.defaultView,
          selectedView: action.payload.selectedView,
        },
      }

    case actionTypes.SHOW_DASHBOARD_VIEW:
      return {
        ...state,
        workbook: {
          ...state.workbook,
          filters: action.payload.filters,
          selectedView: action.payload.selectedView,
        },
      }

    case actionTypes.SHOW_HEADER_MODULES:
      return {
        ...state,
        headerModulesVisible: true,
        accessibleModules: modules(action.payload),
      }

    case actionTypes.HIDE_HEADER_MODULES:
      return { ...state, headerModulesVisible: false }

    default:
      return state
  }
}

export default combineReducers({
  analyticsApp,
  ui,
  router: routerStateReducer,
})
