/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides an abstraction for list bindings
jQuery.sap.declare("sap.ui.model.ListBinding");
jQuery.sap.require("sap.ui.model.Binding");
jQuery.sap.require("sap.ui.model.Sorter");
jQuery.sap.require("sap.ui.model.Filter");

/**
 * Constructor for ListBinding
 *
 * @class
 * The ListBinding is a specific binding for lists in the model, which can be used
 * to populate Tables or ItemLists.
 *
 * @param {sap.ui.model.Model} oModel
 * @param {String} sPath
 * @param {Object} oContext
 * @abstract
 * @public
 * @name sap.ui.model.ListBinding
 */
sap.ui.model.Binding.extend("sap.ui.model.ListBinding", /** @lends sap.ui.model.ListBinding */ {
	
	constructor : function(oModel, sPath, oContext, aSorters, aFilters, mParameters){
		sap.ui.model.Binding.call(this, oModel, sPath, oContext, mParameters);
		this.aSorters = aSorters;
		if (!jQuery.isArray(this.aSorters) && this.aSorters instanceof sap.ui.model.Sorter) {
			this.aSorters = [this.aSorters];
		} else if (!jQuery.isArray(this.aSorters)) {
			this.aSorters = [];
		}
		this.aFilters = [];
		if (!jQuery.isArray(aFilters) && aFilters instanceof sap.ui.model.Filter) {
			aFilters = [aFilters];
		} else if (!jQuery.isArray(aFilters)) {
			aFilters = [];
		}
		this.aApplicationFilters = aFilters;
		this.bUseExtendedChangeDetection = false;
	},
	
	metadata : {
		"abstract" : true,

		publicMethods : [
			// methods
			"getContexts", "sort", "attachSort", "detachSort", "filter", "attachFilter", "detachFilter", "getDistinctValues", "isGrouped"
		]
	}
	
});

/**
 * Creates a new subclass of class sap.ui.model.ListBinding with name <code>sClassName</code> 
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
 * @name sap.ui.model.ListBinding.extend
 * @function
 */


// the 'abstract methods' to be implemented by child classes
/**
 * Returns the current value of the bound target
 *
 * @function
 * @name sap.ui.model.ListBinding.prototype.getContexts
 * @return {sap.ui.model.Context[]} the array of contexts for each row of the bound list
 *
 * @public
 */

/**
 * Filters the list according to the filter definitions
 *
 * @function
 * @name sap.ui.model.ListBinding.prototype.filter
 * @param {object[]} aFilters Array of filter objects
 * @return {sap.ui.model.ListBinding} returns <code>this</code> to facilitate method chaining 
 *
 * @public
 */

/**
 * Sorts the list according to the sorter object
 *
 * @function
 * @name sap.ui.model.ListBinding.prototype.sort
 * @param {sap.ui.model.Sorter|Array} aSorters the Sorter object or an array of sorters which defines the sort order
 * @param {sap.ui.model.FilterType} sFilterType Type of the filter which should be adjusted, if it is not given, the standard behaviour applies
 * @return {sap.ui.model.ListBinding} returns <code>this</code> to facilitate method chaining 
 * @public
 */

// base methods, may be overridden by child classes
/**
 * Returns list of distinct values for the given relative binding path
 *
 * @param {string} sPath the relative binding path
 * @return {Array} the array of distinct values.
 *
 * @public
 */
sap.ui.model.ListBinding.prototype.getDistinctValues = function(sPath) {
	return null;
};

//Eventing and related
/**
 * Attach event-handler <code>fnFunction</code> to the '_sort' event of this <code>sap.ui.model.ListBinding</code>.<br/>
 * @param {function} fnFunction The function to call, when the event occurs.
 * @param {object} [oListener] object on which to call the given function.
 * @protected
 * @deprecated use the change event. It now contains a parameter (reason : "sort") when a sorter event is fired.
 */
sap.ui.model.ListBinding.prototype.attachSort = function(fnFunction, oListener) {
	this.attachEvent("_sort", fnFunction, oListener);
};

/**
 * Detach event-handler <code>fnFunction</code> from the '_sort' event of this <code>sap.ui.model.ListBinding</code>.<br/>
 * @param {function} fnFunction The function to call, when the event occurs.
 * @param {object} [oListener] object on which to call the given function.
 * @protected
 * @deprecated use the change event.
 */
sap.ui.model.ListBinding.prototype.detachSort = function(fnFunction, oListener) {
	this.detachEvent("_sort", fnFunction, oListener);
};

/**
 * Fire event _change to attached listeners.
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @private
 * @deprecated use the change event. It now contains a parameter (reason : "sort") when a sorter event is fired.
 */
sap.ui.model.ListBinding.prototype._fireSort = function(mArguments) {
	this.fireEvent("_sort", mArguments);
};

/**
 * Attach event-handler <code>fnFunction</code> to the '_filter' event of this <code>sap.ui.model.ListBinding</code>.<br/>
 * @param {function} fnFunction The function to call, when the event occurs.
 * @param {object} [oListener] object on which to call the given function.
 * @protected
 * @deprecated use the change event. It now contains a parameter (reason : "filter") when a filter event is fired.
 */
sap.ui.model.ListBinding.prototype.attachFilter = function(fnFunction, oListener) {
	this.attachEvent("_filter", fnFunction, oListener);
};

/**
 * Detach event-handler <code>fnFunction</code> from the '_filter' event of this <code>sap.ui.model.ListBinding</code>.<br/>
 * @param {function} fnFunction The function to call, when the event occurs.
 * @param {object} [oListener] object on which to call the given function.
 * @protected
 * @deprecated use the change event.
 */
sap.ui.model.ListBinding.prototype.detachFilter = function(fnFunction, oListener) {
	this.detachEvent("_filter", fnFunction, oListener);
};

/**
 * Checks if grouping is enabled for the binding<br/>
 * @public
 */
sap.ui.model.ListBinding.prototype.isGrouped = function() {
	return this.aSorters.length > 0 && !!this.aSorters[0].fnGroup;
};

/**
 * Fire event _filter to attached listeners.
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @private
 * @deprecated use the change event. It now contains a parameter (reason : "filter") when a filter event is fired.
 */
sap.ui.model.ListBinding.prototype._fireFilter = function(mArguments) {
	this.fireEvent("_filter", mArguments);
};


/**
 * Enable extended change detection
 * @private
 */
sap.ui.model.ListBinding.prototype.enableExtendedChangeDetection = function( ) {
	this.bUseExtendedChangeDetection  = true;
	if (this.update) {
		this.update();
	}
};
