// ------------------------------------
// Constants
// ------------------------------------
const SHOW_FLASH_MESSAGE = 'SHOW_FLASH_MESSAGE'
const HIDE_FLASH_MESSAGE = 'HIDE_FLASH_MESSAGE'

// ------------------------------------
// Actions
// ------------------------------------
export const showSuccess = option => ({
  type: SHOW_FLASH_MESSAGE,
  payload: Object.assign(option, { success: true })
})
export const showFail = option => ({
  type: SHOW_FLASH_MESSAGE,
  payload: Object.assign(option, { success: false })
})
export const hideFlash = () => ({
  type: HIDE_FLASH_MESSAGE
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_FLASH_MESSAGE]: (state, action) => Object.assign({}, state, {
    flash: Object.assign(action.payload, { show: true })
  }),
  [HIDE_FLASH_MESSAGE]: (state, action) => Object.assign({}, state, {
    flash: { show: false }
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  flash: { show: false }
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
