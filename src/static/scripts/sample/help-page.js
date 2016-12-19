"use strict";var t=WUI.t,PAGE_SIZE=20,META={},TABLE_FIELDS=["id","name","age","birthday","email","status"],FILTER_FIELDS=["name","age","birthday","status"],EDIT_FIELDS=["name","age","birthday","email","status"],createData=function(){var e=WUI.dataDialog.create({dialogPop:!0,dialogPopTitle:"新增用户",meta:META,list:{},fields:EDIT_FIELDS,onConfirm:function(a){console.log(a),e.hide()}})},editData=function(e){window.open("detail-page.html?id="+e.id)},deleteData=function(e){var a=WUI.ModalDialog.create({title:t("请确认"),message:t("是否删除此用户数据？"),onConfirm:function(){a.hide(),console.log(e)}})},activeData=function(e){console.log("active: "+e)},deactiveData=function(e){console.log("deactive: "+e)},queryData=function(e){var a=WUI.getResource("/edit"),l=WUI.getResource("/delete");WUI.ajax({url:"/sample/web/v1/users",method:"GET",jsonData:{currentPage:e.currentPage,pageSize:e.pageSize}}).then(function(n){WUI.DataTable.create({$el:$(".data-table"),meta:META,fields:TABLE_FIELDS,list:n.list,operations:[{name:a&&a.resourceDisplayName,callback:editData},{name:l&&l.resourceDisplayName,callback:deleteData}],groups:[{name:t("启用"),className:"btn btn-xs btn-success",id:"btn-success",callback:activeData},{name:t("停用"),className:"btn btn-xs btn-danger",id:"btn-danger",callback:deactiveData}]}),WUI.DataPaginator.create({$el:$(".data-paginator"),currentPage:e.currentPage,total:n.total,pageSize:e.pageSize,onSwitchPage:function(a){queryData({currentPage:a,pageSize:e.pageSize})}})})};WUI.ready=function(){META={id:{label:t("用户ID")},name:{label:t("用户姓名"),required:!0,maxLength:20},email:{label:"Email",type:"email",required:!0,maxLength:11},age:{label:t("年龄"),required:!0,type:"number"},birthday:{label:t("生日"),type:"date",format:"YYYY-DD-MM"},status:{label:t("用户状态"),type:"select",options:[{label:t("未开户"),value:0},{label:t("未激活"),value:1},{label:t("正常"),value:2},{label:t("已销户"),value:3}]}};var e=WUI.getResource("/query"),a=WUI.getResource("/add");WUI.ContentHeader.create({$el:$(".content-header"),meta:[{name:t("帮助页面")}]}),WUI.DataFilter.create({$el:$(".data-filter"),meta:META,fields:FILTER_FIELDS,queryButton:e&&e.resourceDisplayName,onFilter:function(e){queryData($.extend(e,{currentPage:0,pageSize:PAGE_SIZE}))},addButton:a&&a.resourceDisplayName,addFunc:createData}),queryData({currentPage:0,pageSize:20}),WUI.HelpDialog.create({meta:[{element:".content-header",title:"WUI Framework",content:"使用WUI.ContentHeader制作面包屑",placement:"bottom",backdrop:!0},{element:".data-filter",title:"WUI Framework",content:"使用WUI.DataFilter制作过滤器",placement:"bottom",backdrop:!0}]})},$(function(){WUI.init({system:"sample",locale:"zh-CN"})});
//# sourceMappingURL=help-page.js.map
