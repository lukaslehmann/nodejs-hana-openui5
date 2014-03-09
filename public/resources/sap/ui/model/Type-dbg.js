/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the base implementation for all model implementations
jQuery.sap.declare("sap.ui.model.Type");
jQuery.sap.require("sap.ui.base.Object");

/**
 * Constructor for a new Type.
 *
 * @class
 * This is an abstract base class for type objects.
 * @abstract
 *
 * @extends sap.ui.base.Object
 *
 * @author SAP AG
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor
 * @public
 * @name sap.ui.model.Type
 */
sap.ui.base.Object.extend("sap.ui.model.Type", /** @lends sap.ui.model.Type */ {
	
	constructor : function () {
		sap.ui.base.Object.apply(this, arguments);
		this.sName = "Type";
	},

	metadata : {
		"abstract" : true,
		publicMethods : [
	    // methods
	    "getName"
	  ]
	}
	
});

/**
 * Creates a new subclass of class sap.ui.model.Type with name <code>sClassName</code> 
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
 * @name sap.ui.model.Type.extend
 * @function
 */


/**
 * Returns the name of this type.
 *
 * @return {String} the name of this type
 * @public
 */
sap.ui.model.Type.prototype.getName = function() {
	return this.sName;
};