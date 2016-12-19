import { GET_SUCCESS } from './administrator'
import { getSystem } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
const TOTAL_MENUS = [{
  name: '会员管理',
  url: '/ams',
  subs: [{
    name: '会员信息查询',
    url: '/ams/member-info',
    subs: [{
      name: '会员信息详情',
      url: '/ams/member-detail'
    }]
  }, {
    name: '状态变更审核',
    url: '/ams/status-change'
  }, {
    name: '批量状态变更',
    url: '/ams/status-batch'
  }, {
    name: '操作日志查询',
    url: '/ams/operation-log'
  }]
}, {
  name: '短信管理',
  url: '/ams/short-message'
}, {
  name: '权限管理',
  url: '/aas',
  subs: [{
    name: '用户管理',
    url: '/aas/account-management',
    subs: [{
      name: '用户详情',
      url: '/aas/account-detail'
    }]
  }, {
    name: '角色管理',
    url: '/aas/role-management',
    subs: [{
      name: '权限赋予',
      url: '/aas/role-detail'
    }]
  }, {
    name: '资源管理',
    url: '/aas/resource-management',
    subs: [{
      name: '资源编辑',
      url: '/aas/resource-detail'
    }]
  }, {
    name: '用户组管理',
    url: '/aas/group-management'
  }]
}, {
  name: '飞凡通业务',
  url: '/ffan',
  subs: [{
    name: '飞凡通账户查询',
    url: '/ffan/allowance-list.html'
  }, {
    name: '支付网关支付订单查询',
    url: '/ffan/gateway-payment-list.html'
  }, {
    name: '支付网关退款订单查询',
    url: '/ffan/gateway-refund-list.html'
  }, {
    name: '付款码支付订单查询',
    url: '/ffan/code-payment-list.html'
  }, {
    name: '付款码退款订单查询',
    url: '/ffan/code-refund-list.html'
  }]
}]

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SUCCESS]: (state, action) => {
    const { resourceList, resources } = action.payload
    const list = TOTAL_MENUS.filter(menu => resourceList.indexOf(menu.url) > -1)
    list.forEach(menu => {
      const resourceItem = resources.filter(res => res.resourceType === 'menu').find(resource => resource.linkUrl === menu.url)
      menu.name = resourceItem.resourceDisplayName
      menu.subs = menu.subs && menu.subs.filter(sub => resourceList.indexOf(sub.url) > -1)
      if (menu.subs) {
        menu.subs.forEach(sub => {
          const resourceItem = resources.find(resource => resource.linkUrl === sub.url)
          sub.name = resourceItem.resourceDisplayName
        })
      }
    })

    list.unshift({
      name: '首页',
      url: `/${getSystem()}`,
      subs: []
    })

    return Object.assign({}, state, { list })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { list: [] }

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
