import * as actionTypes from '../constants/action_types'
import { getProfile } from '../services/cp_admin_api_client'

export const fetchProfile = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_PROFILE })
  return getProfile()
    .then((response) => dispatch({ type: actionTypes.GET_PROFILE_SUCCESS, payload: response }))
    .catch((error) => dispatch({ type: actionTypes.GET_PROFILE_ERROR, error: error }))
}
