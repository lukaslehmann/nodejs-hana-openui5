/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.TableSelectDialog.
jQuery.sap.declare("sap.m.TableSelectDialog");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new TableSelectDialog.
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
 * <li>{@link #getTitle title} : string</li>
 * <li>{@link #getNoDataText noDataText} : string</li>
 * <li>{@link #getMultiSelect multiSelect} : boolean (default: false)</li>
 * <li>{@link #getGrowingThreshold growingThreshold} : int</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getItems items} : sap.m.ColumnListItem[]</li>
 * <li>{@link #getColumns columns} : sap.m.Column[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.TableSelectDialog#event:confirm confirm} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.TableSelectDialog#event:search search} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.TableSelectDialog#event:liveChange liveChange} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.TableSelectDialog#event:cancel cancel} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * A TableSelectDialog provides you a easier way to create a dialog that contains a list with grouping and search functionality.
 * The Table used in a SelectDialog is a Table with Columns. After selecting an item, the dialog will be closed and a callback function will return the item being selected.
 * @extends sap.ui.core.Control
 *
 * @author SAP AG 
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor   
 * @public
 * @since 1.16
 * @name sap.m.TableSelectDialog
 */
sap.ui.core.Control.extend("sap.m.TableSelectDialog", { metadata : {

	// ---- object ----
	publicMethods : [
		// methods
		"open"
	],

	// ---- control specific ----
	library : "sap.m",
	properties : {
		"title" : {type : "string", group : "Appearance", defaultValue : null},
		"noDataText" : {type : "string", group : "Appearance", defaultValue : null},
		"multiSelect" : {type : "boolean", group : "Dimension", defaultValue : false},
		"growingThreshold" : {type : "int", group : "Misc", defaultValue : null}
	},
	defaultAggregation : "items",
	aggregations : {
    	"items" : {type : "sap.m.ColumnListItem", multiple : true, singularName : "item", bindable : "bindable"}, 
    	"_dialog" : {type : "sap.ui.core.Control", multiple : false, visibility : "hidden"}, 
    	"columns" : {type : "sap.m.Column", multiple : true, singularName : "column", bindable : "bindable"}
	},
	events : {
		"confirm" : {}, 
		"search" : {}, 
		"liveChange" : {}, 
		"cancel" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.TableSelectDialog with name <code>sClassName</code> 
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
 * @name sap.m.TableSelectDialog.extend
 * @function
 */

sap.m.TableSelectDialog.M_EVENTS = {'confirm':'confirm','search':'search','liveChange':'liveChange','cancel':'cancel'};


/**
 * Getter for property <code>title</code>.
 * The title text appears in the dialog header.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>title</code>
 * @public
 * @name sap.m.TableSelectDialog#getTitle
 * @function
 */

/**
 * Setter for property <code>title</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sTitle  new value for property <code>title</code>
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#setTitle
 * @function
 */


/**
 * Getter for property <code>noDataText</code>.
 * This is the text shown when the table has no data.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>noDataText</code>
 * @public
 * @name sap.m.TableSelectDialog#getNoDataText
 * @function
 */

/**
 * Setter for property <code>noDataText</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sNoDataText  new value for property <code>noDataText</code>
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#setNoDataText
 * @function
 */


/**
 * Getter for property <code>multiSelect</code>.
 * If on, the user can select several options from the table.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>multiSelect</code>
 * @public
 * @name sap.m.TableSelectDialog#getMultiSelect
 * @function
 */

/**
 * Setter for property <code>multiSelect</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bMultiSelect  new value for property <code>multiSelect</code>
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#setMultiSelect
 * @function
 */


/**
 * Getter for property <code>growingThreshold</code>.
 * Number of items initially displayed in the table
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {int} the value of property <code>growingThreshold</code>
 * @public
 * @name sap.m.TableSelectDialog#getGrowingThreshold
 * @function
 */

/**
 * Setter for property <code>growingThreshold</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {int} iGrowingThreshold  new value for property <code>growingThreshold</code>
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#setGrowingThreshold
 * @function
 */


/**
 * Getter for aggregation <code>items</code>.<br/>
 * The items of the table.
 * 
 * @return {sap.m.ColumnListItem[]}
 * @public
 * @name sap.m.TableSelectDialog#getItems
 * @function
 */


/**
 * Inserts a item into the aggregation named <code>items</code>.
 *
 * @param {sap.m.ColumnListItem}
 *          oItem the item to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the item should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the item is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the item is inserted at 
 *             the last position        
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#insertItem
 * @function
 */

/**
 * Adds some item <code>oItem</code> 
 * to the aggregation named <code>items</code>.
 *
 * @param {sap.m.ColumnListItem}
 *            oItem the item to add; if empty, nothing is inserted
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#addItem
 * @function
 */

/**
 * Removes an item from the aggregation named <code>items</code>.
 *
 * @param {int | string | sap.m.ColumnListItem} vItem the item to remove or its index or id
 * @return {sap.m.ColumnListItem} the removed item or null
 * @public
 * @name sap.m.TableSelectDialog#removeItem
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>items</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.m.ColumnListItem[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.TableSelectDialog#removeAllItems
 * @function
 */

/**
 * Checks for the provided <code>sap.m.ColumnListItem</code> in the aggregation named <code>items</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.m.ColumnListItem}
 *            oItem the item whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.TableSelectDialog#indexOfItem
 * @function
 */
	

/**
 * Destroys all the items in the aggregation 
 * named <code>items</code>.
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#destroyItems
 * @function
 */


/**
 * Binder for aggregation <code>items</code>.
 *
 * @param {string} sPath path to a list in the model 
 * @param {sap.ui.core.Element} oTemplate the control template for this aggregation
 * @param {sap.ui.model.Sorter} oSorter the initial sort order (optional)
 * @param {array} aFilters the predefined filters for this aggregation (optional)
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#bindItems
 * @function
 */

/**
 * Unbinder for aggregation <code>items</code>.
 *
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#unbindItems
 * @function
 */


/**
 * Getter for aggregation <code>columns</code>.<br/>
 * The columns bindings.
 * 
 * @return {sap.m.Column[]}
 * @public
 * @name sap.m.TableSelectDialog#getColumns
 * @function
 */


/**
 * Inserts a column into the aggregation named <code>columns</code>.
 *
 * @param {sap.m.Column}
 *          oColumn the column to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the column should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the column is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the column is inserted at 
 *             the last position        
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#insertColumn
 * @function
 */

/**
 * Adds some column <code>oColumn</code> 
 * to the aggregation named <code>columns</code>.
 *
 * @param {sap.m.Column}
 *            oColumn the column to add; if empty, nothing is inserted
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#addColumn
 * @function
 */

/**
 * Removes an column from the aggregation named <code>columns</code>.
 *
 * @param {int | string | sap.m.Column} vColumn the column to remove or its index or id
 * @return {sap.m.Column} the removed column or null
 * @public
 * @name sap.m.TableSelectDialog#removeColumn
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>columns</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.m.Column[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.TableSelectDialog#removeAllColumns
 * @function
 */

/**
 * Checks for the provided <code>sap.m.Column</code> in the aggregation named <code>columns</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.m.Column}
 *            oColumn the column whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.TableSelectDialog#indexOfColumn
 * @function
 */
	

/**
 * Destroys all the columns in the aggregation 
 * named <code>columns</code>.
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#destroyColumns
 * @function
 */


/**
 * Binder for aggregation <code>columns</code>.
 *
 * @param {string} sPath path to a list in the model 
 * @param {sap.ui.core.Element} oTemplate the control template for this aggregation
 * @param {sap.ui.model.Sorter} oSorter the initial sort order (optional)
 * @param {array} aFilters the predefined filters for this aggregation (optional)
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#bindColumns
 * @function
 */

/**
 * Unbinder for aggregation <code>columns</code>.
 *
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#unbindColumns
 * @function
 */


/**
 * This event will be fired when something has been selected for single select, or when the OK is clicked for multi select. 
 *
 * @name sap.m.TableSelectDialog#confirm
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {sap.m.ColumnListItem} oControlEvent.getParameters.selectedItem Returns selected list item. When no item is selected, "null" is returned. When multi-selection is enabled and multiple items are selected, only the first selected item is returned.
 * @param {sap.m.ColumnListItem[]} oControlEvent.getParameters.selectedItems Returns an array containing the selected list items. If no items are selected, an empty array is returned.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'confirm' event of this <code>sap.m.TableSelectDialog</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.TableSelectDialog</code>.<br/> itself. 
 *  
 * This event will be fired when something has been selected for single select, or when the OK is clicked for multi select. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.TableSelectDialog</code>.<br/> itself.
 *
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#attachConfirm
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'confirm' event of this <code>sap.m.TableSelectDialog</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#detachConfirm
 * @function
 */

/**
 * Fire event confirm to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'selectedItem' of type <code>sap.m.ColumnListItem</code> Returns selected list item. When no item is selected, "null" is returned. When multi-selection is enabled and multiple items are selected, only the first selected item is returned.</li>
 * <li>'selectedItems' of type <code>sap.m.ColumnListItem[]</code> Returns an array containing the selected list items. If no items are selected, an empty array is returned.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.TableSelectDialog#fireConfirm
 * @function
 */


/**
 * Fired when the search button has been clicked on dialog. 
 *
 * @name sap.m.TableSelectDialog#search
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {string} oControlEvent.getParameters.value The value entered in the search field.
 * @param {any} oControlEvent.getParameters.itemsBinding The Items binding of the Table Select Dialog.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'search' event of this <code>sap.m.TableSelectDialog</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.TableSelectDialog</code>.<br/> itself. 
 *  
 * Fired when the search button has been clicked on dialog. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.TableSelectDialog</code>.<br/> itself.
 *
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#attachSearch
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'search' event of this <code>sap.m.TableSelectDialog</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#detachSearch
 * @function
 */

/**
 * Fire event search to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'value' of type <code>string</code> The value entered in the search field.</li>
 * <li>'itemsBinding' of type <code>any</code> The Items binding of the Table Select Dialog.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.TableSelectDialog#fireSearch
 * @function
 */


/**
 * This event is fired when the value of the search field is changed by a user - e.g. at each key press. 
 *
 * @name sap.m.TableSelectDialog#liveChange
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {string} oControlEvent.getParameters.value The value entered in the search field.
 * @param {any} oControlEvent.getParameters.itemsBinding The Items binding of the Table Select Dialog.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'liveChange' event of this <code>sap.m.TableSelectDialog</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.TableSelectDialog</code>.<br/> itself. 
 *  
 * This event is fired when the value of the search field is changed by a user - e.g. at each key press. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.TableSelectDialog</code>.<br/> itself.
 *
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#attachLiveChange
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'liveChange' event of this <code>sap.m.TableSelectDialog</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#detachLiveChange
 * @function
 */

/**
 * Fire event liveChange to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'value' of type <code>string</code> The value entered in the search field.</li>
 * <li>'itemsBinding' of type <code>any</code> The Items binding of the Table Select Dialog.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.TableSelectDialog#fireLiveChange
 * @function
 */


/**
 * This event will be fired when the cancel button is clicked 
 *
 * @name sap.m.TableSelectDialog#cancel
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'cancel' event of this <code>sap.m.TableSelectDialog</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.TableSelectDialog</code>.<br/> itself. 
 *  
 * This event will be fired when the cancel button is clicked 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.TableSelectDialog</code>.<br/> itself.
 *
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#attachCancel
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'cancel' event of this <code>sap.m.TableSelectDialog</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TableSelectDialog#detachCancel
 * @function
 */

/**
 * Fire event cancel to attached listeners.

 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.TableSelectDialog} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.TableSelectDialog#fireCancel
 * @function
 */


/**
 * Opens the table select dialog.
 *
 * @name sap.m.TableSelectDialog.prototype.open
 * @function
 * @param {string} 
 *         sSearchValue
 *         Value for the search. The table will be automatically trigger the search event if value if this parameter is set.

 * @type sap.m.TableSelectDialog
 * @public
 */


// Start of sap\m\TableSelectDialog.js
/*!
 * @copyright@
 */

jQuery.sap.require("sap.m.Button");
jQuery.sap.require("sap.m.Dialog");
jQuery.sap.require("sap.m.Table");
jQuery.sap.require("sap.m.SearchField");

/* =========================================================== */
/*           begin: API methods                                */
/* =========================================================== */

/**
 * Initializes the control
 * @private
 */
sap.m.TableSelectDialog.prototype.init = function () {
	var that = this,
		liveChangeTimer = 0;

	//Function to allow dialog to close before fire event fired
	var fnResetAfterClose = function () {
		that._selectedItem = that._table.getSelectedItem();

		// detach this function
		that._dialog.detachAfterClose(fnResetAfterClose);

		that.fireConfirm({
			selectedItem: that._selectedItem,
			selectedItems: that._selectedItems
		});
	};
		
		
	this._bAppendedToUIArea = false;
	this._oRb = sap.ui.getCore().getLibraryResourceBundle("sap.m");
	// store a reference to the table for binding management 
	this._table = new sap.m.Table(this.getId() + "-table", {
		growing: true,
		growingScrollToLoad: true,
		noDataText: this.getNoDataText(),
		mode: sap.m.ListMode.SingleSelectMaster,
		selectionChange: function (oEvent) {
			var selectedItem = oEvent.getParameter("listItem");
			if (that._dialog) {
				if (!that.getMultiSelect()) { 
					// attach the reset function to afterClose to hide the dialog changes from the end user 
					that._dialog.attachAfterClose(fnResetAfterClose);
					that._dialog.close();
				}
			}
		}
	});

	// store a reference to the busyIndicator to display when data is currently loaded by a service
	this._busyIndicator = new sap.m.BusyIndicator(this.getId() + "-busyIndicator").addStyleClass("sapMTableSelectDialogBusyIndicator", true);

	// store a reference to the searchField for filtering
	this._searchField = new sap.m.SearchField(this.getId() + "-searchField", {
		width: "100%",
		liveChange: function (oEvent) {
			var value = oEvent.getSource().getValue(),
				delay = (value ? 300 : 0); // no delay if value is empty

			// execute search after user stopped typing for 300ms
			clearTimeout(liveChangeTimer);
			if(delay) {
				liveChangeTimer = setTimeout(function () {
					that._executeSearch(value, "liveChange");
				}, delay);
			} else {
				that._executeSearch(value, "liveChange");
			}
		},
		search: function (oEvent) {
			that._executeSearch(oEvent.getSource().getValue(), "search");
		}
	});

	// store a reference to the subheader for hiding it when data loads
	this._subHeader = new sap.m.Bar(this.getId() + "-subHeader", {
		contentMiddle: [
			this._searchField
		]
	});

	// store a reference to the internal dialog 
	this._dialog = new sap.m.Dialog(this.getId() + "-dialog", {
		stretch: jQuery.device.is.phone,
		contentHeight: "2000px",
		subHeader: this._subHeader,
		content: [this._busyIndicator, this._table],
		leftButton: this.getCancelButton()
	});

	// internally set top and bottom margin of the dialog to 8rem respectively
	this._dialog._iVMargin = 8 * parseInt(sap.ui.core.theming.Parameters.get("sapUiFontSize") || 16, 10); //128

	// helper variables for search update behaviour
	this._searchFieldValue = "";
	this._searchFieldLastEventType = "";

	// flags to control the busy indicator behaviour because the growing table will always show the no data text when updating
	this._firstRequest = true; // to only show the busy indicator for the first request when the dialog has been openend
	this._tableUpdateRequested = 0; // to only show the busy indicator when we initiated the change
};

/**
 * Destroys the control
 * @private
 */
sap.m.TableSelectDialog.prototype.exit = function () {
	this._table = null;
	this._searchField = null;
	this._subHeader = null;
	this._busyIndicator = null;
	this._firstRequest = null;
	this._tableUpdateRequested = null;
	this._searchFieldValue = null;
	this._searchFieldLastEventType = null;

	if (this._dialog) {
		this._dialog.destroy();
		this._dialog = null;
	}
	
	if (this._okButton) { 
		this._okButton.destroy();
		this._okButton = null;
	}
};

/*
* Opens the internal dialog with a searchfield and a table.
* @public
* @param {string} sValue Value for the table search.
* @return {TableSelectDialog} <code>this</code> to allow method chaining
*/
sap.m.TableSelectDialog.prototype.open = function (sSearchValue) {

	if(!this._bAppendedToUIArea){
		var oStatic = sap.ui.getCore().getStaticAreaRef();
		oStatic = sap.ui.getCore().getUIArea(oStatic);
		oStatic.addContent(this, true);
		this._bAppendedToUIArea = true;
	}

	// cleanup old data if the same dialog was opened before
	this._table.removeSelections();
	delete this._selectedItem;
	delete this._selectedItems;
	this._searchFieldLastEventType = "";
	this._firstRequest = true;
	this._tableUpdateRequested = 0;
	
	// set search field value
	this._searchField.setValue(sSearchValue);

	// open the dialog
	this._dialog.open();
	
	//now return the control for chaining
	return this;
};

/**
* Sets the growing threshold to the internal table
* @public
* @param {int} iValue Value for the table's growing threshold.
* @return {sap.m/TableSelectDialog} this pointer for chaining
*/
sap.m.TableSelectDialog.prototype.setGrowingThreshold = function (iValue) {
	this._table.setGrowingThreshold(iValue);
	this.setProperty("growingThreshold", iValue, true);

	return this;
};

sap.m.TableSelectDialog.prototype.getOkButton = function () {
	var that = this;

	//Function to allow dialog to close before fire event fired
	var fnOKAfterClose = function () {
		that._selectedItem = that._table.getSelectedItem();
		that._selectedItems = that._table.getSelectedItems();

		// detach this function
		that._dialog.detachAfterClose(fnOKAfterClose);

		that.fireConfirm({
			selectedItem: that._selectedItem,
			selectedItems: that._selectedItems
		});
	};
	
	if (!this._okButton) {
		this._okButton = new sap.m.Button(this.getId() + "-ok", {
			text: this._oRb.getText("MSGBOX_OK"),
			press: function () {
				// attach the reset function to afterClose to hide the dialog changes from the end user 
				that._dialog.attachAfterClose(fnOKAfterClose);
				that._dialog.close();
			}
		});
	}	
	return this._okButton;
}

sap.m.TableSelectDialog.prototype.getCancelButton = function () {
	var that = this;

	//Function to allow dialog to close before fire event fired
	var fnCancelAfterClose = function () {
		that._selectedItem = null;
		that._selectedItems = new Array();
		that._searchFieldValue = null;

		// detach this function
		that._dialog.detachAfterClose(fnCancelAfterClose);

		that.fireCancel();
	};
	
	if (!this._cancelButton) {
		this._cancelButton = new sap.m.Button(this.getId() + "-cancel" , {
			text: this._oRb.getText("MSGBOX_CANCEL"),
			press: function () {
				// attach the reset function to afterClose to hide the dialog changes from the end user 
				that._dialog.attachAfterClose(fnCancelAfterClose);
				that._dialog.close();
			}
		});
	}	
	return this._cancelButton;
}

sap.m.TableSelectDialog.prototype.setMultiSelect = function (bMulti) {
	this.setProperty("multiSelect", bMulti, true);
	if(bMulti){
		this._table.setMode(sap.m.ListMode.MultiSelect); 
		this._table.setIncludeItemInSelection(true);
		this._dialog.setRightButton(this.getCancelButton());
		this._dialog.setLeftButton(this.getOkButton());
	} else {
		this._table.setMode(sap.m.ListMode.SingleSelectMaster); 
		this._dialog.setLeftButton(this.getCancelButton());
	}
}
/*
 * Set the title of the internal dialog
 * @overwrite
 * @public
 * @param {string} sTitle the title text for the dialog
 */
sap.m.TableSelectDialog.prototype.setTitle = function (sTitle) {
	this.setProperty("title", sTitle, true);
	this._dialog.setTitle(sTitle);		
};

/*
 * Set the no data text of the internal table
 * @overwrite
 * @public
 * @param {string} sNoDataText the no data text for the table
 */
sap.m.TableSelectDialog.prototype.setNoDataText = function (sNoDataText) {
	this.setProperty("noDataText", sNoDataText, true);
	this._table.setNoDataText(sNoDataText);		
};

/* =========================================================== */
/*           begin: forward aggregation  methods to table      */
/* =========================================================== */

/*
 * Set the model for the internal table AND the current control so that 
 * both controls can be used with data binding
 * @overwrite
 * @public
 * @param {sap.ui.Model} oModel the model that holds the data for the table
 * @param {string} sName the optional model name
 */
sap.m.TableSelectDialog.prototype._setModel = sap.m.TableSelectDialog.prototype.setModel;
sap.m.TableSelectDialog.prototype.setModel = function (oModel, sName) {
	var args = Array.prototype.slice.call(arguments),
		result;

	// pass the model to the table
	result = this._table.setModel(oModel, sName);
	
	// we made a request in this control, so we update the counter
	this._tableUpdateRequested += 1;

	// attach events to listen to model updates and show/hide a busy indicator
	oModel.attachRequestSent(this._requestSent, this);
	oModel.attachRequestCompleted(this._requestCompleted, this);

	// and also to the local control to allow binding of own properties
	return result && sap.m.TableSelectDialog.prototype._setModel.apply(this, args);
};

/*
 * Forwards a function call to a managed object based on the aggregation name.
 * If the name is items, it will be forwarded to the table, otherwise called locally
 * @private
 * @param {string} sFunctionName the name of the function to be called
 * @param {string} sAggregationName the name of the aggregation asociated
 */
sap.m.TableSelectDialog.prototype._callMethodInManagedObject = function (sFunctionName, sAggregationName) {
	var args = Array.prototype.slice.call(arguments);

	if (sAggregationName === "items") { // apply to the internal table
		return this._table[sFunctionName].apply(this._table, args.slice(1));
	} else if (sAggregationName === "columns") { // apply to the internal table
		return this._table[sFunctionName].apply(this._table, args.slice(1));
	} else { // apply to this control
		return sap.ui.base.ManagedObject.prototype[sFunctionName].apply(this, args.slice(1));
	}
};

/**
 * Forwards aggregations with the name of items or columns to the internal table.
 * @overwrite
 * @public
 * @param {string} sName the name for the binding
 * @param {object} oBindingInfo the configuration parameters for the binding
 */
sap.m.TableSelectDialog.prototype.bindAggregation = function (sName, oBindingInfo) {
	var args = Array.prototype.slice.call(arguments);

	// propagate the bind aggregation function to table
	this._callMethodInManagedObject.apply(this, ["bindAggregation"].concat(args));
	return this;
};

sap.m.TableSelectDialog.prototype.validateAggregation = function (sAggregationName, oObject, bMultiple) {
	return this._callMethodInManagedObject("validateAggregation", sAggregationName, oObject, bMultiple);
};

sap.m.TableSelectDialog.prototype.setAggregation = function (sAggregationName, oObject, bSuppressInvalidate) {
	this._callMethodInManagedObject("setAggregation", sAggregationName, oObject, bSuppressInvalidate);
	return this;
};

sap.m.TableSelectDialog.prototype.getAggregation = function (sAggregationName, oDefaultForCreation) {
	return this._callMethodInManagedObject("getAggregation", sAggregationName, oDefaultForCreation);
};

sap.m.TableSelectDialog.prototype.indexOfAggregation = function (sAggregationName, oObject) {
	return this._callMethodInManagedObject("indexOfAggregation", sAggregationName, oObject);
};

sap.m.TableSelectDialog.prototype.insertAggregation = function (sAggregationName, oObject, iIndex, bSuppressInvalidate) {
	this._callMethodInManagedObject("insertAggregation", sAggregationName, oObject, iIndex, bSuppressInvalidate);
	return this;
};

sap.m.TableSelectDialog.prototype.addAggregation = function (sAggregationName, oObject, bSuppressInvalidate) {
	this._callMethodInManagedObject("addAggregation", sAggregationName, oObject, bSuppressInvalidate);
	return this;
};

sap.m.TableSelectDialog.prototype.removeAggregation = function (sAggregationName, oObject, bSuppressInvalidate) {
	return this._callMethodInManagedObject("removeAggregation", sAggregationName, oObject, bSuppressInvalidate);
};

sap.m.TableSelectDialog.prototype.removeAllAggregation = function (sAggregationName, bSuppressInvalidate) {
	return this._callMethodInManagedObject("removeAllAggregation", sAggregationName, bSuppressInvalidate);
};

sap.m.TableSelectDialog.prototype.destroyAggregation = function (sAggregationName, bSuppressInvalidate) {
	this._callMethodInManagedObject("destroyAggregation", sAggregationName, bSuppressInvalidate);
	return this;
};

sap.m.TableSelectDialog.prototype.getBinding = function (sName) {
	return this._callMethodInManagedObject("getBinding", sName);
};

sap.m.TableSelectDialog.prototype.getBindingContext = function (sName) {
	return this._callMethodInManagedObject("getBindingContext", sName);
};

sap.m.TableSelectDialog.prototype.getBindingInfo = function (sName) {
	return this._callMethodInManagedObject("getBindingInfo", sName);
};

sap.m.TableSelectDialog.prototype.getBindingPath = function (sName) {
	return this._callMethodInManagedObject("getBindingPath", sName);
};

sap.m.TableSelectDialog.prototype.setBindingContext = function (oContext, sName) {
	this._callMethodInManagedObject("setBindingContext", oContext, sName);
	return this;
};

sap.m.TableSelectDialog.prototype.setBindingContext = function (oContext, sName) {
	this._callMethodInManagedObject("setBindingContext", oContext, sName);
	return this;
};

/* =========================================================== */
/*           end: forward aggregation  methods to table       */
/* =========================================================== */

/* =========================================================== */
/*           begin: internal methods and properties            */
/* =========================================================== */

/*
 * fires the search event on the internal when dialog is opened. 
 * This function is also called whenever a search event on the searchfield is triggered 
 * @private
 * @param {string} sValue the new Search value or undefined if called by management functions
 * @param {string} sEventType the search field event type that has been called (liveChange / search)
 */
sap.m.TableSelectDialog.prototype._executeSearch = function (sValue, sEventType) {
	var table = this._table,
		tableBinding = (table ? table.getBinding("items") : undefined),
		searchValueDifferent = (this._searchFieldValue !== sValue); // to prevent unwanted duplicate requests
	
	// fire either the Search event or the liveChange event when dialog is opened.
	// 1) when the clear icon is called then both liveChange and search events are fired but we only want to process the first one
	// 2) when a livechange has been triggered by typing we don't want the next search event to be processed (typing + enter or typing + search button)
	if (this._dialog.isOpen() && ((searchValueDifferent && sEventType === "liveChange") || sEventType === "search")) {
		// set the internal value to the passed value to check if the same value has already been filtered (happens when clear is called, it fires liveChange and change events)
		this._searchFieldValue = sValue;

		// only set when the binding has already been executed
		if (tableBinding) {
			// we made another request in this control, so we update the counter
			this._tableUpdateRequested += 1;
			
			if (sEventType == "search") {
				//	fire the search so the data can be updated externally
				this.fireSearch({value: sValue, itemsBinding: tableBinding});
			} else if (sEventType == "liveChange") {
				//	fire the liveChange so the data can be updated externally				
				this.fireLiveChange({value: sValue, itemsBinding: tableBinding});
			}
		}
	}

	// store the last event type for the next check
	this._searchFieldLastEventType = sEventType;

};

/*
 * Event function that is called when the model sent a request to update the data.
 * It shows a busy indicator and hides searchField and table in the dialog. 
 * @private
 * @param {jQuery.EventObject} oEvent The event object
 */
sap.m.TableSelectDialog.prototype._requestSent = function (oEvent) {
	if (this._dialog.isOpen() && this._tableUpdateRequested) { // check if the event was caused by our control
		if (this._firstRequest) { // also hide the header bar for the first request
			this._subHeader.$().css('display', 'none');
		}
		this._table.addStyleClass('sapMTableSelectDialogTableHide');
		this._busyIndicator.$().css('display', 'inline-block');
	}
};

/*
 * Event function that is called when the model request is finished.
 * It hides the busy indicator and shows searchField and table in the dialog. 
 * @private
 * @param {jQuery.EventObject} oEvent The event object
 */
sap.m.TableSelectDialog.prototype._requestCompleted = function (oEvent) {
	if (this._dialog.isOpen() && this._tableUpdateRequested) { // check if there are still open requests from this control
		if (this._firstRequest) { // also show the header bar again for the first request
			this._subHeader.$().css('display', 'block');
			this._firstRequest = false;
		}
		this._table.removeStyleClass('sapMTableSelectDialogTableHide');
		this._busyIndicator.$().css('display', 'none');
		// we received a request (from this or from another control) so we decrease the counter
		this._tableUpdateRequested -= 1;
	}
};

/**
* Invalidates the dialog instead of this control (we don't have a renderer)
* @overwrite
* @public
*/
sap.m.TableSelectDialog.prototype.invalidate = function () {
	if(this._dialog) {
			this._dialog.invalidate(arguments);
	}
};

/* =========================================================== */
/*           end: internal methods                             */
/* =========================================================== */