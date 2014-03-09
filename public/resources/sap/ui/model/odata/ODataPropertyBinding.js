/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.odata.ODataPropertyBinding");jQuery.sap.require("sap.ui.model.PropertyBinding");sap.ui.model.PropertyBinding.extend("sap.ui.model.odata.ODataPropertyBinding",{constructor:function(m,p,c){sap.ui.model.PropertyBinding.apply(this,arguments);this.oValue=this._getValue()}});
sap.ui.model.odata.ODataPropertyBinding.prototype.getValue=function(){return this.oValue};
sap.ui.model.odata.ODataPropertyBinding.prototype._getValue=function(){return this.oModel._getObject(this.sPath,this.oContext)};
sap.ui.model.odata.ODataPropertyBinding.prototype.setValue=function(v){if(this.oValue!=v){if(!this.oModel.setProperty(this.sPath,v,this.oContext)){this._fireChange()}}};
sap.ui.model.odata.ODataPropertyBinding.prototype.setContext=function(c){if(this.oContext!=c){this.oContext=c;if(this.isRelative()){this.checkUpdate()}}};
sap.ui.model.odata.ODataPropertyBinding.prototype.checkUpdate=function(f){var v=this._getValue();if(v!==this.oValue||f){this.oValue=v;this._fireChange({reason:sap.ui.model.ChangeReason.Change})}};
