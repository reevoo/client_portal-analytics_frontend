import axios from 'axios'
import { CP_ADMIN_HOST } from '../constants/app_constants'
import { loadDashboards } from './dashboards'

const PROFILE_URL = CP_ADMIN_HOST + 'api/v1/profile'

export const SET_PROFILE = 'SET_PROFILE'

export function setProfile (profile) {
  return { type: SET_PROFILE, profile }
}

export function fetchProfile(){
  return (dispatch) => {
    axios.get(PROFILE_URL).then((response) =>{
      let profile = response.data

      dispatch(setProfile(profile))
    })
  }
}
