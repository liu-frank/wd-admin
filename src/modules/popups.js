// ------------------------------------
// Constants
// ------------------------------------
const SHOW_CUSTOM_DIALOG = 'SHOW_CUSTOM_DIALOG'
const HIDE_CUSTOM_DIALOG = 'HIDE_CUSTOM_DIALOG'
const SHOW_CONFIRM_DIALOG = 'SHOW_CONFIRM_DIALOG'
const HIDE_CONFIRM_DIALOG = 'HIDE_CONFIRM_DIALOG'
const SHOW_EDIT_DIALOG = 'SHOW_EDIT_DIALOG'
const HIDE_EDIT_DIALOG = 'HIDE_EDIT_DIALOG'

export const showTypes = {
  VIEW: 'SHOW_TYPE_VIEW',
  CREATE: 'SHOW_TYPE_CREATE',
  UPDATE: 'SHOW_TYPE_UPDATE'
}

// ------------------------------------
// Actions
// ------------------------------------
export const showCustomDialog = option => ({ type: SHOW_CUSTOM_DIALOG, payload: option })
export const hideCustomDialog = () => ({ type: HIDE_CUSTOM_DIALOG })

export const showConfirm = option => ({ type: SHOW_CONFIRM_DIALOG, payload: option })
export const hideConfirm = option => ({ type: HIDE_CONFIRM_DIALOG, payload: option })

export const showViewDialog = () => ({ type: SHOW_EDIT_DIALOG, payload: { showType: showTypes.VIEW } })
export const showCreateDialog = () => ({ type: SHOW_EDIT_DIALOG, payload: { showType: showTypes.CREATE } })
export const showUpdateDialog = option => ({ type: SHOW_EDIT_DIALOG, payload: { showType: showTypes.UPDATE } })
export const hideEdit = () => ({ type: HIDE_EDIT_DIALOG })

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_CONFIRM_DIALOG]: (state, action) => Object.assign({}, state, {
    confirm: Object.assign(action.payload, { show: true })
  }),
  [HIDE_CONFIRM_DIALOG]: (state, action) => Object.assign({}, state, {
    confirm: { show: false }
  }),
  [SHOW_EDIT_DIALOG]: (state, action) => Object.assign({}, state, {
    edit: Object.assign(action.payload, { show: true })
  }),
  [HIDE_EDIT_DIALOG]: (state, action) => Object.assign({}, state, {
    edit: { show: false }
  }),
  [SHOW_CUSTOM_DIALOG]: (state, action) => Object.assign({}, state, {
    custom: Object.assign(action.payload, { show: true })
  }),
  [HIDE_CUSTOM_DIALOG]: (state, action) => Object.assign({}, state, {
    custom: { show: false }
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  custom: { show: false },
  confirm: { show: false },
  edit: { show: false }
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
