import axios from 'axios'
import { CP_ADMIN_API } from '../constants/app_constants'
import * as actionTypes from '../constants/action_types'

const PROFILE_URL = `${CP_ADMIN_API}profile`

export const fetchProfile = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_PROFILE })
  axios.get(PROFILE_URL)
    .then((response) => dispatch({ type: actionTypes.GET_PROFILE_SUCCESS, payload: response.data }))
    .catch((error) => dispatch({ type: actionTypes.GET_PROFILE_ERROR, payload: error }))
}
