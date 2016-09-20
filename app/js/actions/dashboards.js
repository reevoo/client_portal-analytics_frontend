import { push } from 'redux-router'
import { getTableauToken } from '../services/cp_analytics_api_client'
import { getWorkbooks } from '../services/tableau_gateway_api_client'
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
    .then((dashboards) => {
      dispatch({ type: actionTypes.GET_DASHBOARDS_NAMES_SUCCESS, payload: dashboards })
      // We need to change the url in the initial load if there is none in the current url
      if (!getState().router.params.id) {
        dispatch(push({ pathname: `/dashboards/${dashboards[0].id}` }))
      }
    })
    .catch((error) => dispatch({ type: actionTypes.GET_DASHBOARDS_NAMES_ERROR, error }))
}

export const selectDashboard = (dashboard) => (dispatch) =>
  dispatch({ type: actionTypes.SELECT_DASHBOARD, dashboard })
