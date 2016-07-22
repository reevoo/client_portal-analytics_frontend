import axios from 'axios'
import { CP_ANALYTICS_HOST } from '../constants/app_constants'

const AnalyticsAPI = {
  getTableauToken: () => {
    console.log(CP_ANALYTICS_HOST + '/api/v1/tableau/token');
    return axios.get(CP_ANALYTICS_HOST + '/api/v1/tableau/token');
  }
}

export default AnalyticsAPI
