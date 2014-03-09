/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides a filter for list bindings
jQuery.sap.declare("sap.ui.model.ParseException");
jQuery.sap.require("sap.ui.base.Exception");

/**
 * ParseException class
 *
 * This exception is thrown, when a parse error occurs while converting a
 * string value to a specific property type in the model.
 */
sap.ui.model.ParseException = function(message) {
	this.name = "ParseException";
	this.message = message;
};
sap.ui.model.ParseException.prototype = jQuery.sap.newObject(sap.ui.base.Exception.prototype);