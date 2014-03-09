/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/**
 * JSON-based DataBinding
 *
 * @namespace
 * @name sap.ui.model.json
 * @public
 */

// Provides the JSON object based model implementation
jQuery.sap.declare("sap.ui.model.ClientModel");
jQuery.sap.require("sap.ui.model.Model");
jQuery.sap.require("sap.ui.model.ClientPropertyBinding");
jQuery.sap.require("sap.ui.model.ClientListBinding");
jQuery.sap.require("sap.ui.model.ClientTreeBinding");

/**
 * Constructor for a new ClientModel.
 *
 * @class
 * @abstract
 * Model implementation for Client models
 *
 * @extends sap.ui.model.Model
 *
 * @author SAP AG
 * @version 1.16.8-SNAPSHOT
 *
 * @param {object} oData URL where to load the data from
 * @constructor
 * @public
 * @name sap.ui.model.ClientModel
 */
sap.ui.model.Model.extend("sap.ui.model.ClientModel", /** @lends sap.ui.model.ClientModel */ {
	
	constructor : function(oData) {
		sap.ui.model.Model.apply(this, arguments);
		
		this.bCache = true;
		
		if (typeof oData == "string"){
			this.loadData(oData);
		}
	},

	metadata : {
		publicMethods : ["loadData", "setData", "getData", "setProperty", "forceNoCache"]
	}

});

/**
 * Creates a new subclass of class sap.ui.model.ClientModel with name <code>sClassName</code> 
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
 * @name sap.ui.model.ClientModel.extend
 * @function
 */

/**
 * Returns the current JSON data of the model.
 * Be aware that the returned object is a reference to the model data so all changes to that data will also change the model data.
 *
 * @return the JSON data object
 * @public
 */
sap.ui.model.ClientModel.prototype.getData = function(){
	return this.oData;
};

/**
 * Private method iterating the registered bindings of this model instance and initiating their check for update
 *
 * @param {boolean} bForceupdate
 *
 * @private
 */
sap.ui.model.ClientModel.prototype.checkUpdate = function(bForceupdate) {
	var aBindings = this.aBindings.slice(0);
	jQuery.each(aBindings, function(iIndex, oBinding) {
		oBinding.checkUpdate(bForceupdate);
	});
};

/**
 * @see sap.ui.model.Model.prototype.bindElement
 *
 */
/**
 * @see sap.ui.model.Model.prototype.createBindingContext
 *
 */
sap.ui.model.ClientModel.prototype.createBindingContext = function(sPath, oContext, mParameters, fnCallBack) {
	// optional parameter handling
	if (typeof oContext == "function") {
		fnCallBack = oContext;
		oContext = null;
	}
	if (typeof mParameters == "function") {
		fnCallBack = mParameters;
		mParameters = null;
	}
	// resolve path and create context
	var sContextPath = this.resolve(sPath, oContext),
		oNewContext = (sContextPath == undefined) ? undefined : this.getContext(sContextPath ? sContextPath : "/");
	fnCallBack(oNewContext);
};

/**
 * @see sap.ui.model.Model.prototype.destroyBindingContext
 *
 */
sap.ui.model.ClientModel.prototype.destroyBindingContext = function(oContext) {
	// TODO: what todo here?
};

/**
 * update all bindings
 * @param {boolean} bForceUpdate true/false: Default = false. If set to false an update 
 * 					will only be done when the value of a binding changed.   
 * @public
 */
sap.ui.model.ClientModel.prototype.updateBindings = function(bForceUpdate) {
	this.checkUpdate(bForceUpdate);
};

/**
 * Force no caching
 * @param {boolean} force no cache true/false: Default = true  
 * @public
 */
sap.ui.model.ClientModel.prototype.forceNoCache = function(bForceNoCache) {
	this.bCache = !bForceNoCache; 
};
