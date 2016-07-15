import Cookies from 'js-cookie'
import axios from 'axios'
import { Promise } from 'es6-promise'
import { CP_ADMIN_HOST, CP_ANALYTICS_HOST } from '../constants/app_constants'
import { routeUtils } from '../helpers/router'

const LOGIN_URL = CP_ADMIN_HOST + '#/auth/sign_in?return_url=' + CP_ANALYTICS_HOST
const REFRESH_TOKEN_URL = CP_ADMIN_HOST + 'api/v1/api_session/refresh'
const MAXIMUM_RESTARTED_REQUESTS = 5

let restartedRequests = []

const refreshToken = () => {
  return axios.post(REFRESH_TOKEN_URL, {
    refresh_token: getRefreshToken(),
  })
}

const redirectToLoginPage = () => {
  routeUtils.redirectTo(LOGIN_URL)
}

const getAccessToken = () => {
  return Cookies.get('accessToken')
}

const setAccessToken = (newToken) => {
  Cookies.set('accessToken', newToken)
}

const getRefreshToken = () => {
  return Cookies.get('refreshToken')
}

const restartRequest = (response) => {
  restartedRequests.push(response)

  return axios.request({
    method: response.config.method,
    url: response.config.url,
    data: response.data,
  })
}

const maximumRestartedRequests = () => {
  return restartedRequests.length >= MAXIMUM_RESTARTED_REQUESTS
}

/*
* Clean the list of restarted requests except the calls to refresh token API endpoint
* which is called before the request is restarted.
*/
const cleanRestartedRequests = (response) => {
  if (!response || response.config.url !== REFRESH_TOKEN_URL) {
    restartedRequests = []
  }
  return response
}

/*
* Add authorization header to request.
*/
const addXHRHeaders = (request) => {
  request.headers['Authorization'] = getAccessToken()
  return request
}

/*
* In the case of unauthorized request (401), the access token is refreshed and
* previous ajax call is restarted. If the refresh token call fail for the reason of invalid reset token
* or any other, the user is redirected to login page.
* There can be a case when API keep returning 401 and this would lead to the infinite loop of ajax calls. For these reasons
* we allow to repeat ajax calls just MAXIMUM_RESTARTED_REQUESTS times. If this limit exceed, the user is redirected to the login page.
*/
const resolveRejectedRequest = (response) => {
  if (response.status === 401) {
    return refreshToken()
      .catch(redirectToLoginPage)
      .then((request) => {
        if (maximumRestartedRequests()) { return redirectToLoginPage() }
        setAccessToken(request.data.access_token)
        return restartRequest(response)
      })
  } else {
    return Promise.reject(response)
  }
}

/*
* Add authorization header to each request
* Add callback for each unauthorized response.
*/
const addXHRInterceptor = () => {
  cleanRestartedRequests()

  axios.interceptors.request.use(
    (request) => addXHRHeaders(request),
    (error) => Promise.reject(error)
  )

  axios.interceptors.response.use(
    (response) => cleanRestartedRequests(response),
    (error) => resolveRejectedRequest(error)
  )
}

/*
* The only interface exposed by the Auth module is init() function which is
* alias for private addXHRInterceptor() function.
*/
const Auth = {
  init: addXHRInterceptor,
}

export default Auth

