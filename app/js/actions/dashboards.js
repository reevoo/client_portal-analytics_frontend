import axios from 'axios'
import TableauAPI from '../services/tableau_api'
import AnalyticsAPI from '../services/analytics_api'
import * as actionTypes from '../constants/action_types'

export const getDashboardToken = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_DASHBOARD_TOKEN })
  return AnalyticsAPI.getTableauToken()
    .then((response) => dispatch({ type: actionTypes.GET_DASHBOARD_TOKEN_SUCCESS, response }))
    .catch((error) => dispatch({ type: actionTypes.GET_DASHBOARD_TOKEN_ERROR, error }))
}

export const loadDashboards = (dashboards) => (dispatch) => {
  dispatch({ type: actionTypes.GET_DASHBOARDS_NAMES })
  return TableauAPI.getWorkbooks(dashboards)
    .then((response) => dispatch({ type: actionTypes.GET_DASHBOARDS_NAMES_SUCCESS, response }))
    .catch((error) => dispatch({ type: actionTypes.GET_DASHBOARDS_NAMES_ERROR, error }))
}

export const selectDashboard = (dashboard) => (dispatch) =>
  dispatch({ type: actionTypes.SELECT_DASHBOARD, dashboard })
