// ------------------------------------
// Constants
// ------------------------------------
const SHOW_LOADING = 'SHOW_LOADING'
const HIDE_LOADING = 'HIDE_LOADING'
// TODO: Check This!
const DUMMY_ACTION = 'DUMMY_ACTION'

// ------------------------------------
// Actions
// ------------------------------------
export const startLoading = () => ({ type: SHOW_LOADING })

let loadingTimer = null
let loadingCount = 0

export const showLoading = () => {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      loadingCount++
      if (loadingCount === 1) {
        loadingTimer = setTimeout(() => {
          dispatch(startLoading())
          resolve()
        }, 1000)
      }
    })
  }
}

export const hideLoading = () => {
  loadingCount--
  if (loadingCount === 0) {
    clearTimeout(loadingTimer)
    return ({ type: HIDE_LOADING })
  } else {
    return ({ type: DUMMY_ACTION })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_LOADING]: (state, action) => Object.assign({}, state, { show: true }),
  [HIDE_LOADING]: (state, action) => Object.assign({}, state, { show: false })
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { show: false }

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
