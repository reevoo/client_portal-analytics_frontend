import Api from '../services/api'
import * as actionTypes from '../constants/action_types'

export const getDashboardToken = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_DASHBOARD_TOKEN })
  return Api.getTableauToken()
    .then((response) => dispatch({ type: actionTypes.GET_DASHBOARD_TOKEN_SUCCESS, payload: response.data }))
    .catch((error) => dispatch({ type: actionTypes.GET_DASHBOARD_TOKEN_ERROR, error: error.data }))
}

export const loadDashboards = (dashboards) => (dispatch) => {
  dispatch({ type: actionTypes.GET_DASHBOARDS_NAMES })
  return Api.getWorkbooks(dashboards)
    .then((response) => dispatch({ type: actionTypes.GET_DASHBOARDS_NAMES_SUCCESS, payload: response.data }))
    .catch((error) => dispatch({ type: actionTypes.GET_DASHBOARDS_NAMES_ERROR, error: error.data }))
}

export const selectDashboard = (dashboard) => (dispatch) =>
  dispatch({ type: actionTypes.SELECT_DASHBOARD, dashboard })
