/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides class sap.ui.base.Interface
jQuery.sap.declare("sap.ui.base.Interface");

/**
 * Constructs an instance of sap.ui.base.Interface which restricts access to methods marked as public.
 *
 * @class A class that creates an Interface for an existing class. If a class returns the interface in its constructor,
 *        only the defined functions will be visible, no internals of the class can be accessed.
 *
 * @author Malte Wedel, Daniel Brinkmann
 * @version 1.16.8-SNAPSHOT
 * @param {sap.ui.base.Object}
 *            oObject the instance that needs an interface created
 * @param {string[]}
 *            aMethods the names of the methods, that should be available on this interface
 * @constructor
 * @public
 */
sap.ui.base.Interface = function(oObject, aMethods) {

	// if object is null or undefined, return itself
	if (!oObject) {
		return oObject;
	}

	// this function is inline to not appear as a method on the interface

	function fCreateDelegator(oObject, sMethodName) {
		return function() {
//				return oObject[sMethodName].apply(oObject, arguments);
				var tmp = oObject[sMethodName].apply(oObject, arguments);
				// to avoid to hide the implementation behind the interface you need
				// to override the getInterface function in the object
				return (tmp instanceof sap.ui.base.Object) ? tmp.getInterface() : tmp;
			};
	}

	// if there are no methods return
	if (!aMethods) {
		return {};
	}

	var sMethodName;

	// create functions for all delegated methods
	// PERFOPT: 'cache' length of aMethods to reduce # of resolutions
	for (var i = 0, ml = aMethods.length; i < ml; i++) {
		sMethodName = aMethods[i];
		this[sMethodName] = fCreateDelegator(oObject, sMethodName);
	}

};