import React from 'react'
import domain from 'utils/domain'
import fetch from 'utils/fetch'
import { inputTypes as types } from 'modules/inputs'
// ------------------------------------
// Constants
// ------------------------------------
const META_DATA = {
  resourceID: {
    label: '资源ID'
  },
  resourceDisplayName: {
    label: '显示名称'
  },
  appID: {
    label: '所属系统'
  },
  resourceTypeName: {
    label: '资源类型'
  },
  linkURL: {
    label: 'LinkURL'
  },
  levelStructure: {
    label: '资源层级'
  },
  status: {
    label: '资源状态',
    type: types.SELECT,
    options: [{
      label: '可用',
      value: '0'
    }, {
      label: '逻辑删除',
      value: '1'
    }, {
      label: '停用',
      value: '2'
    }]
  },
  recourseName: {
    label: '资源名称'
  },
  resource: {
    label: '资源类型',
    type: types.SELECT,
    options: [{
      label: '全部',
      value: ''
    }]
  },
  showname: {
    label: '显示名称'
  },
  system: {
    label: '所属系统',
    type: types.SELECT,
    options: [{
      label: '全部',
      value: ''
    }]
  },
  operations: {
    width: 80
  }
}

const INITIAL_STATE = {
  meta: META_DATA,
  filterFields: ['system', 'resource', 'recourseName', 'showname'],
  tableFields: ['resourceID', 'resourceDisplayName', 'appID', 'resourceTypeName', 'linkURL', 'levelStructure', 'status'],

  list: [],
  total: 0,
  pageSize: 20,
  currentPage: 0,
  currentItem: {},
  currentFilter: {}
}

const QUERY_DATA = 'QUERY_STATUS_BATCH'
const QUERY_SUCCESS = 'QUERY_STATUS_BATCH_SUCCESS'
const CREATE_DATA = 'CREATE_STATUS_BATCH'
const CREATE_SUCCESS = 'CREATE_STATUS_BATCH_SUCCESS'
const UPDATE_DATA = 'UPDATE_STATUS_BATCH'
const UPDATE_SUCCESS = 'UPDATE_STATUS_BATCH_SUCCESS'
const DELETE_DATA = 'DELETE_STATUS_BATCH'
const DELETE_SUCCESS = 'DELETE_STATUS_BATCH_SUCCESS'
const SYSTEM_SUCCESS = 'SYSTEM_SUCCESS'
const RECOURCE_SUCCESS = 'RECOURCE_SUCCESS'
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
const systemSuccess = data => ({type: SYSTEM_SUCCESS,data})
const recourceSuccess = data => ({type: RECOURCE_SUCCESS,data})
const update = () => ({ type: UPDATE_DATA })
const updateSuccess = () => ({ type: UPDATE_SUCCESS })
const deleteStart = () => ({ type: DELETE_DATA })
const deleteSuccess = () => ({ type: DELETE_SUCCESS })

export const queryData = () => {
  return (dispatch, getState) => {
    const filter = getState()['resource-management'].currentFilter
    const data = getState()['resource-management']
    dispatch(query())
    return new Promise(resolve => {
      fetch(`${domain.ams}/aas/v1/resource/list/query`, {
        method: 'POST',
        jsonData:{
          pageNum: data.currentPage,
          pageSize: data.pageSize,
          appID:filter.system,
          resourceType: filter.resource,
          resourceName:filter.recourseName,
          resourceDisplayName:filter.showname
        }
      }).then(resp => {
        dispatch(querySuccess({
          list:  resp.appResourceDTOList,
          total: resp.total
        }))
      })
    })
  }
}

export const querySystem = () => {
  return (dispatch, getState) => {
    dispatch(query())
    fetch(`${domain.ams}/aas/v1/resource/app/list/query`, {
      method: 'POST',
      jsonData:{}
    }).then(resp => {
      const list =[];
      const defaultDir = new Array();
      defaultDir['label'] = '全部'
      defaultDir['value'] = ''
      list.push(defaultDir);
      resp.appDTOList.map(function(sub,index){
        const dirc = new Array();
        dirc['label']=sub.appName;
        dirc['value']=sub.appID;
        list.push(dirc);
      })

      dispatch(systemSuccess(list))
    })
  }
}

export const queryRecource = () => {
  return (dispatch, getState) => {
    dispatch(query())
    fetch(`${domain.ams}/aas/v1/common/codetable/query`, {
      method: 'POST',
      jsonData:{
        codeType:"resourceType"
      }
    }).then(resp => {
      const list =[];
      const defaultDir = new Array();
      defaultDir['label'] = '全部'
      defaultDir['value'] = ''
      list.push(defaultDir);
      resp.codeTableList.map(function(sub,index){
        const dirc = new Array();
        dirc['label']=sub.codeDesc;
        dirc['value']=sub.code;
        list.push(dirc);
      })
      dispatch(recourceSuccess(list))
    })
  }
}

export const queryChangeStatus = (list,resStatus) => {
  return (dispatch, getState) => {
    dispatch(query())
    fetch(`${domain.ams}/aas/v1/resource/status/batch/modify`, {
      method: 'POST',
      jsonData:{
        resourceIDList:list,
        status:resStatus
      }
    }).then(resp => {
      dispatch(queryData())
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

export const queryDownload = () => {
  return (dispatch, getState) => {
    const filter = getState()['resource-management'].currentFilter;
    //window.open = '/aas/v1/resource/download?appID='+filter.system ? filter.system : ''+'&resourceTypeList='+filter.resource?filter.resource:'';
    //fetch(`${domain.ams}/aas/v1/resource/download`, {
    //  method: 'GET',
    //  jsonData:{
    //    appID:filter.system,
    //    resourceTypeList: filter.resource,
    //    resourceName:filter.recourseName,
    //    resourceDisplayName:filter.showname
    //  }
    //}).then(resp => {
    //
    //})
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
  [SYSTEM_SUCCESS]:(state,action)=>{
    const newSystem = Object.assign({}, state.meta)
    newSystem.system['options'] = action.data
    return Object.assign({}, state,{meta:newSystem})

  },
  [RECOURCE_SUCCESS]:(state,action)=>{
    const newRecource = Object.assign({}, state.meta)
    newRecource.resource['options'] = action.data
    return Object.assign({}, state,{meta:newRecource})

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
