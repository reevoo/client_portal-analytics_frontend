import { CP_ANALYTICS_API } from '../constants/app_constants'
import { get, post, parseJSON } from './auth'

export const getTableauToken = () => get(`${CP_ANALYTICS_API}tableau/token`).then(parseJSON)
export const postStats = (type, key, value) => post(`${CP_ANALYTICS_API}stats`, { type, key, value })
