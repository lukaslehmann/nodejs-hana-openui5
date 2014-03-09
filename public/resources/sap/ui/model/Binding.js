/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.Binding");jQuery.sap.require("sap.ui.model.ChangeReason");jQuery.sap.require("sap.ui.base.EventProvider");sap.ui.base.EventProvider.extend("sap.ui.model.Binding",{constructor:function(m,p,c,P){sap.ui.base.EventProvider.apply(this);this.bRelative=!jQuery.sap.startsWith(p,'/');this.sPath=p;this.oContext=c;this.oModel=m;this.mParameters=P;this.bInitial=false},metadata:{"abstract":true,publicMethods:["getPath","getContext","getModel","attachChange","detachChange","refresh","isInitial","attachDataRequested","detachDataRequested","attachDataReceived","detachDataReceived"]}});
sap.ui.model.Binding.prototype.getPath=function(){return this.sPath};
sap.ui.model.Binding.prototype.getContext=function(){return this.oContext};
sap.ui.model.Binding.prototype.setContext=function(c){if(this.oContext!=c){this.oContext=c;this._fireChange()}};
sap.ui.model.Binding.prototype.getModel=function(){return this.oModel};
sap.ui.model.Binding.prototype.attachChange=function(f,l){if(!this.hasListeners("_change")){this.oModel.addBinding(this)}this.attachEvent("_change",f,l)};
sap.ui.model.Binding.prototype.detachChange=function(f,l){this.detachEvent("_change",f,l);if(!this.hasListeners("_change")){this.oModel.removeBinding(this)}};
sap.ui.model.Binding.prototype._fireChange=function(a){this.fireEvent("_change",a)};
sap.ui.model.Binding.prototype.attachDataRequested=function(f,l){this.attachEvent("dataRequested",f,l)};
sap.ui.model.Binding.prototype.detachDataRequested=function(f,l){this.detachEvent("dataRequested",f,l)};
sap.ui.model.Binding.prototype.fireDataRequested=function(a){this.fireEvent("dataRequested",a)};
sap.ui.model.Binding.prototype.attachDataReceived=function(f,l){this.attachEvent("dataReceived",f,l)};
sap.ui.model.Binding.prototype.detachDataReceived=function(f,l){this.detachEvent("dataReceived",f,l)};
sap.ui.model.Binding.prototype.fireDataReceived=function(a){this.fireEvent("dataReceived",a)};
sap.ui.model.Binding.prototype.updateRequired=function(m){return m&&this.getModel()===m};
sap.ui.model.Binding.prototype.checkUpdate=function(f){this._fireChange({reason:sap.ui.model.ChangeReason.Change})};
sap.ui.model.Binding.prototype.refresh=function(f){this.checkUpdate(f)};
sap.ui.model.Binding.prototype._refresh=function(){this.refresh()};
sap.ui.model.Binding.prototype.isInitial=function(){return this.bInitial};
sap.ui.model.Binding.prototype.isRelative=function(){return this.bRelative};
