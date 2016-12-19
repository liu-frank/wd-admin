import fetch from 'utils/fetch'
import domain from 'utils/domain'
import { inputTypes } from 'modules/inputs'
import { showSuccess } from 'modules/prompts'

// ------------------------------------
// Constants
// ------------------------------------
const META_DATA = {
  userID: {
    label: '用户ID'
  },
  iMAccount: {
    label: '万信号',
    maxLength: 20
  },
  userName: {
    label: '用户姓名',
    required: true,
    maxLength: 20
  },
  mobile: {
    label: '手机号码',
    type: inputTypes.PHONE,
    required: true,
    maxLength: 11
  },
  email: {
    label: 'Email',
    required: true,
    maxLength: 50,
    type: inputTypes.EMAIL
  },
  appRoleIDList: {
    label: '拥有角色',
    type: inputTypes.MULTISELECT,
    options: []
  },
  status: {
    label: '用户状态',
    type: inputTypes.SELECT,
    options: [{
      label: '启用',
      value: 0
    }, {
      label: '停用',
      value: 1
    }],
    createHide: true
  },
  companyName: {
    label: '所在公司'
  },
  creator: {
    label: '创建人'
  },
  createTime: {
    type: inputTypes.DATE,
    label: '创建时间'
  },
  company: {
    label: '请选择公司',
    type: inputTypes.SELECT,
    options: [{
      label: '所有公司',
      value: ''
    }]
  },
  level1: {
    label: '一级部门',
    type: inputTypes.SELECT,
    options: [{
      label: '所有一级部门',
      value: ''
    }]
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
  }
}

const INITIAL_STATE = {
  meta: META_DATA,
  filterFields: ['mobile', 'userName', 'company', 'level1', 'level2', 'level3'],
  tableFields: ['userID', 'userName', 'mobile', 'companyName', 'appRoleIDList', 'creator', 'createTime'],
  editFields: ['iMAccount', 'userName', 'mobile', 'email', 'status'],

  list: [],
  orgList: [],
  total: 0,
  pageSize: 20,
  currentPage: 0,
  currentItem: {},
  currentFilter: {},
  passwordSuccess: false
}

const QUERY_DATA = 'QUERY_ACCOUNT_MANAGEMENT'
const QUERY_SUCCESS = 'QUERY_ACCOUNT_MANAGEMENT_SUCCESS'
const QUERY_ROLES_START = 'QUERY_ROLE_START_ACCOUNT_MANAGEMENT'
const QUERY_ROLES_SUCCESS = 'QUERY_ROLE_SUCCESS_ACCOUNT_MANAGEMENT_SUCCESS'
const QUERY_COMPANIES_START = 'QUERY_COMPANIES_START_ACCOUNT_MANAGEMENT'
const QUERY_COMPANIES_SUCCESS = 'QUERY_COMPANIES_SUCCESS_ACCOUNT_MANAGEMENT_SUCCESS'
const RESET_ORGS = 'RESET_ORGS_ACCOUNT_MANAGEMENT'
const QUERY_ORGS_START = 'QUERY_ORGS_START_ACCOUNT_MANAGEMENT'
const QUERY_ORGS_SUCCESS = 'QUERY_ORGS_SUCCESS_ACCOUNT_MANAGEMENT_SUCCESS'
const CREATE_DATA = 'CREATE_ACCOUNT_MANAGEMENT'
const CREATE_SUCCESS = 'CREATE_ACCOUNT_MANAGEMENT_SUCCESS'
const UPDATE_DATA = 'UPDATE_ACCOUNT_MANAGEMENT'
const UPDATE_SUCCESS = 'UPDATE_ACCOUNT_MANAGEMENT_SUCCESS'
const DELETE_DATA = 'DELETE_ACCOUNT_MANAGEMENT'
const DELETE_SUCCESS = 'DELETE_ACCOUNT_MANAGEMENT_SUCCESS'
const RESET_PASSWORD = 'RESET_PASSWORD_ACCOUNT_MANAGEMENT'
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_ACCOUNT_MANAGEMENT_SUCCESS'

const UPDATE_FILTER = 'UPDATE_ACCOUNT_MANAGEMENT_FILTER'
const UPDATE_ITEM = 'UPDATE_ACCOUNT_MANAGEMENT_ITEM'
const RESET_ITEM = 'RESET_ACCOUNT_MANAGEMENT_ITEM'
const SWITCH_PAGE = 'SWITCH_ACCOUNT_MANAGEMENT_PAGE'

// ------------------------------------
// Actions
// ------------------------------------
const query = () => ({ type: QUERY_DATA })
const querySuccess = data => ({ type: QUERY_SUCCESS, payload: data })
const queryRolesStart = () => ({ type: QUERY_ROLES_START })
const queryRolesSuccess = data => ({ type: QUERY_ROLES_SUCCESS, payload: data })
const queryCompaniesStart = () => ({ type: QUERY_COMPANIES_START })
const queryCompaniesSuccess = data => ({ type: QUERY_COMPANIES_SUCCESS, payload: data })
const queryOrgsStart = () => ({ type: QUERY_ORGS_START })
const queryOrgsSuccess = data => ({ type: QUERY_ORGS_SUCCESS, payload: data })
const create = () => ({ type: CREATE_DATA })
const createSuccess = data => ({ type: CREATE_SUCCESS, payload: data })
const update = () => ({ type: UPDATE_DATA })
const updateSuccess = () => ({ type: UPDATE_SUCCESS })
const deleteStart = () => ({ type: DELETE_DATA })
const deleteSuccess = () => ({ type: DELETE_SUCCESS })
const resetPasswordStart = () => ({ type: RESET_PASSWORD })
const resetPasswordSuccess = password => ({ type: RESET_PASSWORD_SUCCESS, payload: password })

export const queryRoles = () => {
  return (dispatch, getState) => {
    dispatch(queryRolesStart())
    return new Promise(resolve => {
      fetch(`${domain.aas}/aas/v1/role/query`, {
        method: 'POST',
        jsonData: {}
      })
      .then(resp => {
        dispatch(queryRolesSuccess(
          resp.appRoleList
              .filter(role => role.status === '0')
              .map(role => {
                role.value = role.appRoleID
                role.label = role.roleName
                return role
              })
        ))
      })
    })
  }
}

export const queryData = () => {
  return (dispatch, getState) => {
    dispatch(query())
    return new Promise(resolve => {
      const filter = getState()['account-management'].currentFilter
      const data = getState()['account-management']
      let param = {
        mobile: filter.mobile,
        userName: filter.userName,
        pageNum: data.currentPage,
        pageSize: data.pageSize
      }

      if (filter.level3) {
        param.orgID = filter.level3
      } else if (filter.level2) {
        param.orgID = filter.level2
      } else if (filter.level1) {
        param.orgID = filter.level1
      }

      if (filter.company !== '') {
        param.companyOrgID = filter.company
      }

      fetch(`${domain.aas}/aas/v1/user/query`, {
        method: 'POST',
        jsonData: param
      })
      .then(resp => {
        dispatch(querySuccess({
          list: resp.userInfoList.map(item => {
            item.appRoleIDList = item.appRoleIDList.join(',')
            return item
          }),
          total: resp.total
        }))
      })
    })
  }
}

export const createData = () => {
  return (dispatch, getState) => {
    dispatch(create())
    return new Promise(resolve => {
      const item = Object.assign({
        appRoleIDList: ''
      }, getState()['account-management'].currentItem)
      item.appRoleIDList = (item.appRoleIDList !== '') ? item.appRoleIDList.split(',') : []
      fetch(`${domain.aas}/aas/v1/user/add`, {
        method: 'POST',
        jsonData: item
      })
      .then(resp => {
        dispatch(createSuccess(resp.userInfoDTO))
        dispatch(queryData())
      })
    })
  }
}

export const updateData = () => {
  return (dispatch, getState) => {
    dispatch(update())
    return new Promise(resolve => {
      const item = Object.assign({}, getState()['account-management'].currentItem)
      item.appRoleIDList = (item.appRoleIDList !== '') ? item.appRoleIDList.split(',') : []
      fetch(`${domain.aas}/aas/v1/user/modify`, {
        method: 'POST',
        jsonData: item
      })
      .then(resp => {
        dispatch(updateSuccess())
        dispatch(queryData())
        dispatch(showSuccess({
          message: '修改用户信息成功'
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
        dispatch(resetPasswordSuccess())
      })
    })
  }
}

export const applyChange = (fileId) => {
  return (dispatch, getState) => {
    fetch(`${domain.aas}/aas/v1/user/applyChange`, {
      method: 'POST',
      jsonData: {
        fileId: fileId,
        operationAction: 10
      }
    }).then(resp => {
      dispatch(queryData())
    })
  }
}

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

export const queryOrgs = (orgID) => {
  return (dispatch, getState) => {
    dispatch(queryOrgsStart())
    return new Promise(resolve => {
      fetch(`${domain.aas}/aas/v1/org/suborgs/query`, {
        method: 'POST',
        jsonData: { orgID }
      })
      .then(resp => {
        let level1s = resp.orgList.filter(org => org.parentOrgID === orgID)

        level1s.forEach(level1 => {
          level1.subs = resp.orgList.filter(org => org.parentOrgID === level1.orgID) || []
          level1.subs.forEach(level2 => {
            level2.subs = resp.orgList.filter(org => org.parentOrgID === level2.orgID) || []
          })
        })

        dispatch(queryOrgsSuccess(level1s))
      })
    })
  }
}

export const switchPageStart = (pageNo = 0) => ({ type: SWITCH_PAGE, payload: pageNo })
export const updateFilter = (info = {}) => ({ type: UPDATE_FILTER, payload: info })
export const updateItem = (item = {}) => ({ type: UPDATE_ITEM, payload: item })
export const resetItem = (item = {}) => ({ type: RESET_ITEM, payload: item })
export const resetOrgs = () => ({ type: RESET_ORGS })

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUERY_DATA]: (state, action) => Object.assign({}, state, { list: [] }),
  [QUERY_SUCCESS]: (state, action) => Object.assign({}, state, action.payload),
  [QUERY_ROLES_SUCCESS]: (state, action) => Object.assign({}, state, {
    meta: Object.assign({}, state.meta, {
      appRoleIDList: {
        label: '拥有角色',
        type: inputTypes.MULTISELECT,
        options: action.payload,
        width: '20%'
      }
    })
  }),
  [QUERY_COMPANIES_START]: (state, action) => Object.assign({}, state, { hasCompany: false }),
  [QUERY_COMPANIES_SUCCESS]: (state, action) => Object.assign({}, state, {
    hasCompany: true,
    meta: Object.assign({}, state.meta, {
      company: {
        label: '请选择公司',
        type: inputTypes.SELECT,
        options: action.payload
      }
    })
  }),
  [RESET_ORGS]: (state, action) => Object.assign({}, state, { hasOrg: false }),
  [QUERY_ORGS_SUCCESS]: (state, action) => {
    const level1s = action.payload.map(
      level1 => ({ label: level1.orgName, value: level1.orgID })
    )
    level1s.unshift({ label: '所有一级部门', value: '' })

    return Object.assign({}, state, {
      hasOrg: true,
      orgList: action.payload,
      currentFilter: Object.assign({}, state.currentFilter, {
        level1: null,
        level2: null,
        level3: null
      }),
      meta: Object.assign({}, state.meta, {
        level1: {
          type: inputTypes.SELECT,
          options: level1s
        },
        level2: {
          type: inputTypes.SELECT,
          options: [{ label: '所有二级部门', value: '' }]
        },
        level3: {
          type: inputTypes.SELECT,
          options: [{ label: '所有三级部门', value: '' }]
        }
      })
    })
  },
  [CREATE_DATA]: (state, action) => Object.assign({}, state, { success: false }),
  [CREATE_SUCCESS]: (state, action) => Object.assign({}, state, { success: true, loginPassword: action.payload.loginPassword }),
  [UPDATE_SUCCESS]: (state, action) => Object.assign({}, state, { success: true, loginPassword: null }),
  [SWITCH_PAGE]: (state, action) => Object.assign({}, state, { currentPage: action.payload }),
  [UPDATE_FILTER]: (state, action) => {
    let meta = Object.assign({}, state.meta)
    let modifyFilter = {}
    if (state.list) {
      switch (action.payload.field) {
        case 'level1':
          const level1 = state.orgList.find(level => level.orgID === action.payload.value)
          const level2s = level1
            ? level1.subs.map(level2 => ({ label: level2.orgName, value: level2.orgID }))
            : []
          level2s.unshift({ label: '所有二级部门', value: '' })
          modifyFilter = { level2: null, level3: null }
          meta.level2.options = level2s
          meta.level3.options = [{ label: '所有三级部门', value: '' }]
          break
        case 'level2':
          const level = state.orgList.find(org => org.subs.find(sub => sub.orgID === action.payload.value))
          const level2 = level
            ? level.subs.find(sub => sub.orgID === action.payload.value)
            : null
          const level3s = level2
            ? level2.subs.map(level3 => ({ label: level3.orgName, value: level3.orgID }))
            : []
          modifyFilter = { level3: null }
          level3s.unshift({ label: '所有三级部门', value: '' })
          meta.level3.options = level3s
          break
        default:
          break
      }
    }
    const newFilter = Object.assign({}, state.currentFilter, modifyFilter)
    newFilter[action.payload.field] = action.payload.value
    return Object.assign({}, state, { currentFilter: newFilter, meta })
  },
  [UPDATE_ITEM]: (state, action) => {
    const newItem = Object.assign({}, state.currentItem)
    newItem[action.payload.field] = action.payload.value
    return Object.assign({}, state, { currentItem: newItem })
  },
  [RESET_ITEM]: (state, action) => Object.assign({}, state, { currentItem: action.payload, success: false }),
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
