import domain from 'utils/domain'
import fetch from 'utils/fetch'
import { inputTypes } from 'modules/inputs'
import { showSuccess } from 'modules/prompts'

// ------------------------------------
// Constants
// ------------------------------------
const META_DATA = {
  appRoleID: {
    label: '角色ID'
  },
  roleName: {
    label: '角色名称',
    required: true,
    maxLength: 40
  },
  roleDesc: {
    label: '角色说明',
    maxLength: 50
  },
  status: {
    label: '启用状态',
    type: inputTypes.SELECT,
    options: [{
      label: '启用',
      value: '0'
    }, {
      label: '停用',
      value: '2'
    }],
    createHide: true
  },
  appID: {
    label: '系统',
    type: inputTypes.SELECT,
    options: [],
    readOnly: true
  },
  resourceIDList: {
    label: '选择权限',
    type: inputTypes.TREESELECT,
    options: []
  },
  operations: {
    width: 150
  }
}

const INITIAL_STATE = {
  meta: META_DATA,
  filterFields: ['roleName'],
  tableFields: ['appRoleID', 'appID', 'roleName', 'roleDesc', 'status'],
  editFields: ['roleName', 'roleDesc', 'appID', 'status'],

  list: [],
  total: 0,
  pageSize: 20,
  currentPage: 0,
  currentItem: {},
  currentFilter: {},

  resourceList: []
}

const QUERY_DATA = 'QUERY_ROLE_MANAGEMENT'
const QUERY_SUCCESS = 'QUERY_ROLE_MANAGEMENT_SUCCESS'
const QUERY_RESOURCE = 'QUERY_RESOURCE'
const QUERY_RESOURCE_SUCCESS = 'QUERY_RESOURCE_SUCCESS'
const CREATE_DATA = 'CREATE_ROLE_MANAGEMENT'
const CREATE_SUCCESS = 'CREATE_ROLE_MANAGEMENT_SUCCESS'
const UPDATE_DATA = 'UPDATE_ROLE_MANAGEMENT'
const UPDATE_SUCCESS = 'UPDATE_ROLE_MANAGEMENT_SUCCESS'
const DELETE_DATA = 'DELETE_ROLE_MANAGEMENT'
const DELETE_SUCCESS = 'DELETE_ROLE_MANAGEMENT_SUCCESS'

const UPDATE_FILTER = 'UPDATE_ROLE_MANAGEMENT_FILTER'
const UPDATE_ITEM = 'UPDATE_ROLE_MANAGEMENT_ITEM'
const RESET_ITEM = 'RESET_ROLE_MANAGEMENT_ITEM'
const SWITCH_PAGE = 'SWITCH_ROLE_MANAGEMENT_PAGE'

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

export const queryData = () => {
  return (dispatch, getState) => {
    dispatch(query())
    return new Promise(resolve => {
      const filter = getState()['role-management'].currentFilter
      const data = getState()['role-management']
      fetch(`${domain.aas}/aas/v1/role/page/query`, {
        method: 'POST',
        jsonData: {
          roleName: filter.roleName,
          pageNum: data.currentPage,
          pageSize: data.pageSize
        }
      })
      .then(resp => {
        dispatch(querySuccess({
          list: resp.appRoleList.map(role => {
            role.resourceIDList = role.resourceIDList ? role.resourceIDList.join(',') : ''
            return role
          }),
          total: resp.total
        }))
      })
    })
  }
}

export const queryResource = () => {
  return (dispatch, getState) => {
    dispatch(queryResourceStart())
    return new Promise(resolve => {
      fetch(`${domain.aas}/aas/v1/resource/menubutton/list/query`, {
        method: 'POST',
        jsonData: {}
      })
      .then(resp => {
        const systemList = resp.appDTOList
        const resourceList = resp.appResourceDTOList

        systemList.forEach(system => {
          system.label = system.appName
          system.value = system.appID
          system.options = []
          for (let resource of resourceList) {
            if (resource.resourceType === 'menu') {
              resource.label = resource.resourceDisplayName
              resource.value = resource.resourceID
              resource.options = []
              for (let res of resourceList) {
                if (res.resourceType === 'button' && res.parentResourceID === resource.resourceID) {
                  res.label = res.resourceDisplayName
                  res.value = res.resourceID
                  resource.options.push(res)
                }
              }
              if (resource.appID === system.appID) {
                system.options.push(resource)
              }
            }
          }
        })
        dispatch(queryResourceSuccess({
          systemList,
          resourceList: systemList[0].options
        }))
      })
    })
  }
}

export const createData = () => {
  return (dispatch, getState) => {
    dispatch(create())
    return new Promise(resolve => {
      const item = Object.assign({}, getState()['role-management'].currentItem)
      item.resourceIDList = (item.resourceIDList !== '') ? item.resourceIDList.split(',') : []
      fetch(`${domain.aas}/aas/v1/role/add`, {
        method: 'POST',
        jsonData: item
      })
      .then(resp => {
        dispatch(createSuccess())
        dispatch(queryData())
        dispatch(showSuccess({
          message: '新增角色成功'
        }))
      })
    })
  }
}

export const updateData = () => {
  return (dispatch, getState) => {
    dispatch(update())
    return new Promise(resolve => {
      const item = Object.assign({}, getState()['role-management'].currentItem)
      item.resourceIDList = (item.resourceIDList !== '') ? item.resourceIDList.split(',') : []
      fetch(`${domain.aas}/aas/v1/role/modify`, {
        method: 'POST',
        jsonData: item
      })
      .then(resp => {
        dispatch(updateSuccess())
        dispatch(queryData())
        dispatch(showSuccess({
          message: '修改角色成功'
        }))
      })
    })
  }
}

export const deleteData = () => {
  return (dispatch, getState) => {
    dispatch(deleteStart())
    return new Promise(resolve => {
      setTimeout(() => {
        dispatch(deleteSuccess())
        resolve()
      }, 1000)
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
export const updateItem = (item = {}) => ({ type: UPDATE_ITEM, payload: item })
export const resetItem = (item = {}) => ({ type: RESET_ITEM, payload: item })

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUERY_SUCCESS]: (state, action) => Object.assign({}, state, action.payload),
  [QUERY_RESOURCE_SUCCESS]: (state, action) => Object.assign({}, state, {
    meta: Object.assign({}, state.meta, {
      resourceIDList: {
        label: '选择权限',
        type: inputTypes.TREESELECT,
        options: action.payload.resourceList
      },
      appID: {
        label: '选择系统',
        type: inputTypes.SELECT,
        readOnly: true,
        options: action.payload.systemList
      }
    })
  }),
  [CREATE_DATA]: (state, action) => Object.assign({}, state, { success: true }),
  [CREATE_SUCCESS]: (state, action) => Object.assign({}, state, { success: true }),
  [UPDATE_SUCCESS]: (state, action) => Object.assign({}, state, { success: true }),
  [SWITCH_PAGE]: (state, action) => Object.assign({}, state, { currentPage: action.payload }),
  [UPDATE_FILTER]: (state, action) => {
    const newFilter = Object.assign({}, state.currentFilter)
    newFilter[action.payload.field] = action.payload.value
    return Object.assign({}, state, { currentFilter: newFilter })
  },
  [UPDATE_ITEM]: (state, action) => {
    const newItem = Object.assign({}, state.currentItem)
    newItem[action.payload.field] = action.payload.value
    if (action.payload.field === 'appID') {
      newItem.resourceIDList = ''
      return Object.assign({}, state, {
        currentItem: newItem,
        meta: Object.assign({}, state.meta, {
          resourceIDList: {
            label: '选择权限',
            type: inputTypes.TREESELECT,
            options: state.meta.appID.options.find(system => system.appID === action.payload.value).options
          }
        })
      })
    } else {
      return Object.assign({}, state, { currentItem: newItem })
    }
  },
  [RESET_ITEM]: (state, action) => {
    const currentItem = action.payload

    if (!currentItem.resourceIDList) {
      currentItem.resourceIDList = ''
    }

    if (!currentItem.appID) {
      currentItem.appID = state.meta.appID.options[0].value
    }

    return Object.assign({}, state, {
      currentItem, success: false,
      meta: Object.assign({}, state.meta, {
        resourceIDList: {
          label: '选择权限',
          type: inputTypes.TREESELECT,
          options: state.meta.appID.options.find(system => system.appID === currentItem.appID).options
        }
      })
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
