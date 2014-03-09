/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides an abstract property binding.
jQuery.sap.declare("sap.ui.model.CompositeBinding");
jQuery.sap.require("sap.ui.model.PropertyBinding");
jQuery.sap.require("sap.ui.model.SimpleType");

/**
 * Constructor for CompositeBinding
 *
 * @class
 * The CompositeBinding is used to bundle multiple property bindings which are be used to provide a single binding against
 * these property bindings. Note: Only One Way binding is supported. So setValue and setExternalValue throw exceptions.
 *
 * @public
 * @name sap.ui.model.CompositeBinding
 */

sap.ui.model.PropertyBinding.extend("sap.ui.model.CompositeBinding", /** @lends sap.ui.model.CompositeBinding */ {

	constructor : function (aBindings, bRawValues) {
		sap.ui.model.Binding.apply(this, [null,""]); // TODO is this needed?
		this.aBindings = aBindings;
		this.bRawValues = bRawValues;
	},
	metadata : {
		
	  publicMethods : [
	          "getBindings", "attachChange", "detachChange"
	  ]
	}

});

sap.ui.model.CompositeBinding.prototype.getPath = function() {
	jQuery.sap.assert(null, "Composite Binding has no path!");
	return null;
};

sap.ui.model.CompositeBinding.prototype.getModel = function() {
	jQuery.sap.assert(null, "Composite Binding has no model!");
	return null;
};

sap.ui.model.CompositeBinding.prototype.getContext = function() {
	jQuery.sap.assert(null, "Composite Binding has no context!");
	return null;
};

sap.ui.model.CompositeBinding.prototype.getType = function() {
	jQuery.sap.assert(null, "Composite Binding type is not supported!");
	return null;
};

/**
 * sets the context for each property binding in this composite binding
 * @param {object} oContext the new context for the bindings
 */
sap.ui.model.CompositeBinding.prototype.setContext = function(oContext) {
	jQuery.each(this.aBindings, function(i, oBinding){
		// null context could also be set
		if(!oContext || oBinding.updateRequired(oContext.getModel())) {
			oBinding.setContext(oContext);
		}
	});
};

/**
 * Not supported for CompositeBinding as a composite binding contains an array of property bindings. 
 * An exception will be thrown. 
 *
 * @param {object} oValue the value to set for this binding
 * 
 * @throws sap.ui.base.Exception
 *
 * @public
 */
sap.ui.model.CompositeBinding.prototype.setValue = function(oValue) {
	throw new sap.ui.base.Exception("Composite Binding does not support setValue because it contains multiple property bindings!");
};

/**
 * Returns the raw values of the property bindings in an array.
 *
 * @return {object} the values of the internal property bindings in an array
 *
 * @public
 */
sap.ui.model.CompositeBinding.prototype.getValue = function() {	
	var aValues = [],
	oValue;

	jQuery.each(this.aBindings, function(i, oBinding) {
		oValue = oBinding.getValue();
		aValues.push(oValue);
	});

	return aValues;
};

/**
 * Returns the current external value of the bound target which is formatted via a type or formatter function. 
 *
 * @return {object} the current value of the bound target
 *
 *@throws sap.ui.model.FormatException
 *
 * @public
 */
sap.ui.model.CompositeBinding.prototype.getExternalValue = function() {	
	var aValues = [],
		oValue;
	if (this.bRawValues) {
		// type of property bindings is ignored here because we call getValue().
		aValues = this.getValue();
	} else {
		// composite type is ignored here and the property binding types are used in getExternalValue()
		jQuery.each(this.aBindings, function(i, oBinding) {
			oValue = oBinding.getExternalValue();
			aValues.push(oValue);
		});
	}
	
	if (this.fnFormatter) {
		oValue = this.fnFormatter.apply(this, aValues);
	} else {
		if ( aValues.length > 1) {
			// default: multiple values are joined together if no formatter specified
			oValue = aValues.join(" ");
		} else {
			oValue = aValues[0];
		}
	}
	
	return oValue;
};


/**
 * Not supported for CompositeBinding as a composite binding contains an array of property bindings. 
 * An exception will be thrown. 
 *
 * @param {object} oValue the value to set for this binding
 * 
 * @throws sap.ui.base.Exception
 *
 * @public
 */
sap.ui.model.CompositeBinding.prototype.setExternalValue = function(oValue) {
	throw new sap.ui.base.Exception("Composite Binding does not support setExternalValue because it contains multiple property bindings!");
};

/**
 * Returns the property bindings contained in this composite binding.
 *
 * @return {array} the property bindings in this composite binding
 *
 * @public
 */
sap.ui.model.CompositeBinding.prototype.getBindings = function() {
	return this.aBindings;
};

//Eventing and related
/**
* Attach event-handler <code>fnFunction</code> to the '_change' event of this <code>sap.ui.model.Model</code>.<br/>
* @param {function} fnFunction The function to call, when the event occurs.
* @param {object} [oListener] object on which to call the given function.
* @protected
*/
sap.ui.model.CompositeBinding.prototype.attachChange = function(fnFunction, oListener) {
	
	jQuery.each(this.aBindings, function(i, oBinding){
		oBinding.attachChange(fnFunction, oListener);
	});
};

/**
* Detach event-handler <code>fnFunction</code> from the '_change' event of this <code>sap.ui.model.Model</code>.<br/>
* @param {function} fnFunction The function to call, when the event occurs.
* @param {object} [oListener] object on which to call the given function.
* @protected
*/
sap.ui.model.CompositeBinding.prototype.detachChange = function(fnFunction, oListener) {
	jQuery.each(this.aBindings, function(i, oBinding){
		oBinding.detachChange(fnFunction, oListener);
	});
};

/**
 * Determines if the property bindings in the composite binding should be updated by calling updateRequired on all property bindings with the specified model.
 * @param {object} oModel The model instance to compare against
 * @returns {boolean} true if this binding should be updated
 * @protected
 */
sap.ui.model.CompositeBinding.prototype.updateRequired = function(oModel) {
	var bUpdateRequired = false;
	jQuery.each(this.aBindings, function(i, oBinding){
		bUpdateRequired = bUpdateRequired || oBinding.updateRequired(oModel);
	});
	return bUpdateRequired;

};

