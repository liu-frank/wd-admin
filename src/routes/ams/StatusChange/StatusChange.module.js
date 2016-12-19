import React from 'react'
import { inputTypes as types } from 'modules/inputs'
import fetch from 'utils/fetch'
import domain from 'utils/domain'
// ------------------------------------
// Constants
// ------------------------------------
const META_DATA = {
  PWID: {
    label: 'PWID'
  },
  sysFrom: {
    label: '注册渠道',
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
  account: {
    label: '会员帐号',
    display: item => <div>{item.mobile && <p>{item.mobile}</p>}{item.email && <p>{item.email}</p>}</div>
  },
  createTime: {
    label: '申请时间',
    type: types.DATE
  },
  operator: {
    label: '申请人'
  },
  WOType: {
    label: '申请变更状态',
    type: types.SELECT,
    options: [{
      label: '姓名变更',
      value: '10'
    }, {
      label: '别名(昵称)变更',
      value: '20'
    }, {
      label: '手机变更',
      value: '30'
    },{
      label: '电子邮件变更',
      value: '40'
    },{
      label: '身份证号变更',
      value: '50'
    },{
      label: '会员状态冻结',
      value: '60'
    },{
      label: '会员状态解冻',
      value: '70'
    },{
      label: '会员状态销户',
      value: '80'
    },{
      label: '批量状态变更',
      value: '100'
    }]
  },
  auditTime: {
    label: '审核时间',
    type: types.DATE
  },
  auditor: {
    label: '审核人'
  },
  status: {
    label: '审核状态',
    type: types.SELECT,
    options: [{
      label: '全部',
      value: ''
    }, {
      label: '待审核',
      value: '20'
    }, {
      label: '审核同意',
      value: '30'
    }, {
      label: '审核拒绝',
      value: '40'
    }]
  },
  operations: {
    width: 80
  }
}

const INITIAL_STATE = {
  meta: META_DATA,
  filterFields: ['PWID', 'account'],
  tableFields: ['PWID', 'sysFrom', 'account', 'createTime', 'operator', 'WOType'],
  list: [],
  total: 0,
  pageSize: 20,
  currentPage: 0,
  currentItem: {},
  currentFilter: {},
  checkStatus:false
}

const SAMPLE_DATA = {
  list: [{
    id: 1,
    date: '2016-01-01 11:11:11',
    operator: '心守小白',
    content: '申请冻结账户',
    account: '1234567'
  }, {
    id: 2,
    date: '2016-01-01 11:11:11',
    operator: '心守小白',
    content: '申请冻结账户',
    account: '1234567'
  }],
  total: 12,
  currentPage: 0,
  pageSize: 6
}

const QUERY_DATA = 'QUERY_STATUS_CHANGE'
const QUERY_SUCCESS = 'QUERY_STATUS_CHANGE_SUCCESS'
const CREATE_DATA = 'CREATE_STATUS_CHANGE'
const CREATE_SUCCESS = 'CREATE_STATUS_CHANGE_SUCCESS'
const UPDATE_DATA = 'UPDATE_STATUS_CHANGE'
const UPDATE_SUCCESS = 'UPDATE_STATUS_CHANGE_SUCCESS'
const DELETE_DATA = 'DELETE_STATUS_CHANGE'
const DELETE_SUCCESS = 'DELETE_STATUS_CHANGE_SUCCESS'
const RESET_STATUS = 'RESET_RESULT_STATUS'
const RESET_STATUS_SUCCESS = 'RESET_RESULT_SUCCESS'

const UPDATE_FILTER = 'UPDATE_STATUS_CHANGE_FILTER'
const UPDATE_ITEM = 'UPDATE_STATUS_CHANGE_ITEM'
const RESET_ITEM = 'RESET_STATUS_CHANGE_ITEM'
const SWITCH_PAGE = 'SWITCH_STATUS_CHANGE_PAGE'

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
const resetResultStart = () => ({ type: RESET_STATUS })
const resetResultSuccess = failNums => ({ type: RESET_STATUS_SUCCESS, failNums: failNums })

export const queryData = () => {
  return (dispatch, getState) => {
    const filter = getState()['status-change'].currentFilter;
    const data = getState()['status-change'];
    dispatch(query())
    return new Promise(resolve => {
        fetch(`${domain.ams}/ams/v1/workOrder/query/operationLog`, {
        method: 'POST',
        jsonData: {
          QueryType : 10,
          WOStatus : filter.status,
          PWID: filter.PWID ? filter.PWID.replace(/(^\s*)|(\s*$)/g,'') : null,
          loginName: filter.account,
          pageNum: data.currentPage,
          pageSize: data.pageSize
        }
      }).then(resp => {
        dispatch(querySuccess({
          list: resp.workOrders,
          total: resp.totalNum
        }))
      })
    })
  }
}

export const queryChangeStatus = (WOIDs,status) => {
  return (dispatch, getState) => {
    dispatch(resetResultStart())
    fetch(`${domain.ams}/ams/v1/account/WOStatus/ChangeAudit`, {
      method: 'POST',
      jsonData: {
        WOIDs: WOIDs,
        auditResult:status
      }
    }).then(resp => {
      dispatch(resetResultSuccess(resp.failNums))
      dispatch(queryData())
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
export const resetItem = (item = {}) => ({ type: RESET_ITEM, payload: item })

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
  [UPDATE_ITEM]: (stateo, action) => Object.assign({}, state, { currentItem: action.payload }),
  [RESET_ITEM]: (state, action) => Object.assign({}, state, { currentItem: action.payload, success: false }),
  [RESET_STATUS]: (state, action) => Object.assign({}, state, { checkStatus: false }),
  [RESET_STATUS_SUCCESS]: (state, action) => Object.assign({}, state, {
    checkStatus: true,
    failNums: action.failNums
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
