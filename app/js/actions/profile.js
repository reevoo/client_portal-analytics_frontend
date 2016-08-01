import axios from 'axios'
import { CP_ADMIN_HOST } from '../constants/app_constants'
import * as actionTypes from '../constants/action_types'

const PROFILE_URL = CP_ADMIN_HOST + 'api/v1/profile'

export const setProfile = (profile) => ({ type: actionTypes.SET_PROFILE, payload: profile })

export const fetchProfile = () => (dispatch) => {
  axios.get(PROFILE_URL).then((response) => {
    let profile = response.data
    dispatch(setProfile(profile))
  })
}
