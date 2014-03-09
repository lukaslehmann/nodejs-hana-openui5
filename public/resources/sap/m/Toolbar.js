/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Toolbar");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Toolbar",{metadata:{library:"sap.m",properties:{"visible":{type:"boolean",group:"Appearance",defaultValue:true},"width":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"active":{type:"boolean",group:"Behavior",defaultValue:false},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"height":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:''},"design":{type:"sap.m.ToolbarDesign",group:"Appearance",defaultValue:sap.m.ToolbarDesign.Auto}},defaultAggregation:"content",aggregations:{"content":{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},events:{"press":{}}}});sap.m.Toolbar.M_EVENTS={'press':'press'};jQuery.sap.require("sap.m.ToolbarSpacer");jQuery.sap.require("sap.ui.core.ResizeHandler");jQuery.sap.require("sap.ui.core.EnabledPropagator");sap.ui.core.EnabledPropagator.call(sap.m.Toolbar.prototype);
sap.m.Toolbar.isRelativeWidth=function(w){return/^([-+]?\d+%|auto|inherit|)$/i.test(w)};
sap.m.Toolbar.getSubPixelWidth=function(d){if(!d||!d.style){return 0}var w=window.getComputedStyle(d).getPropertyValue("width");return Math.ceil(parseFloat(w)%1)||0};
sap.m.Toolbar.checkOverflow=function(e){if(!e||!e.length){return false}e.children().each(function(){var o=sap.m.Toolbar.getOrigWidth(this);this.style.width=o});return e[0].scrollWidth>e[0].clientWidth};
sap.m.Toolbar.getOrigWidth=function(d){if(!d||!d.id){return""}var c=sap.ui.getCore().byId(d.id);if(!c||!c.getWidth){return"auto"}return c.getWidth()};
sap.m.Toolbar.checkShrinkable=function(e,s){if(!e||!e.length){return}var d=e[0];var w=this.getOrigWidth(d);if(!this.isRelativeWidth(w)||e.is(":hidden")){return}if(w.indexOf("%")>0||(d.firstChild||{}).nodeType==3){e.addClass(s);return true}};
sap.m.Toolbar.flexie=function(e,f,s){if(!e||!e.length||e.css("visibility")=="hidden"||e.is(":hidden")){return}var i=0,t=0,F=[],p=[],n=e.width(),c=e.children(),o=this.checkOverflow(e),a=function($,h){var j=0;var k=$.width();t+=h;i+=$.outerWidth(true)-k;if($.css("box-sizing")=="border-box"){j=$.outerWidth()-k}p.push({boxSizing:j,percent:h,el:$[0]})},b=function(){if(p.length){var g=n-i;p.forEach(function(I){var h=(n*I.percent)/100;g-=Math.floor(h)});return(g>=0)}},d=function(T){var S=0;p.forEach(function(I){var h=Math.min(100,(I.percent*100)/t);var j=I.boxSizing+Math.floor((T*h)/100);var w=j+"px";I.el.style.width=w;S+=j});T-=S;if(T>1){F.forEach(function(h){h.style.width=Math.floor(T/F.length)+"px"})}};c.each(function(){var C=jQuery(this);var w=this.style.width;var A=!w||w=="auto"||w=="inherit";if(A&&f&&C.hasClass(f)){F.push(this);this.style.width="0px"}else if(C.is(":hidden")){return}else if(w.indexOf("%")>0){var h=parseFloat(w);a(C,h)}else if(o&&A&&(this.firstChild||{}).nodeType==3){a(C,(C.width()*100/n))}else{var S=sap.m.Toolbar.getSubPixelWidth(C[0]);i+=C.outerWidth(true)+S;if(S){C.width(S+(C.css("box-sizing")=="border-box"?C.outerWidth():C.width()))}}});var g=n-i;if(g>0){d(b()?n:g)}};
sap.m.Toolbar.hasFlexBoxSupport=jQuery.support.flexBoxLayout;sap.m.Toolbar.hasNewFlexBoxSupport=(function(){var s=document.documentElement.style;return(s.flex!==undefined||s.msFlex!==undefined)}());
sap.m.Toolbar.prototype.onBeforeRendering=function(){this._deregisterResize()};
sap.m.Toolbar.prototype.onAfterRendering=function(){if(sap.m.Toolbar.hasNewFlexBoxSupport){this._markShrinkableContents()}else if(sap.m.Toolbar.hasFlexBoxSupport){this._resetOverflow()}else{this._reflexie()}this._registerResize()};
sap.m.Toolbar.prototype.exit=function(){this._deregisterResize()};
sap.m.Toolbar.prototype.addContent=function(c){this.addAggregation("content",c);this._attachContentPropertyChange(c);return this};
sap.m.Toolbar.prototype.insertContent=function(c,i){this.insertAggregation("content",c,i);this._attachContentPropertyChange(c);return this};
sap.m.Toolbar.prototype.removeContent=function(c){c=this.removeAggregation("content",c);this._detachContentPropertyChange(c);return c};
sap.m.Toolbar.prototype.removeAllContent=function(){var c=this.removeAllAggregation("content")||[];c.forEach(function(C){this._detachContentPropertyChange(C)},this);return c};
sap.m.Toolbar.prototype.ontap=function(e){this.getActive()&&this.firePress({srcControl:e.srcControl||this})};
sap.m.Toolbar.prototype.onsapenter=sap.m.Toolbar.prototype.ontap;sap.m.Toolbar.prototype.onsapspace=sap.m.Toolbar.prototype.ontap;
sap.m.Toolbar.prototype.ontouchstart=function(e){e.originalEvent._sapui_handledByControl=this.getActive()};
sap.m.Toolbar.prototype._resetOverflow=function(){var $=this.$();$.removeClass("sapMTBOverflow");var o=$[0].scrollWidth>$[0].clientWidth;o&&$.addClass("sapMTBOverflow")};
sap.m.Toolbar.prototype._onContentPropertyChanged=function(e){if(!sap.m.Toolbar.hasFlexBoxSupport||e.getParameter("name")!="width"){return}var c=e.getSource();var p=c.getWidth().indexOf("%")>0;c.$().toggleClass("sapMTBShrinkItem",p)};
sap.m.Toolbar.prototype._markShrinkableContents=function(){this.getContent().forEach(function(c){sap.m.Toolbar.checkShrinkable(c.$(),"sapMTBShrinkItem")})};
sap.m.Toolbar.prototype._attachContentPropertyChange=function(c){c.attachEvent("_change",this._onContentPropertyChanged,this)};
sap.m.Toolbar.prototype._detachContentPropertyChange=function(c){c.detachEvent("_change",this._onContentPropertyChanged,this)};
sap.m.Toolbar.prototype._registerContentResize=function(){sap.ui.getCore().attachIntervalTimer(this._handleContentResize,this)};
sap.m.Toolbar.prototype._deregisterContentResize=function(){sap.ui.getCore().detachIntervalTimer(this._handleContentResize,this)};
sap.m.Toolbar.prototype._registerToolbarResize=function(){if(sap.m.Toolbar.isRelativeWidth(this.getWidth())){var r=jQuery.proxy(this._handleToolbarResize,this);this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this,r)}};
sap.m.Toolbar.prototype._deregisterToolbarResize=function(){sap.ui.getCore().detachIntervalTimer(this._handleContentResize,this);if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null}};
sap.m.Toolbar.prototype._registerResize=function(){if(!sap.m.Toolbar.hasNewFlexBoxSupport){this._registerToolbarResize();this._registerContentResize()}};
sap.m.Toolbar.prototype._deregisterResize=function(){if(!sap.m.Toolbar.hasNewFlexBoxSupport){this._deregisterToolbarResize();this._deregisterContentResize()}};
sap.m.Toolbar.prototype._getEndPoint=function(){var e=0;var d=this.getDomRef();if(d&&d.lastElementChild){e=d.lastElementChild.offsetLeft;if(!sap.ui.getCore().getConfiguration().getRTL()){e+=d.lastElementChild.offsetWidth}}return e};
sap.m.Toolbar.prototype._reflexie=function(){this._deregisterContentResize();sap.m.Toolbar.flexie(this.$(),sap.m.ToolbarSpacer.flexClass);this._endPoint=this._getEndPoint();this._registerContentResize()};
sap.m.Toolbar.prototype._handleToolbarResize=function(){if(!sap.m.Toolbar.hasFlexBoxSupport){this._reflexie()}else if(!sap.m.Toolbar.hasNewFlexBoxSupport){this._resetOverflow()}};
sap.m.Toolbar.prototype._handleContentResize=function(){if(this._endPoint!=this._getEndPoint()){this._reflexie()}};
sap.m.Toolbar.prototype.setDesign=function(d,c){d=this.validateProperty("design",d);if(this.getDesign()!=d){if(sap.m.ToolbarDesign.Auto!=d){this._setContextClass("sapMTB-"+d+"-CTX",!c)}else{var $=this.$();$.removeClass(this._contextClass)}if(!c){this.setProperty("design",d,true)}}return this};
sap.m.Toolbar.prototype._setContextClass=function(c,f){if(f||sap.m.ToolbarDesign.Auto===this.getDesign()){var $=this.$();$.removeClass(this._contextClass);this._contextClass=c;$.addClass(this._contextClass)}};
sap.m.Toolbar.prototype._getContextClass=function(){return this._contextClass};
