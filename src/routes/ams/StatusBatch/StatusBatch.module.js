import React from 'react'
import moment from 'moment'
import domain from 'utils/domain'
import fetch from 'utils/fetch'
import { inputTypes as types } from 'modules/inputs'
// ------------------------------------
// Constants
// ------------------------------------
const PWID_STATUS = {
  0: '创建',
  1: '正常',
  2: '冻结',
  8: '已合并',
  9: '注销'
}
const META_DATA = {
  createTime: {
    label: '创建时间',
    type: types.DATE,
    width: '20%'
  },
  operator: {
    label: '创建人',
    width: '20%'
  },
  PWID: {
    label: 'PWID',
    width: '20%'
  },
  account: {
    label: '会员帐号',
    display: item => <div>{item.mobile && <p>{item.mobile}</p>}{item.email && <p>{item.email}</p>}</div>,
    width: '20%'
  },
  newAcctStatus: {
    label: '当前状态',
    type: types.SELECT,
    display: item => <div>{PWID_STATUS[item.newAcctStatus]}<a tabIndex="0"  data-toggle='tooltip' data-placement="bottom"  title={'原状态:  '+PWID_STATUS[item.acctStatus]} data-content={PWID_STATUS[item.acctStatus]}><i className='glyphicon glyphicon-time'/></a></div>,
    options: [{
      label: '正常',
      value: '1'
    }, {
      label: '冻结',
      value: '2'
    }, {
      label: '注销',
      value: '9'
    }],
    width: '20%'
  },
  range: {
    label: '起止日期',
    type: types.DATERANGE,
    startField: 'startProcessTime',
    endField: 'endProcessTime',
    maxDate: moment()
  }
}

const INITIAL_STATE = {
  meta: META_DATA,
  filterFields: ['range', 'PWID', 'account'],
  tableFields: ['createTime', 'operator', 'PWID', 'account', 'newAcctStatus'],

  list: [],
  total: 0,
  pageSize: 20,
  currentPage: 0,
  currentItem: {},
  currentFilter: {}
}

const SAMPLE_DATA = {
  list: [{
    id: 3,
    createDate: '2016-04-04 11:11:11',
    operator: '心守小白',
    account: '1234567',
    origin: '0',
    status: '1'
  }, {
    id: 3,
    createDate: '2016-04-04 11:11:11',
    operator: '心守小白',
    account: '1234567',
    origin: '1',
    status: '0'
  }],
  total: 100,
  currentPage: 0,
  pageSize: 6
}

const QUERY_DATA = 'QUERY_STATUS_BATCH'
const QUERY_SUCCESS = 'QUERY_STATUS_BATCH_SUCCESS'
const CREATE_DATA = 'CREATE_STATUS_BATCH'
const CREATE_SUCCESS = 'CREATE_STATUS_BATCH_SUCCESS'
const UPDATE_DATA = 'UPDATE_STATUS_BATCH'
const UPDATE_SUCCESS = 'UPDATE_STATUS_BATCH_SUCCESS'
const DELETE_DATA = 'DELETE_STATUS_BATCH'
const DELETE_SUCCESS = 'DELETE_STATUS_BATCH_SUCCESS'

const UPDATE_FILTER = 'UPDATE_STATUS_BATCH_FILTER'
const UPDATE_ITEM = 'UPDATE_STATUS_BATCH_ITEM'
const RESET_ITEM = 'RESET_STATUS_BATCH_ITEM'
const SWITCH_PAGE = 'SWITCH_STATUS_BATCH_PAGE'

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
    const filter = getState()['status-batch'].currentFilter
    const data = getState()['status-batch']
    dispatch(query())
    return new Promise(resolve => {
      fetch(`${domain.ams}/ams/v1/workOrder/query/operationLog`, {
        method: 'POST',
        jsonData: {
          startCreateTime: filter.startProcessTime,
          endCreateTime: filter.endProcessTime,
          QueryType : 20,
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

export const queryChangeUpload = (fileId) => {
  return (dispatch, getState) => {
    dispatch(query())
    fetch(`${domain.ams}/ams/v1/workOrder/update/woAcctStatusChangeFile`, {
      method: 'POST',
      jsonData: {
        fileId: fileId,
        operationAction:10
      }
    }).then(resp => {

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
  [UPDATE_ITEM]: (state, action) => {
    const newItem = Object.assign({}, state.currentItem)
    newItem[action.payload.field] = action.payload.value
    return Object.assign({}, state, { currentItem: newItem })
  },
  [RESET_ITEM]: (state, action) => Object.assign({}, state, { currentItem: action.payload, success: false })
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
