import axios from 'axios'
import { CP_ADMIN_HOST } from '../constants/app_constants'
import { loadDashboards } from './dashboards'
import * as actionTypes from '../constants/action_types'

const PROFILE_URL = CP_ADMIN_HOST + 'api/v1/profile'

export function setProfile (profile) {
  return { type: actionTypes.SET_PROFILE, payload: profile }
}

export function fetchProfile(){
  return (dispatch) => {
    axios.get(PROFILE_URL).then((response) =>{
      let profile = response.data

      dispatch(setProfile(profile))
    })
  }
}
