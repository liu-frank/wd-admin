"use strict";WUI.ready=function(){var e=$("iframe"),a=window.location.search,i=a.slice("?innerUrl=".length);e.height($(".content-wrapper").height()).attr("src",i),$(".sidebar-menu li").click(function(e){var a=$(this);a.hasClass("active")?a.removeClass("active"):($(".sidebar-menu li").removeClass("active"),a.addClass("active").parents("li").addClass("active"),a.parents(".treeview-menu").prev("li").addClass("active")),e.stopPropagation()}),$.each($(".sidebar-menu a"),function(){var e=$(this),a=e.attr("href");if("javascript:void(0);"!=a){e.children("i").hide();var t=a.split("?innerUrl=")[1]||"";t==decodeURI(i)&&(e.parents("li").addClass("active"),e.parents(".treeview-menu").prev("li").addClass("active"))}})},$(function(){WUI.init({system:"order"})});
//# sourceMappingURL=portal.js.map
