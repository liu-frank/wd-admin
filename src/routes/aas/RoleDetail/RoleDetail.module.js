import fetch from 'utils/fetch'
import domain from 'utils/domain'
import { showSuccess } from 'modules/prompts'
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
  currentItem: {
    resourceIDList: ''
  },
  currentFilter: {},
  typeList: [],
  resourceList: []
}

const MODULE_NAME = 'role_detail'.toUpperCase()
const QUERY_DATA = 'QUERY_' + MODULE_NAME
const QUERY_SUCCESS = 'QUERY_SUCCESS_' + MODULE_NAME
const QUERY_RESOURCE = 'QUERY_RESOURCE_' + MODULE_NAME
const QUERY_RESOURCE_SUCCESS = 'QUERY_RESOURCE_SUCCESS_' + MODULE_NAME
const CREATE_DATA = 'CREATE_' + MODULE_NAME
const CREATE_SUCCESS = 'CREATE_SUCCESS_' + MODULE_NAME
const UPDATE_DATA = 'UPDATE_' + MODULE_NAME
const UPDATE_SUCCESS = 'UPDATE_SUCCESS_' + MODULE_NAME
const DELETE_DATA = 'DELETE_' + MODULE_NAME
const DELETE_SUCCESS = 'DELETE_SUCCESS_' + MODULE_NAME

const UPDATE_FILTER = 'UPDATE_FILTER_' + MODULE_NAME
const UPDATE_ITEM = 'UPDATE_ITEM_' + MODULE_NAME
const UPDATE_RESOURCE = 'UPDATE_RESOURCE_' + MODULE_NAME
const SELECT_ALL_RESOURCES = 'SELECT_ALL_RESOURCES_' + MODULE_NAME
const CLEAR_ALL_RESOURCES = 'CLEAR_ALL_RESOURCES_' + MODULE_NAME
const RESET_ITEM = 'RESET_ITEM_' + MODULE_NAME
const SWITCH_PAGE = 'SWITCH_PAGE_' + MODULE_NAME

// ------------------------------------
// Actions
// ------------------------------------
const query = () => ({ type: QUERY_DATA })
const querySuccess = data => ({ type: QUERY_SUCCESS, payload: data })
const queryResourceStart = () => ({ type: QUERY_RESOURCE })
const queryResourceSuccess = data => ({ type: QUERY_RESOURCE_SUCCESS, payload: data })
const create = () => ({ type: CREATE_DATA })
const createSuccess = () => ({ type: CREATE_SUCCESS })
const update = () => ({ type: UPDATE_DATA })
const updateSuccess = () => ({ type: UPDATE_SUCCESS })
const deleteStart = () => ({ type: DELETE_DATA })
const deleteSuccess = () => ({ type: DELETE_SUCCESS })

export const queryData = ({id}) => {
  return (dispatch, getState) => {
    dispatch(query())
    fetch(`${domain.aas}/aas/v1/role/detail/query`, {
      method: 'POST',
      jsonData: {
        appRoleID: id
      }
    })
    .then(resp => {
      if (!resp.appRole.resourceIDList) {
        resp.appRole.resourceIDList = []
      }
      dispatch(querySuccess({
        currentItem: Object.assign(resp.appRole, {
          resourceIDList: resp.appRole.resourceIDList.join(',')
        })
      }))
    })
  }
}

export const createData = () => {
  return (dispatch, getState) => {
    dispatch(create())
    /**
    const item = getState()['role-detail'].currentItem;
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
    const item = getState()['role-detail'].currentItem
    fetch(`${domain.aas}/aas/v1/role/authority/grant`, {
      method: 'POST',
      jsonData: Object.assign({}, item, {
        resourceIDList: (item.resourceIDList !== '') ? item.resourceIDList.split(',') : []
      })
    })
    .then(resp => {
      dispatch(updateSuccess())
      dispatch(showSuccess({
        message: '权限更新成功'
      }))
    })
  }
}

export const deleteData = () => {
  return (dispatch, getState) => {
    dispatch(deleteStart())
    /**
    const item = getState()['role-detail'].currentItem;
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

export const queryResource = ({appID}) => {
  return (dispatch, getState) => {
    dispatch(queryResourceStart())
    const typePromise = fetch(`${domain.aas}/aas/v1/common/codetable/query`, {
      method: 'POST',
      jsonData: {
        codeType: 'resourceType'
      }
    })
    const resourcePromise = fetch(`${domain.aas}/aas/v1/resource/list/query/forApp`, {
      method: 'POST',
      jsonData: {appID}
    })
    return Promise.all([typePromise, resourcePromise])
      .then(([typeResp, resourceResp]) => {
        const typeList = typeResp.codeTableList.map(item => ({
          id: item.code,
          label: item.codeDesc
        }))
        const resourceList = resourceResp.appResourceDTOList

        dispatch(queryResourceSuccess({ typeList, resourceList }))
      })
  }
}

export const switchPage = (pageNo = 0) => {
  return (dispatch, getState) => {
    dispatch(switchPageStart(pageNo))
    setTimeout(() => {
      dispatch(queryData())
    }, 0)
  }
}

export const switchPageStart = (pageNo = 0) => ({ type: SWITCH_PAGE, payload: pageNo })
export const updateFilter = (info = {}) => ({ type: UPDATE_FILTER, payload: info })
export const updateResource = (info = {}) => ({ type: UPDATE_RESOURCE, payload: info})
export const selectAllResources = (info = {}) => ({type: SELECT_ALL_RESOURCES, payload: info})
export const clearAllResources = (info = {}) => ({type: CLEAR_ALL_RESOURCES, payload: info})
export const updateItem = (item = {}) => ({ type: UPDATE_ITEM, payload: item })
export const resetItem = (item = {}) => ({ type: RESET_ITEM, payload: item })

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUERY_SUCCESS]: (state, action) => Object.assign({}, state, action.payload),
  [QUERY_RESOURCE_SUCCESS]: (state, action) => Object.assign({}, state, action.payload),
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
  },
  [UPDATE_RESOURCE]: (state, action) => {
    const newItem = Object.assign({}, state.currentItem)
    const resourceIDList = state.currentItem.resourceIDList === '' ? [] : state.currentItem.resourceIDList.split(',')
    const resourceID = action.payload.resourceID

    if (resourceIDList.indexOf(resourceID + '') >= 0) {
      resourceIDList.splice(resourceIDList.indexOf(resourceID + ''), 1)
    } else {
      resourceIDList.push(resourceID)
    }
    newItem.resourceIDList = resourceIDList.join(',')

    return Object.assign({}, state, {currentItem: newItem})
  },
  [SELECT_ALL_RESOURCES]: (state, action) => {
    const newItem = Object.assign({}, state.currentItem)
    const typedResources = state.resourceList.filter(resource => resource.resourceType === action.payload.resourceType)
    const resourceIDList = state.currentItem.resourceIDList === '' ? [] : state.currentItem.resourceIDList.split(',')

    typedResources.forEach(resource => {
      if (resourceIDList.indexOf(resource.resourceID + '') === -1) {
        resourceIDList.push(resource.resourceID)
      }
    })
    newItem.resourceIDList = resourceIDList.join(',')

    return Object.assign({}, state, {currentItem: newItem})
  },
  [CLEAR_ALL_RESOURCES]: (state, action) => {
    const newItem = Object.assign({}, state.currentItem)
    const typedResources = state.resourceList.filter(resource => resource.resourceType === action.payload.resourceType)
    const resourceIDList = state.currentItem.resourceIDList === '' ? [] : state.currentItem.resourceIDList.split(',')

    typedResources.forEach(resource => {
      if (resourceIDList.indexOf(resource.resourceID + '') >= 0) {
        resourceIDList.splice(resourceIDList.indexOf(resource.resourceID + ''), 1)
      }
    })
    newItem.resourceIDList = resourceIDList.join(',')

    return Object.assign({}, state, {currentItem: newItem})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
