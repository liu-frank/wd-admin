import { inputTypes as types } from 'modules/inputs'
import domain from 'utils/domain'
import fetch from 'utils/fetch'
// ------------------------------------
// Constants
// ------------------------------------
const META_DATA = {
  pwid: {
    label: 'PWID'
  },
  pwidtype: {
    label: '会员类型',
    type: types.SELECT,
    options: [{
      label: '快钱',
      value: '99bill'
    }, {
      label: '万达',
      value: 'wanda'
    }, {
      label: '飞凡',
      value: 'ffan'
    }]
  },
  loginNameType: {
    label: '帐号类型',
    type: types.SELECT,
    options: [{
      label: '电子邮件',
      value: '1'
    }, {
      label: '手机',
      value: '2'
    }, {
      label: '电话',
      value: '3'
    }, {
      label: 'OPENID',
      value: '4'
    }, {
      label: '自定义用户名',
      value: '5'
    }]
  },
  name: {
    label: '用户姓名'
  },
  loginName: {
    label: '会员帐号'
  },
  realNameLevel: {
    label: '服务等级',
    type: types.SELECT,
    options: [
      {
        label: '未实名用户',
        value: '100'
      },
      {
        label: '身份实名用户',
        value: '105'
      },
      {
        label: '卡鉴权用户',
        value: '110'
      },
      {
        label: '生物识别用户',
        value: '112'
      },
      {
        label: '强实名用户',
        value: '115'
      }]
  },
  status: {
    label: '用户状态',
    type: types.SELECT,
    options: [{
      label: '创建',
      value: '0'
    }, {
      label: '正常',
      value: '1'
    }, {
      label: '冻结',
      value: '2'
    },
      {
        label: '已合并',
        value: '8'
      },{
      label: '待激活',
      value: '9'
    }]
  },
  createTime: {
    label: '注册时间',
    type: types.DATE
  },
  lastLoginTime: {
    label: '最后登录时间',
    type: types.DATE
  },
  operations: {
    width: 80
  }
}

const INITIAL_STATE = {
  meta: META_DATA,
  filterFields: ['pwid', 'loginName'],
  tableFields: ['pwid', 'pwidtype', 'loginNameType', 'name', 'loginName',
                'realNameLevel', 'status', 'createTime', 'lastLoginTime'],
  editFields: ['name', 'channel', 'status', 'realNameLevel'],

  list: [],
  total: 0,
  pageSize: 20,
  currentPage: 0,
  currentItem: {},
  currentFilter: {}
}

const QUERY_DATA = 'QUERY_MEMBER_INFO'
const QUERY_SUCCESS = 'QUERY_MEMBER_INFO_SUCCESS'
const CREATE_DATA = 'CREATE_MEMBER_INFO'
const CREATE_SUCCESS = 'CREATE_MEMBER_INFO_SUCCESS'
const UPDATE_DATA = 'UPDATE_MEMBER_INFO'
const UPDATE_SUCCESS = 'UPDATE_MEMBER_INFO_SUCCESS'
const DELETE_DATA = 'DELETE_MEMBER_INFO'
const DELETE_SUCCESS = 'DELETE_MEMBER_INFO_SUCCESS'

const UPDATE_FILTER = 'UPDATE_MEMBER_INFO_FILTER'
const UPDATE_ITEM = 'UPDATE_MEMBER_INFO_ITEM'
const RESET_ITEM = 'RESET_MEMBER_INFO_ITEM'
const SWITCH_PAGE = 'SWITCH_MEMBER_INFO_PAGE'

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
    return new Promise(resolve => {
      const filter = getState()['member-info'].currentFilter
      fetch(`${domain.ams}/ams/v1/account/query/account`, {
        method: 'POST',
        jsonData: {
          PWID: filter.pwid ? filter.pwid.replace(/(^\s*)|(\s*$)/g,'') : null,
          loginName: filter.loginName ? filter.loginName.replace(/(^\s*)|(\s*$)/g,'') : null
        }
      })
      .then(resp => {
        dispatch(querySuccess({
          list: resp.loginAccountList
        }))
      })
    })
  }
}

export const createData = () => {
  return (dispatch, getState) => {
    dispatch(create())
    return new Promise(resolve => {
      setTimeout(() => {
        dispatch(createSuccess())
        resolve()
      }, 1000)
    })
  }
}

export const updateData = () => {
  return (dispatch, getState) => {
    dispatch(update())
    return new Promise(resolve => {
      setTimeout(() => {
        dispatch(updateSuccess())
        resolve()
      }, 1000)
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

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUERY_SUCCESS]: (state, action) => Object.assign({}, state, action.payload),
  [CREATE_DATA]: (state, action) => Object.assign({}, state, { success: true }),
  [CREATE_SUCCESS]: (state, action) => Object.assign({}, state, { success: true }),
  [SWITCH_PAGE]: (state, action) => Object.assign({}, state, { currentPage: action.payload }),
  [UPDATE_FILTER]: (state, action) => {
    const newFilter = Object.assign({}, state.currentFilter)
    newFilter[action.payload.field] = action.payload.value
    return Object.assign({}, state, { currentFilter: newFilter })
  },
  [UPDATE_ITEM]: (state, action) => Object.assign({}, state, { currentItem: action.payload })
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
