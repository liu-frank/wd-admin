"use strict";var t=WUI.t,PAGE_SIZE=20,META={},TABLE_FIELDS=["id","name","age","birthday","email","status"],FILTER_FIELDS=["name","age","birthday","status"],EDIT_FIELDS=["name","age","birthday","email","status"];WUI.ready=function(){META={id:{label:t("用户ID")},name:{label:t("用户姓名"),required:!0,maxLength:20},email:{label:"Email",type:"email",required:!0,maxLength:11},age:{label:t("年龄"),required:!0,type:"number"},birthday:{label:t("生日"),type:"date",format:"YYYY-DD-MM"},status:{label:t("用户状态"),type:"select",options:[{label:t("未开户"),value:0},{label:t("未激活"),value:1},{label:t("正常"),value:2},{label:t("已销户"),value:3}]}},WUI.ContentHeader.create({$el:$(".content-header"),meta:[{name:t("图片延迟加载页面")}]}),$(".lazy").lazyload({effect:"fadeIn"})},$(function(){WUI.init({system:"sample"})});
//# sourceMappingURL=lazy-image.js.map
