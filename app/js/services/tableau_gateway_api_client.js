import axios from 'axios'
import { TABLEAU_GATEWAY_API } from '../constants/app_constants'

const arrayToParam = (name, values) => values.map((value) => `${name}[]=${value}`).join('&')
export const getWorkbooks = (workbookIds) =>
  axios.get(`${TABLEAU_GATEWAY_API}workbooks?${arrayToParam('ids', workbookIds)}`)
