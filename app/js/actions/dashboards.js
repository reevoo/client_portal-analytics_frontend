import axios from 'axios'
import TableauAPI from '../services/tableau_api'
import AnalyticsAPI from '../services/analytics_api'

export const SELECT_DASHBOARD = 'SELECT_DASHBOARD'
export const ADD_DASHBOARD = 'ADD_DASHBOARD'
export const GET_DASHBOARD_TOKEN = 'GET_DASHBOARD_TOKEN'
export const GET_DASHBOARD_TOKEN_SUCCESS = 'GET_DASHBOARD_TOKEN_SUCCESS'
export const GET_DASHBOARD_TOKEN_ERROR = 'GET_DASHBOARD_TOKEN_ERROR'


export function addDashboard (dashboard) {
  return { type: ADD_DASHBOARD, dashboard }
}

export function selectDashboard (dashboard) {
  return { type: SELECT_DASHBOARD, dashboard }
}

export const getDashboardToken = () => (dispatch) => {
  dispatch({ type: GET_DASHBOARD_TOKEN })
  return AnalyticsAPI.getTableauToken()
    .then((response) => dispatch({ type: GET_DASHBOARD_TOKEN_SUCCESS, response }))
    .catch((error) => dispatch({ type: GET_DASHBOARD_TOKEN_ERROR, error }))
}

export function loadDashboards (dispatch, dashboards) {
  dashboards.map((dashboard) => {
    TableauAPI.getWorkbook(dashboard).then((response) =>{
      dispatch(addDashboard(response.data))
    })
  })
}
