import _ from 'lodash'
import fetch from 'utils/fetch'
import domain from 'utils/domain'
import { inputTypes } from 'modules/inputs'
import { showSuccess } from 'modules/prompts'
import { showConfirm } from 'modules/popups'

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
    type: inputTypes.SELECT,
    options: []
  },
  groupIDList: {
    label: '所属用户组',
    type: inputTypes.SELECT,
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
  company: {
    type: inputTypes.SELECT,
    options: [{
      label: '请选择公司',
      value: ''
    }]
  },
  level1: {
    type: inputTypes.SELECT,
    options: [{
      label: '请选择一级部门',
      value: ''
    }]
  },
  level2: {
    type: inputTypes.SELECT,
    options: [{
      label: '请选择二级部门',
      value: ''
    }]
  },
  level3: {
    type: inputTypes.SELECT,
    options: [{
      label: '请选择三级部门',
      value: ''
    }]
  }
}

const INITIAL_STATE = {
  meta: META_DATA,
  roleGroups: {},
  orgList: [],
  list: [],
  total: 0,
  pageSize: 20,
  currentPage: 0,
  currentItem: {
    appRoleIDList: [],
    groupIDList: []
  },
  currentFilter: {},
  passwordSuccess: false
}

const QUERY_DATA = 'QUERY_ACCOUNT_DETAIL'
const QUERY_SUCCESS = 'QUERY_ACCOUNT_DETAIL_SUCCESS'
const QUERY_ROLES_START = 'QUERY_ROLE_START_ACCOUNT_DETAIL'
const QUERY_ROLES_SUCCESS = 'QUERY_ROLE_SUCCESS_ACCOUNT_DETAIL_SUCCESS'
const QUERY_GROUPS_START = 'QUERY_GROUPS_START_ACCOUNT_DETAIL'
const QUERY_GROUPS_SUCCESS = 'QUERY_GROUPS_SUCCESS_ACCOUNT_DETAIL_SUCCESS'
const QUERY_COMPANIES_START = 'QUERY_COMPANIES_START_ACCOUNT_DETAIL'
const QUERY_COMPANIES_SUCCESS = 'QUERY_COMPANIES_SUCCESS_ACCOUNT_DETAIL_SUCCESS'
const QUERY_ORGS_START = 'QUERY_ORGS_START_ACCOUNT_DETAIL'
const QUERY_ORGS_SUCCESS = 'QUERY_ORGS_SUCCESS_ACCOUNT_DETAIL_SUCCESS'
const CREATE_DATA = 'CREATE_ACCOUNT_DETAIL'
const CREATE_SUCCESS = 'CREATE_ACCOUNT_DETAIL_SUCCESS'
const UPDATE_DATA = 'UPDATE_ACCOUNT_DETAIL'
const UPDATE_SUCCESS = 'UPDATE_ACCOUNT_DETAIL_SUCCESS'
const DELETE_DATA = 'DELETE_ACCOUNT_DETAIL'
const DELETE_SUCCESS = 'DELETE_ACCOUNT_DETAIL_SUCCESS'
const RESET_PASSWORD = 'RESET_PASSWORD_ACCOUNT_DETAIL'
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_ACCOUNT_DETAIL_SUCCESS'

const UPDATE_FILTER = 'UPDATE_ACCOUNT_DETAIL_FILTER'
const UPDATE_ITEM = 'UPDATE_ACCOUNT_DETAIL_ITEM'
const RESET_ITEM = 'RESET_ACCOUNT_DETAIL_ITEM'
const SWITCH_PAGE = 'SWITCH_ACCOUNT_DETAIL_PAGE'

// ------------------------------------
// Actions
// ------------------------------------
const query = () => ({ type: QUERY_DATA })
const querySuccess = data => ({ type: QUERY_SUCCESS, payload: data })
const queryRolesStart = () => ({ type: QUERY_ROLES_START })
const queryRolesSuccess = data => ({ type: QUERY_ROLES_SUCCESS, payload: data })
const queryGroupsStart = () => ({ type: QUERY_GROUPS_START })
const queryGroupsSuccess = data => ({ type: QUERY_GROUPS_SUCCESS, payload: data })
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

export const queryGroups = () => {
  return (dispatch, getState) => {
    dispatch(queryGroupsStart())
    return new Promise(resolve => {
      fetch(`${domain.aas}/aas/v1/groups/all`, {
        method: 'POST',
        jsonData: {}
      })
      .then(resp => {
        dispatch(queryGroupsSuccess(
          resp.groupList
              .filter(group => group.status === '0')
              .map(group => {
                group.value = group.groupID
                group.label = group.groupName
                return group
              })
        ))
      })
    })
  }
}

export const queryData = (userID) => {
  return (dispatch, getState) => {
    dispatch(query())
    return new Promise(resolve => {
      fetch(`${domain.aas}/aas/v1/user/single/query`, {
        method: 'POST',
        jsonData: { userID }
      })
      .then(resp => {
        let user = resp.userInfoDTO

        user.groupIDList = user.groupIDList || []

        fetch(`${domain.aas}/aas/v1/org/parentOrgs/query`, {
          method: 'POST',
          jsonData: { orgID: user.orgID }
        })
        .then(resp => {
          let orgs = resp.orgList ? resp.orgList : [];

          user.company = orgs[0] ? orgs[0].orgID : ''
          user.level1 = orgs[1] ? orgs[1].orgID : ''
          user.level2 = orgs[2] ? orgs[2].orgID : ''
          user.level3 = orgs[3] ? orgs[3].orgID : ''

          dispatch(querySuccess({
            currentItem: user
          }))

          dispatch(queryOrgs(user.companyOrgID))
        })
      })
    })
  }
}

export const createData = () => {
  return (dispatch, getState) => {
    dispatch(create())
    return new Promise(resolve => {
      const item = Object.assign({}, getState()['account-detail'].currentItem)
      item.companyOrgID = item.company
      if (item.level3 !== '') {
        item.orgID = item.level3
      } else if (item.level2 !== '') {
        item.orgID = item.level2
      } else {
        item.orgID = item.level1
      }
      delete item.company
      delete item.level1
      delete item.level2
      delete item.level3
      fetch(`${domain.aas}/aas/v1/user/add`, {
        method: 'POST',
        jsonData: item
      })
      .then(resp => {
        dispatch(showConfirm({
          title: '创建成功',
          message: '新密码已发送至用户手机',
          showCancel: false
        }))
        dispatch(createSuccess(resp.userInfoDTO))
      })
    })
  }
}

export const updateData = () => {
  return (dispatch, getState) => {
    dispatch(update())
    return new Promise(resolve => {
      const item = Object.assign({}, getState()['account-detail'].currentItem)
      item.companyOrgID = item.company
      if (item.level3 !== '') {
        item.orgID = item.level3
      } else if (item.level2 !== '') {
        item.orgID = item.level2
      } else {
        item.orgID = item.level1
      }
      delete item.company
      delete item.level1
      delete item.level2
      delete item.level3
      fetch(`${domain.aas}/aas/v1/user/modify`, {
        method: 'POST',
        jsonData: item
      })
      .then(resp => {
        dispatch(showSuccess({
          message: '修改用户信息成功'
        }))
        dispatch(updateSuccess())
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

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUERY_DATA]: (state, action) => Object.assign({}, state, { list: [] }),
  [QUERY_SUCCESS]: (state, action) => {
    let user = action.payload.currentItem
    let level1Org = state.orgList.find(org => org.orgID === user.level1)
    let level2s = level1Org
      ? level1Org.subs.map(org => ({ label: org.orgName, value: org.orgID }))
      : []
    let level2Org = level1Org
      ? level1Org.subs.find(org => org.orgID === user.level2)
      : null
    let level3s = level2Org
      ? level2Org.subs.map(org => ({ label: org.orgName, value: org.orgID }))
      : []

    level2s.unshift({ label: '请选择二级部门', value: '' })
    level3s.unshift({ label: '请选择三级部门', value: '' })

    return Object.assign({}, state, action.payload, {
      meta: Object.assign({}, state.meta, {
        level2: {
          type: inputTypes.SELECT,
          options: level2s
        },
        level3: {
          type: inputTypes.SELECT,
          options: level3s
        }
      })
    })
  },
  [QUERY_ROLES_SUCCESS]: (state, action) => {
    let roleGroups = _.groupBy(action.payload, item => item.appID)

    return Object.assign({}, state, {
      meta: Object.assign({}, state.meta, {
        appRoleIDList: {
          label: '拥有角色',
          options: action.payload
        }
      }),
      roleGroups
    })
  },
  [QUERY_GROUPS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      meta: Object.assign({}, state.meta, {
        groupIDList: {
          label: '所属用户组',
          options: action.payload
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
  [QUERY_ORGS_SUCCESS]: (state, action) => {
    let user = state.currentItem
    let orgList = action.payload

    const level1s = orgList.map(
      level1 => ({ label: level1.orgName, value: level1.orgID })
    )
    level1s.unshift({ label: '请选择一级部门', value: '' })
    let level1Org = orgList.find(org => org.orgID === user.level1)
    let level2s = level1Org
      ? level1Org.subs.map(org => ({ label: org.orgName, value: org.orgID }))
      : []
    let level2Org = level1Org
      ? level1Org.subs.find(org => org.orgID === user.level2)
      : null
    let level3s = level2Org
      ? level2Org.subs.map(org => ({ label: org.orgName, value: org.orgID }))
      : []

    level2s.unshift({ label: '请选择二级部门', value: '' })
    level3s.unshift({ label: '请选择三级部门', value: '' })

    return Object.assign({}, state, action.payload, {
      orgList,
      meta: Object.assign({}, state.meta, {
        level1: {
          type: inputTypes.SELECT,
          options: level1s
        },
        level2: {
          type: inputTypes.SELECT,
          options: level2s
        },
        level3: {
          type: inputTypes.SELECT,
          options: level3s
        }
      })
    })
  },
  [CREATE_DATA]: (state, action) => Object.assign({}, state, { success: false }),
  [CREATE_SUCCESS]: (state, action) => Object.assign({}, state, { success: true }),
  [UPDATE_DATA]: (state, action) => Object.assign({}, state, { success: false }),
  [UPDATE_SUCCESS]: (state, action) => Object.assign({}, state, { success: true }),
  [SWITCH_PAGE]: (state, action) => Object.assign({}, state, { currentPage: action.payload }),
  [UPDATE_FILTER]: (state, action) => {
    const newFilter = Object.assign({}, state.currentFilter)
    newFilter[action.payload.field] = action.payload.value
    return Object.assign({}, state, { currentFilter: newFilter })
  },
  [UPDATE_ITEM]: (state, action) => {
    let meta = Object.assign({}, state.meta)
    let modifyLevel = {}
    if (state.list) {
      switch (action.payload.field) {
        case 'level1':
          const level1 = state.orgList.find(level => level.orgID === action.payload.value)
          const level2s = level1
            ? level1.subs.map(level2 => ({ label: level2.orgName, value: level2.orgID }))
            : []
          level2s.unshift({ label: '请选择二级部门', value: '' })
          modifyLevel = { level2: '', level3: '' }
          meta.level2.options = level2s
          meta.level3.options = [{ label: '请选择三级部门', value: '' }]
          break
        case 'level2':
          const level = state.orgList.find(org => org.subs.find(sub => sub.orgID === action.payload.value))
          const level2 = level
            ? level.subs.find(sub => sub.orgID === action.payload.value)
            : ''
          const level3s = level2
            ? level2.subs.map(level3 => ({ label: level3.orgName, value: level3.orgID }))
            : []
          modifyLevel = { level3: '' }
          level3s.unshift({ label: '请选择三级部门', value: '' })
          meta.level3.options = level3s
          break
        default:
          break
      }
    }
    const newItem = Object.assign({}, state.currentItem, modifyLevel)
    newItem[action.payload.field] = action.payload.value
    return Object.assign({}, state, { currentItem: newItem, meta })
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
