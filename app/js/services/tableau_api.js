import axios from 'axios'
import { TABLEAU_HOST, TABLEAU_GATEWAY_API } from '../constants/app_constants'

export const arrayToParam = (name, values) =>
  values.map((value) => `${name}[]=${value}`).join('&')

const TableauAPI = {
  getWorkbooks: (workbookIds) => {
    return axios.get(`${TABLEAU_GATEWAY_API}/workbooks?${arrayToParam('ids',workbookIds)}`);
  }
}

export default TableauAPI
