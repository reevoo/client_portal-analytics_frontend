import axios from 'axios'
import TableauAPI from '../services/tableau_api'

export const SELECT_DASHBOARD = 'SELECT_DASHBOARD'
export const ADD_DASHBOARD = 'ADD_DASHBOARD'

export function addDashboard (dashboard) {
  return { type: ADD_DASHBOARD, dashboard }
}

export function selectDashboard (dashboard) {
  return { type: SELECT_DASHBOARD, dashboard }
}

export function loadDashboards (dispatch, dashboards) {
  dashboards.map((dashboard) => {
    // TableauAPI.getWorkbook(dashboard).then((response) =>{
      dispatch(addDashboard(dashboard))
    // })
  })
}
