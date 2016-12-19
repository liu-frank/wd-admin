webpackJsonp([8],{8:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(15),r=n(l);r.default.Header=l.BoxHeader,r.default.Body=l.BoxBody,r.default.Footer=l.BoxFooter,t.default=r.default},9:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.inputTypes={TEXT:"INPUT_TYPE_TEXT",NUMBER:"INPUT_TYPE_NUMBER",EMAIL:"INPUT_TYPE_EMAIL",CHECKBOX:"INPUT_TYPE_CHECKBOX",PHONE:"INPUT_TYPE_PHONE",SELECT:"INPUT_TYPE_SELECT",MULTISELECT:"INPUT_TYPE_MULTISELECT",TREESELECT:"INPUT_TYPE_TREESELECT",DATE:"INPUT_TYPE_DATE",DATERANGE:"INPUT_TYPE_DATERANGE"}},15:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.BoxFooter=t.BoxBody=t.BoxHeader=void 0;var l=a(2),r=n(l),u=function(e){var t=e.children;return r.default.createElement("div",{className:"box"},t)};t.BoxHeader=function(e){var t=e.children;return r.default.createElement("div",{className:"box-header with-border"},t)},t.BoxBody=function(e){var t=e.children;return r.default.createElement("div",{className:"box-body"},t)},t.BoxFooter=function(e){var t=e.children;return r.default.createElement("div",{className:"box-footer"},t)};t.default=u},16:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(2),r=n(l),u=function(e){var t=e.children;return r.default.createElement("section",{className:"content"},t)};t.default=u},17:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(16),r=n(l);t.default=r.default},22:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(29),r=n(l),u=a(3),o=n(u),i=a(25),s=n(i),c=a(4),d=n(c),f=a(5),p=n(f),m=a(7),h=n(m),v=a(6),y=n(v),E=a(2),g=n(E),b=a(1),T=n(b),_=a(8),P=n(_),C=a(9),N=g.default.createElement("div",{className:"row text-center"},"没有数据"),S=function(e){function t(e){var a;(0,d.default)(this,t);var n=(0,h.default)(this,(a=t.__proto__||(0,o.default)(t)).call.apply(a,[this].concat((0,s.default)(e))));return n.state={selection:[]},n}return(0,y.default)(t,e),(0,p.default)(t,[{key:"componentWillReceiveProps",value:function(e){this.props.data.list!==e.data.list&&this.setState({selection:[]})}},{key:"toggleSelection",value:function(e,t){t.target.checked?this.state.selection.push(e):this.state.selection.splice(this.state.selection.indexOf(e),1),this.forceUpdate()}},{key:"selectAll",value:function(){for(var e=[],t=0;t<this.props.data.list.length;t++)e.push(t);this.setState({selection:e})}},{key:"clearAll",value:function(){this.setState({selection:[]})}},{key:"onButtonClick",value:function(e,t){e.confirm?this.props.onConfirm({message:e.confirm,onConfirm:e.callback.bind(null,t)}):e.callback(t)}},{key:"render",value:function(){var e=this,t=this.props,a=t.data,n=t.operations,l=t.groupOps;return g.default.createElement(P.default.Body,null,g.default.createElement("div",{className:"row",style:{overflow:"auto"}},g.default.createElement("table",{ref:"table",style:{margin:10,width:"98%",minWidth:800},className:"table table-bordered table-hover text-center table-responsive table-striped"},g.default.createElement("thead",null,g.default.createElement("tr",null,l&&g.default.createElement("th",{style:{width:50}},"选择"),a.tableFields.map(function(e,t){var n=a.meta[e]||{};return g.default.createElement("th",{style:{verticalAlign:"middle",width:n.width||"auto"},key:t},n.label)}),n&&g.default.createElement("th",{style:{verticalAlign:"middle",width:a.meta.operations?a.meta.operations.width||"auto":"auto"}},"操作"))),g.default.createElement("tbody",null,a.list.map(function(t,u){return g.default.createElement("tr",{key:u},l&&g.default.createElement("td",null,g.default.createElement("input",{type:"checkbox",checked:e.state.selection.indexOf(u)>=0,onChange:e.toggleSelection.bind(e,u)})),a.tableFields.map(function(e,n){var l=a.meta[e];if(l.display)return g.default.createElement("td",{key:n},l.display(t));if(l.type===C.inputTypes.SELECT){var u=l.options.find(function(a){return a.value===t[e]+""});return g.default.createElement("td",{key:n},u&&u.label)}if(l.type===C.inputTypes.MULTISELECT){var o="";return""!==t[e]&&(o=t[e].split(",").map(function(e){var t=l.options.find(function(t){return t.value+""===e});return t?t.label:""}).join(",")),g.default.createElement("td",{key:n},o)}if(l.type===C.inputTypes.TREESELECT){var i=t[e].split(",").map(function(e){var t=!0,a=!1,n=void 0;try{for(var u,o=(0,r.default)(l.options);!(t=(u=o.next()).done);t=!0){var i=u.value,s=!0,c=!1,d=void 0;try{for(var f,p=(0,r.default)(i.options);!(s=(f=p.next()).done);s=!0){var m=f.value;if(m.resourceID===e)return m.label;var h=!0,v=!1,y=void 0;try{for(var E,g=(0,r.default)(m.options);!(h=(E=g.next()).done);h=!0){var b=E.value;if(b.resourceId===e)return b.label}}catch(e){v=!0,y=e}finally{try{!h&&g.return&&g.return()}finally{if(v)throw y}}}}catch(e){c=!0,d=e}finally{try{!s&&p.return&&p.return()}finally{if(c)throw d}}}}catch(e){a=!0,n=e}finally{try{!t&&o.return&&o.return()}finally{if(a)throw n}}}).join(", ");return g.default.createElement("td",{key:n},i)}return l.type===C.inputTypes.DATE?t[e]?g.default.createElement("td",{key:n},(0,T.default)(t[e]).format("YYYY-MM-DD HH:mm:ss")):g.default.createElement("td",{key:n}):g.default.createElement("td",{key:n},t[e])}),n&&g.default.createElement("td",null,n.map(function(a,n){return g.default.createElement("a",{key:n,style:0===n?{cursor:"pointer"}:{marginLeft:"10px",cursor:"pointer"},onClick:e.onButtonClick.bind(e,a,t)},a.name)})))})))),g.default.createElement("div",{className:"row"},l&&g.default.createElement("label",{style:{float:"left",marginLeft:"30px",fontWeight:"normal"}},g.default.createElement("input",{type:"checkbox",style:{marginRight:"5px"},checked:this.state.selection.length===this.props.data.list.length,onChange:function(t){t.target.checked?e.selectAll():e.clearAll()}}),"全选"),l&&l.map(function(t,a){return g.default.createElement("div",{className:"col-sm-1 text-center",key:a},g.default.createElement("button",{className:"btn btn-xs btn-"+t.icon,disabled:0===e.state.selection.length,onClick:e.onButtonClick.bind(e,t,e.state.selection.map(function(t){return e.props.data.list[t]}))},t.name))})),0===a.list.length&&N)}}]),t}(g.default.Component);t.default=S},23:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(22),r=n(l);t.default=r.default},24:function(e,t,a){e.exports={default:a(26),__esModule:!0}},25:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var l=a(24),r=n(l);t.default=function(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return(0,r.default)(e)}},26:function(e,t,a){a(41),a(28),e.exports=a(14).Array.from},27:function(e,t,a){"use strict";var n=a(33),l=a(50);e.exports=function(e,t,a){t in e?n.f(e,t,l(0,a)):e[t]=a}},28:function(e,t,a){"use strict";var n=a(47),l=a(32),r=a(51),u=a(61),o=a(60),i=a(56),s=a(27),c=a(57);l(l.S+l.F*!a(62)(function(e){Array.from(e)}),"Array",{from:function(e){var t,a,l,d,f=r(e),p="function"==typeof this?this:Array,m=arguments.length,h=m>1?arguments[1]:void 0,v=void 0!==h,y=0,E=c(f);if(v&&(h=n(h,m>2?arguments[2]:void 0,2)),void 0==E||p==Array&&o(E))for(t=i(f.length),a=new p(t);t>y;y++)s(a,y,v?h(f[y],y):f[y]);else for(d=E.call(f),a=new p;!(l=d.next()).done;y++)s(a,y,v?u(d,h,[l.value,y],!0):l.value);return a.length=y,a}})},35:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(3),r=n(l),u=a(4),o=n(u),i=a(5),s=n(i),c=a(7),d=n(c),f=a(6),p=n(f),m=a(2),h=n(m),v=a(8),y=n(v),E=a(37),g=n(E),b=h.default.createElement("i",{className:"fa fa-fast-backward"}),T=h.default.createElement("i",{className:"fa fa-backward"}),_=h.default.createElement("i",{className:"fa fa-forward"}),P=h.default.createElement("i",{className:"fa fa-fast-forward"}),C=function(e){function t(){return(0,o.default)(this,t),(0,d.default)(this,(t.__proto__||(0,r.default)(t)).apply(this,arguments))}return(0,p.default)(t,e),(0,s.default)(t,[{key:"nextPage",value:function(){var e=this.calParams(this.props.data),t=e.currentPage,a=e.totalPage;t<a-1&&this.props.onSwitch(t+1)}},{key:"prevPage",value:function(){var e=this.calParams(this.props.data),t=e.currentPage;t>0&&this.props.onSwitch(t-1)}},{key:"firstPage",value:function(){var e=this.calParams(this.props.data),t=e.currentPage;0!==t&&this.props.onSwitch(0)}},{key:"lastPage",value:function(){var e=this.calParams(this.props.data),t=e.currentPage,a=e.totalPage;t!==a-1&&this.props.onSwitch(a-1)}},{key:"switchPage",value:function(e){var t=this.calParams(this.props.data),a=t.currentPage;a!==e&&this.props.onSwitch(e)}},{key:"calParams",value:function(e){var t=e.total,a=e.currentPage,n=e.pageSize,l=a*n+1,r=(e.currentPage+1)*e.pageSize,u=t%n?parseInt(t/n,10)+1:parseInt(t/n,10),o=r>t?t:r;return{start:l,end:o,total:t,currentPage:a,pageSize:n,totalPage:u}}},{key:"calPaginators",value:function(e,t){var a=[];if(e>9)if(t<5)for(var n=0;n<9;n++)a.push(n);else if(t>e-5)for(var l=0;l<9;l++)a.push(e-9+l);else for(var r=0;r<9;r++)a.push(t-4+r);else for(var u=0;u<e;u++)a.push(u);return a}},{key:"render",value:function(){var e=this,t=this.props.data,a=this.calParams(t),n=a.start,l=a.end,r=a.total,u=a.currentPage,o=a.totalPage,i=this.calPaginators(o,u);return 0===r?null:h.default.createElement(y.default.Footer,null,h.default.createElement("div",{className:"row",style:{lineHeight:"35px"}},h.default.createElement("div",{className:"col-sm-5"},"当前显示 ",n," 到 ",l," 条，共 ",r," 条"),h.default.createElement("div",{className:"col-sm-7"},h.default.createElement("ul",{className:"pagination pagination-sm pull-right",style:{margin:0}},o>1?h.default.createElement("li",{className:0===u&&"disabled",onClick:this.firstPage.bind(this)},h.default.createElement("a",{className:g.default.paginator},b)):null,o>1?h.default.createElement("li",{className:0===u&&"disabled",onClick:this.prevPage.bind(this)},h.default.createElement("a",{className:g.default.paginator},T)):null,i.map(function(t,a){return h.default.createElement("li",{key:a,className:u===t&&"active",onClick:e.switchPage.bind(e,t)},h.default.createElement("a",{className:g.default.paginator},t+1))}),o>1?h.default.createElement("li",{className:u===o-1&&"disabled",onClick:this.nextPage.bind(this)},h.default.createElement("a",{className:g.default.paginator},_)):null,o>1?h.default.createElement("li",{className:u===o-1&&"disabled",onClick:this.lastPage.bind(this)},h.default.createElement("a",{className:g.default.paginator},P)):null))))}}]),t}(h.default.Component);t.default=C},36:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(35),r=n(l);t.default=r.default},37:function(e,t){e.exports={paginator:"DataPaginator__paginator___1cn8c"}},42:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(68),r=n(l),u=a(3),o=n(u),i=a(4),s=n(i),c=a(5),d=n(c),f=a(7),p=n(f),m=a(6),h=n(m),v=a(2),y=n(v),E=a(1),g=n(E),b=a(54),T=n(b),_=a(13),P=a(9),C=y.default.createElement("p",{className:"form-control"},"点击选择日期"),N=function(e){function t(){return(0,s.default)(this,t),(0,p.default)(this,(t.__proto__||(0,o.default)(t)).apply(this,arguments))}return(0,h.default)(t,e),(0,d.default)(t,[{key:"changeItem",value:function(e,t){this.props.onUpdate({field:e,value:t.target.value})}},{key:"changeOption",value:function(e,t,a,n){var l=this.props.item,r=l[e]?l[e].split(","):[];n.target.checked?(r.indexOf(t.value+"")===-1&&r.push(t.value+""),a&&r.indexOf(a.value+"")===-1&&r.push(a.value),t.options&&t.options.forEach(function(e){r.indexOf(e.value+"")===-1&&r.push(e.value+"")})):t.options?(r.splice(r.indexOf(t.value+""),1),t.options.forEach(function(e){r.indexOf(e.value+"")>-1&&r.splice(r.indexOf(e.value+""),1)})):r.splice(r.indexOf(t.value+""),1),this.props.onUpdate({field:e,value:r.join(",")})}},{key:"setDate",value:function(e,t,a){this.props.onUpdate({field:e.startField,value:a.startDate.format("YYYY-MM-DD")}),this.props.onUpdate({field:e.endField,value:a.endDate.format("YYYY-MM-DD")})}},{key:"clearDate",value:function(e,t,a){console.log("cancel clicked"),this.props.onUpdate({field:e.startField,value:null}),this.props.onUpdate({field:e.endField,value:null}),a.startDate=(0,g.default)(),a.endDate=(0,g.default)()}},{key:"inputComponent",value:function(e,t){var a=this,n=this.props,l=n.item,u=n.showType,o=void 0===u?_.showTypes.CREATE:u,i={applyLabel:"确定",cancelLabel:"取消",daysOfWeek:["日","一","二","三","四","五","六"],monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],format:"YYYY-MM-DD",separator:" - ",fromLabel:"起始",toLabel:"终止",customRangeLabel:"自定义",weekLabel:"W",firstDay:1},s=function(){switch(e.type){case P.inputTypes.DATERANGE:return{v:y.default.createElement(T.default,{locale:i,maxDate:e.maxDate||null,onApply:a.setDate.bind(a,e),onCancel:a.clearDate.bind(a,e)},l[e.startField]?y.default.createElement("p",{className:"form-control"},l[e.startField]," ~ ",l[e.endField]):C)};case P.inputTypes.TREESELECT:var n=l[t]?l[t].split(","):[];return{v:y.default.createElement("div",{className:"box-body"},e.options.map(function(e,l){return y.default.createElement("div",{key:l},y.default.createElement("div",{className:"box-header"},y.default.createElement("label",null,y.default.createElement("input",{type:"checkbox",disabled:o===_.showTypes.VIEW,checked:n.indexOf(e.value+"")>=0,onChange:a.changeOption.bind(a,t,e,null)})," ",e.label)),e.options.length>0?y.default.createElement("div",{className:"box-body checkbox"},e.options.map(function(l,r){return y.default.createElement("label",{className:"col-sm-4",key:r},y.default.createElement("input",{type:"checkbox",disabled:o===_.showTypes.VIEW,checked:n.indexOf(l.value+"")>=0,onChange:a.changeOption.bind(a,t,l,e)}),l.label)})):null)}))};case P.inputTypes.SELECT:return{v:y.default.createElement("select",{className:"form-control",disabled:o===_.showTypes.VIEW||o===_.showTypes.UPDATE&&e.readOnly,id:t,value:l[t]||(e.options[0]?e.options[0].value:""),onChange:a.changeItem.bind(a,t)},e.options.map(function(e,t){return y.default.createElement("option",{key:t,value:e.value},e.label)}))};case P.inputTypes.MULTISELECT:console.log("item[field]",l[t]);var r=l[t]?l[t].split(","):[];return{v:y.default.createElement("div",{className:"row"},e.options.map(function(e,n){return y.default.createElement("div",{key:n,className:"checkbox col-sm-4"},y.default.createElement("label",null,y.default.createElement("input",{type:"checkbox",disabled:o===_.showTypes.VIEW,checked:r.indexOf(e.value+"")>=0,onChange:a.changeOption.bind(a,t,e,null)}),e.label))}))};case P.inputTypes.CHECKBOX:return{v:y.default.createElement("div",{className:"checkbox"},y.default.createElement("label",null,y.default.createElement("input",{type:"checkbox",id:t,checked:e.value,onChange:a.changeItem.bind(a,e)}),e.name))};case P.inputTypes.PHONE:return{v:y.default.createElement("input",{type:"text",className:"form-control",id:t,required:e.required,disabled:o===_.showTypes.VIEW,value:l[t]||"",onChange:a.changeItem.bind(a,t),placeholder:e.label})};case P.inputTypes.EMAIL:return{v:y.default.createElement("input",{type:"email",className:"form-control",id:t,required:e.required,maxLength:e.maxLength,disabled:o===_.showTypes.VIEW,value:l[t]||"",onChange:a.changeItem.bind(a,t),placeholder:e.label})};case P.inputTypes.TEXT:default:return{v:y.default.createElement("input",{type:"text",className:"form-control",id:t,required:e.required,maxLength:e.maxLength,disabled:o===_.showTypes.VIEW,value:l[t]||"",onChange:a.changeItem.bind(a,t),placeholder:e.label})}}}();if("object"===("undefined"==typeof s?"undefined":(0,r.default)(s)))return s.v}},{key:"render",value:function(){var e=this,t=this.props,a=t.fields,n=void 0===a?[]:a,l=t.meta,r=(t.item,t.onUpdate,t.columns),u="";switch(r){case 2:u="col-sm-6";break;case 3:u="col-sm-4";break;case 4:u="col-sm-3"}return y.default.createElement("div",{className:"box-body"},n.map(function(t,a){var n=l[t];return 0===r?y.default.createElement("div",{className:"form-group",key:a},y.default.createElement("label",{className:"control-label col-sm-2",htmlFor:t},n.label),y.default.createElement("div",{className:"col-sm-10"},e.inputComponent(n,t))):y.default.createElement("div",{className:"form-group "+u,key:a},y.default.createElement("label",{htmlFor:t},n.label),e.inputComponent(n,t))}),this.props.children)}}]),t}(y.default.Component);t.default=N},43:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(42),r=n(l);t.default=r.default},58:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(3),r=n(l),u=a(4),o=n(u),i=a(5),s=n(i),c=a(7),d=n(c),f=a(6),p=n(f),m=a(2),h=n(m),v=a(8),y=n(v),E=a(43),g=n(E),b=h.default.createElement("label",null),T=h.default.createElement("label",null),_=function(e){function t(){return(0,o.default)(this,t),(0,d.default)(this,(t.__proto__||(0,r.default)(t)).apply(this,arguments))}return(0,p.default)(t,e),(0,s.default)(t,[{key:"changeFilter",value:function(e,t){this.props.onChange({field:e,value:t.target.value})}},{key:"render",value:function(){var e=this.props,t=e.data,a=t.meta,n=t.filterFields,l=t.currentFilter,r=e.onCreate,u=e.onFilter,o=e.onChange;return h.default.createElement(y.default.Header,null,h.default.createElement(g.default,{columns:4,fields:n,meta:a,item:l,onUpdate:o},h.default.createElement("div",{className:"row col-sm-12"},u&&h.default.createElement("div",{className:"col-sm-1"},b,h.default.createElement("input",{type:"button",style:{marginTop:"5px"},className:"btn btn-info ",onClick:u,value:this.props.filterText||"查询"})),r&&h.default.createElement("div",{className:"col-sm-1"},T,h.default.createElement("input",{type:"button",style:{marginTop:"5px"},className:"btn btn-primary",onClick:r,value:this.props.createText||"新增"})))))}}]),t}(h.default.Component);t.default=_},59:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(58),r=n(l);t.default=r.default},191:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments[1],a=z[t.type];return a?a(e,t):e}Object.defineProperty(t,"__esModule",{value:!0}),t.resetItem=t.updateItem=t.updateFilter=t.switchPageStart=t.switchPage=t.deleteData=t.updateData=t.createData=t.queryChangeStatus=t.queryData=void 0;var r,u=a(30),o=n(u),i=a(20),s=n(i),c=a(46),d=n(c);t.default=l;var f=a(2),p=n(f),m=a(9),h=a(49),v=n(h),y=a(39),E=n(y),g={PWID:{label:"PWID"},sysFrom:{label:"注册渠道",type:m.inputTypes.SELECT,options:[{label:"快钱",value:"99bill"},{label:"万达",value:"wanda"},{label:"飞凡",value:"ffan"}]},account:{label:"会员帐号",display:function(e){return p.default.createElement("div",null,e.mobile&&p.default.createElement("p",null,e.mobile),e.email&&p.default.createElement("p",null,e.email))}},createTime:{label:"申请时间",type:m.inputTypes.DATE},operator:{label:"申请人"},WOType:{label:"申请变更状态",type:m.inputTypes.SELECT,options:[{label:"姓名变更",value:"10"},{label:"别名(昵称)变更",value:"20"},{label:"手机变更",value:"30"},{label:"电子邮件变更",value:"40"},{label:"身份证号变更",value:"50"},{label:"会员状态冻结",value:"60"},{label:"会员状态解冻",value:"70"},{label:"会员状态销户",value:"80"},{label:"批量状态变更",value:"100"}]},auditTime:{label:"审核时间",type:m.inputTypes.DATE},auditor:{label:"审核人"},status:{label:"审核状态",type:m.inputTypes.SELECT,options:[{label:"全部",value:""},{label:"待审核",value:"20"},{label:"审核同意",value:"30"},{label:"审核拒绝",value:"40"}]},operations:{width:80}},b={meta:g,filterFields:["PWID","account"],tableFields:["PWID","sysFrom","account","createTime","operator","WOType"],list:[],total:0,pageSize:20,currentPage:0,currentItem:{},currentFilter:{},checkStatus:!1},T="QUERY_STATUS_CHANGE",_="QUERY_STATUS_CHANGE_SUCCESS",P="CREATE_STATUS_CHANGE",C="CREATE_STATUS_CHANGE_SUCCESS",N="UPDATE_STATUS_CHANGE",S="UPDATE_STATUS_CHANGE_SUCCESS",k="DELETE_STATUS_CHANGE",O="DELETE_STATUS_CHANGE_SUCCESS",w="RESET_RESULT_STATUS",x="RESET_RESULT_SUCCESS",D="UPDATE_STATUS_CHANGE_FILTER",A="UPDATE_STATUS_CHANGE_ITEM",I="RESET_STATUS_CHANGE_ITEM",M="SWITCH_STATUS_CHANGE_PAGE",U=function(){return{type:T}},W=function(e){return{type:_,payload:e}},L=function(){return{type:P}},F=function(){return{type:C}},R=function(){return{type:N}},Y=function(){return{type:S}},H=function(){return{type:k}},j=function(){return{type:O}},B=function(){return{type:w}},G=function(e){return{type:x,failNums:e}},q=t.queryData=function(){return function(e,t){var a=t()["status-change"].currentFilter,n=t()["status-change"];return e(U()),new d.default(function(t){(0,v.default)(E.default.ams+"/ams/v1/workOrder/query/operationLog",{method:"POST",jsonData:{QueryType:10,WOStatus:a.status,PWID:a.PWID?a.PWID.replace(/(^\s*)|(\s*$)/g,""):null,loginName:a.account,pageNum:n.currentPage,pageSize:n.pageSize}}).then(function(t){e(W({list:t.workOrders,total:t.totalNum}))})})}},V=(t.queryChangeStatus=function(e,t){return function(a,n){a(B()),(0,v.default)(E.default.ams+"/ams/v1/account/WOStatus/ChangeAudit",{method:"POST",jsonData:{WOIDs:e,auditResult:t}}).then(function(e){a(G(e.failNums)),a(q())})}},t.createData=function(){return function(e,t){return e(L()),new d.default(function(t){setTimeout(function(){e(F()),t()},1e3)})}},t.updateData=function(){return function(e,t){return e(R()),new d.default(function(t){setTimeout(function(){e(Y()),t()},1e3)})}},t.deleteData=function(){return function(e,t){return e(H()),new d.default(function(t){setTimeout(function(){e(j()),t()},1e3)})}},t.switchPage=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return function(t,a){t(V(e)),setTimeout(function(){t(q())},0)}},t.switchPageStart=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return{type:M,payload:e}}),z=(t.updateFilter=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:D,payload:e}},t.updateItem=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:A,payload:e}},t.resetItem=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:I,payload:e}},r={},(0,o.default)(r,_,function(e,t){return(0,s.default)({},e,t.payload)}),(0,o.default)(r,P,function(e,t){return(0,s.default)({},e,{success:!0})}),(0,o.default)(r,C,function(e,t){return(0,s.default)({},e,{success:!0})}),(0,o.default)(r,M,function(e,t){return(0,s.default)({},e,{currentPage:t.payload})}),(0,o.default)(r,D,function(e,t){var a=(0,s.default)({},e.currentFilter);return a[t.payload.field]=t.payload.value,(0,s.default)({},e,{currentFilter:a})}),(0,o.default)(r,A,function(e,t){return(0,s.default)({},state,{currentItem:t.payload})}),(0,o.default)(r,I,function(e,t){return(0,s.default)({},e,{currentItem:t.payload,success:!1})}),(0,o.default)(r,w,function(e,t){return(0,s.default)({},e,{checkStatus:!1})}),(0,o.default)(r,x,function(e,t){return(0,s.default)({},e,{checkStatus:!0,failNums:t.failNums})}),r)},426:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(3),r=n(l),u=a(4),o=n(u),i=a(5),s=n(i),c=a(7),d=n(c),f=a(6),p=n(f),m=a(2),h=n(m),v=a(17),y=n(v),E=a(8),g=n(E),b=a(59),T=n(b),_=a(23),P=n(_),C=a(36),N=n(C),S=a(45),k=function(e){function t(){return(0,o.default)(this,t),(0,d.default)(this,(t.__proto__||(0,r.default)(t)).apply(this,arguments))}return(0,p.default)(t,e),(0,s.default)(t,[{key:"componentWillMount",value:function(){this.props.queryData()}},{key:"componentWillReceiveProps",value:function(e){!this.props.data.checkStatus&&e.data.checkStatus&&e.data.failNums>0&&this.props.showConfirm({title:"失败",message:"失败<strong>"+e.data.failNums+"</strong>条数据,请重新检查!",showCancel:!1})}},{key:"render",value:function(){var e=this,t=(0,S.checkResources)(this.props),a=(t.canQuery,t.canModify,(0,S.getResource)(this.props,"/query")),n=(0,S.getResource)(this.props,"/accept"),l=(0,S.getResource)(this.props,"/modify"),r=(0,S.getResource)(this.props,"/deny"),u=l?[{name:l.resourceDisplayName,icon:"info",callback:function(e){return window.open("/ams/member-detail?id="+e.PWID)}}]:[];n&&l&&[n?{name:n.resourceDisplayName,icon:"success",callback:function(t){console.log("approve",t);var a=[],n=[],l=[];t.map(function(e,t){e.WOType&&70==e.WOType&&20==e.status&&l.push(e.WOID),e.WOType&&80==e.WOType&&20==e.status&&n.push(e.WOID),e.WOType&&60==e.WOType&&20==e.status&&a.push(e.WOID)});var r=a.concat(n).concat(l);if(a.length>0)var u="<strong>"+a.length+"</strong>条冻结";else var u="";if(n.length>0)var o="<strong>"+n.length+"</strong>条销户";else var o="";if(l.length>0)var i="<strong>"+l.length+"</strong>条解冻";else var i="";r.length>0?e.props.showConfirm({title:"提示",message:"共<strong>"+t.length+"</strong>条数据\n               （ "+u+o+i+"）,\n               请确定是否审核通过",onConfirm:function(){return e.props.queryChangeStatus(r,30)}}):e.props.showConfirm({title:"提示",message:"没有有效数据,请重新选择!"})}}:{},r?{name:r.resourceDisplayName,icon:"danger",callback:function(t){console.log("approve",t);var a=[],n=[],l=[];t.map(function(e,t){e.WOType&&70==e.WOType&&20==e.status&&l.push(e.WOID),e.WOType&&80==e.WOType&&20==e.status&&n.push(e.WOID),e.WOType&&60==e.WOType&&20==e.status&&a.push(e.WOID)});var r=a.concat(n).concat(l);if(a.length>0)var u="<strong>"+a.length+"</strong>条冻结";else var u="";if(n.length>0)var o="<strong>"+n.length+"</strong>条销户";else var o="";if(l.length>0)var i="<strong>"+l.length+"</strong>条解冻";else var i="";r.length>0?e.props.showConfirm({title:"提示",message:"共<strong>"+t.length+"</strong>条数据\n               （ "+u+o+i+"）,\n               请确定是否审核拒绝",onConfirm:function(){return e.props.queryChangeStatus(r,40)}}):e.props.showConfirm({title:"提示",message:"没有有效数据,请重新选择!"})}}:{}];return h.default.createElement(y.default,null,h.default.createElement(g.default,null,h.default.createElement(T.default,{data:this.props.data,onFilter:a&&this.props.switchPage.bind(null,0),onChange:this.props.updateFilter}),h.default.createElement(P.default,{data:this.props.data,operations:u,onConfirm:this.props.showConfirm}),h.default.createElement(N.default,{data:this.props.data,onSwitch:this.props.switchPage})))}}]),t}(h.default.Component);t.default=k},427:function(e,t,a){"use strict";function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(31),u=l(r),o=a(34),i=a(52),s=n(i),c=a(19),d=n(c),f=a(13),p=n(f),m=a(191),h=n(m),v=a(426),y=l(v),E=(0,u.default)({},s,d,p,h),g=function(e){return{data:e["status-change"],resources:e.administrator.resources,popups:e.popups}};t.default=(0,o.connect)(g,E)(y.default)}});