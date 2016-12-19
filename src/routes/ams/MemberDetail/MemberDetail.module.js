import domain from 'utils/domain'
import fetch from 'utils/fetch'
import { showSuccess } from 'modules/prompts'
import { inputTypes as types } from 'modules/inputs'
// ------------------------------------
// Constants
// ------------------------------------
const PWID_STATUS_MAP = {
  0: '创建',
  1: '正常',
  2: '冻结',
  8: '已合并',
  9: '注销'
}

const ACCOUNT_TYPE_MAP = {
  1: '邮箱',
  2: '手机',
  3: '电话',
  4: 'OpenID',
  5: '自定义'
}

const ACCOUNT_STATUS_MAP = {
  0: '未验证',
  1: '已验证',
  2: '验证中',
  9: '待激活'
}

const ACCOUNT_FROM_MAP = {
  '99bill': '快钱',
  ffan: '飞凡',
  'wanda': '万达'
}

const INCOME_RANGE_MAP = {
  1: '5万以内',
  2: '5~10万',
  3: '10~50万',
  4: '50万以上'
}

const OCCUPATION_MAP = {
  '1A': '各类专业、技术人员',
  '1B': '国家机关、党群组织、企事业单位的负责人',
  '1C': '办事人员和有关人员',
  '1D': '商业工作人员',
  '1E': '服务性工作人员',
  '1F': '农林牧渔劳动者',
  '1G': '生产工作、运输工作和部分体力劳动者',
  '1H': '不便分类的其他劳动者'
}

const EDUCATION_MAP = {
  '1': '小学',
  '2': '初中',
  '3': '高中',
  '4': '大学',
  '5': '硕士',
  '6': '博士'
}
const SYSTEM_TYPE = {
  '0': '-验证通过(鉴权系统验证)',
  '1': '-验证未通过(鉴权系统未验证)'
}
const ACCOUNT_LEVEL = {
  '100':'未实名用户',
  '105':'身份实名用户',
  '110':'卡鉴权用户',
  '112':'生物识别用户',
  '115':'强实名用户'
}

const BANK_TYPE = {
  '1' : '信用卡',
  '2' : '储蓄卡'
}
const DEFAULT = {
  '1' : '是',
  '0' : '否'
}

export const converter = {
  pwid: PWID_STATUS_MAP,
  type: ACCOUNT_TYPE_MAP,
  status: ACCOUNT_STATUS_MAP,
  from: ACCOUNT_FROM_MAP,
  income: INCOME_RANGE_MAP,
  occupation: OCCUPATION_MAP,
  education: EDUCATION_MAP,
  systemType:SYSTEM_TYPE,
  accountLevel:ACCOUNT_LEVEL,
  bankType :BANK_TYPE,
  Default:DEFAULT
}

const DEVICE_META = {
  id: {
    label: '序号'
  },
  loginDate: {
    label: '登录时间'
  },
  loginIP: {
    label: '登录IP'
  },
  loginRegion: {
    label: '登录所处区域'
  },
  loginError: {
    label: '登录错误原因'
  }
}

const INITIAL_STATE = {
  phone: {
    meta: {
      phone: {
        label: '电话号码',
        type: types.PHONE
      },
      code: {
        label: '验证码'
      }
    },
    editFields: ['phone', 'code'],
    currentItem: {}
  },

  status: {
    meta: {
      createTime: {
        label: '操作时间',
        type: types.DATE
      },
      operator: {
        label: '操作人'
      },
      WOType: {
        label: '操作类型',
        type: types.SELECT,
        options: [{
          label: '冻结',
          value: '60'
        }, {
          label: '解冻',
          value: '70'
        }, {
          label: '销户',
          value: '80'
        }]
      }
    },
    tableFields: ['createTime', 'operator', 'WOType'],
    list: [],
    total: 0,
    pageSize: 20,
    currentPage: 0,
    showUserLogStatus:false
  },
  remarkInfo: {
    meta: {
      createTime: {
        label: '操作时间',
        type: types.DATE
      },
      operator: {
        label: '操作人'
      },
      remark: {
        label: '备注内容'
      }
    },
    tableFields: ['createTime', 'operator', 'remark'],
    list: [],
    total: 0,
    pageSize: 20,
    currentPage: 0
  },

  device: {
    meta: DEVICE_META,
    tableFields: ['id', 'loginDate', 'loginIP', 'loginRegion', 'loginError'],
    list: [],
    total: 0,
    pageSize: 20,
    currentPage: 0
  },
  bankFailInfo:{
    meta:{
      creationDate:{
        label:'失败时间'
      },
      name:{
        label:'操作人'
      },
      span:{
        label:'卡号'
      },
      mobile:{
        label:'手机号'
      },
      respMessage:{
        label:'失败原因'
      }
    },
    tableFields: ['creationDate', 'name', 'span','mobile','respMessage'],
    list: [],
  },
  log: {
    meta: {
      createTime: {
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
        },{
          label: '冻结',
          value: '60'
        },{
          label: '解冻',
          value: '70'
        },{
          label: '销户',
          value: '80'
        },
          {
          label: '批量状态变更',
          value: '100'
        }]
      },
      operateRemark:{
        label:'操作原因'
      }
    },
    tableFields: ['createTime', 'operator','operatorOrg', 'WOType','operateRemark'],
    list: [],
    total: 0,
    pageSize: 20,
    currentPage: 0
  },

  currentItem: {},
  currentFilter: {},
  showRemarkStatus:false
}

const QUERY_DATA = 'QUERY_MEMBER_INFO'
const QUERY_SUCCESS = 'QUERY_MEMBER_INFO_SUCCESS'
const QUERY_LOG = 'QUERY_MEMBER_LOG'
const QUERY_LOG_SUCCESS = 'QUERY_MEMBER_LOG_SUCCESS'
const QUERY_REMARK_START = 'QUERY_REMARK_START'
const QUERY_REMARK_SUCCESS = 'QUERY_REMARK_SUCCESS'
const QUERY_USER_STATUS_START = 'QUERY_USER_STATUS_START'
const QUERY_USER_STATUS_SUCCESS = 'QUERY_USER_STATUS_SUCCESS'
const CHANGE_NAME = 'CHANGE_MEMBER_NAME'
const CHANGE_NAME_SUCCESS = 'CHANGE_MEMBER_NAME_SUCCESS'
const CREATE_DATA = 'CREATE_MEMBER_INFO'
const CREATE_SUCCESS = 'CREATE_MEMBER_INFO_SUCCESS'
const UPDATE_DATA = 'UPDATE_MEMBER_INFO'
const UPDATE_SUCCESS = 'UPDATE_MEMBER_INFO_SUCCESS'
const DELETE_DATA = 'DELETE_MEMBER_INFO'
const DELETE_SUCCESS = 'DELETE_MEMBER_INFO_SUCCESS'

const UPDATE_FILTER = 'UPDATE_MEMBER_INFO_FILTER'
const UPDATE_ITEM = 'UPDATE_MEMBER_INFO_ITEM'
const SWITCH_PAGE = 'SWITCH_MEMBER_INFO_PAGE'
const SWITCH_STATUS_PAGE = 'SWITCH_STATUS_PAGE'
const SWITCH_LOG_PAGE = 'SWITCH_LOG_PAGE'
const QUERY_BANK_FAIL_START = 'QUERY_BANK_FAIL_START'
const QUERY_BANK_FAIL_SUCCESS = 'QUERY_BANK_FAIL_SUCCESS'


// ------------------------------------
// Actions
// ------------------------------------
const query = () => ({ type: QUERY_DATA })
const querySuccess = data => ({ type: QUERY_SUCCESS, payload: data })
const queryLogStart = () => ({ type: QUERY_LOG })
const queryLogSuccess = data => ({ type: QUERY_LOG_SUCCESS, payload: data })
const queryRemarksStart = () => ({type:QUERY_REMARK_START})
const queryRemarksSuccess = data => ({type:QUERY_REMARK_SUCCESS,payload: data})
const queryUserLogStatusStart = () => ({type:QUERY_USER_STATUS_START})
const queryUserLogStatusSuccess = data => ({type:QUERY_USER_STATUS_SUCCESS,payload: data})
const queryBankFailStart = () => ({type:QUERY_BANK_FAIL_START})
const queryBankFailSuccess = data => ({type:QUERY_BANK_FAIL_SUCCESS,payload: data})
const create = () => ({ type: CREATE_DATA })
const createSuccess = () => ({ type: CREATE_SUCCESS })
const update = () => ({ type: UPDATE_DATA })
const updateSuccess = () => ({ type: UPDATE_SUCCESS })
const deleteStart = () => ({ type: DELETE_DATA })
const deleteSuccess = () => ({ type: DELETE_SUCCESS })
const changeNameStart = () => ({ type: CHANGE_NAME })

export const queryData = (pwid, loginName) => {
  return (dispatch, getState) => {
    dispatch(query())
    const allInfoPromise = fetch(`${domain.ams}/ams/v1/account/query/accountFullInfo`,{
      method: 'POST',
      jsonData: {
        PWID: pwid
      }
    })
    return Promise.all([allInfoPromise])
      .then(([allInfoPromise,logPromise]) => {
        dispatch(querySuccess({
          currentItem: {
            accountList: allInfoPromise.loginAccountList,
            memberData: allInfoPromise.personalMemberData,
            personaData: allInfoPromise.personalData,
            cardList: allInfoPromise.bindCards,
            PWID:pwid
          }
        }))
      })
  }
}

export const queryChangeStatus = (pwid,status,operateRemark,fullOrgName) => {
  return (dispatch, getState) => {
     fetch(`${domain.ams}/ams/v1/account/WOStatus/ChangeApply`, {
      method: 'POST',
      jsonData: {
        PWID: pwid,
        woType:status,
        operateRemark:operateRemark,
        operatorOrg:fullOrgName
      }
    }).then(resp => {
      dispatch(querySuccess())
      dispatch(showSuccess({
         message: '操作成功'
       }))
    })
  }
}


export const queryLog = (pwid) => {
  return (dispatch, getState) => {
    const data = getState()['member-detail'].log
    //const pwid = getState()['member-detail'].currentItem
    dispatch(queryLogStart())
    return fetch(`${domain.ams}/ams/v1/workOrder/query/operationLog`, {
      method: 'POST',
      jsonData: {
        PWID: pwid,
        pageNum: data.currentPage,
        pageSize: data.pageSize
      }
    }).then(resp => {
      dispatch(queryLogSuccess({
        list: resp.workOrders,
        total: resp.totalNum
      }))
    })
  }
}

export const queryUserLogStatus = () => {
  return (dispatch, getState) => {
    const data = getState()['member-detail'].remarkInfo
    const pwid = getState()['member-detail'].currentItem
    dispatch(queryUserLogStatusStart())
    return fetch(`${domain.ams}/ams/v1/workOrder/query/operationLog`, {
      method: 'POST',
      jsonData: {
        PWID: pwid.PWID,
        QueryType : 30,
        pageNum: data.currentPage,
        pageSize: data.pageSize,
        WOTypes:[60,70,80]
        //WOStatus:50
      }
    }).then(resp => {
      dispatch(queryUserLogStatusSuccess({
        list: resp.workOrders,
        total: resp.totalNum
      }))
    })
  }
}

export const queryUserRemarks = () => {
  return (dispatch, getState) => {
    const data = getState()['member-detail'].remarkInfo
    const pwid = getState()['member-detail'].currentItem
    dispatch(queryRemarksStart())
    return fetch(`${domain.ams}/ams/v1/workOrder/query/personalLog`, {
      method: 'POST',
      jsonData: {
        PWID: pwid.PWID,
        pageNum: data.currentPage,
        pageSize: data.pageSize
      }
    }).then(resp => {
      dispatch(queryRemarksSuccess({
        list: resp.personalLogs,
        total: resp.totalNum
      }))
    })
  }
}

export const queryBankFailInfo = () => {
  return (dispatch, getState) => {
    const pwid = getState()['member-detail'].currentItem
    dispatch(queryBankFailStart())
    return fetch(`${domain.ams}/ams/v1/bill99/query/bindCardFailedRecordList`, {
      method: 'POST',
      jsonData: {
        PWID: pwid.PWID
      }
    }).then(resp => {
      dispatch(queryBankFailSuccess({
        list: resp.bindCardFailedRecordList
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

export const changeName = (name,pwid) => {
  return (dispatch, getState) => {
    dispatch(changeNameStart())
    return fetch(`${domain.ams}/ams/v1/account/personal_data/reset`, {
      method: 'POST',
      jsonData: {
        PWID: pwid,
        aliasName: name
      }
    }).then(() => {
      dispatch(queryData(pwid))
      dispatch(queryLog(pwid))
    })
  }
}

//新建log备注
export const AddUserlog = (pwid,info) => {
  return (dispatch, getState) => {
    dispatch(changeNameStart())
    return fetch(`${domain.ams}/ams/v1/workOrder/edit/personalLog`, {
      method: 'POST',
      jsonData: {
        PWID: pwid,
        remark:info
      }
    }).then(() => {
      dispatch(queryData(pwid))
      dispatch(queryLog(pwid))
      dispatch(showSuccess({
        message: '修改成功'
      }))
    })
  }
}

export const changePhone = (pwid,phone) => {
  return (dispatch, getState) => {
    dispatch(changeNameStart())
    return fetch(`${domain.ams}/ams/v1/account/login_account/bind_mobile`, {
      method: 'POST',
      jsonData: {
        PWID: pwid,
        mobile:phone
      }
    }).then(() => {
      dispatch(queryData(pwid))
      dispatch(queryLog(pwid))
      dispatch(showSuccess({
        message: '修改成功'
      }))
    })
  }
}


export const switchPage = (pageNo = 0) => {
  return (dispatch, getState) => {
    dispatch(switchPageStart(pageNo))
    setTimeout(() => {
      dispatch(queryUserRemarks())
    }, 0)
  }
}
export const switchStatusPage = (pageNo = 0) => {
  return (dispatch, getState) => {
    dispatch(switchStatusPageStart(pageNo))
    setTimeout(() => {
      dispatch(queryUserLogStatus())
    }, 0)
  }
}
export const switchLogPage = (pageNo = 0) => {
  return (dispatch, getState) => {
    const pwid = getState()['member-detail'].currentItem
    dispatch(switchLogPageStart(pageNo))
    setTimeout(() => {
      dispatch(queryLog(pwid.PWID))
    }, 0)
  }
}

export const switchLogPageStart = (pageNo = 0) => ({ type: SWITCH_LOG_PAGE, payload: pageNo })
export const switchStatusPageStart = (pageNo = 0) => ({ type: SWITCH_STATUS_PAGE, payload: pageNo })

export const switchPageStart = (pageNo = 0) => ({ type: SWITCH_PAGE, payload: pageNo })
export const updateFilter = (info = {}) => ({ type: UPDATE_FILTER, payload: info })
export const updateItem = (item = {}) => ({ type: UPDATE_ITEM, payload: item })

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUERY_SUCCESS]: (state, action) => Object.assign({}, state, action.payload),
  [QUERY_LOG_SUCCESS]: (state, action) => Object.assign({}, state, {
    log: Object.assign({}, state.log, { list: action.payload.list, total: action.payload.total })
  }),
  [QUERY_REMARK_START]:(state,action) =>Object.assign({},state,{
    showRemarkStatus:false
  }),
  [QUERY_REMARK_SUCCESS]:(state,action) =>Object.assign({},state,{
    remarkInfo:Object.assign({}, state.remarkInfo, { list: action.payload.list, total: action.payload.total }),
    showRemarkStatus:true
  }),
  [QUERY_USER_STATUS_START]:(state,action) =>Object.assign({},state,{
    showUserLogStatus:false
  }),
  [QUERY_USER_STATUS_SUCCESS]:(state,action) =>Object.assign({},state,{
    status:Object.assign({}, state.status, { list: action.payload.list, total: action.payload.total }),
    showUserLogStatus:true
  }),
  [QUERY_BANK_FAIL_START]:(state,action) =>Object.assign({},state,{
    showBankFailStatus:false
  }),
  [QUERY_BANK_FAIL_SUCCESS]:(state,action) =>Object.assign({},state,{
    bankFailInfo:Object.assign({}, state.bankFailInfo, { list: action.payload.list}),
    showBankFailStatus:true
  }),
  [CREATE_DATA]: (state, action) => Object.assign({}, state, { success: true }),
  [CREATE_SUCCESS]: (state, action) => Object.assign({}, state, { success: true }),
  [SWITCH_PAGE]: (state, action) =>{
    const newRemarkInfo = Object.assign({}, state.remarkInfo);
    newRemarkInfo['currentPage'] = action.payload;
    return Object.assign({}, state, { remarkInfo: newRemarkInfo })
  },
  [SWITCH_STATUS_PAGE]: (state, action) =>{
    const newLogInfo = Object.assign({}, state.status);
    newLogInfo['currentPage'] = action.payload;
    return Object.assign({}, state, { status: newLogInfo })
  },
  [SWITCH_LOG_PAGE]:(state, action) =>{
    const newLogInfo = Object.assign({}, state.log);
    newLogInfo['currentPage'] = action.payload;
    return Object.assign({}, state, { log: newLogInfo })
  },
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
