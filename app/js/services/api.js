import axios from 'axios'
import { CP_ANALYTICS_HOST, TABLEAU_HOST, TABLEAU_GATEWAY_API } from '../constants/app_constants'

export const arrayToParam = (name, values) =>
  values.map((value) => `${name}[]=${value}`).join('&')

const Api = {
  getTableauToken: () => axios.get(`${CP_ANALYTICS_HOST}/api/v1/tableau/token`),

  getWorkbooks: (workbookIds) => axios.get(`${TABLEAU_GATEWAY_API}/workbooks?${arrayToParam('ids',workbookIds)}`)
}

export default Api
