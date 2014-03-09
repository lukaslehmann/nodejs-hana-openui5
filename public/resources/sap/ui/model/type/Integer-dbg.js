/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the base implementation for all model implementations
jQuery.sap.declare("sap.ui.model.type.Integer");
jQuery.sap.require("sap.ui.model.SimpleType");
jQuery.sap.require("sap.ui.core.format.NumberFormat");

/**
 * Constructor for a Integer type.
 *
 * @class
 * This class represents integer simple types.
 *
 * @extends sap.ui.model.SimpleType
 *
 * @author SAP AG
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor
 * @public
 * @param {object} [oFormatOptions] formatting options. Supports the same options as {@link sap.ui.core.format.NumberFormat.getIntegerInstance NumberFormat.getIntegerInstance}
 * @param {object} [oConstraints] value constraints. 
 * @param {int} [oConstraints.minimum] smallest value allowed for this type  
 * @param {int} [oConstraints.maximum] largest value allowed for this type  
 * @name sap.ui.model.type.Integer
 */
sap.ui.model.SimpleType.extend("sap.ui.model.type.Integer", /** @lends sap.ui.model.type.Integer */ {
	
	constructor : function () {
		sap.ui.model.SimpleType.apply(this, arguments);
		this.sName = "Integer";
	}

});

/**
 * Creates a new subclass of class sap.ui.model.type.Integer with name <code>sClassName</code> 
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * For a detailed description of <code>oClassInfo</code> or <code>FNMetaImpl</code> 
 * see {@link sap.ui.base.Object.extend Object.extend}.
 *   
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class  
 * @param {function} [FNMetaImpl] alternative constructor for a metadata object
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.ui.model.type.Integer.extend
 * @function
 */

/**
 * @see sap.ui.model.SimpleType.prototype.formatValue
 */
sap.ui.model.type.Integer.prototype.formatValue = function(iValue, sInternalType) {
	if (iValue == undefined || iValue == null) {
		return null;
	}
	switch(sInternalType) {
		case "string":
			return this.oFormat.format(iValue);
		case "int":
		case "float":
			return iValue;
		default:
			throw new sap.ui.model.FormatException("Don't know how to format Integer to " + sInternalType);
	}
};

/**
 * @see sap.ui.model.SimpleType.prototype.parseValue
 */
sap.ui.model.type.Integer.prototype.parseValue = function(oValue, sInternalType) {
	var iResult;
	switch(sInternalType) {
		case "float":
		case "string":
			iResult = this.oFormat.parse(String(oValue));
			if (isNaN(iResult)) {
				throw new sap.ui.model.ParseException(oValue + " is not a valid Integer value");
			}
			return iResult;
		case "int":
			return oValue;
		default:
			throw new sap.ui.model.ParseException("Don't know how to parse Integer from " + sInternalType);
	}
};

/**
 * @see sap.ui.model.SimpleType.prototype.validateValue
 */
sap.ui.model.type.Integer.prototype.validateValue = function(iValue) {
	if (this.oConstraints) {
		var aViolatedConstraints = [];
		jQuery.each(this.oConstraints, function(sName, oContent) {
			switch (sName) {
				case "minimum":
					if (iValue < oContent) {
						aViolatedConstraints.push("minimum");
					}
					break;
				case "maximum":
					if (iValue > oContent) {
						aViolatedConstraints.push("maximum");
					}
			}
		});
		if (aViolatedConstraints.length > 0) {
			throw new sap.ui.model.ValidateException("Validation of type constraints failed", aViolatedConstraints);
		}
	}
};

/**
 * @see sap.ui.model.SimpleType.prototype.setFormatOptions
 */
sap.ui.model.type.Integer.prototype.setFormatOptions = function(oFormatOptions) {
	this.oFormatOptions = oFormatOptions;
	this._handleLocalizationChange();
};

/**
 * Called by the framework when any localization setting changed
 * @private
 */
sap.ui.model.type.Integer.prototype._handleLocalizationChange = function() {
	this.oFormat = sap.ui.core.format.NumberFormat.getIntegerInstance(this.oFormatOptions);
};
