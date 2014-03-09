/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides a filter for list bindings
jQuery.sap.declare("sap.ui.model.ValidateException");
jQuery.sap.require("sap.ui.base.Exception");

/**
 * ValidateException class
 *
 * This exception is thrown, when a validation error occurs while checking the
 * defined constraints for a type.
 */
sap.ui.model.ValidateException = function(message, violatedConstraints) {
	this.name = "ValidateException";
	this.message = message;
	this.violatedConstraints = violatedConstraints;
};
sap.ui.model.ValidateException.prototype = jQuery.sap.newObject(sap.ui.base.Exception.prototype);
