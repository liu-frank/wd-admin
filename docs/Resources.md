### 统一运营后台资源列表

| system | type   | url                                  | name |
| ------ | ----   | ------------------------------------ | ---- |
| aas    | menu   | /aas                                 | 权限管理 |
| aas    | menu   | /aas/account-management              | 用户管理 |
| aas    | button | /aas/account-management/query        | 查询 |
| aas    | api    | /aas/v1/role/query                   ||
| aas    | api    | /aas/v1/user/query                   ||
| aas    | button | /aas/account-management/add          | 新增 |
| aas    | api    | /aas/v1/user/add                     ||
| aas    | button | /aas/account-management/modify       | 编辑 |
| aas    | api    | /aas/v1/user/modify                  ||
| aas    | button | /aas/account-management/password     | 重置密码 |
| aas    | api    | /aas/v1/user/reset/defaultpassword   ||
| aas    | menu   | /aas/role-management                 | 角色管理 |
| aas    | button | /aas/role-management/query           | 查询 |
| aas    | api    | /aas/v1/resource/menubutton/list/query ||
| aas    | api    | /aas/v1/role/page/query              ||
| aas    | button | /aas/role-management/authorize       | 权限赋予 |
| aas    | button | /aas/role-management/add             | 新增 |
| aas    | api    | /aas/v1/role/add                     ||
| aas    | button | /aas/role-management/modify          | 编辑 |
| aas    | api    | /aas/v1/role/modify                  ||
| aas    | menu   | /aas/role-detail                     | 权限赋予 |
| aas    | api    | /aas/v1/common/codetable/query       ||
| aas    | api    | /aas/v1/resource/list/query/forApp   ||
| aas    | api    | /aas/v1/role/detail/query            ||
| aas    | button | /aas/role-detail/modify              | 修改 |
| aas    | api    | /aas/v1/role/authority/grant         ||
| aas    | menu   | /aas/resource-management             | 资源管理 |
| aas    | api    | /aas/v1/resource/app/list/query      ||
| aas    | api    | /aas/v1/common/codetable/query       ||
| aas    | button | /aas/resource-management/query       | 查询 |
| aas    | api    | /aas/v1/resource/list/query          ||
| aas    | button | /aas/resource-management/modify      | 编辑 |
| aas    | button | /aas/resource-management/enable      | 启用 |
| aas    | api    | /aas/v1/resource/status/batch/modify ||
| aas    | button | /aas/resource-management/disable     | 停用 |
| aas    | api    | /aas/v1/resource/status/batch/modify ||
| aas    | button | /aas/resource-management/import      | 导入新数据 |
| aas    | api    | /aas/v1/resource/upload              ||
| aas    | button | /aas/resource-management/export      | 导出数据 |
| aas    | api    | /aas/v1/resource/download            ||
| aas    | menu   | /aas/resource-detail                 | 资源编辑 |
| aas    | api    | /aas/v1/resource/detail/query        ||
| aas    | api    | /aas/v1/common/codetable/query       ||
| aas    | button | /aas/resource-detail/modify          | 保存 |
| aas    | api    | /aas/v1/resource/modify              ||
| ams    | menu   | /ams                                 | 会员管理 |
| ams    | menu   | /ams/member-info                     | 会员信息列表 |
| ams    | button | /ams/member-info/query               | 查询 |
| ams    | button | /ams/member-info/modify              | 查看详情 |
| ams    | api    | /ams/v1/account/query/account        | 查询 |
| ams    | menu   | /ams/member-detail                   | 会员信息详情 |
| ams    | api    | /ams/v1/account/query/accountFullInfo ||
| ams    | button | /ams/member-detail/operationLog      | 查看记录 |
| ams    | api    | /ams/v1/workOrder/query/operationLog ||
| ams    | button | /ams/member-detail/personalLog       | 查看记录 |
| ams    | api    | /ams/v1/workOrder/query/personalLog ||
| ams    | button | /ams/member-detail/changeName        | 修改别名 |
| ams    | api    | /ams/v1/account/personal\_data/reset  ||
| ams    | button | /ams/member-detail/changeNote        | 保存 |
| ams    | api    | /ams/v1/workOrder/edit/personalLog   ||
| ams    | button | /ams/member-detail/destroy           | 申请销户 |
| ams    | api    | /ams/v1/account/WOStatus/ChangeApply ||
| ams    | button | /ams/member-detail/freeze            | 申请冻结 |
| ams    | api    | /ams/v1/account/WOStatus/ChangeApply ||
| ams    | button | /ams/member-detail/unfreeze          | 申请解冻 |
| ams    | api    | /ams/v1/account/WOStatus/ChangeApply ||
| ams    | menu   | /ams/status-change                   | 状态变更查询 |
| ams    | button | /ams/status-change/query             | 查询 |
| ams    | api    | /ams/v1/workOrder/query/operationLog ||
| ams    | button | /ams/status-change/modify            | 查看详情 |
| ams    | button | /ams/status-change/accept            | 审核通过 |
| ams    | api    | /ams/v1/account/WOStatus/ChangeAudit ||
| ams    | button | /ams/status-change/deny              | 审核拒绝 |
| ams    | api    | /ams/v1/account/WOStatus/ChangeAudit ||
| ams    | menu   | /ams/status-batch                    | 批量状态变更 |
| ams    | button | /ams/status-batch/query              | 查询 |
| ams    | api    | /ams/v1/workOrder/query/operationLog ||
| ams    | button | /ams/status-batch/modify             | 上传变更数据 |
| ams    | api    | /ams/v1/workOrder/update/woAcctStatusChangeFile ||
| ams    | api    | /ams/v1/workOrder/upload/woacctstatuschangefile ||
| ams    | api    | /ams/v1/workOrder/download/woAcctStatusChangeFile ||
| ams    | menu   | /ams/operation-log                   | 操作日志列表 |
| ams    | button | /ams/operation-log/query             | 查询 |
| ams    | api    | /ams/v1/workOrder/query/operationLog ||
| ams    | button | /ams/operation-log/modify            | 查看详情 |

| aas    | menu   | /aas/group-management                | 组织机构管理 |
| aas    | button | /aas/group-management/query          | 查询 |
| aas    | button | /aas/group-management/export         | 导出 |
| aas    | button | /aas/group-management/import         | 批量导入组织机构 |
| aas    | button | /aas/group-management/add            | 新增次级部门 |
| aas    | button | /aas/group-management/modify         | 编辑 |
| aas    | button | /aas/group-management/detail         | 查看员工 |
| aas    | button | /aas/account-management/import       | 批量导入用户 |

| ffan   |  menu  | /ffan/gateway-payment-list.html        | 支付网关支付订单查询|
| ffan   |  api       | /ams/v1/payment/query/payGatewayOrderList  ||
| ffan   |  button | /ams/v1/payment/query/payGatewayOrderList.html/edit  |查看|
| ffan   |  button | /ams/v1/payment/query/payGatewayOrderList/query    |查询|
| ffan   |  api       | /ams/v1/payment/query/orderLogList    ||
| ffan   |  api       | /ams/v1/payment/query/payGatewayOrderDetail   ||

| ffan   |  menu   | /ffan/gateway-refund-list.html        | 支付网关退款订单查询 |
| ffan   |  api       | /ams/v1/payment/query/payGatewayRefundOrder  ||
| ffan   |  button | /ffan/gateway-refund-list.html/edit         |查看|
| ffan   |  button | /ffan/gateway-refund-list.html/query      |查询|
| ffan   |  api       | /ams/v1/payment/query/refundOrderLogList  ||
| ffan   |  api       | /ams/v1/payment/query/refundOrderDetail     ||

| ffan   |  menu   | /ffan/code-payment-list.html          | 付款码支付订单查询 |
| ffan   |  api       | /ams/v1/payment/query/paymentCodeOrder   ||
| ffan   |  button | /ffan/code-payment-list.html/query		 |查询|

| ffan   |  menu   | /ffan/code-refund-list.html         | 付款码退款订单查询 |
| ffan   |  api       | /ams/v1/payment/query/paymentCodeRefundOrder   ||
| ffan   |  button | /ffan/code-refund-list.html/query		 |查询|

| ffan   |  menu   | /ffan/allowance-list.html                | 飞凡通账户查询 |
| ffan   |  api       | /ams/v1/pocketMoney/query/accountList    ||
| ffan   |  button | /ffan/allowance-list.html/detail		 |查看|
| ffan   |  button | /ffan/allowance-list.html/query		 |查询|
| ffan   |  api       | /ams/v1/pocketMoney/query/accountDetailList	||
| ffan   |  api       | /ams/v1/pocketMoney/query/accountOperateLog	||
| ffan   |  api       | /ams/v1/pocketMoney/query/paymentSetList 	||
| ffan   |  api       | /ams/v1/pocketMoney/query/transactionList	||
| ffan   |  api       | /ams/v1/pocketMoney/query/accountBaseInfo   ||
| ffan   |  api       | /ams/v1/pocketMoney/account/statusChange   ||

| ffan | button | /ffan/allowance-detail.html/freeze |冻结支付账户|
| ffan | api | /ams/v1/pocketMoney/account/statusChange |零花钱冻结解冻支付账户|


| ffan | button | /ffan/allowance-detail.html/unfreeze |解冻支付账户|
| ffan | api | /ams/v1/pocketMoney/account/statusChange	|零花钱冻结解冻支付账户|











