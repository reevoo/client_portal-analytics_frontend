import { TABLEAU_GATEWAY_API } from '../constants/app_constants'
import { get, parseJSON } from './auth'

const arrayToParam = (name, values) => values.map((value) => `${name}[]=${value}`).join('&')
export const getWorkbooks = (workbookIds) =>
  get(`${TABLEAU_GATEWAY_API}workbooks?${arrayToParam('ids', workbookIds)}`).then(parseJSON)
