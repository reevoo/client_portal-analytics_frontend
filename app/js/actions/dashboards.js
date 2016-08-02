import { push } from 'redux-router'
import Api from '../services/api'
import * as actionTypes from '../constants/action_types'

export const getDashboardToken = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_DASHBOARD_TOKEN })
  return Api.getTableauToken()
    .then((response) => dispatch({ type: actionTypes.GET_DASHBOARD_TOKEN_SUCCESS, payload: response.data }))
    .catch((error) => dispatch({ type: actionTypes.GET_DASHBOARD_TOKEN_ERROR, error: error.data }))
}

export const loadDashboards = (dashboards) => (dispatch, getState) => {
  dispatch({ type: actionTypes.GET_DASHBOARDS_NAMES })
  return Api.getWorkbooks(dashboards)
    .then((response) => {
      const dashboards = response.data
      dispatch({ type: actionTypes.GET_DASHBOARDS_NAMES_SUCCESS, payload: dashboards })
      // We need to change the url in the initial load if there is none in the current url
      if (!getState().router.params.id) {
        dispatch(push({ pathname: `/dashboards/${dashboards[0].id}` }))
      }
    })
    .catch((error) => dispatch({ type: actionTypes.GET_DASHBOARDS_NAMES_ERROR, error: error.data }))
}

export const selectDashboard = (dashboard) => (dispatch) =>
  dispatch({ type: actionTypes.SELECT_DASHBOARD, dashboard })
