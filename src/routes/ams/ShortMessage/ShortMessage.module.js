import { inputTypes as types } from 'modules/inputs'

// ------------------------------------
// Constants
// ------------------------------------
const META_DATA = {
  date: {
    label: '创建时间'
  },
  phone: {
    label: '手机号码'
  },
  status: {
    label: '短信状态',
    type: types.SELECT,
    options: [{
      label: '已发送',
      value: '0'
    }, {
      label: '发送失败',
      value: '1'
    }]
  },
  id: {
    label: 'PWID'
  },
  type: {
    label: '验证码类型',
    type: types.SELECT,
    options: [{
      label: '全部',
      value: ''
    }, {
      label: '注册',
      value: 1
    }, {
      label: '手机验证',
      value: 2
    }, {
      label: '前台找回密码',
      value: 3
    }, {
      label: '后台找回密码',
      value: 4
    }, {
      label: '修改密码',
      value: 5
    }]
  },
  range: {
    label: '起止日期',
    type: types.DATERANGE,
    startField: 'startDate',
    endField: 'endDate'
  }
}

const INITIAL_STATE = {
  meta: META_DATA,
  filterFields: ['range', 'phone', 'type'],
  tableFields: ['date', 'phone', 'status', 'id'],

  list: [],
  total: 0,
  pageSize: 20,
  currentPage: 0,
  currentItem: {},
  currentFilter: {}
}

const SAMPLE_DATA = {
  list: [],
  total: 0,
  currentPage: 0,
  pageSize: 20
}

const QUERY_DATA = 'QUERY_SHORT_MESSAGE'
const QUERY_SUCCESS = 'QUERY_SHORT_MESSAGE_SUCCESS'
const CREATE_DATA = 'CREATE_SHORT_MESSAGE'
const CREATE_SUCCESS = 'CREATE_SHORT_MESSAGE_SUCCESS'
const UPDATE_DATA = 'UPDATE_SHORT_MESSAGE'
const UPDATE_SUCCESS = 'UPDATE_SHORT_MESSAGE_SUCCESS'
const DELETE_DATA = 'DELETE_SHORT_MESSAGE'
const DELETE_SUCCESS = 'DELETE_SHORT_MESSAGE_SUCCESS'

const UPDATE_FILTER = 'UPDATE_SHORT_MESSAGE_FILTER'
const UPDATE_ITEM = 'UPDATE_SHORT_MESSAGE_ITEM'
const RESET_ITEM = 'RESET_SHORT_MESSAGE_ITEM'
const SWITCH_PAGE = 'SWITCH_SHORT_MESSAGE_PAGE'

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
      /**
      fetch('http://bc.qbao.com/listProduct8.html')
        .then(resp => resp.json())
        .then(resp => {

          dispatch(querySuccess())
        })
        .catch(() => {
          console.error('error happens')
          dispatch(showSuccess())
        })
      */
      setTimeout(() => {
        dispatch(querySuccess(SAMPLE_DATA))
        resolve()
      }, 50)
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
