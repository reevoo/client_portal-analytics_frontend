import axios from 'axios'
import { TABLEAU_GATEWAY_API, CP_ANALYTICS_API } from '../constants/app_constants'

export const arrayToParam = (name, values) =>
  values.map((value) => `${name}[]=${value}`).join('&')

const Api = {
  getTableauToken: () => axios.get(`${CP_ANALYTICS_API}tableau/token`),

  getWorkbooks: (workbookIds) => axios.get(`${TABLEAU_GATEWAY_API}workbooks?${arrayToParam('ids', workbookIds)}`),
}

export default Api
