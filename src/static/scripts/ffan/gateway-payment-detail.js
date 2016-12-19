"use strict";var META={PWID:{label:"PWID"},outOrderNum:{label:"外部订单号"},payOrderNum:{label:"支付订单号"},payOrderStatus:{label:"支付订单状态"},OrderCreateTime:{label:"支付订单生成时间"},OrderStatusChangeTime:{label:"支付订单状态变更时间"},isMerge:{label:"是否合并支付"},payInstruction:{label:"支付指令号"},instructionStatus:{label:"支付指令状态"},ffanId:{label:"飞凡会员ID"},merchantName:{label:"商户"},vipMobile:{label:"会员手机号"},instructionCreateTime:{label:"支付指令生成时间"},instructionStatusChangeTime:{label:"支付指令状态变更时间"},orderAmount:{label:"订单金额(元)"},payAmount:{label:"支付金额(元)"},payWay:{label:"支付方式"},payChannel:{label:"支付渠道"},payChannelResponseNum:{label:"支付渠道响应号"},fromInvoking:{label:"支付调用方"},outlet:{label:"门店"},businessDistrict:{label:"商圈"}},INFO_FIELDS=[["PWID","ffanId","vipMobile"],["payOrderNum","outOrderNum","payOrderStatus","payWay","orderAmount","payChannel","payAmount","isMerge","instructionCreateTime","instructionStatusChangeTime","payInstruction","instructionCreateTime","instructionStatus","fromInvoking","businessDistrict","outlet","merchantName"]],submitData=function(e,a){console.log("2132131")},TABLE_FIELDS=["id","name","email","age"],FILTER_FIELDS=["phone"],editData=function(e){window.location.href="allowance-detail.html?id="+e.id},queryData=function(e){WUI.getResource("/edit");WUI.ajax({url:"/ams/v1/payment/query/orderLogList",jsonData:{payInstruction:WUI.link().payId,payOrderNum:WUI.link().id,pageNum:e.currentPage,pageSize:e.pageSize}}).then(function(a){WUI.DataTable.create({$el:$(".data-table"),meta:{operateTime:{label:"操作时间"},operateSource:{label:"操作方"},operateDesc:{label:"操作行为"},orderStatus:{label:"订单状态"},remark:{label:"备注"}},fields:["operateTime","operateSource","operateDesc","orderStatus","remark"],list:a.orderStatusLogList}),WUI.DataPaginator.create({$el:$(".data-paginator"),currentPage:e.currentPage,total:a.total,pageSize:e.pageSize,onSwitchPage:function(a){queryData({currentPage:a,pageSize:e.pageSize})}})})};WUI.ready=function(){WUI.ContentHeader.create({$el:$(".content-header"),meta:[{name:"首页",url:"/ams"},{name:"飞凡通业务"},{name:"支付网关支付订单查询",url:"gateway-payment-list.html"},{name:"支付订单详情"}]}),WUI.ajax({url:"/ams/v1/payment/query/payGatewayOrderDetail",jsonData:{payInstruction:WUI.link().payId,payOrderNum:WUI.link().id}}).done(function(e){e.data,WUI.getResource("/edit");WUI.InfoTable.create({$el:$(".info-table"),meta:META,data:e.payGatewayOrderDetail,fields:INFO_FIELDS})}),queryData({currentPage:0,pageSize:20})},$(function(){WUI.init({system:"ams"})});
//# sourceMappingURL=gateway-payment-detail.js.map