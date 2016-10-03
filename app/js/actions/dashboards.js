import { push } from 'redux-router'
import tableau from 'tableau'
import { getTableauToken } from '../services/cp_analytics_api_client'
import { getWorkbooks } from '../services/tableau_gateway_api_client'
import { TABLEAU_HOST } from '../constants/app_constants'
import * as actionTypes from '../constants/action_types'

export const getDashboardToken = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_DASHBOARD_TOKEN })
  return getTableauToken()
    .then((response) => dispatch({ type: actionTypes.GET_DASHBOARD_TOKEN_SUCCESS, payload: response }))
    .catch((error) => dispatch({ type: actionTypes.GET_DASHBOARD_TOKEN_ERROR, error }))
}

export const loadDashboards = (dashboardIds) => (dispatch, getState) => {
  dispatch({ type: actionTypes.GET_DASHBOARDS_NAMES })
  return getWorkbooks(dashboardIds)
    .then((responseDashboards) => {
      // The API might return null values inside the array, so we need to filter them
      const dashboards = responseDashboards.filter((dashboard) => !!dashboard)

      dispatch({ type: actionTypes.GET_DASHBOARDS_NAMES_SUCCESS, payload: dashboards })
      // We need to change the url in the initial load if there is none in the current url
      if (dashboards.length > 0 && !getState().router.params.id) {
        dispatch(push({ pathname: `/dashboards/${dashboards[0].id}` }))
      }
    })
    .catch((error) => dispatch({ type: actionTypes.GET_DASHBOARDS_NAMES_ERROR, error }))
}

export const selectDashboard = (dashboard) => (dispatch) =>
  dispatch({ type: actionTypes.SELECT_DASHBOARD, dashboard })

export const initTableauDashboard = (node, token, viewId, userId) => (dispatch, getState) => {
  const currentTableauAPI = getState().analyticsApp.tableauAPI
  // If there is an existing dashboard loaded, we need to call `dispose` to reuse the same DOM node
  if (currentTableauAPI) {
    currentTableauAPI.dispose()
  }
  const tableauAPI = new tableau.Viz(
    node,
    `${TABLEAU_HOST}trusted/${token}/views/${viewId}?:embed=yes&:toolbar=no&:showShareOptions=no&:record_performance=yes&UUID=${userId}`,
    {
      height: '2500px',
      width: '1000px',
    }
  )
  dispatch({ type: actionTypes.GET_TABLEAU_API_FOR_DASHBOARD, payload: tableauAPI })
}
