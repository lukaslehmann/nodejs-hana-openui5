/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.UIComponentMetadata");jQuery.sap.require("sap.ui.core.ComponentMetadata");
sap.ui.core.UIComponentMetadata=function(c,C){sap.ui.core.ComponentMetadata.apply(this,arguments)};
sap.ui.core.UIComponentMetadata.prototype=jQuery.sap.newObject(sap.ui.core.ComponentMetadata.prototype);
sap.ui.core.UIComponentMetadata.preprocessClassInfo=function(c){if(c&&typeof c.metadata==="string"){c.metadata={_src:c.metadata}}return c};
sap.ui.core.UIComponentMetadata.prototype.applySettings=function(c){sap.ui.core.ComponentMetadata.prototype.applySettings.call(this,c);var s=c.metadata;this._mRootView=s.rootView;if(typeof this._mRootView==="string"){this._mRootView={viewName:this._mRootView,type:sap.ui.core.mvc.ViewType.XML}}this._mRouting=s.routing;var p=this.getParent();if(p instanceof sap.ui.core.UIComponentMetadata){if(p._mRootView){this._mRootView=jQuery.extend(true,{},p._mRootView,this._mRootView)}this._mRouting=jQuery.extend(true,{},p._mRouting,this._mRouting)}};
sap.ui.core.UIComponentMetadata.prototype.getRootView=function(){return this._mRootView};
sap.ui.core.UIComponentMetadata.prototype.getRoutingConfig=function(){return this._mRouting&&this._mRouting.config};
sap.ui.core.UIComponentMetadata.prototype.getRoutes=function(){return this._mRouting&&this._mRouting.routes};
