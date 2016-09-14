import axios from 'axios'
import { CP_ADMIN_API } from '../constants/app_constants'

const PROFILE_URL = `${CP_ADMIN_API}profile`

export const getProfile = () => axios.get(PROFILE_URL)
