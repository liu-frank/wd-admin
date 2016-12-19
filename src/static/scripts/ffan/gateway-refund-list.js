"use strict";var PAGE_SIZE=20,META={orderNum:{label:"退款单号"},oldOrderNum:{label:"原订单号"},refundSeq:{label:"退款流水号"},refundTime:{label:"退款处理时间",type:"date-picker"},PWID:{label:"PWID"},vipMobile:{label:"会员手机号"},paySource:{label:"支付来源"},payChannel:{label:"支付渠道"},refundType:{label:"退款类型",type:"select",options:[{label:"全部",value:""},{label:"交易退款",value:"0"},{label:"长款转退款",value:"1"},{label:"支付纠错退款",value:"2"}]},refundStatus:{label:"退款状态",type:"select",options:[{label:"全部",value:""},{label:"退款中",value:"0"},{label:"退款成功",value:"1"},{label:"退款失败",value:"2"},{label:"待审核",value:"3"},{label:"驳回",value:"4"},{label:"线下退款成功",value:"5"},{label:"退款终止成功",value:"6"}]},orderAmount:{label:"订单金额(元)"},refundAmount:{label:"退款金额(元)"},payType:{label:"支付方式"}},TABLE_FIELDS=["orderNum","oldOrderNum","vipMobile","refundType/refundTime","paySource/orderAmount","refundStatus/refundAmount","payChannel/payType"],FILTER_FIELDS=["orderNum","oldOrderNum","refundSeq","refundTime","refundType","refundStatus","vipMobile"],createData=function(e){WUI.ModalDialog.create({onConfirm:function(e){},onCancel:function(){}}),WUI.dataDialog.create({$el:$(".modal-body"),dialogPop:!0,meta:META,list:e,buttonHide:!1,fields:EDIT_FIELDS})},editData=function(e){window.location.href="gateway-refund-detail.html?id="+e.orderNum+"&refundSeq="+e.refundSeq},deleteData=function(e){WUI.ModalDialog.create({message:"11111",title:"2222",onConfirm:function(){console.log("delete data")}})},activeData=function(e){console.log("active: "+e)},deactiveData=function(e){console.log("deactive: "+e)},queryData=function(e){var a=WUI.getResource("/edit");WUI.getResource("/delete");WUI.ajax({url:"/ams/v1/payment/query/payGatewayRefundOrder",jsonData:{orderNum:e.orderNum||"",oldOrderNum:e.oldOrderNum||"",refundSeq:e.refundSeq||"",refundTime:e.refundTime||"",refundType:e.refundType||"",refundStatus:e.refundStatus||"",vipMobile:e.vipMobile||"",pageNum:e.currentPage,pageSize:e.pageSize}}).then(function(t){WUI.DataTableEx.create({$el:$(".data-table"),meta:META,fields:TABLE_FIELDS,list:t.payGatewayRefundOrderList,operations:[{name:a&&a.resourceDisplayName||"查看",callback:editData}]}),WUI.DataPaginator.create({$el:$(".data-paginator"),currentPage:e.currentPage,total:t.total,pageSize:e.pageSize,onSwitchPage:function(a){queryData({currentPage:a,pageSize:e.pageSize})}})})};WUI.ready=function(){var e=WUI.getResource("/query");WUI.getResource("/add");WUI.ContentHeader.create({$el:$(".content-header"),meta:[{name:"首页",url:"/ams"},{name:"飞凡通业务"},{name:"支付网关退款订单查询"}]}),WUI.DataFilterEx.create({$el:$(".data-filter"),meta:META,fields:FILTER_FIELDS,rightButton:{name:e&&e.resourceDisplayName||"查询",callback:function(e){console.log(e),queryData($.extend(e,{currentPage:0,pageSize:PAGE_SIZE}))}},leftButton:{name:"导出Excel",callback:function(e){}}}),queryData({currentPage:0,pageSize:20})},$(function(){WUI.init({system:"ams"})});
//# sourceMappingURL=gateway-refund-list.js.map
