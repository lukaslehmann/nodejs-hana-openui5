/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.FacetFilter.
jQuery.sap.declare("sap.m.FacetFilter");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new FacetFilter.
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
 * <li>{@link #getType type} : sap.m.FacetFilterType (default: sap.m.FacetFilterType.Simple)</li>
 * <li>{@link #getVisible visible} : boolean (default: true)</li>
 * <li>{@link #getShowPersonalization showPersonalization} : boolean (default: false)</li>
 * <li>{@link #getShowSummaryBar showSummaryBar} : boolean (default: false)</li>
 * <li>{@link #getShowReset showReset} : boolean (default: true)</li>
 * <li>{@link #getLiveSearch liveSearch} : boolean (default: true)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getLists lists} : sap.m.FacetFilterList[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.FacetFilter#event:reset reset} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * FacetFilter is used to provide filtering functionality with multiple parameters.
 * @extends sap.ui.core.Control
 *
 * @author  
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor   
 * @public
 * @since 1.16.0
 * @name sap.m.FacetFilter
 */
sap.ui.core.Control.extend("sap.m.FacetFilter", { metadata : {

	// ---- object ----
	publicMethods : [
		// methods
		"openFilterDialog"
	],

	// ---- control specific ----
	library : "sap.m",
	properties : {
		"type" : {type : "sap.m.FacetFilterType", group : "Appearance", defaultValue : sap.m.FacetFilterType.Simple},
		"visible" : {type : "boolean", group : "Appearance", defaultValue : true},
		"showPersonalization" : {type : "boolean", group : "Behavior", defaultValue : false},
		"showSummaryBar" : {type : "boolean", group : "Behavior", defaultValue : false},
		"showReset" : {type : "boolean", group : "Behavior", defaultValue : true},
		"liveSearch" : {type : "boolean", group : "Behavior", defaultValue : true}
	},
	defaultAggregation : "lists",
	aggregations : {
    	"lists" : {type : "sap.m.FacetFilterList", multiple : true, singularName : "list"}
	},
	events : {
		"reset" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.FacetFilter with name <code>sClassName</code> 
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
 * @name sap.m.FacetFilter.extend
 * @function
 */

sap.m.FacetFilter.M_EVENTS = {'reset':'reset'};


/**
 * Getter for property <code>type</code>.
 * This property defines the default appearance of the FacetFilter on the device.
 * 
 *
 * Default value is <code>Simple</code>
 *
 * @return {sap.m.FacetFilterType} the value of property <code>type</code>
 * @public
 * @name sap.m.FacetFilter#getType
 * @function
 */

/**
 * Setter for property <code>type</code>.
 *
 * Default value is <code>Simple</code> 
 *
 * @param {sap.m.FacetFilterType} oType  new value for property <code>type</code>
 * @return {sap.m.FacetFilter} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilter#setType
 * @function
 */


/**
 * Getter for property <code>visible</code>.
 * Invisible facet filters are not rendered.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visible</code>
 * @public
 * @name sap.m.FacetFilter#getVisible
 * @function
 */

/**
 * Setter for property <code>visible</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisible  new value for property <code>visible</code>
 * @return {sap.m.FacetFilter} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilter#setVisible
 * @function
 */


/**
 * Getter for property <code>showPersonalization</code>.
 * Shows buttons to add/remove facets from the filter in Light
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>showPersonalization</code>
 * @public
 * @name sap.m.FacetFilter#getShowPersonalization
 * @function
 */

/**
 * Setter for property <code>showPersonalization</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bShowPersonalization  new value for property <code>showPersonalization</code>
 * @return {sap.m.FacetFilter} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilter#setShowPersonalization
 * @function
 */


/**
 * Getter for property <code>showSummaryBar</code>.
 * Shows the summary bar instead of the facet filter buttons bar when set to true.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>showSummaryBar</code>
 * @public
 * @name sap.m.FacetFilter#getShowSummaryBar
 * @function
 */

/**
 * Setter for property <code>showSummaryBar</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bShowSummaryBar  new value for property <code>showSummaryBar</code>
 * @return {sap.m.FacetFilter} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilter#setShowSummaryBar
 * @function
 */


/**
 * Getter for property <code>showReset</code>.
 * Show or hide the filter reset button.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>showReset</code>
 * @public
 * @name sap.m.FacetFilter#getShowReset
 * @function
 */

/**
 * Setter for property <code>showReset</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bShowReset  new value for property <code>showReset</code>
 * @return {sap.m.FacetFilter} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilter#setShowReset
 * @function
 */


/**
 * Getter for property <code>liveSearch</code>.
 * Enable/disable live search on all search fields except for the facet list search.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>liveSearch</code>
 * @public
 * @name sap.m.FacetFilter#getLiveSearch
 * @function
 */

/**
 * Setter for property <code>liveSearch</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bLiveSearch  new value for property <code>liveSearch</code>
 * @return {sap.m.FacetFilter} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilter#setLiveSearch
 * @function
 */


/**
 * Getter for aggregation <code>lists</code>.<br/>
 * A collection of facet filter lists. Each list contains a collection of filter values.
 * 
 * @return {sap.m.FacetFilterList[]}
 * @public
 * @name sap.m.FacetFilter#getLists
 * @function
 */


/**
 * Inserts a list into the aggregation named <code>lists</code>.
 *
 * @param {sap.m.FacetFilterList}
 *          oList the list to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the list should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the list is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the list is inserted at 
 *             the last position        
 * @return {sap.m.FacetFilter} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilter#insertList
 * @function
 */

/**
 * Adds some list <code>oList</code> 
 * to the aggregation named <code>lists</code>.
 *
 * @param {sap.m.FacetFilterList}
 *            oList the list to add; if empty, nothing is inserted
 * @return {sap.m.FacetFilter} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilter#addList
 * @function
 */

/**
 * Removes an list from the aggregation named <code>lists</code>.
 *
 * @param {int | string | sap.m.FacetFilterList} vList the list to remove or its index or id
 * @return {sap.m.FacetFilterList} the removed list or null
 * @public
 * @name sap.m.FacetFilter#removeList
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>lists</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.m.FacetFilterList[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.FacetFilter#removeAllLists
 * @function
 */

/**
 * Checks for the provided <code>sap.m.FacetFilterList</code> in the aggregation named <code>lists</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.m.FacetFilterList}
 *            oList the list whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.FacetFilter#indexOfList
 * @function
 */
	

/**
 * Destroys all the lists in the aggregation 
 * named <code>lists</code>.
 * @return {sap.m.FacetFilter} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilter#destroyLists
 * @function
 */


/**
 * Event is fired when reset button is pressed to inform that filters need to be reset. 
 *
 * @name sap.m.FacetFilter#reset
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'reset' event of this <code>sap.m.FacetFilter</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.FacetFilter</code>.<br/> itself. 
 *  
 * Event is fired when reset button is pressed to inform that filters need to be reset. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.FacetFilter</code>.<br/> itself.
 *
 * @return {sap.m.FacetFilter} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilter#attachReset
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'reset' event of this <code>sap.m.FacetFilter</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.FacetFilter} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilter#detachReset
 * @function
 */

/**
 * Fire event reset to attached listeners.

 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.FacetFilter} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.FacetFilter#fireReset
 * @function
 */


/**
 * Opens the facet filter dialog.
 *
 * @name sap.m.FacetFilter.prototype.openFilterDialog
 * @function

 * @type void
 * @public
 */


// Start of sap\m\FacetFilter.js
/**
 * This file defines behavior for the control,
 */

jQuery.sap.require("sap.ui.core.IconPool");
jQuery.sap.require("sap.ui.core.Icon");

sap.m.FacetFilter.SCROLL_STEP = 264; // how many pixels to scroll with every overflow arrow click

sap.m.FacetFilter.prototype.init = function() {

	var that = this;
	this._lastScrolling = false; // last state of scrolling - using during rendering
	this._bPreviousScrollForward = false; // remember the item overflow state
	this._bPreviousScrollBack = false;
	this._bNavigationInProgress = false;
	this._bOkPressedDuringNavigate = false;
	this._bRtl = sap.ui.getCore().getConfiguration().getRTL();

	if (jQuery.sap.touchEventMode === "ON" && !jQuery.device.is.phone) {
		this._enableTouchSupport();
	}

	this._bundle = sap.ui.getCore().getLibraryResourceBundle("sap.m");

	this._bOpenDialogInLiteFlow = true;

	this._resetIcon = new sap.ui.core.Icon(this.getId() + "-rb", {
		src : sap.ui.core.IconPool.getIconURI("undo"),
		press : function(oEvent) {

			that._handleResetPress(oEvent);
		}
	});

	this._facetAddIcon = new sap.ui.core.Icon(this.getId() + "-add", {

		src : sap.ui.core.IconPool.getIconURI("add"),
		press : function(oEvent) {

			that._displayFacetDialog(oEvent);
		}
	});
	this._facetAddIcon.addStyleClass("sapMFFAddIcon");

	var bSummaryBarActive = this._getType() === sap.m.FacetFilterType.Light ? true : false;
	this._summaryBarText = new sap.m.Text(this.getId() + "-summaryBarTxt", {
		maxLines : 1
	});

	this._summaryBar = new sap.m.Toolbar(this.getId() + "-summaryBar", {
		content : [ this._summaryBarText, this._resetIcon ],
		active : bSummaryBarActive,
		press : function(oEvent) {

			that._handleSummaryBarPress(oEvent);
		}
	});

	var oStandardListItemTemplate = new sap.m.StandardListItem({
		title : "{text}",
		selected : "{selected}",
		counter : "{count}",
		customData : [ new sap.ui.core.CustomData({
			key : "index",
			value : "{index}"
		}) ]
	});

	this._facetList = new sap.m.List(this.getId() + "-facetlist", {
		mode : sap.m.ListMode.SingleSelectMaster,
		items : {
			path : "/items",
			template : oStandardListItemTemplate
		},
		selectionChange : function(oEvent) {

			that._selectFacet(oEvent);
		}
	});

	this._itemsList = new sap.m.List(this.getId() + "-itemlist", {
		mode : sap.m.ListMode.MultiSelect,
		rememberSelections: false,
		selectionChange : function(oEvent) {

			that._handleSelectionChange(oEvent);
		},
		includeItemInSelection : true,
		updateFinished : function(oEvent) {

			that._updateFinished(oEvent);
		}
	});

	var oFacetsSearchField = new sap.m.SearchField(this.getId() + "-facetsSearchField", {
		width : "100%",
		placeholder : this._bundle.getText("FACETFILTER_SEARCH"),
		liveChange : function(oEvent) {

			var binding = that._facetList.getBinding("items");
			if (binding) {
				var filter = new sap.ui.model.Filter("text", sap.ui.model.FilterOperator.Contains, this.getValue());
				binding.filter([ filter ]);
			}
		}
	});

	this._itemsSearchField = new sap.m.SearchField(this.getId() + "-itemsSearchField", {
		width : "100%",
		placeholder : this._bundle.getText("FACETFILTER_SEARCH"),
		search : function(oEvent) {

			that._handleItemsListLiveChange();
		}
	});

	this._cbSelectAll = new sap.m.CheckBox(this.getId() + "-selectAll", {
		selected : true,
		text : this._bundle.getText("FACETFILTER_ALL", [ "" ]),
		select : function(oEvent) {

			if (!oEvent.getParameter("selected")) {
				this.setSelected(that.getLists()[that._currentFacetIndex].getActive());
			} else {
				that._itemsList.removeSelections(true);
				that._deselectAll();
			}
		}
	});

	this._navcon = new sap.m.NavContainer(this.getId() + "-navcon", {

		navigate : function() {

			that._bNavigationInProgress = true;
		},
		afterNavigate : function() {

			that._bNavigationInProgress = false;

			if (that._bOkPressedDuringNavigate) {
				that._bOkPressedDuringNavigate = false;
				that._pressDialogOk();
			}
		},
		pages : [ new sap.m.Page(this.getId() + "-filter", {
			enableScrolling : true,
			title : this._bundle.getText("FACETFILTER_TITLE"),
			subHeader : new sap.m.Bar({
				contentMiddle : oFacetsSearchField
			}),
			content : [ this._facetList ]
		}), new sap.m.Page(this.getId() + "-item", {
			showNavButton : true,
			enableScrolling : true,
			subHeader : new sap.m.Bar({
				contentMiddle : this._itemsSearchField
			}),
			content : [ this._cbSelectAll, this._itemsList ],
			navButtonPress : function(oEvent) {

				that._pressDialogNavBack(oEvent);
			}
		}) ]
	});

	this._dialog = new sap.m.Dialog(this.getId() + "-dialog", {
		showHeader : false,
		content : this._navcon,
		stretchOnPhone : true,
		afterClose : function() {

			that._updateSummaryBar();
		},
		beginButton : new sap.m.Button(this.getId() + "-dialog-okbtn", {
			text : this._bundle.getText("FACETFILTER_ACCEPT"),
			press : function() {

				that._pressDialogOk();
			}
		}),
		contentHeight : "500px"
	});

	var bLiveSearch = this.getProperty("liveSearch");
	this.setLiveSearch(bLiveSearch);
};

/**
 * @private
 */
sap.m.FacetFilter.prototype._setItemsFilter = function(value) {

	var binding = this._itemsList.getBinding("items");
	var path = this._itemsList.getBindingInfo("items").template.getBindingInfo("title").parts[0].path;
	if (binding && path) {
		var filter = new sap.ui.model.Filter(path, sap.ui.model.FilterOperator.Contains, value);
		binding.filter([ filter ]);
		this._setCBSelectAll();
	}
};

/**
 * afterRendering
 */
sap.m.FacetFilter.prototype.onAfterRendering = function() {

	if (!jQuery.device.is.phone) {
		var oHead = jQuery.sap.domById(this.getId() + "-head");
		var $bar = this.$();

		sap.ui.getCore().attachIntervalTimer(jQuery.proxy(this._checkOverflow, this, oHead, $bar), this); // proxy() is needed for the additional parameters, not for "this"
	}
};

sap.m.FacetFilter.prototype.openFilterDialog = function() {

	this._displayFacetDialog();
};

/**
 * Called wher navigate back to facets is clicked in the dialog.
 * 
 * @private
 */
sap.m.FacetFilter.prototype._pressDialogNavBack = function(oEvent) {

	this._applyDialogSelection();
	this._facetList.setSelectedItem(this._facetList.getSelectedItem(), false);
	this._navcon.back(this.getId() + "-filter");
	var oItemsSearchField = sap.ui.getCore().byId(this.getId() + "-itemsSearchField");
	oItemsSearchField.setValue();
};

/**
 * Save current facet filter list selection to the model and fire ListCloseEvent.
 * 
 * @private
 */
sap.m.FacetFilter.prototype._applyDialogSelection = function() {

	if (this._navcon.getCurrentPage().getId() === this.getId() + "-item") {
		// cached facet items;
		var oFacetFilterList = this.getLists()[this._currentFacetIndex];
		var sModelName = oFacetFilterList._modelName;
		var aFacetFilterItems = oFacetFilterList.getItems();
		var aListItems = this._itemsList.getItems();
		var bSelected = false;

		if (oFacetFilterList.getMultiSelect()) {
			bSelected = this._cbSelectAll.getSelected();
		}

		jQuery.each(aListItems, function(index, value) {

			if (!value.getBindingInfo("selected")) {
				for ( var i = index; i < aFacetFilterItems.length; i++) {
					if (value.getBindingContext(sModelName) && value.getBindingContext(sModelName).getPath()) {
						var path = value.getBindingContext(sModelName).getPath();
						if (aFacetFilterItems[i].getBindingContext(sModelName) && aFacetFilterItems[i].getBindingContext(sModelName).getPath() === path) {
							bSelected = bSelected || value.getSelected();
							aFacetFilterItems[i].setSelected(value.getSelected());
							break;
						}
					}
				}
			}
		});

		// Now we need to again go through the items and see if any are selected that were filtered out via search of the list
		// at the time the user dismissed the dialog.
		if (!bSelected) {
			for ( var i = 0; i < aFacetFilterItems.length; i++) {
				bSelected = aFacetFilterItems[i].getSelected();
				if (bSelected) {
					break;
				}
			}
		}

		if (bSelected) {
			oFacetFilterList.setActive(true);
			oFacetFilterList._fireListCloseEvent();
		}
	}
};

/**
 * @private
 */
sap.m.FacetFilter.prototype._pressDialogOk = function(oEvent) {

	if (this._bNavigationInProgress) {
		this._bOkPressedDuringNavigate = true;
		return;
	}

	this._applyDialogSelection();
	this._dialog.close();

	sap.ui.getCore().byId(this.getId() + "-facetsSearchField").setValue();
	sap.ui.getCore().byId(this.getId() + "-itemsSearchField").setValue();
};

/**
 * @private
 */
sap.m.FacetFilter.prototype._copySelectionToItemsList = function() {

	var aListItems = this._itemsList.getItems();
	var oFacetFilterList = this.getLists()[this._currentFacetIndex];
	var aFacetFilterItems = oFacetFilterList.getItems();
	var sModelName = oFacetFilterList._modelName;
	var lastIndex = 0;

	jQuery.each(aFacetFilterItems, function(index, value) {

		if (!value.getBindingInfo("selected")) {
			for ( var i = lastIndex; i < aListItems.length; i++) {
				if (value.getBindingContext(sModelName) && value.getBindingContext(sModelName).getPath()) {
					var path = value.getBindingContext(sModelName).getPath();
					if (aListItems[i].getBindingContext(sModelName) && aListItems[i].getBindingContext(sModelName).getPath() === path) {
						aListItems[i].setSelected(value.getSelected());
						lastIndex = i;
						break;
					}
				}
			}
		}
	});
};

/**
 * @private
 */
sap.m.FacetFilter.prototype._deselectAll = function(oEvent) {

	var aFacetFilterItems = this.getLists()[this._currentFacetIndex].getItems();

	jQuery.each(aFacetFilterItems, function(index, value) {

		value.setProperty("selected", false, true);
	});
};

/**
 * @private
 */
sap.m.FacetFilter.prototype._handleSelectionChange = function(oEvent) {

	var values = oEvent.getParameters().listItems;
	var oFacetFilterList = this.getLists()[this._currentFacetIndex];
	var aFacetFilterItems = oFacetFilterList.getItems();
	var sModelName = oFacetFilterList._modelName;

	jQuery.each(values, function(index, value) {

		if (value && !value.getBindingInfo("selected")) {
			var path = value.getBindingContext(sModelName).getPath();
			var bSingleSelect = !oFacetFilterList.getMultiSelect();
			var bFound = false;
			for ( var i = 0; i < aFacetFilterItems.length; i++) {
				if (!bFound && aFacetFilterItems[i].getBindingContext(sModelName).getPath() === path) {
					aFacetFilterItems[i].setProperty("selected", oEvent.getParameters().selected, true);
					bFound = true;
				} else if (bSingleSelect) {
					aFacetFilterItems[i].setProperty("selected", false, true);
				}
			}
		}
	});

	this._setCBSelectAll();
};

/**
 * @private
 */
sap.m.FacetFilter.prototype._updateFinished = function(oEvent) {

	this._copySelectionToItemsList();
};

/**
 * @private
 */
sap.m.FacetFilter.prototype._selectFacet = function(oEvent) {

	var listItem = oEvent.getParameter("listItem");
	this._currentFacetIndex = this._getIndex(listItem);
	var index = this._currentFacetIndex;
	var oFacetFilterList = this.getLists()[index];

	var FF = this;
	FF._itemsList.setGrowing(oFacetFilterList.getGrowing());
	FF._itemsList.setGrowingThreshold(oFacetFilterList.getGrowingThreshold());
	FF._itemsList.setGrowingTriggerText(oFacetFilterList.getGrowingTriggerText());

	oFacetFilterList._modelSync = function(oModel) {

		FF._itemsList.setModel(oModel);
		FF._itemsList.setBindingContext(this._list.getBindingContext());

		var oListBindingInfo = {
			path : this._list.getBindingInfo("items").path,
			template : this._list.getBindingInfo("items").template
		};

		FF._itemsList.bindAggregation("items", oListBindingInfo);

		// TODO set default search path
		// this._defaultSearchPath = oTextBinding.parts[0].path;

		var FFL = this;
		FF._copySelectionToItemsList();
		FF._itemsList._ffList = FFL;
		FF._setCBSelectAll();
	};

	oFacetFilterList.fireListOpen({});

	this._navcon.getPages()[1].setTitle(oFacetFilterList.getTitle());

	this._cbSelectAll.setVisible(oFacetFilterList.getMultiSelect());
	this._itemsList.setMode(oFacetFilterList.getMultiSelect() ? sap.m.ListMode.MultiSelect : sap.m.ListMode.SingleSelectMaster);

	// bind the model to the list
	var oFFLModel = oFacetFilterList._list.getBindingContext() && oFacetFilterList._list.getBindingContext().getModel() || oFacetFilterList._list.getModel();

	if (oFFLModel) {

		this._itemsList.setModel(oFFLModel);
		this._itemsList.setBindingContext(oFacetFilterList._list.getBindingContext());

		var oListBindingInfo = {
			path : oFacetFilterList._list.getBindingInfo("items").path,
			template : oFacetFilterList._list.getBindingInfo("items").template
		};

		this._itemsList.bindAggregation("items", oListBindingInfo);

		// TODO set default search path
		// this._defaultSearchPath = oTextBinding.parts[0].path;
		this._copySelectionToItemsList();

		this._itemsList._ffList = oFacetFilterList;
		this._setCBSelectAll();
	} else {
		// Model has not been set on the FacetFilterList internal list, so the dialog is the first to load it.
		// The model and binding are set with the callback _modelSync.

		// Make sure we clear previously loaded items (from a different list) so they are not shown
		// for the current facet list selection
		if (this._itemsList._ffList && (this._itemsList._ffList != oFacetFilterList)) {

			this._itemsList.setModel(new sap.ui.model.json.JSONModel());
		}
	}

	this._navcon.to(this.getId() + "-item");
};

/**
 * @private
 */
sap.m.FacetFilter._getFacetIndex = function(list, listItem) {

	var items = list.getItems();
	for ( var i = 0; i < items.length; i++) {
		if (items[i].getId() === listItem.getId()) {
			return i;
		}
	}
	return -1;
};

/**
 * @private
 */
sap.m.FacetFilter.prototype._displayFacetDialog = function(oEvent) {

	this._aFacetFilterLists = [];

	for ( var i = 0; i < this.getLists().length; i++) {
		var oList = this.getLists()[i];

		this._aFacetFilterLists.push({
			text : oList.getTitle(),
			count : oList.getAllCount(),
			index : i
		});
	}
	// Unselect the All item if any of the filter items are selected
	var jsonModel = new sap.ui.model.json.JSONModel({
		items : this._aFacetFilterLists
	});
	this._facetList.setModel(jsonModel);

	this._dialog.open();
	this._navcon.backToTop();
};

sap.m.FacetFilter.prototype.exit = function() {

	if (!jQuery.device.is.phone) {
		sap.ui.getCore().detachIntervalTimer(this._checkOverflow, this);
	}

	if (this._facetAddIcon) {
		this._facetAddIcon.destroy();
		this._facetAddIcon = undefined;
	}

	if (this._summaryBar) {
		this._summaryBar.destroy();
		this._summaryBar = undefined;
	}

	if (this._oArrowLeft) {
		this._oArrowLeft.destroy();
		this._oArrowLeft = undefined;
	}
	if (this._oArrowRight) {
		this._oArrowRight.destroy();
		this._oArrowRight = undefined;
	}

	if (this._dialog) {
		this._dialog.destroy();
		this._dialog = undefined;
	}
};

/**
 * Returns the localized text about selected filters to display on the summary bar.
 * 
 * @private
 */
sap.m.FacetFilter.prototype.getSummaryText = function() {

	var COMMA_AND_SPACE = ", ";
	var SPACE = " ";
	var sFinalSummaryText = "";
	var bFirst = true;

	var aListOfFilters = this.getLists();

	if (aListOfFilters && aListOfFilters.length > 0) {

		for ( var i = 0; i < aListOfFilters.length; i++) {
			var oFacet = aListOfFilters[i];

			if (oFacet.getActive()) {
				var aListOfItems = oFacet.getSelectedItems();
				var sText = "";
				for ( var j = 0; j < aListOfItems.length; j++) {
					sText = sText + aListOfItems[j].getText() + COMMA_AND_SPACE;
				}

				if (sText) {
					sText = sText.substring(0, sText.lastIndexOf(COMMA_AND_SPACE)).trim();

					if (bFirst) {
						sFinalSummaryText = this._bundle.getText("FACETFILTER_INFOBAR_FILTERED_BY", [ oFacet.getTitle(), sText ]);
						bFirst = false;
					} else {
						sFinalSummaryText = sFinalSummaryText + SPACE + this._bundle.getText("FACETFILTER_INFOBAR_AND") + SPACE
								+ this._bundle.getText("FACETFILTER_INFOBAR_AFTER_AND", [ oFacet.getTitle(), sText ]);
					}
				}
			}
		}
	}

	if (!sFinalSummaryText) {
		sFinalSummaryText = this._bundle.getText("FACETFILTER_INFOBAR_NO_FILTERS");
	}

	if (!sFinalSummaryText) {
		sFinalSummaryText = this._bundle.getText("FACETFILTER_INFOBAR_NO_FILTERS");
	}
	return sFinalSummaryText;
};

/**
 * Handle the press event on the summary bar
 * 
 * @private
 */
sap.m.FacetFilter.prototype._handleSummaryBarPress = function(oEvent) {

	if (this._bOpenDialogInLiteFlow) {
		this.openFilterDialog();
	}

	this._bOpenDialogInLiteFlow = true;
};
/**
 * Returns arrows for the carousel
 * 
 * @param sName
 *            direction name "right" or "left"
 * @returns sap.ui.core.Icon
 */
sap.m.FacetFilter.prototype._getScrollingArrow = function(sName) {

	var mProperties = {
		src : "sap-icon://navigation-" + sName + "-arrow"
	};
	var aCssClassesToAddLeft = [ "sapMPointer", "sapMFFArrowScroll", "sapMFFArrowScrollLeft" ];
	var aCssClassesToAddRight = [ "sapMPointer", "sapMFFArrowScroll", "sapMFFArrowScrollRight" ];

	if (sName === "left") {
		if (!this._oArrowLeft) {
			this._oArrowLeft = sap.m.ImageHelper.getImageControl(this.getId() + "-arrowScrollLeft", this._oArrowLeft, this, mProperties, aCssClassesToAddLeft);
		}
		return this._oArrowLeft;
	}
	if (sName === "right") {
		if (!this._oArrowRight) {
			this._oArrowRight = sap.m.ImageHelper.getImageControl(this.getId() + "-arrowScrollRight", this._oArrowRight, this, mProperties, aCssClassesToAddRight);
		}
		return this._oArrowRight;
	}
};

sap.m.FacetFilter.prototype._checkScrolling = function(oHead, $bar) {

	var bScrolling = false;

	// check if there are more tabs as displayed
	if (oHead) {
		if (oHead.scrollWidth > oHead.clientWidth) {
			// scrolling possible
			bScrolling = true;
		}
	}

	$bar.toggleClass("sapMFFScrolling", bScrolling);
	$bar.toggleClass("sapMFFNoScrolling", !bScrolling);
	this._lastScrolling = bScrolling;
};

/**
 * Changes the state of the scroll arrows depending on whether they are required due to overflow.
 * 
 * @private
 */
sap.m.FacetFilter.prototype._checkOverflow = function(oBarHead, $bar) {

	this._checkScrolling(oBarHead, $bar);
	if (oBarHead) {
		var iScrollLeft = oBarHead.scrollLeft;

		// check whether scrolling to the left is possible
		var bScrollBack = false;
		var bScrollForward = false;

		var realWidth = oBarHead.scrollWidth;
		var availableWidth = oBarHead.clientWidth;

		if (Math.abs(realWidth - availableWidth) == 1) { // Avoid rounding issues see CSN 1316630 2013
			realWidth = availableWidth;
		}

		if (!this._bRtl) { // normal LTR mode
			if (iScrollLeft > 0) {
				bScrollBack = true;
			}
			if ((realWidth > availableWidth) && (iScrollLeft + availableWidth < realWidth)) {
				bScrollForward = true;
			}

		} else { // RTL mode
			var $List = jQuery(oBarHead);
			if ($List.scrollLeftRTL() > 0) {
				bScrollForward = true;
			}
			if ($List.scrollRightRTL() > 0) {
				bScrollBack = true;
			}
		}

		// only do DOM changes if the state changed to avoid periodic application of identical values
		if ((bScrollForward != this._bPreviousScrollForward) || (bScrollBack != this._bPreviousScrollBack)) {
			this._bPreviousScrollForward = bScrollForward;
			this._bPreviousScrollBack = bScrollBack;
			$bar.toggleClass("sapMFFNoScrollBack", !bScrollBack);
			$bar.toggleClass("sapMFFNoScrollForward", !bScrollForward);
		}
	}
};

sap.m.FacetFilter.prototype.onclick = function(oEvent) {

	this._handleActivation(oEvent);
};

sap.m.FacetFilter.prototype._handleActivation = function(oEvent) {

	var sTargetId = oEvent.target.id;

	if (sTargetId) {
		var sId = this.getId();

		// For items: do not navigate away! Stay on the page and handle the click in-place. Right-click + "Open in new Tab" still works.
		// For scroll buttons: Prevent IE from firing beforeunload event -> see CSN 4378288 2012
		oEvent.preventDefault();

		if (sTargetId == sId + "-arrowScrollLeft") {
			// scroll back/left button
			this._scroll(-sap.m.FacetFilter.SCROLL_STEP, 500);
		} else if (sTargetId == sId + "-arrowScrollRight") {
			// scroll forward/right button
			this._scroll(sap.m.FacetFilter.SCROLL_STEP, 500);
		}
	}
};

/**
 * Scrolls the items if possible, using an animation.
 * 
 * @param iDelta
 *            how far to scroll
 * @param iDuration
 *            how long to scroll (ms)
 * @private
 */
sap.m.FacetFilter.prototype._scroll = function(iDelta, iDuration) {

	var oDomRef = jQuery.sap.domById(this.getId() + "-head");
	var iScrollLeft = oDomRef.scrollLeft;
	if (!!!sap.ui.Device.browser.internet_explorer && this._bRtl) {
		iDelta = -iDelta;
	} // RTL lives in the negative space
	var iScrollTarget = iScrollLeft + iDelta;
	jQuery(oDomRef).stop(true, true).animate({
		scrollLeft : iScrollTarget
	}, iDuration);
};

/**
 * Handles the press on the reset button.
 * 
 * @private
 */
sap.m.FacetFilter.prototype._handleResetPress = function(oEvent) {

	this.fireReset();
	var aFFLists = this.getLists();
	for ( var i = 0; i < aFFLists.length; i++) {
		aFFLists[i]._getFacetButton().setText(aFFLists[i]._getSelectionText());
	}
	this._bOpenDialogInLiteFlow = true;
	if (this._getShowSummaryBar() && this._summaryBar.getActive()) {
		this._bOpenDialogInLiteFlow = false;
	}
};

/**
 * check the device and return type appropriately
 * 
 * @private
 */
sap.m.FacetFilter.prototype._getType = function() {

	if (jQuery.device.is.phone) {
		return sap.m.FacetFilterType.Light; // Always use light flow for phone
	} else {
		return this.getType();
	}
};

/**
 * updates the summary bar with latest selections
 * 
 * @private
 */
sap.m.FacetFilter.prototype._updateSummaryBar = function() {

	this._summaryBar.getContent()[0].setText(this.getSummaryText());
};

/**
 * check the type and return whether to show summary bar or not appropriately
 * 
 * @private
 */
sap.m.FacetFilter.prototype._getShowSummaryBar = function() {

	if (this._getType() === sap.m.FacetFilterType.Light) {
		return true;
	} else {
		return this.getShowSummaryBar();
	}
};

/**
 * Get index value from StandardListItem custom data
 * 
 * @private
 */
sap.m.FacetFilter.prototype._getIndex = function(oListItem) {

	var customData = oListItem.getCustomData();
	for ( var i = 0; i < customData.length; i++) {
		if (customData[i].getKey() === "index") {
			return customData[i].getValue();
		}
	}
};

/**
 * Get index value from StandardListItem custom data
 * 
 * @private
 */
sap.m.FacetFilter.prototype._getSelectedItems = function() {

	var aFilterItems = this._aFacetFilterLists[this._currentFacetIndex].aItems;
	var aSelectedItems = [];
	for ( var i = 0; i < aFilterItems.length; i++) {
		if (aFilterItems[i].selected) {
			aSelectedItems.push(aFilterItems[i]);
		}
	}
	return aSelectedItems;
};

sap.m.FacetFilter.prototype._enableTouchSupport = function() {

	var that = this;
	var fnTouchStart = function(evt) {

		evt.preventDefault();

		// stop any inertia scrolling
		if (that._iInertiaIntervalId) {
			window.clearInterval(that._iInertiaIntervalId);
		}

		that.startScrollX = jQuery.sap.domById(that.getId() + "-head").scrollLeft;
		that.startTouchX = evt.touches[0].pageX;
		that._bTouchNotMoved = true;
		that._lastMoveTime = new Date().getTime();
	};

	var fnTouchMove = function(evt) {

		var dx = evt.touches[0].pageX - that.startTouchX;

		var oListRef = jQuery.sap.domById(that.getId() + "-head");
		var oldScrollLeft = oListRef.scrollLeft;
		var newScrollLeft = that.startScrollX - dx;
		oListRef.scrollLeft = newScrollLeft;
		that._bTouchNotMoved = false;

		// inertia scrolling: prepare continuation even after touchend by calculating the current velocity
		var dt = new Date().getTime() - that._lastMoveTime;
		that._lastMoveTime = new Date().getTime();
		if (dt > 0) {
			that._velocity = (newScrollLeft - oldScrollLeft) / dt;
		}

		evt.preventDefault();
	};

	var fnTouchEnd = function(evt) {

		if (that._bTouchNotMoved === false) { // swiping ends now
			evt.preventDefault();

			// add some inertia... continue scrolling with decreasing velocity
			var oListRef = jQuery.sap.domById(that.getId() + "-head");
			var dt = 50;
			var endVelocity = Math.abs(that._velocity / 10); // continue scrolling until the speed has decreased to a fraction (v/10 means 11 iterations with slowing-down factor
			// 0.8)
			that._iInertiaIntervalId = window.setInterval(function() {

				that._velocity = that._velocity * 0.80;
				var dx = that._velocity * dt;
				oListRef.scrollLeft = oListRef.scrollLeft + dx;
				if (Math.abs(that._velocity) < endVelocity) {
					window.clearInterval(that._iInertiaIntervalId);
					that._iInertiaIntervalId = undefined;
				}
			}, dt);

		} else if (that._bTouchNotMoved === true) { // touchstart and touchend without move is a click; trigger it directly to avoid the usual delay
			that.onclick(evt);
			evt.preventDefault();
		} else {
			// touchend without corresponding start
			// do nothing special
		}
		that._bTouchNotMoved = undefined;
		that._lastMoveTime = undefined;
	};

	this.ontouchstart = fnTouchStart;
	this.ontouchend = fnTouchEnd;
	this.ontouchmove = fnTouchMove;
};

sap.m.FacetFilter.prototype.addList = function(oFacetFilterList) {

	this.addAggregation("lists", oFacetFilterList);
	oFacetFilterList._setLiveSearch(this.getLiveSearch());
};

sap.m.FacetFilter.prototype.insertList = function(oFacetFilterList, iIndex) {

	this.insertAggregation("lists", oFacetFilterList, iIndex);
	oFacetFilterList._setLiveSearch(this.getLiveSearch());
};

/**
 * @private
 */
sap.m.FacetFilter.prototype._setCBSelectAll = function() {

	var oList = this.getLists()[this._currentFacetIndex];
	if (oList.getMultiSelect()) {
		this._cbSelectAll.setSelected(oList.getSelectedItems().length === 0 && oList.getActive());
	}
};

sap.m.FacetFilter.prototype._handleItemsListLiveChange = function(oEvent) {

	this._setItemsFilter(this._itemsSearchField.getValue());
};

sap.m.FacetFilter.prototype.setLiveSearch = function(bLiveSearch) {

	this.setProperty("liveSearch", bLiveSearch, true);

	if (bLiveSearch) {
		this._itemsSearchField.attachLiveChange(this._handleItemsListLiveChange, this);
	} else {

		this._itemsSearchField.detachLiveChange(this._handleItemsListLiveChange, this);
	}

	var aLists = this.getLists();
	for ( var i = 0; i < aLists.length; i++) {

		aLists[i]._setLiveSearch(bLiveSearch);
	}
};
