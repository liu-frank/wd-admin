import domain from 'utils/domain'
import fetch from 'utils/fetch'
import { getSystem } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
const GET_DATA = 'GET_ADMINISTRATOR'
const LOGOUT = 'LOGOUT'
export const GET_SUCCESS = 'GET_ADMINISTRATOR_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
const get = () => ({ type: GET_DATA })
const getSuccess = data => ({ type: GET_SUCCESS, payload: data })
const logoutStart = () => ({ type: LOGOUT })

export const getData = () => {
  return (dispatch, getState) => {
    dispatch(get())
    const system = getSystem()
    let url = `${domain.aas}/aas/v1/sso/getResources`

    if (system === 'ams') {
      url = `${domain.ams}/ams/v1/sso/getResources`
    }

    return fetch(url, {
      method: 'POST',
      jsonData: {}
    })
    .then(resp => {
      const data = resp.aasUserPrincipal.aasUserResources

      const navigations =
        data.resources
            .filter(resource => resource.resourceType === 'indexTitle')
            .map(resource => ({
              url: resource.linkUrl
                           .replace('<ticket>', resp.aasUserPrincipal.ssoTicket)
                           .replace('<userid>', resp.aasUserPrincipal.ssoUserId),
              name: resource.resourceDisplayName
            }))

      dispatch(getSuccess(Object.assign({}, data, {
        name: resp.aasUserPrincipal.ssoUserName,
        resourceList: data.resources.filter(res => res.resourceType === 'menu').map(res => res.linkUrl),
        resources: data.resources,
        roleList: data.roles,
        roles: data.roles.map(res => res.roleName),
        fullOrgName:resp.aasUserPrincipal.fullOrgName,
        navigations
      })))
    })
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    dispatch(logoutStart())

    const system = getSystem()
    let url = `${domain.aas}/aas/v1/sso/logout`

    if (system === 'ams') {
      url = `${domain.ams}/ams/v1/sso/logout`
    }

    return fetch(url, {
      method: 'POST',
      jsonData: {}
    })
    .then(resp => {
      window.location.href = resp.loginUrl.replace(/<ip>/g, window.location.host)
    })
  }
}

export const resetPassword = () => {
  return (dispatch, getState) => {
    const system = getSystem()
    let url = `${domain.aas}/aas/v1/sso/getResetPassword`

    if (system === 'ams') {
      url = `${domain.ams}/ams/v1/sso/getResetPassword`
    }

    return fetch(url, {
      method: 'POST',
      jsonData: {}
    })
    .then(resp => {
      window.location.href = resp.resetPasswordUrl.replace(/<ip>/g, window.location.host)
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SUCCESS]: (state, action) => Object.assign({}, state, action.payload)
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { resources: [], roles: [], navigations: [] }

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
