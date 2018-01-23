import { TABLEAU_GATEWAY_API } from '../constants/app_constants'
import { get, parseJSON } from './auth'

const arrayToParam = (name, values) => values.map((value) => `${name}[]=${value}`).join('&')
export const getWorkbooks = (workbookIds) => {
  let idsChain = 'ids[]='

  if (workbookIds.length > 0) {
    idsChain = arrayToParam('ids', workbookIds)
  }
  return get(`${TABLEAU_GATEWAY_API}workbooks?${idsChain}`).then(parseJSON)
}
