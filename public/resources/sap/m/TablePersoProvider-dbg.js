/*
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides TablePersoProvider
jQuery.sap.declare("sap.m.TablePersoProvider");
jQuery.sap.require("sap.ui.base.ManagedObject");


/**
 * This is an abstract TablePersoProvider, describing the interface for a real
 * TablePersoProvider.
 *
 * @public
 *
 * @class Table Personalization Provider
 * @extends sap.ui.base.ManagedObject
 * @abstract
 * @author SAP
 * @version 1.16.8-SNAPSHOT
 * @name sap.m.TablePersoProvider
 * @experimental Since 1.15. API is not yet finished and might change completely.
 */
sap.ui.base.ManagedObject.extend("sap.m.TablePersoProvider", /** @lends sap.m.TablePersoProvider */

{
	constructor: function(sId, mSettings) {

		sap.ui.base.ManagedObject.apply(this, arguments);

	},

	metadata: {
		"abstract": true,
		library: "sap.m"
	}

});


/**
 * Initializes the TablePersoProvider instance after creation.
 *
 * @function
 * @name sap.m.TablePersoDialog.prototype.init
 * @protected
 */
sap.m.TablePersoProvider.prototype.init = function() {

	jQuery.sap.log.warning("This is the abstract base class for a TablePersoProvider. Do not create instances of this class, but use a concrete sub class instead.");
	jQuery.sap.log.debug("TablePersoProvider init");

};

/**
 * Retrieves the personalization bundle. 
 * This must return a jQuery promise (see http://api.jquery.com/promise/)
 * @public
 */
sap.m.TablePersoProvider.prototype.getPersData = function() {

	jQuery.sap.log.debug("TablePersoProvider getPersData");

};

/**
 * Stores the personalization bundle, overwriting any
 * previous bundle completely
 * This must return a jQuery promise (see http://api.jquery.com/promise/)
 * @public
 */
sap.m.TablePersoProvider.prototype.setPersData = function(oBundle) {

	jQuery.sap.log.debug("TablePersoProvider setPersData");

};

/**
 * Removes the personalization bundle
 * This must return a jQuery promise (see http://api.jquery.com/promise/)
 * @public
 */
sap.m.TablePersoProvider.prototype.delPersData = function() {

	jQuery.sap.log.debug("TablePersoProvider delPersData");

};

