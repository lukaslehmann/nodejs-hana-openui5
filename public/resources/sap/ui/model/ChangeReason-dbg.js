/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides enumeration for changes in model
jQuery.sap.declare("sap.ui.model.ChangeReason");

/**
* @class
* Change Reason for ListBindings.
*
* @static
* @public
*/
sap.ui.model.ChangeReason = {

		/**
		 * The list was sorted
		 * @public
		 */
		Sort: "sort",

		/**
		 * The List was filtered
		 * @public
		 */
		Filter: "filter",

		/**
		 * The list has changed
		 * @public
		 */
		Change: "change",

		/**
		 * The list context has changed
		 * @public
		 */
		Context: "context",
		/**
		 * The list was refreshed
		 * @public
		 */
		Refresh: "refresh"
};