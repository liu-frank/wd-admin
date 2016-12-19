"use strict";var PAGE_SIZE=20,META={PWID:{label:"PWID"},mobile:{label:"手机号码",type:"phone"},email:{label:"Email",type:"email"},accountName:{label:"姓名"},realNameLevel:{label:"实名等级"},accountResource:{label:"开户来源"},accountStatus:{label:"状态",options:[{label:"创建",value:"0"},{label:"正常",value:"1"},{label:"冻结",value:"2"},{label:"已合并",value:"8"},{label:"注销",value:"9"}],type:"select"},openTime:{label:"开户时间"},status:{label:"状态",type:"select",options:[{label:"正常",value:0}]}},TABLE_FIELDS=["PWID","mobile","email","accountName","realNameLevel","accountResource","accountStatus","openTime"],FILTER_FIELDS=["mobile"],editData=function(e){window.location.href="allowance-detail.html?id="+e.PWID+"&phone="+e.mobile},queryData=function(e){var a=WUI.getResource("/detail");console.log({currentPage:e.currentPage,pageSize:e.pageSize,mobile:e.mobile}),WUI.ajax({url:"/ams/v1/pocketMoney/query/accountList",jsonData:{mobile:e.mobile}}).then(function(e){WUI.DataTable.create({$el:$(".data-table"),meta:META,fields:TABLE_FIELDS,list:e.memberList,operations:[{name:a&&a.resourceDisplayName,callback:editData}]})})};WUI.ready=function(){var e=WUI.getResource("/query");WUI.getResource("/add");WUI.ContentHeader.create({$el:$(".content-header"),meta:[{name:"首页",url:"/ams"},{name:"飞凡通业务"},{name:"飞凡通账户查询"}]}),WUI.DataFilterEx.create({$el:$(".data-filter"),meta:META,fields:FILTER_FIELDS,rightButton:{name:e&&e.resourceDisplayName||"查询",callback:function(e){queryData($.extend(e,{currentPage:0,pageSize:PAGE_SIZE}))}}})},$(function(){WUI.init({system:"ams"})});
//# sourceMappingURL=allowance-list.js.map
