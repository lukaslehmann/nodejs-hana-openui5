/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides enumeration sap.ui.model.FilterOperator
jQuery.sap.declare("sap.ui.model.FilterType");

/**
* @class
* Operators for the Filter.
*
* @static
* @public
*/
sap.ui.model.FilterType = {
		/**
		 * Filters which are changed by the application
		 * @public
		 */
		Application: "Application",

		/**
		 * Filters which are set by the different controls
		 * @public
		 */
		Control: "Control"
};