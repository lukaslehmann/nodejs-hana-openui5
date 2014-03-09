/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides an abstraction for model bindings
jQuery.sap.declare("sap.ui.model.Binding");
jQuery.sap.require("sap.ui.model.ChangeReason");
jQuery.sap.require("sap.ui.base.EventProvider");

/**
 * Constructor for Binding class.
 *
 * @class
 * The Binding is the object, which holds the necessary information for a data binding,
 * like the binding path and the binding context, and acts like an interface to the
 * model for the control, so it is the event provider for changes in the data model
 * and provides getters for accessing properties or lists.
 *
 * @param {sap.ui.model.Model} the model
 * @param {String} sPath the path
 * @param {Object} oContext the context object
 * @abstract
 * @public
 * @name sap.ui.model.Binding
 */
sap.ui.base.EventProvider.extend("sap.ui.model.Binding", /** @lends sap.ui.model.Binding */ {
	
	constructor : function(oModel, sPath, oContext, mParameters){
		sap.ui.base.EventProvider.apply(this);
		
		this.bRelative = !jQuery.sap.startsWith(sPath,'/');
		this.sPath = sPath;
		this.oContext = oContext;
		this.oModel = oModel;
		this.mParameters = mParameters;
		this.bInitial = false;
	
	},

	metadata : {
		"abstract" : true,
		publicMethods : [
			// methods
			"getPath", "getContext", "getModel", "attachChange", "detachChange", "refresh", "isInitial","attachDataRequested","detachDataRequested","attachDataReceived","detachDataReceived"
		]
	}

});

/**
 * Creates a new subclass of class sap.ui.model.Binding with name <code>sClassName</code> 
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
 * @name sap.ui.model.Binding.extend
 * @function
 */

// Getter
/**
 * Getter for path
 * @return {String} the binding path
 */
sap.ui.model.Binding.prototype.getPath = function() {
	return this.sPath;
};

/**
 * Getter for context
 * @return {Object} the context object
 */
sap.ui.model.Binding.prototype.getContext = function() {
	return this.oContext;
};

/**
 * Setter for context
 * @param {Object} oContext the new context object
 */
sap.ui.model.Binding.prototype.setContext = function(oContext) {
	if (this.oContext != oContext) {
		this.oContext = oContext;
		this._fireChange();
	}
};

/**
 * Getter for model
 * @return {sap.ui.core.Model} the model
 */
sap.ui.model.Binding.prototype.getModel = function() {
	return this.oModel;
};

// Eventing and related
/**
 * Attach event-handler <code>fnFunction</code> to the '_change' event of this <code>sap.ui.model.Model</code>.<br/>
 * @param {function} fnFunction The function to call, when the event occurs.
 * @param {object} [oListener] object on which to call the given function.
 * @protected
 */
sap.ui.model.Binding.prototype.attachChange = function(fnFunction, oListener) {
	if (!this.hasListeners("_change")) {
		this.oModel.addBinding(this);
	}
	this.attachEvent("_change", fnFunction, oListener);
};

/**
 * Detach event-handler <code>fnFunction</code> from the '_change' event of this <code>sap.ui.model.Model</code>.<br/>
 * @param {function} fnFunction The function to call, when the event occurs.
 * @param {object} [oListener] object on which to call the given function.
 * @protected
 */
sap.ui.model.Binding.prototype.detachChange = function(fnFunction, oListener) {
	this.detachEvent("_change", fnFunction, oListener);
	if (!this.hasListeners("_change")) {
		this.oModel.removeBinding(this);
	}
};

/**
 * Fire event _change to attached listeners.

 * @param {Map}
 *         mArguments the arguments to pass along with the event.
 * @private
 */
sap.ui.model.Binding.prototype._fireChange = function(mArguments) {
	this.fireEvent("_change", mArguments);
};

/**
 * Attach event-handler <code>fnFunction</code> to the 'dataRequested' event of this <code>sap.ui.model.Binding</code>.<br/>
 * @param {function} fnFunction The function to call, when the event occurs.
 * @param {object} [oListener] object on which to call the given function.
 * @public
 */
sap.ui.model.Binding.prototype.attachDataRequested = function(fnFunction, oListener) {
	this.attachEvent("dataRequested", fnFunction, oListener);
};

/**
 * Detach event-handler <code>fnFunction</code> from the 'dataRequested' event of this <code>sap.ui.model.Binding</code>.<br/>
 * @param {function} fnFunction The function to call, when the event occurs.
 * @param {object} [oListener] object on which to call the given function.
 * @public
 */
sap.ui.model.Binding.prototype.detachDataRequested = function(fnFunction, oListener) {
	this.detachEvent("dataRequested", fnFunction, oListener);
};

/**
 * Fire event dataRequested to attached listeners.

 * @param {Map} mArguments the arguments to pass along with the event.
 * @protected
 */
sap.ui.model.Binding.prototype.fireDataRequested = function(mArguments) {
	this.fireEvent("dataRequested", mArguments);
};

/**
 * Attach event-handler <code>fnFunction</code> to the 'dataReceived' event of this <code>sap.ui.model.Binding</code>.<br/>
 * @param {function} fnFunction The function to call, when the event occurs.
 * @param {object} [oListener] object on which to call the given function.
 * @public
 */
sap.ui.model.Binding.prototype.attachDataReceived = function(fnFunction, oListener) {
	this.attachEvent("dataReceived", fnFunction, oListener);
};

/**
 * Detach event-handler <code>fnFunction</code> from the 'dataReceived' event of this <code>sap.ui.model.Binding</code>.<br/>
 * @param {function} fnFunction The function to call, when the event occurs.
 * @param {object} [oListener] object on which to call the given function.
 * @public
 */
sap.ui.model.Binding.prototype.detachDataReceived = function(fnFunction, oListener) {
	this.detachEvent("dataReceived", fnFunction, oListener);
};

/**
 * Fire event dataReceived to attached listeners.

 * @param {Map} mArguments the arguments to pass along with the event.
 * @protected
 */
sap.ui.model.Binding.prototype.fireDataReceived = function(mArguments) {
	this.fireEvent("dataReceived", mArguments);
};

/**
 * Determines if the binding should be updated by comparing the current model against a specified model.
 * @param {object} oModel The model instance to compare against
 * @returns {boolean} true if this binding should be updated
 * @protected
 */
sap.ui.model.Binding.prototype.updateRequired = function(oModel) {
	return oModel && this.getModel() === oModel;
};

/**
 * Checks whether an update of this bindings is required. If this is the case the change event of 
 * the binding is fired.
 * The default implementation just fires the change event, if the method is called, the bForceUpdate
 * parameter is ignored. Subclasses should implement this, if possible.
 * 
 * @param {boolean} bForceUpdate
 *  
 * @private
 */
sap.ui.model.Binding.prototype.checkUpdate = function(bForceUpdate) {
	this._fireChange({reason: sap.ui.model.ChangeReason.Change});
};

/**
 * Refreshes the binding, check whether the model data has been changed and fire change event
 * if this is the case. For server side models this should refetch the data from the server.
 * To update a control, even if no data has been changed, e.g. to reset a control after failed
 * validation, please use the parameter bForceUpdate.
 * 
 * @param {boolean} bForceUpdate Update the bound control even if no data has been changed
 * 
 * @public
 */
sap.ui.model.Binding.prototype.refresh = function(bForceUpdate) {
	this.checkUpdate(bForceUpdate);
};

/**
 * _refresh for compatibility
 * @private
 */
sap.ui.model.Binding.prototype._refresh = function() {
	this.refresh();
};


/**
 * Returns whether the binding is initial, which means it did not get an initial value yet
 * @return {boolean} whether binding is initial
 * @public
 */
sap.ui.model.Binding.prototype.isInitial = function() {
	return this.bInitial;
};

/**
 * Returns whether the binding is relative, which means it did not start with a /
 * @return {boolean} whether binding is relative
 * @public
 */
sap.ui.model.Binding.prototype.isRelative = function() {
	return this.bRelative;
};
