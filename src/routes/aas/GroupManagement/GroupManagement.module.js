import fetch from 'utils/fetch'
import domain from 'utils/domain'
import { inputTypes } from 'modules/inputs'
import { showSuccess } from 'modules/prompts'

// ------------------------------------
// Constants
// ------------------------------------
const META_DATA = {
  company: {
    label: '请选择公司',
    type: inputTypes.SELECT,
    options: [{
      label: '请选择公司',
      value: ''
    }]
  },
  level1: {
    label: '一级部门',
    type: inputTypes.SELECT,
    options: [{
      label: '所有一级部门',
      value: ''
    }],
    readOnly: true
  },
  level2: {
    label: '二级部门',
    type: inputTypes.SELECT,
    options: [{
      label: '所有二级部门',
      value: ''
    }]
  },
  level3: {
    label: '三级部门',
    type: inputTypes.SELECT,
    options: [{
      label: '所有三级部门',
      value: ''
    }]
  },
  orgName: {
    label: '部门名称',
    maxLength: 20,
    required: true
  },
  status: {
    label: '状态',
    type: inputTypes.SELECT,
    options: [{
      label: '启用',
      value: '0'
    }, {
      label: '停用',
      value: '1'
    }],
    createHide: true
  }
}

const INITIAL_STATE = {
  meta: META_DATA,
  filterFields: ['company'],
  editFields: ['orgName', 'level1', 'level2', 'status'],
  list: [],
  total: 0,
  pageSize: 20,
  currentPage: 0,
  currentItem: {},
  currentFilter: {},
  passwordSuccess: false
}

const QUERY_DATA = 'QUERY_GROUP_MANAGEMENT'
const QUERY_SUCCESS = 'QUERY_GROUP_MANAGEMENT_SUCCESS'
const QUERY_COMPANIES_START = 'QUERY_COMPANIES_START_GROUP_MANAGEMENT'
const QUERY_COMPANIES_SUCCESS = 'QUERY_COMPANIES_SUCCESS_GROUP_MANAGEMENT_SUCCESS'
const CREATE_DATA = 'CREATE_GROUP_MANAGEMENT'
const CREATE_SUCCESS = 'CREATE_GROUP_MANAGEMENT_SUCCESS'
const UPDATE_DATA = 'UPDATE_GROUP_MANAGEMENT'
const UPDATE_SUCCESS = 'UPDATE_GROUP_MANAGEMENT_SUCCESS'
const DELETE_DATA = 'DELETE_GROUP_MANAGEMENT'
const DELETE_SUCCESS = 'DELETE_GROUP_MANAGEMENT_SUCCESS'
const RESET_PASSWORD = 'RESET_PASSWORD_GROUP_MANAGEMENT'
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_GROUP_MANAGEMENT_SUCCESS'

const UPDATE_FILTER = 'UPDATE_GROUP_MANAGEMENT_FILTER'
const UPDATE_ITEM = 'UPDATE_GROUP_MANAGEMENT_ITEM'
const RESET_ITEM = 'RESET_GROUP_MANAGEMENT_ITEM'
const SWITCH_PAGE = 'SWITCH_GROUP_MANAGEMENT_PAGE'

// ------------------------------------
// Actions
// ------------------------------------
const query = () => ({ type: QUERY_DATA })
const querySuccess = data => ({ type: QUERY_SUCCESS, payload: data })
const queryCompaniesStart = () => ({ type: QUERY_COMPANIES_START })
const queryCompaniesSuccess = data => ({ type: QUERY_COMPANIES_SUCCESS, payload: data })
const create = () => ({ type: CREATE_DATA })
const createSuccess = data => ({ type: CREATE_SUCCESS, payload: data })
const update = () => ({ type: UPDATE_DATA })
const updateSuccess = () => ({ type: UPDATE_SUCCESS })
const deleteStart = () => ({ type: DELETE_DATA })
const deleteSuccess = () => ({ type: DELETE_SUCCESS })
const resetPasswordStart = () => ({ type: RESET_PASSWORD })
const resetPasswordSuccess = password => ({ type: RESET_PASSWORD_SUCCESS, payload: password })

export const queryCompanies = () => {
  return (dispatch, getState) => {
    dispatch(queryCompaniesStart())
    return new Promise(resolve => {
      fetch(`${domain.aas}/aas/v1/org/highestorg/query`, {
        method: 'POST',
        jsonData: {}
      })
      .then(resp => {
        let companies = resp.orgList.map(org => {
          return {
            label: org.orgName,
            value: org.orgID
          }
        })
        companies.unshift({
          label: '请选择公司',
          value: ''
        })
        dispatch(queryCompaniesSuccess(companies))
      })
    })
  }
}

export const queryData = () => {
  return (dispatch, getState) => {
    dispatch(query())
    return new Promise(resolve => {
      const filter = getState()['group-management'].currentFilter

      if (filter.company === '') {
        dispatch(querySuccess({
          list: []
        }))
        return
      }

      fetch(`${domain.aas}/aas/v1/org/suborgs/query`, {
        method: 'POST',
        jsonData: {
          orgID: filter.company,
          type: '1' // 查询所有可用不可用机构
        }
      })
      .then(resp => {
        let level1s = resp.orgList.filter(org => org.parentOrgID === filter.company)

        level1s.forEach(level1 => {
          level1.subs = resp.orgList.filter(org => org.parentOrgID === level1.orgID) || []
          level1.subs.forEach(level2 => {
            level2.subs = resp.orgList.filter(org => org.parentOrgID === level2.orgID) || []
          })
        })

        dispatch(querySuccess({
          list: level1s
        }))
      })
    })
  }
}

export const createData = () => {
  return (dispatch, getState) => {
    dispatch(create())
    return new Promise(resolve => {
      const item = Object.assign({}, getState()['group-management'].currentItem)
      fetch(`${domain.aas}/aas/v1/org/add`, {
        method: 'POST',
        jsonData: {
          orgName: item.orgName,
          parentOrgID: item.parentOrgID
        }
      })
      .then(resp => {
        dispatch(createSuccess())
        dispatch(queryData())
        dispatch(showSuccess({
          message: '创建组织机构成功'
        }))
      })
    })
  }
}

export const updateData = () => {
  return (dispatch, getState) => {
    dispatch(update())
    return new Promise(resolve => {
      const item = Object.assign({}, getState()['group-management'].currentItem)
      let param = {
        orgID: item.orgID,
        orgName: item.orgName,
        parentOrgID: item.parentOrgID,
        status: item.status
      }
      if (item.parentOrgID !== item.level2) {
        param.newParentOrgID = item.level2
      }
      fetch(`${domain.aas}/aas/v1/org/modify`, {
        method: 'POST',
        jsonData: param
      })
      .then(resp => {
        dispatch(updateSuccess())
        dispatch(queryData())
        dispatch(showSuccess({
          message: '修改组织机构成功'
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

export const resetPassword = (item) => {
  return (dispatch, getState) => {
    dispatch(resetPasswordStart())
    return new Promise(resolve => {
      fetch(`${domain.aas}/aas/v1/user/reset/defaultpassword`, {
        method: 'POST',
        jsonData: {
          userID: item.userID
        }
      })
      .then(resp => {
        dispatch(resetPasswordSuccess(resp.userInfoDTO.loginPassword))
      })
    })
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
  [QUERY_DATA]: (state, action) => Object.assign({}, state, { list: [] }),
  [QUERY_SUCCESS]: (state, action) => {
    const level1s = action.payload.list.map(
      level1 => ({ label: level1.orgName, value: level1.orgID })
    )
    level1s.unshift({ label: '所有一级部门', value: '' })

    return Object.assign({}, state, action.payload, {
      meta: Object.assign({}, state.meta, {
        level1: {
          label: '一级部门',
          type: inputTypes.SELECT,
          options: level1s,
          readOnly: true
        },
        level2: {
          label: '二级部门',
          type: inputTypes.SELECT,
          options: [{ label: '所有二级部门', value: '' }]
        },
        level3: {
          label: '三级部门',
          type: inputTypes.SELECT,
          options: [{ label: '所有三级部门', value: '' }]
        }
      })
    })
  },
  [QUERY_COMPANIES_SUCCESS]: (state, action) => Object.assign({}, state, {
    meta: Object.assign({}, state.meta, {
      company: {
        label: '请选择公司',
        type: inputTypes.SELECT,
        options: action.payload
      }
    })
  }),
  [CREATE_DATA]: (state, action) => Object.assign({}, state, { success: false }),
  [CREATE_SUCCESS]: (state, action) => Object.assign({}, state, { success: true }),
  [UPDATE_SUCCESS]: (state, action) => Object.assign({}, state, { success: true }),
  [SWITCH_PAGE]: (state, action) => Object.assign({}, state, { currentPage: action.payload }),
  [UPDATE_FILTER]: (state, action) => {
    let meta = Object.assign({}, state.meta)
    if (state.list) {
      switch (action.payload.field) {
        case 'level1':
          const level1 = state.list.find(level => level.orgID === action.payload.value)
          const level2s = level1.subs.map(level2 => ({ label: level2.orgName, value: level2.orgID }))
          level2s.unshift({ label: '所有二级部门', value: '' })
          meta.level2.options = level2s
          meta.level3.options = [{ label: '所有三级部门', value: '' }]
          break
        case 'level2':
          const level = state.list.find(org => org.subs.find(sub => sub.orgID === action.payload.value))
          const level2 = level.subs.find(sub => sub.orgID === action.payload.value)
          const level3s = level2.subs.map(level3 => ({ label: level3.orgName, value: level3.orgID }))
          level3s.unshift({ label: '所有三级部门', value: '' })
          meta.level3.options = level3s
          break
        default:
          break
      }
    }
    const newFilter = Object.assign({}, state.currentFilter)
    newFilter[action.payload.field] = action.payload.value
    return Object.assign({}, state, { currentFilter: newFilter, meta })
  },
  [UPDATE_ITEM]: (state, action) => {
    const newItem = Object.assign({}, state.currentItem)
    newItem[action.payload.field] = action.payload.value
    return Object.assign({}, state, { currentItem: newItem })
  },
  [RESET_ITEM]: (state, action) => {
    let user = action.payload
    let meta = Object.assign({}, state.meta)

    if (user.level1) {
      let level1Org = state.list.find(org => org.orgID === user.level1)
      let level2s = level1Org
        ? level1Org.subs.map(org => ({ label: org.orgName, value: org.orgID }))
        : []
      meta.level2 = {
        label: '二级部门',
        type: inputTypes.SELECT,
        options: level2s
      }
    }

    return Object.assign({}, state, { currentItem: action.payload, success: false, meta })
  },
  [RESET_PASSWORD]: (state, action) => Object.assign({}, state, { passwordSuccess: false }),
  [RESET_PASSWORD_SUCCESS]: (state, action) => Object.assign({}, state, {
    passwordSuccess: true,
    newPassword: action.payload
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
