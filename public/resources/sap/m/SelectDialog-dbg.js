/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.SelectDialog.
jQuery.sap.declare("sap.m.SelectDialog");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new SelectDialog.
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
 * <li>{@link #getItems items} : sap.m.StandardListItem[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.SelectDialog#event:confirm confirm} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.SelectDialog#event:search search} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.SelectDialog#event:liveChange liveChange} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.SelectDialog#event:cancel cancel} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * A SelectDialog provides you a easier way to create a dialog that contains a list with grouping and search functionality.
 * The list used in a SelectDialog is a growing list with StandardListItem. After selecting an item, the dialog will be closed and a callback function will return the item being selected.
 * @extends sap.ui.core.Control
 *
 * @author SAP AG 
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor   
 * @public
 * @name sap.m.SelectDialog
 */
sap.ui.core.Control.extend("sap.m.SelectDialog", { metadata : {

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
    	"items" : {type : "sap.m.StandardListItem", multiple : true, singularName : "item"}, 
    	"_dialog" : {type : "sap.ui.core.Control", multiple : false, visibility : "hidden"}
	},
	events : {
		"confirm" : {}, 
		"search" : {}, 
		"liveChange" : {}, 
		"cancel" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.SelectDialog with name <code>sClassName</code> 
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
 * @name sap.m.SelectDialog.extend
 * @function
 */

sap.m.SelectDialog.M_EVENTS = {'confirm':'confirm','search':'search','liveChange':'liveChange','cancel':'cancel'};


/**
 * Getter for property <code>title</code>.
 * The title text that appears in the dialog header
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>title</code>
 * @public
 * @name sap.m.SelectDialog#getTitle
 * @function
 */

/**
 * Setter for property <code>title</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sTitle  new value for property <code>title</code>
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#setTitle
 * @function
 */


/**
 * Getter for property <code>noDataText</code>.
 * This is the text shown when the list has no data
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>noDataText</code>
 * @public
 * @name sap.m.SelectDialog#getNoDataText
 * @function
 */

/**
 * Setter for property <code>noDataText</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sNoDataText  new value for property <code>noDataText</code>
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#setNoDataText
 * @function
 */


/**
 * Getter for property <code>multiSelect</code>.
 * If on, the user can select several options from the list
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>multiSelect</code>
 * @public
 * @name sap.m.SelectDialog#getMultiSelect
 * @function
 */

/**
 * Setter for property <code>multiSelect</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bMultiSelect  new value for property <code>multiSelect</code>
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#setMultiSelect
 * @function
 */


/**
 * Getter for property <code>growingThreshold</code>.
 * Number of items initially displayed in the list
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {int} the value of property <code>growingThreshold</code>
 * @public
 * @name sap.m.SelectDialog#getGrowingThreshold
 * @function
 */

/**
 * Setter for property <code>growingThreshold</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {int} iGrowingThreshold  new value for property <code>growingThreshold</code>
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#setGrowingThreshold
 * @function
 */


/**
 * Getter for aggregation <code>items</code>.<br/>
 * The items of the list shown in the search dialog
 * 
 * @return {sap.m.StandardListItem[]}
 * @public
 * @name sap.m.SelectDialog#getItems
 * @function
 */


/**
 * Inserts a item into the aggregation named <code>items</code>.
 *
 * @param {sap.m.StandardListItem}
 *          oItem the item to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the item should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the item is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the item is inserted at 
 *             the last position        
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#insertItem
 * @function
 */

/**
 * Adds some item <code>oItem</code> 
 * to the aggregation named <code>items</code>.
 *
 * @param {sap.m.StandardListItem}
 *            oItem the item to add; if empty, nothing is inserted
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#addItem
 * @function
 */

/**
 * Removes an item from the aggregation named <code>items</code>.
 *
 * @param {int | string | sap.m.StandardListItem} vItem the item to remove or its index or id
 * @return {sap.m.StandardListItem} the removed item or null
 * @public
 * @name sap.m.SelectDialog#removeItem
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>items</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.m.StandardListItem[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.SelectDialog#removeAllItems
 * @function
 */

/**
 * Checks for the provided <code>sap.m.StandardListItem</code> in the aggregation named <code>items</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.m.StandardListItem}
 *            oItem the item whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.SelectDialog#indexOfItem
 * @function
 */
	

/**
 * Destroys all the items in the aggregation 
 * named <code>items</code>.
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#destroyItems
 * @function
 */


/**
 * This event will be fired when the dialog is closed. If something has been selected, the item being selected will be returned, else, null will be returned. 
 *
 * @name sap.m.SelectDialog#confirm
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {sap.m.StandardListItem} oControlEvent.getParameters.selectedItem Returns selected list item. When no item is selected, "null" is returned. When multi-selection is enabled and multiple items are selected, only the first selected item is returned.
 * @param {sap.m.StandardListItem[]} oControlEvent.getParameters.selectedItems Returns an array containing the selected list items. If no items are selected, an empty array is returned.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'confirm' event of this <code>sap.m.SelectDialog</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.SelectDialog</code>.<br/> itself. 
 *  
 * This event will be fired when the dialog is closed. If something has been selected, the item being selected will be returned, else, null will be returned. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.SelectDialog</code>.<br/> itself.
 *
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#attachConfirm
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'confirm' event of this <code>sap.m.SelectDialog</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#detachConfirm
 * @function
 */

/**
 * Fire event confirm to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'selectedItem' of type <code>sap.m.StandardListItem</code> Returns selected list item. When no item is selected, "null" is returned. When multi-selection is enabled and multiple items are selected, only the first selected item is returned.</li>
 * <li>'selectedItems' of type <code>sap.m.StandardListItem[]</code> Returns an array containing the selected list items. If no items are selected, an empty array is returned.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.SelectDialog#fireConfirm
 * @function
 */


/**
 * This event will be fired when the search button has been clicked on the searchfield on the visual control 
 *
 * @name sap.m.SelectDialog#search
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {string} oControlEvent.getParameters.value The value entered in the search
 * @param {any} oControlEvent.getParameters.itemsBinding The Items binding of the Select Dialog for search purposes
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'search' event of this <code>sap.m.SelectDialog</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.SelectDialog</code>.<br/> itself. 
 *  
 * This event will be fired when the search button has been clicked on the searchfield on the visual control 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.SelectDialog</code>.<br/> itself.
 *
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#attachSearch
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'search' event of this <code>sap.m.SelectDialog</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#detachSearch
 * @function
 */

/**
 * Fire event search to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'value' of type <code>string</code> The value entered in the search</li>
 * <li>'itemsBinding' of type <code>any</code> The Items binding of the Select Dialog for search purposes</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.SelectDialog#fireSearch
 * @function
 */


/**
 * This event will be fired when the value of the search field is changed by a user - e.g. at each key press 
 *
 * @name sap.m.SelectDialog#liveChange
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {string} oControlEvent.getParameters.value The value to search on, which can change at any keypress
 * @param {any} oControlEvent.getParameters.itemsBinding The Items binding of the Select Dialog
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'liveChange' event of this <code>sap.m.SelectDialog</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.SelectDialog</code>.<br/> itself. 
 *  
 * This event will be fired when the value of the search field is changed by a user - e.g. at each key press 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.SelectDialog</code>.<br/> itself.
 *
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#attachLiveChange
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'liveChange' event of this <code>sap.m.SelectDialog</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#detachLiveChange
 * @function
 */

/**
 * Fire event liveChange to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'value' of type <code>string</code> The value to search on, which can change at any keypress</li>
 * <li>'itemsBinding' of type <code>any</code> The Items binding of the Select Dialog</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.SelectDialog#fireLiveChange
 * @function
 */


/**
 * This event will be fired when the cancel button is clicked 
 *
 * @name sap.m.SelectDialog#cancel
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'cancel' event of this <code>sap.m.SelectDialog</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.SelectDialog</code>.<br/> itself. 
 *  
 * This event will be fired when the cancel button is clicked 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.SelectDialog</code>.<br/> itself.
 *
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#attachCancel
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'cancel' event of this <code>sap.m.SelectDialog</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.SelectDialog#detachCancel
 * @function
 */

/**
 * Fire event cancel to attached listeners.

 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.SelectDialog} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.SelectDialog#fireCancel
 * @function
 */


/**
 * Opens the select dialog
 *
 * @name sap.m.SelectDialog.prototype.open
 * @function
 * @param {string} 
 *         sSearchValue
 *         Value for the search. The list will automatically trigger the search event if this parameter is set

 * @type sap.m.SelectDialog
 * @public
 */


// Start of sap\m\SelectDialog.js
/*!
 * @copyright@
 */

jQuery.sap.require("sap.m.Button");
jQuery.sap.require("sap.m.Dialog");
jQuery.sap.require("sap.m.List");
jQuery.sap.require("sap.m.SearchField");

/* =========================================================== */
/*           begin: API methods                                */
/* =========================================================== */

/**
 * Initializes the control
 * @private
 */
sap.m.SelectDialog.prototype.init = function () {
	var that = this,
		liveChangeTimer = 0;
		
	//Function to allow dialog to close before fire event fired
	var fnResetAfterClose = function () {
		that._selectedItem = that._list.getSelectedItem();

		// detach this function
		that._dialog.detachAfterClose(fnResetAfterClose);

		that.fireConfirm({
			selectedItem: that._selectedItem,
			selectedItems: that._selectedItems
		});
	};

	this._bAppendedToUIArea = false;
	this._oRb = sap.ui.getCore().getLibraryResourceBundle("sap.m");
	// store a reference to the list for binding management
	this._list = new sap.m.List(this.getId() + "-list", {
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
	this._busyIndicator = new sap.m.BusyIndicator(this.getId() + "-busyIndicator").addStyleClass("sapMSelectDialogBusyIndicator", true);

	// store a reference to the searchField for filtering
	this._searchField = new sap.m.SearchField(this.getId() + "-searchField", {
		width: "100%",
		liveChange: function (oEvent) {
            var value = oEvent.getSource().getValue(),
              	delay = (value ? 300 : 0); // no delay if value is empty

             // execute search after user stops typing for 300ms
             clearTimeout(liveChangeTimer);
             if(delay) {
                liveChangeTimer = setTimeout(function () {
                that._executeSearch(value, "liveChange");
              }, delay);
             } else {
             that._executeSearch(value, "liveChange");
             }
        },
        // execute the standard search
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
		title: this.getTitle(),
		stretch: jQuery.device.is.phone,
		contentHeight: "2000px",
		subHeader: this._subHeader,
		content: [this._busyIndicator, this._list],
		leftButton: this.getCancelButton()
	}).addStyleClass("sapMSelectDialog", true);

	// internally set top and bottom margin of the dialog to 4rem respectively
	this._dialog._iVMargin = 8 * parseInt(sap.ui.core.theming.Parameters.get("sapUiFontSize") || 16, 10); //128

	// helper variables for search update behaviour
	this._searchFieldValue = "";
	this._searchFieldLastEventType = "";

	// flags to control the busy indicator behaviour because the growing list will always show the no data text when updating
	this._firstRequest = true; // to only show the busy indicator for the first request when the dialog has been openend
	this._listUpdateRequested = 0; // to only show the busy indicator when we initiated the change
};

/**
 * Destroys the control
 * @private
 */
sap.m.SelectDialog.prototype.exit = function () {
	this._list = null;
	this._searchField = null;
	this._subHeader = null;
	this._busyIndicator = null;
	this._firstRequest = null;
	this._searchFieldLastEventType = null;
	this._listUpdateRequested = null;
	this._searchFieldValue = null;

	if (this._dialog) {
		this._dialog.destroy();
		this._dialog = null;
	}
	if (this._okButton) {
	this._okButton.destroy();
	this._okbutton = null;
	}
};

/**
* Opens the internal dialog with a searchfield and a list.
* @public
* @param {string} sValue Value for the list search.
* @return {sap.m/SelectDialog} this pointer for chaining
*/
sap.m.SelectDialog.prototype.open = function (sSearchValue) {
	
	if(!this._bAppendedToUIArea){
		var oStatic = sap.ui.getCore().getStaticAreaRef();
		oStatic = sap.ui.getCore().getUIArea(oStatic);
		oStatic.addContent(this, true);
		this._bAppendedToUIArea = true;
	}

	// cleanup old data if the same dialog was opened before
	this._list.removeSelections();
	delete this._selectedItem;
	delete this._selectedItems;
	this._searchFieldLastEventType = "";
	this._firstRequest = true;
	this._listUpdateRequested = 0;
	
	// set the search value
	this._searchField.setValue(sSearchValue);

	// open the dialog
	this._dialog.open();

	// return Dialog for chaining purposes
	return this;
};

/**
* Sets the growing threshold to the internal list
* @public
* @param {int} iValue Value for the list's growing threshold.
* @return {sap.m/SelectDialog} this pointer for chaining
*/
sap.m.SelectDialog.prototype.setGrowingThreshold = function (iValue) {
	this._list.setGrowingThreshold(iValue);
	this.setProperty("growingThreshold", iValue, true);

	return this;
};

// store a reference to the ok button
sap.m.SelectDialog.prototype.getOkButton = function () {
	var that = this;

	//Function to allow dialog to close before fire event fired
	var fnOKAfterClose = function () {
		that._selectedItem = that._list.getSelectedItem();
		that._selectedItems = that._list.getSelectedItems();

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

// store a reference to the cancel button
sap.m.SelectDialog.prototype.getCancelButton = function () {
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
		this._cancelButton = new sap.m.Button(this.getId() + "-cancel", {
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

// setup multiselect options
sap.m.SelectDialog.prototype.setMultiSelect = function (bMulti) {
	this.setProperty("multiSelect", bMulti, true);
	if(bMulti){
		this._list.setMode(sap.m.ListMode.MultiSelect); 
		this._list.setIncludeItemInSelection(true);
		this._dialog.setEndButton(this.getCancelButton());
		this._dialog.setBeginButton(this.getOkButton());
	} else {
		this._list.setMode(sap.m.ListMode.SingleSelectMaster); 
		this._dialog.setBeginButton(this.getCancelButton());
	}
}

/**
 * Set the title of the internal dialog
 * @overwrite
 * @public
 * @param {string} sTitle the title text for the dialog
 */
sap.m.SelectDialog.prototype.setTitle = function (sTitle) {
	this._dialog.setTitle(sTitle);
	this.setProperty("title", sTitle, true);	
};

/**
 * Set the no data text of the internal list
 * @overwrite
 * @public
 * @param {string} sNoDataText the no data text for the list
 */
sap.m.SelectDialog.prototype.setNoDataText = function (sNoDataText) {
	this._list.setNoDataText(sNoDataText);
	this.setProperty("noDataText", sNoDataText, true);	
};

/* =========================================================== */
/*           begin: forward aggregation  methods to List       */
/* =========================================================== */

/*
 * Set the model for the internal list AND the current control so that 
 * both controls can be used with data binding
 * @overwrite
 * @public
 * @param {sap.ui.Model} oModel the model that holds the data for the list
 * @param {string} sName the optional model name
 */
sap.m.SelectDialog.prototype._setModel = sap.m.SelectDialog.prototype.setModel;
sap.m.SelectDialog.prototype.setModel = function (oModel, sName) {
	var args = Array.prototype.slice.call(arguments),
		result;

	// pass the model to the list
	result = this._list.setModel(oModel, sName);
	
	// we made a request in this control, so we update the counter
	this._listUpdateRequested += 1;

	// attach events to listen to model updates and show/hide a busy indicator
	oModel.attachRequestSent(this._requestSent, this);
	oModel.attachRequestCompleted(this._requestCompleted, this);

	// and also to the local control to allow binding of own properties
	return result && sap.m.SelectDialog.prototype._setModel.apply(this, args);
};

/*
 * Forwards a function call to a managed object based on the aggregation name.
 * If the name is items, it will be forwarded to the list, otherwise called locally
 * @private
 * @param {string} sFunctionName the name of the function to be called
 * @param {string} sAggregationName the name of the aggregation asociated
 */
sap.m.SelectDialog.prototype._callMethodInManagedObject = function (sFunctionName, sAggregationName) {
	var args = Array.prototype.slice.call(arguments);

	if (sAggregationName === "items") { // apply to the internal list
		return this._list[sFunctionName].apply(this._list, args.slice(1));
	} else { // apply to this control
		return sap.ui.base.ManagedObject.prototype[sFunctionName].apply(this, args.slice(1));
	}
};

/**
 * Forwards aggregations with the name of items to the internal list.
 * Additionally adds a default click handler and the active state to list items 
 * because the list's select event is only fired when a list selection has been done.
 * @overwrite
 * @public
 * @param {string} sName the name for the binding
 * @param {object} oBindingInfo the configuration parameters for the binding
 */
sap.m.SelectDialog.prototype.bindAggregation = function (sName, oBindingInfo) {
	var args = Array.prototype.slice.call(arguments),
		result;

	// propagate the bind aggregation function to list
	result = this._callMethodInManagedObject.apply(this, ["bindAggregation"].concat(args));

	// return for stringing
	return result;
};

sap.m.SelectDialog.prototype.validateAggregation = function (sAggregationName, oObject, bMultiple) {
	return this._callMethodInManagedObject("validateAggregation", sAggregationName, oObject, bMultiple);
};

sap.m.SelectDialog.prototype.setAggregation = function (sAggregationName, oObject, bSuppressInvalidate) {
	this._callMethodInManagedObject("setAggregation", sAggregationName, oObject, bSuppressInvalidate);
	return this;
};

sap.m.SelectDialog.prototype.getAggregation = function (sAggregationName, oDefaultForCreation) {
	return this._callMethodInManagedObject("getAggregation", sAggregationName, oDefaultForCreation);
};

sap.m.SelectDialog.prototype.indexOfAggregation = function (sAggregationName, oObject) {
	return this._callMethodInManagedObject("indexOfAggregation", sAggregationName, oObject);
};

sap.m.SelectDialog.prototype.insertAggregation = function (sAggregationName, oObject, iIndex, bSuppressInvalidate) {
	this._callMethodInManagedObject("insertAggregation", sAggregationName, oObject, iIndex, bSuppressInvalidate);
	return this;
};

sap.m.SelectDialog.prototype.addAggregation = function (sAggregationName, oObject, bSuppressInvalidate) {
	this._callMethodInManagedObject("addAggregation", sAggregationName, oObject, bSuppressInvalidate);
	return this;
};

sap.m.SelectDialog.prototype.removeAggregation = function (sAggregationName, oObject, bSuppressInvalidate) {
	return this._callMethodInManagedObject("removeAggregation", sAggregationName, oObject, bSuppressInvalidate);
};

sap.m.SelectDialog.prototype.removeAllAggregation = function (sAggregationName, bSuppressInvalidate) {
	return this._callMethodInManagedObject("removeAllAggregation", sAggregationName, bSuppressInvalidate);
};

sap.m.SelectDialog.prototype.destroyAggregation = function (sAggregationName, bSuppressInvalidate) {
	this._callMethodInManagedObject("destroyAggregation", sAggregationName, bSuppressInvalidate);
	return this;
};

sap.m.SelectDialog.prototype.getBinding = function (sName) {
     return this._callMethodInManagedObject("getBinding", sName);
};

sap.m.SelectDialog.prototype.getBindingContext = function (sName) {
     return this._callMethodInManagedObject("getBindingContext", sName);
};

sap.m.SelectDialog.prototype.getBindingInfo = function (sName) {
     return this._callMethodInManagedObject("getBindingInfo", sName);
};

sap.m.SelectDialog.prototype.getBindingPath = function (sName) {
     return this._callMethodInManagedObject("getBindingPath", sName);
};

sap.m.SelectDialog.prototype.setBindingContext = function (oContext, sName) {
     this._callMethodInManagedObject("setBindingContext", oContext, sName);
     return this;
};

sap.m.SelectDialog.prototype.setBindingContext = function (oContext, sName) {
     this._callMethodInManagedObject("setBindingContext", oContext, sName);
     return this;
};


/* =========================================================== */
/*           end: forward aggregation  methods to List       */
/* =========================================================== */

/* =========================================================== */
/*           begin: internal methods and properties            */
/* =========================================================== */

/*
 * fires the search event on the internal when dialog is opened. 
 * This function is called whenever a search related parameter or the value in the search field is changed 
 * @private
 * @param {string} sValue the new filter value or undefined if called by management functions
 * @param {string} sEventType the search field event type that has been called (liveChange / search)
 */
sap.m.SelectDialog.prototype._executeSearch = function (sValue, sEventType) {
	var list = this._list,
		listBinding = (list ? list.getBinding("items") : undefined),
		searchValueDifferent = (this._searchFieldValue !== sValue); // to prevent unwanted duplicate requests

	                // fire either the Search event or the liveChange event when dialog is opened.
                // 1) when the clear icon is called then both liveChange and search events are fired but we only want to process the first one
                // 2) when a livechange has been triggered by typing we don't want the next search event to be processed (typing + enter or typing + search button)
                if (this._dialog.isOpen() && ((searchValueDifferent && sEventType === "liveChange") || sEventType === "search")) {
                     // set the internal value to the passed value to check if the same value has already been filtered (happens when clear is called, it fires liveChange and change events)
                     this._searchFieldValue = sValue;

                       // only set when the binding has already been executed
                       if (listBinding) {
                             // we made another request in this control, so we update the counter
                             this._ListUpdateRequested += 1;
                                               
                             if (sEventType == "search") {
                                // fire the search so the data can be updated externally
                                this.fireSearch({value: sValue, itemsBinding: listBinding});
                                } else if (sEventType == "liveChange") {
                                // fire the liveChange so the data can be updated externally                                                         
                                this.fireLiveChange({value: sValue, itemsBinding: listBinding});
                            }
                      }
                }
                // store the last event type for the next check
                this._searchFieldLastEventType = sEventType;
};

/*
 * Event function that is called when the model sent a request to update the data.
 * It shows a busy indicator and hides searchField and list in the dialog. 
 * @private
 * @param {jQuery.EventObject} oEvent The event object
 */
sap.m.SelectDialog.prototype._requestSent = function (oEvent) {
	if (this._dialog.isOpen() && this._listUpdateRequested) { // check if the event was caused by our control
		if (this._firstRequest) { // also hide the header bar for the first request
			this._subHeader.$().css('display', 'none');
		}
		this._list.addStyleClass('sapMSelectDialogListHide');
		this._busyIndicator.$().css('display', 'inline-block');
	}
};

/*
 * Event function that is called when the model request is finished.
 * It hides the busy indicator and shows searchField and list in the dialog. 
 * @private
 * @param {jQuery.EventObject} oEvent The event object
 */
sap.m.SelectDialog.prototype._requestCompleted = function (oEvent) {
	if (this._dialog.isOpen() && this._listUpdateRequested) { // check if there are still open requests from this control
		if (this._firstRequest) { // also show the header bar again for the first request
			this._subHeader.$().css('display', 'block');
			this._firstRequest = false;
		}
		this._list.removeStyleClass('sapMSelectDialogListHide');
		this._busyIndicator.$().css('display', 'none');
		// we received a request (from this or from another control) so we decrease the counter
		this._listUpdateRequested -= 1;
	}
};

/*
* Invalidates the dialog instead of this control (we don't have a renderer)
* @overwrite
* @public
*/
sap.m.SelectDialog.prototype.invalidate = function () {
       if(this._dialog) {
             this._dialog.invalidate(arguments);
       }
};

/* =========================================================== */
/*           end: internal methods                             */
/* =========================================================== */
