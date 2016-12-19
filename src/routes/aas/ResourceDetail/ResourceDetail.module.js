import React from 'react'
import domain from 'utils/domain'
import fetch from 'utils/fetch'
import { inputTypes as types } from 'modules/inputs'
// ------------------------------------
// Constants
// ------------------------------------

const PWID_SYSTEM_MAP = {
  'aas': '权限管理平台',
  'ams': '统一运营平台',
  'upp': '统一支付平台'
}
export const converter = {
  systemMap: PWID_SYSTEM_MAP
}
const META_DATA = {
  id: {
    label: '资源ID'
  },
  name: {
    label: '显示名称'
  },
  systemName: {
    label: '所属系统'
  },
  systemType: {
    label: '资源类型'
  },
  LinkURL: {
    label: 'LinkURL'
  },
  recourseType: {
    label: '资源层级'
  },
  recourseStatus: {
    label: '资源状态'
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
    options: []
  }
}

const INITIAL_STATE = {
  meta: META_DATA,
  filterFields: ['system', 'resource', 'recourseName','showname'],
  tableFields: ['id', 'name', 'systemName', 'systemType', 'LinkURL', 'recourseType','recourseStatus'],

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
const SYSTEM_SUCCESS = 'SYSTEM_SUCCESS'
const RECOURCE_SUCCESS = 'RECOURCE_SUCCESS'
const UPDATE_FILTER = 'UPDATE_STATUS_BATCH_FILTER'
const UPDATE_ITEM = 'UPDATE_STATUS_BATCH_ITEM'
const RESET_ITEM = 'RESET_STATUS_BATCH_ITEM'
const SWITCH_PAGE = 'SWITCH_STATUS_BATCH_PAGE'
const UPDATE_RESOURCE = 'UPDATE_RESOURCE'
const UPDATE_LEVEL = 'UPDATE_LEVEL'
const RESULT_START = 'RESULT_START'
const RESULT_SUCCESS = 'RESULT_SUCCESS'
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
const ResultStart = () => ({ type: RESULT_START })
const ResultSuccess = message => ({ type: RESULT_SUCCESS, message: message })

export const queryData = (resourceID) => {
  return (dispatch) => {
    dispatch(query())
    const allInfoPromise = fetch(`${domain.ams}/aas/v1/resource/detail/query`,{
      method: 'POST',
      jsonData: {
        resourceID: resourceID
      }
    });
    const systemPromise = fetch(`${domain.ams}/aas/v1/common/codetable/query`,{
      method: 'POST',
      jsonData: {
        codeType:"resourceType"
      }
    });

    return Promise.all([allInfoPromise,systemPromise])
      .then(([allInfoPromise,systemPromise]) => {
        dispatch(querySuccess({
          currentItem: {
            infoList: allInfoPromise.appResourceDTO,
            levelA:allInfoPromise.appResourceDTO.levelStructure ? allInfoPromise.appResourceDTO.levelStructure.split(".")[0] : '',
            levelB:allInfoPromise.appResourceDTO.levelStructure ? allInfoPromise.appResourceDTO.levelStructure.split(".")[1] : '',
            levelC:allInfoPromise.appResourceDTO.levelStructure ? allInfoPromise.appResourceDTO.levelStructure.split(".")[2] : '',
            systemList: systemPromise.codeTableList
          }
        }))
      })
  }
}

export const queryUpdate = (id,info) => {
  return (dispatch, getState) => {
    dispatch(ResultStart())
    fetch(`${domain.ams}/aas/v1/resource/modify`, {
      method: 'POST',
      jsonData:{
        resourceID:id,
        resourceType:info.infoList.resourceType,
        appID : info.infoList.appID,
        resourceDisplayName:info.infoList.resourceDisplayName,
        resourceName:info.infoList.resourceName,
        linkURL:info.infoList.linkURL,
        levelStructure:info.levelA&&info.levelB&&info.levelC&&info.infoList.resourceType == 'menu' ? info.levelA+'.'+info.levelB+'.'+info.levelC : '',
        description:info.infoList.description,
        status:info.infoList.status
      }
    }).then(resp => {
      let errorMessage = resp.respHeader.resMessageExt;
      if (!errorMessage) {
        errorMessage = resp.respHeader.respMessage || ''
      }
      dispatch(ResultSuccess(errorMessage))
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


export const queryChangeUpload = () => {
  return (dispatch, getState) => {
    dispatch(query())
    fetch(`${domain.ams}/aas/v1/resource/app/list/query`, {
      method: 'POST'
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
export const updateResource = (value,id) => ({ type: UPDATE_RESOURCE,data:{
    id:id,
    value:value
}})
export const updateLevel = (value,id) => ({ type: UPDATE_LEVEL,data:{
  id:id,
  value:value
}})
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
  [UPDATE_LEVEL]:(state,action)=>{
    const newRecource = Object.assign({}, state.currentItem)
    newRecource[action.data.id] = action.data.value
    return Object.assign({}, state,{currentItem:newRecource})

  },
  [UPDATE_RESOURCE]:(state,action)=>{
    const newRecource = Object.assign({}, state.currentItem)
    newRecource.infoList[action.data.id] = action.data.value
    return Object.assign({}, state,{currentItem:newRecource})

  },
  [RESULT_START]: (state, action) => Object.assign({}, state, { checkStatus: false }),
  [RESULT_SUCCESS]: (state, action) => Object.assign({}, state, {
    checkStatus: true,
    message: action.message
  }),
  [RESET_ITEM]: (state, action) => Object.assign({}, state, { currentItem: action.payload, success: false })
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
