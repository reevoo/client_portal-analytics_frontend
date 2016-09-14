/* global fetch */
import { CP_ADMIN_API } from '../constants/app_constants'

const PROFILE_URL = `${CP_ADMIN_API}profile`

export const getProfile = () => fetch(PROFILE_URL).then((response) => response.json())
