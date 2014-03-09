/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.FacetFilterItem.
jQuery.sap.declare("sap.m.FacetFilterItem");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Item");


/**
 * Constructor for a new FacetFilterItem.
 * 
 * Accepts an object literal <code>mSettings</code> that defines initial 
 * property values, aggregated and associated objects as well as event handlers. 
 * 
 * If the name of a setting is ambiguous (e.g. a property has the same name as an event), 
 * then the framework assumes property, aggregation, association, event in that order. 
 * To override this automatic resolution, one of the prefixes "aggregation:", "association:" 
 * or "event:" can be added to the name of the setting (such a prefixed name must be
 * enclosed in single or double quotes).
 *
 * The supported settings are:
 * <ul>
 * <li>Properties
 * <ul>
 * <li>{@link #getSelected selected} : boolean (default: false)</li>
 * <li>{@link #getCount count} : int</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.ui.core.Item#constructor sap.ui.core.Item}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Represents a value for the FacetFilterList control.
 * @extends sap.ui.core.Item
 *
 * @author  
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor   
 * @public
 * @since 1.16.0
 * @name sap.m.FacetFilterItem
 */
sap.ui.core.Item.extend("sap.m.FacetFilterItem", { metadata : {

	// ---- object ----

	// ---- control specific ----
	library : "sap.m",
	properties : {
		"selected" : {type : "boolean", group : "Behavior", defaultValue : false},
		"count" : {type : "int", group : "Misc", defaultValue : null}
	}
}});


/**
 * Creates a new subclass of class sap.m.FacetFilterItem with name <code>sClassName</code> 
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * <code>oClassInfo</code> might contain the same kind of informations as described in {@link sap.ui.core.Element.extend Element.extend}.
 *   
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class  
 * @param {function} [FNMetaImpl] constructor function for the metadata object. If not given, it defaults to sap.ui.core.ElementMetadata.
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.m.FacetFilterItem.extend
 * @function
 */


/**
 * Getter for property <code>selected</code>.
 * Indicated that this value is selected in the FacetFilterList.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>selected</code>
 * @public
 * @name sap.m.FacetFilterItem#getSelected
 * @function
 */

/**
 * Setter for property <code>selected</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bSelected  new value for property <code>selected</code>
 * @return {sap.m.FacetFilterItem} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterItem#setSelected
 * @function
 */


/**
 * Getter for property <code>count</code>.
 * Number of objects that match this item in the target data set.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {int} the value of property <code>count</code>
 * @public
 * @name sap.m.FacetFilterItem#getCount
 * @function
 */

/**
 * Setter for property <code>count</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {int} iCount  new value for property <code>count</code>
 * @return {sap.m.FacetFilterItem} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterItem#setCount
 * @function
 */


// Start of sap\m\FacetFilterItem.js
///**
// * This file defines behavior for the control,
// */
//sap.m.FacetItem.prototype.init = function(){
//   // do something for initialization...
//};
