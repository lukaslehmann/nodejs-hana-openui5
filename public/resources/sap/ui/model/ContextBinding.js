/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.ContextBinding");jQuery.sap.require("sap.ui.model.Binding");sap.ui.model.Binding.extend("sap.ui.model.ContextBinding",{constructor:function(m,p,c,P){sap.ui.model.Binding.call(this,m,p,c,P);var t=this;this.bInitial=true;this.fireDataRequested();m.createBindingContext(p,c,P,function(c){t.bInitial=false;t.oElementContext=c;t._fireChange();t.fireDataReceived()})},metadata:{publicMethods:["getElementContext"]}});
sap.ui.model.ContextBinding.prototype.checkUpdate=function(f){};
sap.ui.model.ContextBinding.prototype.refresh=function(f){var t=this;this.fireDataRequested();this.oModel.createBindingContext(this.sPath,this.oContext,this.mParameters,function(c){if(t.oElementContext===c){t.oModel.checkUpdate(true,c)}else{t.oElementContext=c;t._fireChange()}t.fireDataReceived()},true)};
sap.ui.model.ContextBinding.prototype.setContext=function(c){var t=this;if(this.oContext!=c){this.oContext=c;this.fireDataRequested();this.oModel.createBindingContext(this.sPath,this.oContext,this.mParameters,function(c){t.oElementContext=c;t._fireChange();t.fireDataReceived()})}};
sap.ui.model.ContextBinding.prototype.getBoundContext=function(c){return this.oElementContext};
