import moment from 'moment'
import React from 'react'
import domain from 'utils/domain'
import fetch from 'utils/fetch'
import { inputTypes as types } from 'modules/inputs'
// ------------------------------------
// Constants
// ------------------------------------
const META_DATA = {
  PWID: {
    label: 'PWID'
  },
  processTime: {
    label: '操作时间',
    type: types.DATE
  },
  operator: {
    label: '操作人'
  },
  operatorOrg:{
    label:'操作部门'
  },
  WOType: {
    label: '操作内容',
    type: types.SELECT,
    options: [{
      label: '姓名变更',
      value: '10'
    }, {
      label: '别名变更',
      value: '20'
    }, {
      label: '手机变更',
      value: '30'
    }, {
      label: '电子邮件变更',
      value: '40'
    }, {
      label: '身份证号变更',
      value: '50'
    }, {
      label: '冻结',
      value: '60'
    }, {
      label: '解冻',
      value: '70'
    }, {
      label: '销户',
      value: '80'
    }, {
      label: '批量状态变更',
      value: '100'
    }]
  },
  accountNo: {
    label: '会员帐号',
    display: item => <div>{item.mobile && <p>{item.mobile}</p>}{item.email && <p>{item.email}</p>}</div>
  },
  range: {
    label: '起止日期',
    type: types.DATERANGE,
    startField: 'startProcessTime',
    endField: 'endProcessTime',
    maxDate: moment()
  },
  operations: {
    width: 120
  }
}

const INITIAL_STATE = {
  meta: META_DATA,
  filterFields: ['range', 'operator', 'PWID', 'accountNo'],
  tableFields: ['processTime', 'operator','operatorOrg', 'WOType', 'accountNo'],
  list: [],
  total: 0,
  pageSize: 20,
  currentPage: 0,
  currentItem: {},
  currentFilter: {}
}

const QUERY_DATA = 'QUERY_OPERATION_LOG'
const QUERY_SUCCESS = 'QUERY_OPERATION_LOG_SUCCESS'
const CREATE_DATA = 'CREATE_OPERATION_LOG'
const CREATE_SUCCESS = 'CREATE_OPERATION_LOG_SUCCESS'
const UPDATE_DATA = 'UPDATE_OPERATION_LOG'
const UPDATE_SUCCESS = 'UPDATE_OPERATION_LOG_SUCCESS'
const DELETE_DATA = 'DELETE_OPERATION_LOG'
const DELETE_SUCCESS = 'DELETE_OPERATION_LOG_SUCCESS'

const UPDATE_FILTER = 'UPDATE_OPERATION_LOG_FILTER'
const UPDATE_ITEM = 'UPDATE_OPERATION_LOG_ITEM'
const RESET_ITEM = 'RESET_OPERATION_LOG_ITEM'
const SWITCH_PAGE = 'SWITCH_OPERATION_LOG_PAGE'

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
    const filter = getState()['operation-log'].currentFilter
    const data = getState()['operation-log']

    dispatch(query())
    return fetch(`${domain.ams}/ams/v1/workOrder/query/operationLog`, {
      method: 'POST',
      jsonData: {
        startCreateTime: filter.startProcessTime,
        endCreateTime: filter.endProcessTime,
        operator: filter.operator,
        PWID: filter.PWID ? filter.PWID.replace(/(^\s*)|(\s*$)/g,'') : null,
        loginName: filter.accountNo,
        pageNum: data.currentPage,
        pageSize: data.pageSize
      }
    }).then(resp => {
      dispatch(querySuccess({
        list: resp.workOrders,
        total: resp.totalNum
      }))
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
