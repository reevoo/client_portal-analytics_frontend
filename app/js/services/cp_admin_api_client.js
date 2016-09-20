import { CP_ADMIN_API } from '../constants/app_constants'
import { get, parseJSON } from './auth'

const PROFILE_URL = `${CP_ADMIN_API}profile`

export const getProfile = () => get(PROFILE_URL).then(parseJSON)
