import axios from 'axios'
import { CP_ANALYTICS_API } from '../constants/app_constants'

export const getTableauToken = () => axios.get(`${CP_ANALYTICS_API}tableau/token`)
