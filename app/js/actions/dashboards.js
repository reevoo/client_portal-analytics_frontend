import { push } from 'redux-router'
import {
  createTableauAPI,
  setFilterValue,
  saveCustomView,
  setDefaultCustomView,
  showCustomView,
  removeCustomView,
  getParametersAndFilters,
} from '../services/tableau'
import { getProfile } from '../services/cp_admin_api_client'
import { getTableauToken } from '../services/cp_analytics_api_client'
import { getWorkbooks } from '../services/tableau_gateway_api_client'
import * as actionTypes from '../constants/action_types'

const getCurrentWorkbook = (state) => state.analyticsApp.tableauAPI.getWorkbook()

export const getProfileAndDashboards = () => (dispatch, getState) => {
  dispatch({ type: actionTypes.GET_PROFILE_AND_DASHBOARDS })

  return getProfile().then((profile) => {
    const dashboardIds = profile && profile.client_users_accessible_dashboards
      ? profile.client_users_accessible_dashboards
      : []

    return getWorkbooks(dashboardIds).then((responseDashboards) => {
      // The API might return null values inside the array, so we need to filter them
      const dashboards = responseDashboards.filter((dashboard) => !!dashboard)

      dispatch({ type: actionTypes.GET_PROFILE_AND_DASHBOARDS_SUCCESS, payload: { profile, dashboards } })

      // We need to change the url in the initial load if there is none in the current url
      if (!getState().router.params.id) {
        dispatch(push({ pathname: `/dashboards/${dashboards[0].id}` }))
      }
    }).catch((error) => dispatch({ type: actionTypes.GET_PROFILE_AND_DASHBOARDS_ERROR, error }))
  }).catch((error) => dispatch({ type: actionTypes.GET_PROFILE_AND_DASHBOARDS_ERROR, error }))
}

/**
 * Loads the Tableau Dashboard identified by the @id param in the url
 */
export const loadTableauDashboard = () => (dispatch, getState) => {
  dispatch({ type: actionTypes.GET_DASHBOARD_TOKEN })

  return getTableauToken().then(({ token }) => {
    const { analyticsApp, router } = getState()
    const { profile, dashboards } = analyticsApp

    // If there is an existing dashboard loaded, we need to call `dispose` to reuse the same DOM node
    if (analyticsApp.tableauAPI) {
      analyticsApp.tableauAPI.dispose()
    }

    const tableauAPI = createTableauAPI({
      userId: profile.id,
      token,
      viewId: getSelectedDashboardById(dashboards, router.params.id).views[0].replace('sheets/', ''),
      onLoad: ([appFilters, views]) => {
        const defaultView = views.find((view) => view.isDefault)
        return dispatch({
          type: actionTypes.SET_WORKBOOK_VALUES,
          payload: {
            filters: appFilters,
            views: views.map((view) => view.name),
            defaultView: defaultView && defaultView.name,
          },
        })
      },
    })

    return dispatch({ type: actionTypes.GET_TABLEAU_API_FOR_DASHBOARD, payload: tableauAPI })
  })
  .catch((error) => dispatch({ type: actionTypes.GET_DASHBOARD_TOKEN_ERROR, error }))
}

export const changeFilter = (filterName, filterValue) => (dispatch, getState) => {
  dispatch({ type: actionTypes.SET_DASHBOARD_FILTER_INIT })

  const state = getState()
  const filter = state.analyticsApp.workbook.filters.find((f) => f.name === filterName)

  if (filter) {
    return setFilterValue(getCurrentWorkbook(state), filter, filterValue).then(() => dispatch({
      type: actionTypes.SET_DASHBOARD_FILTER,
      payload: { name: filterName, value: filterValue },
    }))
  }
}

export const showDashboardView = (name) => (dispatch, getState) => {
  dispatch({ type: actionTypes.SHOW_DASHBOARD_VIEW_INIT })

  const workbook = getCurrentWorkbook(getState())

  return showCustomView(workbook, name).then(() =>
    /**
     * We should call getParametersAndFilters inside showCustomView,
     * but we need to wrap the tableauAPI Promises implementation first,
     * as it doesn't play nice with the official one. Yay Tableau!
     */
    getParametersAndFilters(workbook).then((filters) => dispatch({
      type: actionTypes.SHOW_DASHBOARD_VIEW,
      payload: { filters, selectedView: name },
    }))
  )
}

export const saveDashboardView = (name) => (dispatch, getState) =>
  saveCustomView(getCurrentWorkbook(getState()), name).then(() =>
    dispatch({ type: actionTypes.ADD_DASHBOARD_VIEW, payload: name })
  )

export const setDefaultDashboardView = (name) => (dispatch, getState) => {
  const workbook = getCurrentWorkbook(getState())

  return setDefaultCustomView(workbook, name).then(() =>
    /**
     * We should call getParametersAndFilters inside showCustomView,
     * but we need to wrap the tableauAPI Promises implementation first,
     * as it doesn't play nice with the official one. Yay Tableau!
     */
    getParametersAndFilters(workbook).then((filters) => dispatch({
      type: actionTypes.SET_DEFAULT_DASHBOARD_VIEW,
      payload: { filters, selectedView: name, defaultView: name },
    })))
}

export const removeDashboardView = (name) => (dispatch, getState) =>
  removeCustomView(getCurrentWorkbook(getState()), name).then(() =>
    dispatch({ type: actionTypes.REMOVE_DASHBOARD_VIEW, payload: name })
  )

export const getSelectedDashboardById = (dashboards, id) =>
  dashboards.find((dashboard) => dashboard.id === id)

export const exportImageDashboard = () => (dispatch, getState) =>
  getState().analyticsApp.tableauAPI.showExportImageDialog()

export const exportPDFDashboard = () => (dispatch, getState) =>
  getState().analyticsApp.tableauAPI.showExportPDFDialog()
