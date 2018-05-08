import { CP_ANALYTICS_API } from '../constants/app_constants'
import { get, post, parseJSON } from './auth'

export const getTableauToken = () => get(`${CP_ANALYTICS_API}tableau/token`).then(parseJSON)
export const postStats = (type, key, value) => post(`${CP_ANALYTICS_API}stats`, { type, key, value })
export const loginToSentisum = () => {
  let newTab = window.open('', '', '')

  return get(`${CP_ANALYTICS_API}sentisum/login`)
    .then(parseJSON)
    .then(json => { newTab.location = json.url })
    .catch((e) => {
      newTab.close()
      window.alert('Login failed')
      if (window.console) { window.console.error(e) }
    })
}
