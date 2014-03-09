/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("jquery.sap.dom",false);jQuery.sap.require("sap.ui.Device");(function(){var d=function(I,w){if(!w){w=window}if(!I||I==""){return null}var D=w.document.getElementById(I);if(D&&D.id==I){return D}var R=w.document.getElementsByName(I);for(var i=0;i<R.length;i++){D=R[i];if(D&&D.id==I){return D}}return null};jQuery.sap.domById=!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<8?d:function domById(i,w){return i?(w||window).document.getElementById(i):null};jQuery.sap.byId=function byId(i,o){var e="";if(i){e="#"+i.replace(/(:|\.)/g,'\\$1')}return jQuery(e,o)};jQuery.sap.focus=function focus(D){if(!D){return}try{D.focus()}catch(e){var i=(D&&D.id)?" (ID: '"+D.id+"')":"";jQuery.sap.log.warning("Error when trying to focus a DOM element"+i+": "+e.message);return false}return true};jQuery.fn.cursorPos=function cursorPos(P){var l=arguments.length,t,L,T,s;T=this.prop("tagName");s=this.prop("type");if(this.length===1&&((T=="INPUT"&&(s=="text"||s=="password"||s=="search"))||T=="TEXTAREA")){var D=this.get(0);if(l>0){if(typeof(D.selectionStart)=="number"){D.focus();D.selectionStart=P;D.selectionEnd=P}else if(D.createTextRange){t=D.createTextRange();var m=D.value.length;if(P<0||P>m){P=m}if(t){t.collapse();t.moveEnd("character",P);t.moveStart("character",P);t.select()}}return this}else{if(typeof(D.selectionStart)=="number"){return D.selectionStart}else if(D.createTextRange){t=window.document.selection.createRange();var o=t.duplicate();if(D.tagName=="TEXTAREA"){o.moveToElementText(D);var a=o.duplicate();L=o.text.length;a.moveStart("character",L);if(a.inRange(t)){S=L}else{var i=L;var S=0;while(L>1){i=Math.round(L/2);S=S+i;a=o.duplicate();a.moveStart("character",S);if(a.inRange(t)){L=L-i}else{S=S-i;L=i}}}return S}else if(o.parentElement()===D){o.collapse();var L=D.value.length;o.moveStart('character',-L);return o.text.length}}return-1}}else{return this}};jQuery.fn.selectText=function selectText(s,e){var D=this.get(0);if(D){if(typeof(D.selectionStart)=="number"){if(s<0){s=0}if(e>D.value.length){e=D.value.length}if(!e||s>e){s=0;e=0}D.selectionStart=s;D.selectionEnd=e}else if(D.createTextRange){var t=D.createTextRange();t.collapse();t.moveStart('character',s);t.moveEnd('character',e-s);t.select()}}return this};jQuery.fn.outerHTML=function outerHTML(){var D=this.get(0);if(D&&D.outerHTML){return jQuery.trim(D.outerHTML)}else{var a=this[0]?this[0].ownerDocument:document;var o=a.createElement("div");o.appendChild(D.cloneNode(true));return o.innerHTML}};
/*!
	 * The following code is partially taken from 
	 * jQuery Javascript Library v1.10.1 - 2013-07-03T13:48Z
	 * jquery-1.10.1.js
	 * 
	 * http://jquery.com/
	 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
	 */
if(jQuery.sap.Version(jQuery.fn.jquery).compareTo("1.10.1")<0){var r=/^[^{]+\{\s*\[native \w/,p=window.document,c=function(a,b){var e=a.nodeType===9?a.documentElement:a,g=b&&b.parentNode;return a===g||!!(g&&g.nodeType===1&&(e.contains?e.contains(g):a.compareDocumentPosition&&a.compareDocumentPosition(g)&16))},C=function(a,b){if(b){while((b=b.parentNode)){if(b===a){return true}}}return false};jQuery.contains=function(a,e){var b=a?a.ownerDocument||a:p,g=b.documentElement;return r.test(g.contains)||g.compareDocumentPosition?c(a,e):C(a,e)}}jQuery.sap.containsOrEquals=function containsOrEquals(D,o){if(o&&D&&o!=document&&o!=window){return(D===o)||jQuery.contains(D,o)}return false};jQuery.fn.rect=function rect(){var D=this.get(0);if(D){if(D.getBoundingClientRect){var o=D.getBoundingClientRect();var R={top:o.top,left:o.left,width:o.right-o.left,height:o.bottom-o.top};var w=jQuery.sap.ownerWindow(D);R.left+=jQuery(w).scrollLeft();R.top+=jQuery(w).scrollTop();return R}else{return{top:10,left:10,width:D.offsetWidth,height:D.offsetWidth}}}return null};jQuery.fn.rectContains=function rectContains(P,i){var R=this.rect();if(R){return P>=R.left&&P<=R.left+R.width&&i>=R.top&&i<=R.top+R.height}return false};jQuery.fn.hasTabIndex=function hasTabIndex(){var t=this.prop("tabIndex");return!isNaN(t)&&t>=0};jQuery.fn.firstFocusableDomRef=function firstFocusableDomRef(){var o=this.get(0);var a=function(i){return jQuery(this).css("visibility")=="hidden"};if(!o||jQuery(o).is(':hidden')||jQuery(o).filter(a).length==1){return null}var b=o.firstChild,D=null;while(b){if(b.nodeType==1&&jQuery(b).is(':visible')){if(jQuery(b).hasTabIndex()){return b}if(b.childNodes){D=jQuery(b).firstFocusableDomRef();if(D){return D}}}b=b.nextSibling}return null};jQuery.fn.lastFocusableDomRef=function lastFocusableDomRef(){var o=this.get(0);var a=function(i){return jQuery(this).css("visibility")=="hidden"};if(!o||jQuery(o).is(':hidden')||jQuery(o).filter(a).length==1){return null}var b=o.lastChild,D=null;while(b){if(b.nodeType==1&&jQuery(b).is(':visible')){if(b.childNodes){D=jQuery(b).lastFocusableDomRef();if(D){return D}}if(jQuery(b).hasTabIndex()){return b}}b=b.previousSibling}return null};jQuery.fn.scrollLeftRTL=function scrollLeftRTL(P){var D=this.get(0);if(D){if(P===undefined){if(!!sap.ui.Device.browser.internet_explorer){return D.scrollWidth-D.scrollLeft-D.clientWidth}else if(!!sap.ui.Device.browser.webkit){return D.scrollLeft}else if(!!sap.ui.Device.browser.firefox){return D.scrollWidth+D.scrollLeft-D.clientWidth}else{return D.scrollLeft}}else{D.scrollLeft=jQuery.sap.denormalizeScrollLeftRTL(P);return this}}};jQuery.fn.scrollRightRTL=function scrollRightRTL(){var D=this.get(0);if(D){if(!!sap.ui.Device.browser.internet_explorer){return D.scrollLeft}else if(!!sap.ui.Device.browser.webkit){return D.scrollWidth-D.scrollLeft-D.clientWidth}else if(!!sap.ui.Device.browser.firefox){return(-D.scrollLeft)}else{return D.scrollLeft}}};jQuery.sap.denormalizeScrollLeftRTL=function byId(n,D){if(D){if(!!sap.ui.Device.browser.internet_explorer){return D.scrollWidth-D.clientWidth-n}else if(!!sap.ui.Device.browser.webkit){return n}else if(!!sap.ui.Device.browser.firefox){return D.clientWidth+n-D.scrollWidth}else{return n}}};
/*!
	 * The following functions are taken from jQuery UI 1.8.17 but modified
	 *
	 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 * http://jquery.org/license
	 *
	 * http://docs.jquery.com/UI
	 */
function v(e){var o=jQuery(e).offsetParent();var O=false;var $=jQuery(e).parents().filter(function(){if(this===o){O=true}return O});return!jQuery(e).add($).filter(function(){return jQuery.css(this,"visibility")==="hidden"||jQuery.expr.filters.hidden(this)}).length}function f(e,i){var n=e.nodeName.toLowerCase();if("area"===n){var m=e.parentNode,a=m.name,b;if(!e.href||!a||m.nodeName.toLowerCase()!=="map"){return false}b=jQuery("img[usemap=#"+a+"]")[0];return!!b&&v(b)}return(/input|select|textarea|button|object/.test(n)?!e.disabled:"a"==n?e.href||i:i)&&v(e)}if(!jQuery.expr[":"].focusable){
/*!
		 * The following function is taken from jQuery UI 1.8.17
		 *
		 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		 * http://jquery.org/license
		 *
		 * http://docs.jquery.com/UI
		 *
		 * But since visible is modified, focusable is different too the jQuery UI version too.
		 */
jQuery.extend(jQuery.expr[":"],{focusable:function(e){return f(e,!isNaN(jQuery.attr(e,"tabindex")))}})}if(!jQuery.expr[":"].tabbable){
/*!
		 * The following function is taken from jQuery UI 1.8.23
		 *
		 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		 * http://jquery.org/license
		 *
		 * http://docs.jquery.com/UI
		 */
jQuery.extend(jQuery.expr[":"],{tabbable:function(e){var t=jQuery.attr(e,"tabindex"),i=isNaN(t);return(i||t>=0)&&f(e,!i)}})}if(!jQuery.expr[":"].sapFocusable){jQuery.extend(jQuery.expr[":"],{sapFocusable:function(e){return f(e,!isNaN(jQuery.attr(e,"tabindex")))}})}if(!jQuery.fn.zIndex){jQuery.fn.zIndex=function(z){if(z!==undefined){return this.css("zIndex",z)}if(this.length){var e=jQuery(this[0]),a,b;while(e.length&&e[0]!==document){a=e.css("position");if(a==="absolute"||a==="relative"||a==="fixed"){b=parseInt(e.css("zIndex"),10);if(!isNaN(b)&&b!==0){return b}}e=e.parent()}}return 0}}jQuery.fn.parentByAttribute=function parentByAttribute(a,V){if(this.length>0){if(V){return this.first().parents("["+a+"='"+V+"']").get(0)}else{return this.first().parents("["+a+"]").get(0)}}};jQuery.sap.ownerWindow=function ownerWindow(D){if(D.ownerDocument.parentWindow){return D.ownerDocument.parentWindow}return D.ownerDocument.defaultView};var _={};jQuery.sap.scrollbarSize=function(s,F){if(typeof s==="boolean"){F=s;s=null}var k=s||"#DEFAULT";if(F){if(s){delete _[s]}else{_={}}}if(_[k]){return _[k]}if(!document.body){return{width:0,height:0}}var a=jQuery("<DIV/>").css("visibility","hidden").css("height","0").css("width","0").css("overflow","hidden");if(s){a.addClass(s)}a.prependTo(document.body);var D=jQuery("<div style=\"visibility:visible;position:absolute;height:100px;width:100px;overflow:scroll;opacity:0;\"></div>");a.append(D);var o=D.get(0);var w=o.offsetWidth-o.scrollWidth;var h=o.offsetHeight-o.scrollHeight;a.remove();_[k]={width:w,height:h};return _[k]}}());
