/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.control.ControlPropertyBinding");jQuery.sap.require("sap.ui.model.PropertyBinding");sap.ui.model.PropertyBinding.extend("sap.ui.model.control.ControlPropertyBinding",{constructor:function(m,p,c){sap.ui.model.PropertyBinding.apply(this,arguments);this.oValue=this._getValue()}});
sap.ui.model.control.ControlPropertyBinding.prototype.getValue=function(){return this.oValue};
sap.ui.model.control.ControlPropertyBinding.prototype.setValue=function(v){this.oValue=v;this.oContext.setProperty(this.sPath,v)};
sap.ui.model.control.ControlPropertyBinding.prototype._getValue=function(){return this.oContext.getProperty(this.sPath)};
sap.ui.model.control.ControlPropertyBinding.prototype.setContext=function(c){this.oContext=c;this.checkUpdate()};
sap.ui.model.control.ControlPropertyBinding.prototype.checkUpdate=function(){var v=this._getValue();if(v!==this.oValue){this.oValue=v;this._fireChange()}};
