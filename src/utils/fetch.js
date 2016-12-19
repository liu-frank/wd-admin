import { showSuccess, showFail } from 'modules/prompts'
import { showLoading, hideLoading } from 'modules/loading'
import { getSystem } from 'utils'

let theStore = null
let storeDispatch = null

export function initFetch (store) {
  theStore = store
  storeDispatch = store.dispatch
}

const serialize = (obj) => {
  const str = []

  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }

  return str.join('&')
}

export default function enhancedFetch (url, options = {}, ...args) {
  // Keep Session
  Object.assign(options, {
    credentials: 'include'
  })

  if (options.jsonData) {
    if (!options.headers) {
      options.headers = {}
    }
    options.headers['Content-Type'] = 'application/json;charset=utf-8'
    options.jsonData.reqHeader = {
      entityId: 'aastestapi',
      appId: getSystem(),
      sessionId: '1462461678582',
      reqId: (new Date()).getTime(),
      accessToken: 'accessTokenTest'
    }
    options.body = JSON.stringify(options.jsonData)
    delete options.jsonData
  }

  return new Promise(resolve => {
    storeDispatch(showLoading())
    fetch(url, options, ...args)
      .then(resp => resp.json())
      .then(resp => {
        storeDispatch(hideLoading())
        const code = resp.respHeader.respCode

        if (code === 'AMS-10000' || code === 'AAS-10000') {
          resolve(resp)
        } else if (code === 'AAS-920001' || code === 'AAS-920006') {
          window.location.href = resp.loginUrl.replace(/<ip>/g, window.location.host)
        } else {
          let errorMessage = resp.respHeader.resMessageExt

          if (!errorMessage) {
            errorMessage = resp.respHeader.respMessage || ''
          }

          throw new Error(errorMessage)
        }
      })
      .catch((error) => {
        storeDispatch(hideLoading())
        storeDispatch(showFail({
          message: error.message
        }))
      })
  })
}
