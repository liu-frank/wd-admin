webpackJsonp([14],{8:function(e,t,r){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(15),n=u(a);n.default.Header=a.BoxHeader,n.default.Body=a.BoxBody,n.default.Footer=a.BoxFooter,t.default=n.default},9:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.inputTypes={TEXT:"INPUT_TYPE_TEXT",NUMBER:"INPUT_TYPE_NUMBER",EMAIL:"INPUT_TYPE_EMAIL",CHECKBOX:"INPUT_TYPE_CHECKBOX",PHONE:"INPUT_TYPE_PHONE",SELECT:"INPUT_TYPE_SELECT",MULTISELECT:"INPUT_TYPE_MULTISELECT",TREESELECT:"INPUT_TYPE_TREESELECT",DATE:"INPUT_TYPE_DATE",DATERANGE:"INPUT_TYPE_DATERANGE"}},15:function(e,t,r){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.BoxFooter=t.BoxBody=t.BoxHeader=void 0;var a=r(2),n=u(a),l=function(e){var t=e.children;return n.default.createElement("div",{className:"box"},t)};t.BoxHeader=function(e){var t=e.children;return n.default.createElement("div",{className:"box-header with-border"},t)},t.BoxBody=function(e){var t=e.children;return n.default.createElement("div",{className:"box-body"},t)},t.BoxFooter=function(e){var t=e.children;return n.default.createElement("div",{className:"box-footer"},t)};t.default=l},16:function(e,t,r){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(2),n=u(a),l=function(e){var t=e.children;return n.default.createElement("section",{className:"content"},t)};t.default=l},17:function(e,t,r){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(16),n=u(a);t.default=n.default},101:function(e,t,r){e.exports={default:r(103),__esModule:!0}},102:function(e,t,r){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=r(101),n=u(a),l=r(29),o=u(l);t.default=function(){function e(e,t){var r=[],u=!0,a=!1,n=void 0;try{for(var l,c=(0,o.default)(e);!(u=(l=c.next()).done)&&(r.push(l.value),!t||r.length!==t);u=!0);}catch(e){a=!0,n=e}finally{try{!u&&c.return&&c.return()}finally{if(a)throw n}}return r}return function(t,r){if(Array.isArray(t))return t;if((0,n.default)(Object(t)))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},103:function(e,t,r){r(95),r(41),e.exports=r(106)},106:function(e,t,r){var u=r(104),a=r(40)("iterator"),n=r(75);e.exports=r(14).isIterable=function(e){var t=Object(e);return void 0!==t[a]||"@@iterator"in t||n.hasOwnProperty(u(t))}},185:function(e,t,r){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments[1],r=V[t.type];return r?r(e,t):e}Object.defineProperty(t,"__esModule",{value:!0}),t.resetItem=t.updateItem=t.clearAllResources=t.selectAllResources=t.updateResource=t.updateFilter=t.switchPageStart=t.switchPage=t.queryResource=t.deleteData=t.updateData=t.createData=t.queryData=void 0;var n,l=r(30),o=u(l),c=r(102),s=u(c),i=r(46),d=u(i),f=r(20),p=u(f);t.default=a;var _=r(49),m=u(_),E=r(39),h=u(E),y=r(19),v=(r(9),{id:{label:"ID"},name:{label:"姓名"}}),D={meta:v,filterFields:["name"],tableFields:["id","name"],editFields:["name"],list:[],total:0,pageSize:20,currentPage:0,currentItem:{resourceIDList:""},currentFilter:{},typeList:[],resourceList:[]},I="role_detail".toUpperCase(),T="QUERY_"+I,b="QUERY_SUCCESS_"+I,R="QUERY_RESOURCE_"+I,L="QUERY_RESOURCE_SUCCESS_"+I,N="CREATE_"+I,P="CREATE_SUCCESS_"+I,x="UPDATE_"+I,C="UPDATE_SUCCESS_"+I,g="DELETE_"+I,S="DELETE_SUCCESS_"+I,A="UPDATE_FILTER_"+I,O="UPDATE_ITEM_"+I,M="UPDATE_RESOURCE_"+I,U="SELECT_ALL_RESOURCES_"+I,k="CLEAR_ALL_RESOURCES_"+I,B="RESET_ITEM_"+I,j="SWITCH_PAGE_"+I,w=function(){return{type:T}},Y=function(e){return{type:b,payload:e}},q=function(){return{type:R}},F=function(e){return{type:L,payload:e}},H=function(){return{type:N}},Q=function(){return{type:P}},K=function(){return{type:x}},W=function(){return{type:C}},X=function(){return{type:g}},G=function(){return{type:S}},z=t.queryData=function(e){var t=e.id;return function(e,r){e(w()),(0,m.default)(h.default.aas+"/aas/v1/role/detail/query",{method:"POST",jsonData:{appRoleID:t}}).then(function(t){t.appRole.resourceIDList||(t.appRole.resourceIDList=[]),e(Y({currentItem:(0,p.default)(t.appRole,{resourceIDList:t.appRole.resourceIDList.join(",")})}))})}},J=(t.createData=function(){return function(e,t){e(H()),setTimeout(function(){return e(Q())},500)}},t.updateData=function(){return function(e,t){e(K());var r=t()["role-detail"].currentItem;(0,m.default)(h.default.aas+"/aas/v1/role/authority/grant",{method:"POST",jsonData:(0,p.default)({},r,{resourceIDList:""!==r.resourceIDList?r.resourceIDList.split(","):[]})}).then(function(t){e(W()),e((0,y.showSuccess)({message:"权限更新成功"}))})}},t.deleteData=function(){return function(e,t){e(X()),setTimeout(function(){return e(G())},500)}},t.queryResource=function(e){var t=e.appID;return function(e,r){e(q());var u=(0,m.default)(h.default.aas+"/aas/v1/common/codetable/query",{method:"POST",jsonData:{codeType:"resourceType"}}),a=(0,m.default)(h.default.aas+"/aas/v1/resource/list/query/forApp",{method:"POST",jsonData:{appID:t}});return d.default.all([u,a]).then(function(t){var r=(0,s.default)(t,2),u=r[0],a=r[1],n=u.codeTableList.map(function(e){return{id:e.code,label:e.codeDesc}}),l=a.appResourceDTOList;e(F({typeList:n,resourceList:l}))})}},t.switchPage=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return function(t,r){t(J(e)),setTimeout(function(){t(z())},0)}},t.switchPageStart=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return{type:j,payload:e}}),V=(t.updateFilter=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:A,payload:e}},t.updateResource=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:M,payload:e}},t.selectAllResources=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:U,payload:e}},t.clearAllResources=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:k,payload:e}},t.updateItem=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:O,payload:e}},t.resetItem=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:B,payload:e}},n={},(0,o.default)(n,b,function(e,t){return(0,p.default)({},e,t.payload)}),(0,o.default)(n,L,function(e,t){return(0,p.default)({},e,t.payload)}),(0,o.default)(n,N,function(e,t){return(0,p.default)({},e,{success:!1})}),(0,o.default)(n,P,function(e,t){return(0,p.default)({},e,{success:!0})}),(0,o.default)(n,x,function(e,t){return(0,p.default)({},e,{success:!1})}),(0,o.default)(n,C,function(e,t){return(0,p.default)({},e,{success:!0})}),(0,o.default)(n,g,function(e,t){return(0,p.default)({},e,{success:!1})}),(0,o.default)(n,S,function(e,t){return(0,p.default)({},e,{success:!0})}),(0,o.default)(n,j,function(e,t){return(0,p.default)({},e,{currentPage:t.payload})}),(0,o.default)(n,A,function(e,t){var r=(0,p.default)({},e.currentFilter);return r[t.payload.field]=t.payload.value,(0,p.default)({},e,{currentFilter:r})}),(0,o.default)(n,O,function(e,t){var r=(0,p.default)({},e.currentItem);return r[t.payload.field]=t.payload.value,(0,p.default)({},e,{currentItem:r})}),(0,o.default)(n,B,function(e,t){return(0,p.default)({},e,{currentItem:t.payload})}),(0,o.default)(n,M,function(e,t){var r=(0,p.default)({},e.currentItem),u=""===e.currentItem.resourceIDList?[]:e.currentItem.resourceIDList.split(","),a=t.payload.resourceID;return u.indexOf(a+"")>=0?u.splice(u.indexOf(a+""),1):u.push(a),r.resourceIDList=u.join(","),(0,p.default)({},e,{currentItem:r})}),(0,o.default)(n,U,function(e,t){var r=(0,p.default)({},e.currentItem),u=e.resourceList.filter(function(e){return e.resourceType===t.payload.resourceType}),a=""===e.currentItem.resourceIDList?[]:e.currentItem.resourceIDList.split(",");return u.forEach(function(e){a.indexOf(e.resourceID+"")===-1&&a.push(e.resourceID)}),r.resourceIDList=a.join(","),(0,p.default)({},e,{currentItem:r})}),(0,o.default)(n,k,function(e,t){var r=(0,p.default)({},e.currentItem),u=e.resourceList.filter(function(e){return e.resourceType===t.payload.resourceType}),a=""===e.currentItem.resourceIDList?[]:e.currentItem.resourceIDList.split(",");return u.forEach(function(e){a.indexOf(e.resourceID+"")>=0&&a.splice(a.indexOf(e.resourceID+""),1)}),r.resourceIDList=a.join(","),(0,p.default)({},e,{currentItem:r})}),n)},403:function(e,t,r){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(31),n=u(a),l=r(3),o=u(l),c=r(4),s=u(c),i=r(5),d=u(i),f=r(7),p=u(f),_=r(6),m=u(_),E=r(2),h=u(E),y=r(64),v=u(y),D=r(17),I=u(D),T=r(8),b=u(T),R=r(45),L=r(485),N=u(L),P=h.default.createElement("i",{className:"fa fa-circle-o"}),x=h.default.createElement("i",{className:"fa fa-circle-o"}),C=function(e){function t(){return(0,s.default)(this,t),(0,p.default)(this,(t.__proto__||(0,o.default)(t)).apply(this,arguments))}return(0,m.default)(t,e),(0,d.default)(t,[{key:"selectAll",value:function(){var e=""===this.props.data.currentItem.resourceIDList?[]:this.props.data.currentItem.resourceIDList.split(","),t=this.props.data.resourceList.filter(function(e){return"menu"===e.resourceType}),r=!0;t.forEach(function(t){e.indexOf(t.resourceID+"")===-1&&(r=!1)}),r?this.props.clearAllResources({resourceType:this.props.currentType}):this.props.selectAllResources({resourceType:this.props.currentType})}},{key:"render",value:function(){var e=this,t=""===this.props.data.currentItem.resourceIDList?[]:this.props.data.currentItem.resourceIDList.split(","),r=this.props.data.resourceList.filter(function(e){return"menu"===e.resourceType}),u=!0,a=(0,R.getResource)(this.props,"/modify");return r.forEach(function(e){t.indexOf(e.resourceID+"")===-1&&(u=!1)}),h.default.createElement("div",{className:N.default.menus},h.default.createElement("div",{className:N.default.inner},this.props.data.resourceList.filter(function(e){return"menu"===e.resourceType}).map(function(r){var u=r.levelStructure?r.levelStructure.split("."):[0,0,0];return"0"===u[1]?h.default.createElement("label",{key:r.resourceID,className:N.default.mainMenu},h.default.createElement("span",null,P,r.resourceDisplayName),h.default.createElement("input",{type:"checkbox",checked:t.indexOf(r.resourceID+"")>=0,onChange:e.props.updateResource.bind(null,r)})):"0"===u[2]?h.default.createElement("label",{key:r.resourceID,className:N.default.subMenu},h.default.createElement("span",null,x,r.resourceDisplayName),h.default.createElement("input",{type:"checkbox",checked:t.indexOf(r.resourceID+"")>=0,onChange:e.props.updateResource.bind(null,r)})):h.default.createElement("label",{key:r.resourceID,className:N.default.thirdMenu},h.default.createElement("span",null,r.resourceDisplayName),h.default.createElement("input",{type:"checkbox",checked:t.indexOf(r.resourceID+"")>=0,onChange:e.props.updateResource.bind(null,r)}))})),r.length>0&&h.default.createElement("div",{className:N.default.selectAll},h.default.createElement("label",null,"全选",h.default.createElement("input",{type:"checkbox",checked:u,onChange:this.selectAll.bind(this)}))),a&&h.default.createElement("button",{className:"btn btn-sm btn-primary pull-right "+N.default.button,onClick:this.props.updateData},a.resourceDisplayName))}}]),t}(h.default.Component),g=h.default.createElement("thead",null,h.default.createElement("tr",null,h.default.createElement("th",null,"ID"),h.default.createElement("th",null,"显示名称"),h.default.createElement("th",null,"资源描述"),h.default.createElement("th",null,"LinkURL"),h.default.createElement("th",null))),S=function(e){function t(){return(0,s.default)(this,t),(0,p.default)(this,(t.__proto__||(0,o.default)(t)).apply(this,arguments))}return(0,m.default)(t,e),(0,d.default)(t,[{key:"selectAll",value:function(){var e=this,t=""===this.props.data.currentItem.resourceIDList?[]:this.props.data.currentItem.resourceIDList.split(","),r=this.props.data.resourceList.filter(function(t){return t.resourceType===e.props.currentType}),u=!0;r.forEach(function(e){t.indexOf(e.resourceID+"")===-1&&(u=!1)}),u?this.props.clearAllResources({resourceType:this.props.currentType}):this.props.selectAllResources({resourceType:this.props.currentType})}},{key:"render",value:function(){var e=this,t=""===this.props.data.currentItem.resourceIDList?[]:this.props.data.currentItem.resourceIDList.split(","),r=this.props.data.resourceList.filter(function(t){return t.resourceType===e.props.currentType}),u=!0,a=(0,R.getResource)(this.props,"/modify");return r.forEach(function(e){t.indexOf(e.resourceID+"")===-1&&(u=!1)}),h.default.createElement("div",{className:N.default.menus},h.default.createElement("div",{className:N.default.inner},h.default.createElement("table",{className:"table table-bordered table-hover text-center "+N.default.table},g,h.default.createElement("tbody",null,this.props.data.resourceList.filter(function(t){return t.resourceType===e.props.currentType}).map(function(r){return h.default.createElement("tr",{key:r.resourceID,onClick:e.props.updateResource.bind(null,r)},h.default.createElement("td",null,r.resourceID),h.default.createElement("td",null,r.resourceDisplayName),h.default.createElement("td",null,r.description),h.default.createElement("td",null,r.linkURL),h.default.createElement("td",null,h.default.createElement("input",{type:"checkbox",checked:t.indexOf(r.resourceID+"")>=0,onChange:function(){}})))})))),r.length>0&&h.default.createElement("div",{className:N.default.selectAll},h.default.createElement("label",null,"全选",h.default.createElement("input",{type:"checkbox",className:N.default.tableAll,checked:u,onChange:this.selectAll.bind(this)}))),a&&h.default.createElement("button",{className:"btn btn-sm btn-primary pull-right "+N.default.button,onClick:this.props.updateData},a.resourceDisplayName))}}]),t}(h.default.Component),A=h.default.createElement("span",null,"角色名称："),O=h.default.createElement("span",null,"所属系统："),M=h.default.createElement("span",null,"选择权限："),U=function(e){function t(e){(0,s.default)(this,t);var r=(0,p.default)(this,(t.__proto__||(0,o.default)(t)).call(this,e));return r.state={currentType:"menu"},r}return(0,m.default)(t,e),(0,d.default)(t,[{key:"componentDidMount",value:function(){this.props.queryResource({appID:this.props.location.query.appID}),this.props.queryData({id:this.props.location.query.id});var e=$(v.default.findDOMNode(this.refs.box));document.body.clientHeight<=720?e.height(400):e.height(document.body.clientHeight-400)}},{key:"componentWillReceiveProps",value:function(e){!this.props.data.success&&e.data.success&&this.props.hideEdit()}},{key:"render",value:function(){var e=this;return h.default.createElement(I.default,null,h.default.createElement(b.default,null,h.default.createElement("div",{className:N.default.wrapper},h.default.createElement("div",{className:N.default.line},A,h.default.createElement("strong",null,this.props.data.currentItem.roleName)),h.default.createElement("div",{className:N.default.line},O,h.default.createElement("strong",null,this.props.data.currentItem.appName)),h.default.createElement("div",{className:N.default.line},M),h.default.createElement("div",{className:N.default.box,ref:"box"},h.default.createElement("div",{className:N.default.menu},h.default.createElement("ul",null,this.props.data.typeList.map(function(t){return h.default.createElement("li",{key:t.id,className:e.state.currentType===t.id?N.default.active:null,onClick:function(){return e.setState({currentType:t.id})}},t.label)}))),h.default.createElement("div",{className:N.default.content},"menu"===this.state.currentType?h.default.createElement(C,(0,n.default)({},this.props,this.state)):h.default.createElement(S,(0,n.default)({},this.props,this.state)))))))}}]),t}(h.default.Component);t.default=U},404:function(e,t,r){"use strict";function u(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(31),l=a(n),o=r(34),c=r(52),s=u(c),i=r(19),d=u(i),f=r(13),p=u(f),_=r(185),m=u(_),E=r(403),h=a(E),y=(0,l.default)({},s,d,p,m),v=function(e){return{data:e["role-detail"],resources:e.administrator.resources,popups:e.popups}};t.default=(0,o.connect)(v,y)(h.default)},485:function(e,t){e.exports={wrapper:"RoleDetail__wrapper___1gKPQ",line:"RoleDetail__line___e-VpQ",box:"RoleDetail__box___YRlK4",menu:"RoleDetail__menu___Hnm_6",active:"RoleDetail__active___3_pfI",manageButton:"RoleDetail__manageButton___T4jOI",inner:"RoleDetail__inner___1wYcu",content:"RoleDetail__content___157dq",menus:"RoleDetail__menus___2ZaT9",mainMenu:"RoleDetail__mainMenu___1K0W8",selectAll:"RoleDetail__selectAll___2gvdB",subMenu:"RoleDetail__subMenu___282EQ",thirdMenu:"RoleDetail__thirdMenu___1rvD7",tableAll:"RoleDetail__tableAll___2Wsl7",table:"RoleDetail__table___2L8xI",button:"RoleDetail__button___3KT-q",dialog:"RoleDetail__dialog___1T5D6",close:"RoleDetail__close___dviWE",checkboxs:"RoleDetail__checkboxs___ojiv2",buttons:"RoleDetail__buttons___3AjC6",confirmButton:"RoleDetail__confirmButton___PXzHR",cancelButton:"RoleDetail__cancelButton___S_xGm"}}});