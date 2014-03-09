/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Text");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Text",{metadata:{library:"sap.m",properties:{"text":{type:"string",group:"",defaultValue:'',bindable:"bindable"},"textDirection":{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"wrapping":{type:"boolean",group:"Appearance",defaultValue:true},"textAlign":{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:sap.ui.core.TextAlign.Begin},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"maxLines":{type:"int",group:"Appearance",defaultValue:null}}}});jQuery.sap.require("sap.ui.core.ResizeHandler");sap.m.Text.normalLineHeight=1.2;
sap.m.Text.prototype.setText=function(t){this.setProperty("text",t,true);var d=this.getDomRef();if(d){d.textContent=this.getText(true)}return this};
sap.m.Text.prototype.getText=function(n){var t=this.getProperty("text");if(n){return t.replace(/\r\n/g,"\n")}return t};
sap.m.Text.prototype.onBeforeRendering=function(){this._cleanupResize()};
sap.m.Text.prototype.onAfterRendering=function(){if(!this.getWrapping()||this.getMaxLines()<2){return}if(sap.m.Text.hasNativeLineClamp){jQuery.sap.delayedCall(0,this,function(){this.$().css("display","-webkit-inline-box")})}else{this._clampText();this._registerResize()}};
sap.m.Text.prototype.exit=function(){this._cleanupResize()};
sap.m.Text.hasNativeLineClamp=(function(){return(typeof document.documentElement.style.webkitLineClamp!="undefined")})();sap.m.Text.prototype.ellipsis='…';
sap.m.Text.prototype._cleanupResize=function(){this._deregisterResize();this._bClamping=false};
sap.m.Text.prototype._registerResize=function(){this._fnResizeProxy=this._fnResizeProxy||jQuery.proxy(this._clampText,this);this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this,this._fnResizeProxy)};
sap.m.Text.prototype._deregisterResize=function(){if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);delete this._sResizeListenerId}};
sap.m.Text.prototype._clampText=function(e){if(this._bClamping){return}this._bClamping=true;this._deregisterResize();var i=(!e||!sap.ui.Device.browser.internet_explorer)?0:50;jQuery.sap.delayedCall(i,this,this._clampElement)};
sap.m.Text.prototype._clampElement=function(){var t=this.getDomRef();if(!t){this._bClamping=false;return}var n,a=0,T=this.getText(true),b=T.length,c=this.ellipsis.length,d=this._clampHeight();t.textContent=T;if(t.scrollHeight>d){while((b-a)>c){n=(a+b)>>1;t.textContent=T.slice(0,n-c)+this.ellipsis;if(t.scrollHeight>d){b=n}else{a=n}}if(t.scrollHeight>d&&a>0){t.textContent=T.slice(0,a-c)+this.ellipsis}}this._registerResize();this._bClamping=false};
sap.m.Text.prototype._clampHeight=function(){var $=this.$(),l=parseFloat($.css("line-height")),l=l||parseFloat($.css("font-size"))*sap.m.Text.normalLineHeight,c=Math.floor(this.getMaxLines()*l);$.css("max-height",c);return c};
