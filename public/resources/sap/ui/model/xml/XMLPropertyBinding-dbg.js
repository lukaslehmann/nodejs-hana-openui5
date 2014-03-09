/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the XML model implementation of a property binding
jQuery.sap.declare("sap.ui.model.xml.XMLPropertyBinding");
jQuery.sap.require("sap.ui.model.ClientPropertyBinding");

/**
 *
 * @class
 * Property binding implementation for XML format
 *
 * @param sPath
 * @param [oModel]
 * @name sap.ui.model.xml.XMLPropertyBinding
 * @extends sap.ui.model.PropertyBinding
 */
sap.ui.model.ClientPropertyBinding.extend("sap.ui.model.xml.XMLPropertyBinding");

/**
 * @see sap.ui.model.PropertyBinding.prototype.setValue
 */
sap.ui.model.xml.XMLPropertyBinding.prototype.setValue = function(oValue){
	if (this.oValue != oValue){
		// the binding value will be updated by the model. The model calls checkupdate on all bindings after updating its value.
		this.oModel.setProperty(this.sPath, oValue, this.oContext);
	}
};

/**
 * Check whether this Binding would provide new values and in case it changed,
 * inform interested parties about this.
 * 
 * @param {boolean} bForceupdate
 * 
 */
sap.ui.model.xml.XMLPropertyBinding.prototype.checkUpdate = function(bForceupdate){
	var oValue = this._getValue();
	if(oValue !== this.oValue || bForceupdate) {// optimize for not firing the events when unneeded
		this.oValue = oValue;
		this._fireChange({reason: sap.ui.model.ChangeReason.Change});
	}
};