/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides enumeration sap.ui.model.FilterOperator
jQuery.sap.declare("sap.ui.model.FilterOperator");

/**
* @class
* Operators for the Filter.
*
* @static
* @public
*/
sap.ui.model.FilterOperator = {
		/**
		 * FilterOperator equals
		 * @public
		 */
		EQ: "EQ",

		/**
		 * FilterOperator not equals
		 * @public
		 */
		NE: "NE",

		/**
		 * FilterOperator less than
		 * @public
		 */
		LT: "LT",

		/**
		 * FilterOperator less or equals
		 * @public
		 */
		LE: "LE",

		/**
		 * FilterOperator greater than
		 * @public
		 */
		GT: "GT",

		/**
		 * FilterOperator greater or equals
		 * @public
		 */
		GE: "GE",

		/**
		 * FilterOperator between
		 * @public
		 */
		BT: "BT",

		/**
		 * FilterOperator contains
		 * @public
		 */
		Contains: "Contains",

		/**
		 * FilterOperator starts with
		 * @public
		 */
		StartsWith: "StartsWith",

		/**
		 * FilterOperator ends with
		 * @public
		 */
		EndsWith: "EndsWith"
};