/* global CONFIG */
/* eslint-disable no-multi-spaces */

/**
 * .env values
 */
export const CP_ADMIN_HOST        = CONFIG.CP_ADMIN_HOST
export const CP_ADMIN_API         = CONFIG.CP_ADMIN_API
export const CP_ANALYTICS_API     = CONFIG.CP_ANALYTICS_API
export const TABLEAU_HOST         = CONFIG.TABLEAU_HOST
export const TABLEAU_GATEWAY_API  = CONFIG.TABLEAU_GATEWAY_API
export const GTM_ENV  = CONFIG.GTM_ENV
export const GTM_AUTH_KEY  = CONFIG.GTM_AUTH_KEY
export const GTM_ID  = CONFIG.GTM_ID

/**
 * URL paths
 */
export const CP_ADMIN_URL               = `${CP_ADMIN_HOST}admin/`
export const CP_ANALYTICS_URL           = `${CP_ADMIN_HOST}analytics/`
export const FAST_RESPONSE_URL          = `${CP_ADMIN_HOST}fast_response/`
export const TEMPTATION_EMAIL_ADMIN_URL = `${CP_ADMIN_HOST}temptation_email_admin/`
export const VETTING_URL                = `${CP_ADMIN_HOST}vetting/`
export const ERROR_HANDLING_SERVICE_URL = `${CP_ADMIN_HOST}error_handling_service/`
export const EXPERIENCES_ADMIN_URL      = `${CP_ADMIN_HOST}experiences_admin/`
export const HELP_URL                   = `${CP_ADMIN_HOST}help/`
export const LOGIN_URL                  = `${CP_ADMIN_URL}#/auth/sign_in`
export const LOGOUT_URL                 = `${CP_ADMIN_URL}#/auth/sign_out`
export const PROFILE_URL                = `${CP_ADMIN_URL}#/profile`
