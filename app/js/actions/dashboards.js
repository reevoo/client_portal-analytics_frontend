import axios from 'axios'
import TableauAPI from '../services/tableau_api'
import AnalyticsAPI from '../services/analytics_api'

export const SELECT_DASHBOARD = 'SELECT_DASHBOARD'
export const GET_DASHBOARDS_NAMES = 'GET_DASHBOARDS_NAMES'
export const GET_DASHBOARDS_NAMES_SUCCESS = 'GET_DASHBOARDS_NAMES_SUCCESS'
export const GET_DASHBOARDS_NAMES_ERROR = 'GET_DASHBOARDS_NAMES_ERROR'
export const GET_DASHBOARD_TOKEN = 'GET_DASHBOARD_TOKEN'
export const GET_DASHBOARD_TOKEN_SUCCESS = 'GET_DASHBOARD_TOKEN_SUCCESS'
export const GET_DASHBOARD_TOKEN_ERROR = 'GET_DASHBOARD_TOKEN_ERROR'

export const getDashboardToken = () => (dispatch) => {
  dispatch({ type: GET_DASHBOARD_TOKEN })
  return AnalyticsAPI.getTableauToken()
    .then((response) => dispatch({ type: GET_DASHBOARD_TOKEN_SUCCESS, response }))
    .catch((error) => dispatch({ type: GET_DASHBOARD_TOKEN_ERROR, error }))
}

export const loadDashboards = (dashboards) => (dispatch) => {
  dispatch({ type: GET_DASHBOARDS_NAMES })
  return TableauAPI.getWorkbooks(dashboards)
    .then((response) => dispatch({ type: GET_DASHBOARDS_NAMES_SUCCESS, response }))
    .catch((error) => dispatch({ type: GET_DASHBOARDS_NAMES_ERROR, error }))
}

export const selectDashboard = (dashboard) => (dispatch) =>
  dispatch({ type: SELECT_DASHBOARD, dashboard })
