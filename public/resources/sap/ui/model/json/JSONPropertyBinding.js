/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.json.JSONPropertyBinding");jQuery.sap.require("sap.ui.model.ClientPropertyBinding");sap.ui.model.ClientPropertyBinding.extend("sap.ui.model.json.JSONPropertyBinding");
sap.ui.model.json.JSONPropertyBinding.prototype.setValue=function(v){if(!jQuery.sap.equal(this.oValue,v)){this.oModel.setProperty(this.sPath,v,this.oContext)}};
sap.ui.model.json.JSONPropertyBinding.prototype.checkUpdate=function(f){var v=this._getValue();if(!jQuery.sap.equal(v,this.oValue)||f){this.oValue=v;this._fireChange({reason:sap.ui.model.ChangeReason.Change})}};
