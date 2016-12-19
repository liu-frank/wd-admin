import fetch from 'utils/fetch'
import domain from 'utils/domain'
import { inputTypes } from 'modules/inputs'
// ------------------------------------
// Constants
// ------------------------------------
const META_DATA = {
  id: {
    label: 'ID'
  },
  name: {
    label: '姓名'
  }
}

const INITIAL_STATE = {
  meta: META_DATA,
  filterFields: ['name'],
  tableFields: ['id', 'name'],
  editFields: ['name'],
  list: [],
  total: 0,
  pageSize: 20,
  currentPage: 0,
  currentItem: {},
  currentFilter: {}
}

const MODULE_NAME = '<%= snakeEntityName %>'.toUpperCase()
const QUERY_DATA = 'QUERY_' + MODULE_NAME
const QUERY_SUCCESS = 'QUERY_SUCCESS_' + MODULE_NAME
const CREATE_DATA = 'CREATE_' + MODULE_NAME
const CREATE_SUCCESS = 'CREATE_SUCCESS_' + MODULE_NAME
const UPDATE_DATA = 'UPDATE_' + MODULE_NAME
const UPDATE_SUCCESS = 'UPDATE_SUCCESS_' + MODULE_NAME
const DELETE_DATA = 'DELETE_' + MODULE_NAME
const DELETE_SUCCESS = 'DELETE_SUCCESS_' + MODULE_NAME

const UPDATE_FILTER = 'UPDATE_FILTER_' + MODULE_NAME
const UPDATE_ITEM = 'UPDATE_ITEM_' + MODULE_NAME
const RESET_ITEM = 'RESET_ITEM_' + MODULE_NAME
const SWITCH_PAGE = 'SWITCH_PAGE_' + MODULE_NAME

// ------------------------------------
// Actions
// ------------------------------------
const query = () => ({ type: QUERY_DATA })
const querySuccess = data => ({ type: QUERY_SUCCESS, payload: data })
const create = () => ({ type: CREATE_DATA })
const createSuccess = () => ({ type: CREATE_SUCCESS })
const update = () => ({ type: UPDATE_DATA })
const updateSuccess = () => ({ type: UPDATE_SUCCESS })
const deleteStart = () => ({ type: DELETE_DATA })
const deleteSuccess = () => ({ type: DELETE_SUCCESS })

export const queryData = () => {
  return (dispatch, getState) => {
    dispatch(query())
    /**
    const filter = getState()['<%= dashesEntityName %>'].currentFilter
    fetch(`${domain.aas}/aas/v1/role/query`, {
      method: 'POST',
      jsonData: {
        roleName: filter.roleName
      }
    })
    .then(resp => {
      dispatch(querySuccess({ list: resp.appRoleList }))
    })
    */
    // Sample data, to be deleted
    dispatch(querySuccess({
      list: [{ id: 1, name: 'Test' }, { id: 2, name: 'Name'}],
      total: 30
    }))
  }
}

export const createData = () => {
  return (dispatch, getState) => {
    dispatch(create())
    /**
    const item = getState()['<%= dashesEntityName %>'].currentItem;
    fetch(`${domain.aas}/aas/v1/role/add`, {
      method: 'POST',
      jsonData: item
    })
    .then(resp => {
      dispatch(createSuccess())
      dispatch(queryData())
    })
    */
    // Sample data, to be deleted
    setTimeout(() => dispatch(createSuccess()), 500)
  }
}

export const updateData = () => {
  return (dispatch, getState) => {
    dispatch(update())
    /**
    const item = getState()['<%= dashesEntityName %>'].currentItem;
    fetch(`${domain.aas}/aas/v1/role/modify`, {
      method: 'POST',
      jsonData: item
    })
    .then(resp => {
      dispatch(updateSuccess())
      dispatch(queryData())
    })
    */
    // Sample data, to be deleted
    setTimeout(() => dispatch(updateSuccess()), 500)
  }
}

export const deleteData = () => {
  return (dispatch, getState) => {
    dispatch(deleteStart())
    /**
    const item = getState()['<%= dashesEntityName %>'].currentItem;
    fetch(`${domain.aas}/aas/v1/role/delete`, {
      method: 'POST',
      jsonData: item
    })
    .then(resp => {
      dispatch(updateSuccess())
      dispatch(queryData())
    })
    */
    // Sample data, to be deleted
    setTimeout(() => dispatch(deleteSuccess()), 500)
  }
}

export const switchPage = (pageNo = 0) => ({ type: SWITCH_PAGE, payload: pageNo })
export const updateFilter = (info = {}) => ({ type: UPDATE_FILTER, payload: info })
export const updateItem = (item = {}) => ({ type: UPDATE_ITEM, payload: item })
export const resetItem = (item = {}) => ({ type: RESET_ITEM, payload: item })

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUERY_SUCCESS]: (state, action) => Object.assign({}, state, action.payload),
  [CREATE_DATA]: (state, action) => Object.assign({}, state, { success: false }),
  [CREATE_SUCCESS]: (state, action) => Object.assign({}, state, { success: true }),
  [UPDATE_DATA]: (state, action) => Object.assign({}, state, { success: false }),
  [UPDATE_SUCCESS]: (state, action) => Object.assign({}, state, { success: true }),
  [DELETE_DATA]: (state, action) => Object.assign({}, state, { success: false }),
  [DELETE_SUCCESS]: (state, action) => Object.assign({}, state, { success: true }),
  [SWITCH_PAGE]: (state, action) => Object.assign({}, state, { currentPage: action.payload }),
  [UPDATE_FILTER]: (state, action) => {
    const newFilter = Object.assign({}, state.currentFilter)
    newFilter[action.payload.field] = action.payload.value
    return Object.assign({}, state, { currentFilter: newFilter })
  },
  [UPDATE_ITEM]: (state, action) => {
    const newItem = Object.assign({}, state.currentItem)
    newItem[action.payload.field] = action.payload.value
    return Object.assign({}, state, { currentItem: newItem })
  },
  [RESET_ITEM]: (state, action) => {
    return Object.assign({}, state, { currentItem: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
