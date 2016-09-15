import { CP_ANALYTICS_API } from '../constants/app_constants'
import { get, parseJSON } from './auth'

export const getTableauToken = () => get(`${CP_ANALYTICS_API}tableau/token`).then(parseJSON)
