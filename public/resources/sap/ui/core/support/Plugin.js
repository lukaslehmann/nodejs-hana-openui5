/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.support.Plugin");jQuery.sap.require("sap.ui.base.Object");jQuery.sap.require("jquery.sap.script");jQuery.sap.require("jquery.sap.dom");sap.ui.base.Object.extend("sap.ui.core.support.Plugin",{constructor:function(i,t,s){sap.ui.base.Object.apply(this);this._id=i?i:jQuery.sap.uid();this._title=t?t:"";this._bActive=false;this._aEventIds=[];this._bIsToolPlugin=s.getType()===sap.ui.core.support.Support.StubType.TOOL}});
sap.ui.core.support.Plugin.prototype.init=function(s){for(var i=0;i<this._aEventIds.length;i++){var h=this["on"+this._aEventIds[i]];if(h&&jQuery.isFunction(h)){s.attachEvent(this._aEventIds[i],h,this)}}this._bActive=true};
sap.ui.core.support.Plugin.prototype.exit=function(s){for(var i=0;i<this._aEventIds.length;i++){var h=this["on"+this._aEventIds[i]];if(h&&jQuery.isFunction(h)){s.detachEvent(this._aEventIds[i],h,this)}}this._bActive=false};
sap.ui.core.support.Plugin.prototype.getId=function(){return this._id};
sap.ui.core.support.Plugin.prototype.getTitle=function(){return this._title};
sap.ui.core.support.Plugin.prototype.isToolPlugin=function(){return this._bIsToolPlugin};
sap.ui.core.support.Plugin.prototype.$=function(){var r=jQuery.sap.byId(this.getId());if(r.length==0){r=jQuery("<DIV/>",{id:this.getId()});r.appendTo(jQuery(".sapUiSupportCntnt"))}return r};
sap.ui.core.support.Plugin.prototype.isActive=function(){return this._bActive};
