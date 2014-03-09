/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the base implementation for all model implementations
jQuery.sap.declare("sap.ui.model.type.Date");
jQuery.sap.require("sap.ui.model.SimpleType");
jQuery.sap.require("sap.ui.core.format.DateFormat");

/**
 * Constructor for a Date type.
 *
 * @class
 * This class represents date simple types.
 *
 * @extends sap.ui.model.SimpleType
 *
 * @author SAP AG
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor
 * @public
 * @param {object} [oFormatOptions] options used to create a DateFormat for formatting / parsing. Supports the same options as {@link sap.ui.core.format.DateFormat.getDateInstance DateFormat.getDateInstance}
 * @param {object} [oFormatOptions.source] additional set of options used to create a second DateFormat object for conversions between 
 *           string values in the data source (e.g. model) and Date. This second format object is used to convert from a model string to Date before 
 *           converting the Date to string with the primary format object. Vice versa, this 'source' format is also used to format an already parsed 
 *           external value (e.g. user input) into the string format expected by the data source.
 *           Supports the same set of options as {@link sap.ui.core.format.DateFormat.getDateInstance DateFormat.getDateInstance}.
 * @param {object} [oConstraints] value constraints. 
 * @param {Date|string} [oConstraints.minimum] smallest value allowed for this type. Values for constraints must use the same type as configured via <code>oFormatOptions.source</code>  
 * @param {Date|string} [oConstraints.maximum] largest value allowed for this type. Values for constraints must use the same type as configured via <code>oFormatOptions.source</code>  
 * @name sap.ui.model.type.Date
 */
sap.ui.model.SimpleType.extend("sap.ui.model.type.Date", /** @lends sap.ui.model.type.Date */ {
	
	constructor : function () {
		sap.ui.model.SimpleType.apply(this, arguments);
		this.sName = "Date";
	}

});

/**
 * Creates a new subclass of class sap.ui.model.type.Date with name <code>sClassName</code> 
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
 * @name sap.ui.model.type.Date.extend
 * @function
 */

/**
 * @see sap.ui.model.SimpleType.prototype.formatValue
 */
sap.ui.model.type.Date.prototype.formatValue = function(oValue, sInternalType) {
	switch(sInternalType) {
		case "string":
			if (oValue == null) {
				return "";
			}
			if (this.oInputFormat) {
				if (this.oFormatOptions.source.pattern == "timestamp") {
					if(typeof(oValue) != "number"){
						if (isNaN(oValue)) {
							throw new sap.ui.model.FormatException("Cannot format date: " + oValue + " is not a valid Timestamp");
						}else{
							oValue = parseInt(oValue, 10);
						}
					}
					oValue= new Date(oValue);
				}else{
					if (oValue == "") {
						return "";
					}
					oValue = this.oInputFormat.parse(oValue);
					if (oValue == null) {
						throw new sap.ui.model.FormatException("Cannot format date: " + oValue + " has the wrong format");
					}
				}
			}
			return this.oOutputFormat.format(oValue);
		default:
			throw new sap.ui.model.FormatException("Don't know how to format Date to " + sInternalType);
	}
};

/**
 * @see sap.ui.model.SimpleType.prototype.parseValue
 */
sap.ui.model.type.Date.prototype.parseValue = function(oValue, sInternalType) {
	var oResult;
	switch(sInternalType) {
		case "string":
			if (oValue === "") {
				return null;
			}
			var oResult = this.oOutputFormat.parse(oValue);
			if (!oResult) {
				throw new sap.ui.model.ParseException(oValue + " is not a valid Date value");
			}
			if (this.oInputFormat) {
				if (this.oFormatOptions.source.pattern == "timestamp") {
					oResult = oResult.getTime();
				}else{
					oResult = this.oInputFormat.format(oResult);
				}
			}
			return oResult;
		default:
			throw new sap.ui.model.ParseException("Don't know how to parse Date from " + sInternalType);
	}
};

/**
 * @see sap.ui.model.SimpleType.prototype.validateValue
 */
sap.ui.model.type.Date.prototype.validateValue = function(oValue) {
	if (this.oConstraints) {
		var aViolatedConstraints = [],
			oInputFormat = this.oInputFormat;

		// convert date into date object to compare
		if (oInputFormat && this.oFormatOptions.source.pattern != "timestamp"){
			oValue = oInputFormat.parse(oValue);
		}

		jQuery.each(this.oConstraints, function(sName, oContent) {
			if (oInputFormat){
				oContent = oInputFormat.parse(oContent);
			}
			switch (sName) {
				case "minimum":
					if (oValue < oContent) {
						aViolatedConstraints.push("minimum");
					}
					break;
				case "maximum":
					if (oValue > oContent) {
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
sap.ui.model.type.Date.prototype.setFormatOptions = function(oFormatOptions) {
	this.oFormatOptions = oFormatOptions;
	this._handleLocalizationChange();
};

/**
 * @protected
 */
sap.ui.model.type.Date.prototype.getOutputPattern = function() {

	return this.oOutputFormat.oFormatOptions.pattern;

};

/**
 * Called by the framework when any localization setting changed
 * @private
 */
sap.ui.model.type.Date.prototype._handleLocalizationChange = function() {
	// recreate formatters
	this.oOutputFormat = sap.ui.core.format.DateFormat.getInstance(this.oFormatOptions);
	if (this.oFormatOptions.source) {
		this.oInputFormat = sap.ui.core.format.DateFormat.getInstance(this.oFormatOptions.source);
	}
};

