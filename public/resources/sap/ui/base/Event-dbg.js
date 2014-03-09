/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides class sap.ui.base.Event
jQuery.sap.declare("sap.ui.base.Event");
jQuery.sap.require("sap.ui.base.Object");

/**
 * Creates an event with the given sId, linked to the provided oSource and enriched with the mParameters.
 *
 * @param {string} sId The id of the event
 * @param {sap.ui.base.EventProvider} oSource The source of the event
 * @param {object} mParameters A map of parameters for this event
 *
 * @class An Event object consisting of an id, a source and a map of parameters
 * @extends sap.ui.base.Object
 * @implements sap.ui.base.Poolable
 * @author Malte Wedel, Daniel Brinkmann
 * @version 1.16.8-SNAPSHOT
 * @name sap.ui.base.Event
 * @public
 */
sap.ui.base.Object.extend("sap.ui.base.Event", /** @lends sap.ui.base.Event */ {
	constructor : function(sId, oSource, mParameters) {
	
		sap.ui.base.Object.apply(this);
	
		if (arguments.length > 0) {
			this.init(sId, oSource, mParameters);
		}
	
	}
});

/**
 * Init this event with its data.
 *
 * The <code>init</code> method is called by an object pool when the
 * object is (re-)activated for a new caller.
 *
 * When no <code>mParameters</code> are given, an empty object is used instead.
 *
 * @param {string} sId The id of the event
 * @param {sap.ui.base.EventProvider} oSource The source of the event
 * @param {object} [mParameters] the event parameters
 *
 * @see sap.ui.base.Poolable.prototype#init
 */
sap.ui.base.Event.prototype.init = function(sId, oSource, mParameters) {
	jQuery.sap.assert(typeof sId === "string", "Event.init: sId must be a string");
	jQuery.sap.assert(oSource instanceof sap.ui.base.EventProvider, "Event.init: oSource must be an EventProvider");

	this.sId = sId;
	this.oSource = oSource;
	this.mParameters = mParameters || {};
	this.bCancelBubble = false;
	this.bPreventDefault = false;
};

/**
 * Reset event data, needed for pooling
 * @see sap.ui.base.Poolable.prototype#reset
 */
sap.ui.base.Event.prototype.reset = function() {
	this.sId = "";
	this.oSource = null;
	this.mParameters = null;
	this.bCancelBubble = false;
	this.bPreventDefault = false;
};

/**
 * Returns the id of the event
 * @return {string} The id of the event
 * @public
 */
sap.ui.base.Event.prototype.getId = function() {

	return this.sId;

};

/**
 * Returns the source of the event
 * @return {sap.ui.base.EventProvider} The source of the event
 * @public
 */
sap.ui.base.Event.prototype.getSource = function() {

	return this.oSource;

};

/**
 * Returns all parameter values of the event keyed by their names.
 * @return {map} All parameters of the event keyed by name
 * @public
 */
sap.ui.base.Event.prototype.getParameters = function() {

	return this.mParameters;

};

/**
 * Returns the value of the parameter with the given sName.
 *
 * @param {string} sName the name of the parameter to return
 * @return {any} the value for the named parameter
 * @public
 */
sap.ui.base.Event.prototype.getParameter = function(sName) {

	jQuery.sap.assert(typeof sName === "string" && sName, "Event.getParameter: sName must be a non-empty string");

	return this.mParameters[sName];

};

/**
 * Cancel bubbling of the event.
 * @public
 */
sap.ui.base.Event.prototype.cancelBubble = function() {

	this.bCancelBubble = true;

};

/**
 * Prevent the default action of this event.
 * @public
 */
sap.ui.base.Event.prototype.preventDefault = function() {

	this.bPreventDefault = true;

};

