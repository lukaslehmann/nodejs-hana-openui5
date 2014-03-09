/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.FacetFilterList.
jQuery.sap.declare("sap.m.FacetFilterList");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new FacetFilterList.
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
 * <li>{@link #getAllCount allCount} : int</li>
 * <li>{@link #getActive active} : boolean (default: true)</li>
 * <li>{@link #getKey key} : string</li>
 * <li>{@link #getMultiSelect multiSelect} : boolean (default: true)</li>
 * <li>{@link #getSequence sequence} : int (default: -1)</li>
 * <li>{@link #getGrowing growing} : boolean (default: true)</li>
 * <li>{@link #getGrowingThreshold growingThreshold} : int (default: 20)</li>
 * <li>{@link #getGrowingTriggerText growingTriggerText} : string</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getItems items} : sap.m.FacetFilterItem[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.FacetFilterList#event:listOpen listOpen} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.FacetFilterList#event:listClose listClose} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * FacetFilterList represents a list of values for the FacetFilter control.
 * @extends sap.ui.core.Control
 *
 * @author  
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor   
 * @public
 * @since 1.16.0
 * @name sap.m.FacetFilterList
 */
sap.ui.core.Control.extend("sap.m.FacetFilterList", { metadata : {

	// ---- object ----
	publicMethods : [
		// methods
		"getSelectedItems"
	],

	// ---- control specific ----
	library : "sap.m",
	properties : {
		"title" : {type : "string", group : "Appearance", defaultValue : null},
		"allCount" : {type : "int", group : "Misc", defaultValue : null},
		"active" : {type : "boolean", group : "Behavior", defaultValue : true},
		"key" : {type : "string", group : "Identification", defaultValue : null},
		"multiSelect" : {type : "boolean", group : "Behavior", defaultValue : true},
		"sequence" : {type : "int", group : "Behavior", defaultValue : -1},
		"growing" : {type : "boolean", group : "Behavior", defaultValue : true},
		"growingThreshold" : {type : "int", group : "Misc", defaultValue : 20},
		"growingTriggerText" : {type : "string", group : "Misc", defaultValue : null}
	},
	aggregations : {
    	"items" : {type : "sap.m.FacetFilterItem", multiple : true, singularName : "item"}
	},
	events : {
		"listOpen" : {}, 
		"listClose" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.FacetFilterList with name <code>sClassName</code> 
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
 * @name sap.m.FacetFilterList.extend
 * @function
 */

sap.m.FacetFilterList.M_EVENTS = {'listOpen':'listOpen','listClose':'listClose'};


/**
 * Getter for property <code>title</code>.
 * The title of the facet.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>title</code>
 * @public
 * @name sap.m.FacetFilterList#getTitle
 * @function
 */

/**
 * Setter for property <code>title</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sTitle  new value for property <code>title</code>
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#setTitle
 * @function
 */


/**
 * Getter for property <code>allCount</code>.
 * Number of objects that match this item in the target data set when all filter items are selected.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {int} the value of property <code>allCount</code>
 * @public
 * @name sap.m.FacetFilterList#getAllCount
 * @function
 */

/**
 * Setter for property <code>allCount</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {int} iAllCount  new value for property <code>allCount</code>
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#setAllCount
 * @function
 */


/**
 * Getter for property <code>active</code>.
 * Indicates that the list is displayed as a button in the Light flow
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>active</code>
 * @public
 * @name sap.m.FacetFilterList#getActive
 * @function
 */

/**
 * Setter for property <code>active</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bActive  new value for property <code>active</code>
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#setActive
 * @function
 */


/**
 * Getter for property <code>key</code>.
 * Unique identifier for this filter list.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>key</code>
 * @public
 * @name sap.m.FacetFilterList#getKey
 * @function
 */

/**
 * Setter for property <code>key</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sKey  new value for property <code>key</code>
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#setKey
 * @function
 */


/**
 * Getter for property <code>multiSelect</code>.
 * Specifies whether multiple or single selection is used.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>multiSelect</code>
 * @public
 * @name sap.m.FacetFilterList#getMultiSelect
 * @function
 */

/**
 * Setter for property <code>multiSelect</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bMultiSelect  new value for property <code>multiSelect</code>
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#setMultiSelect
 * @function
 */


/**
 * Getter for property <code>sequence</code>.
 * Sequence that determines the order in which facet list is shown on the facet filter. Lists are rendered by ascending order of sequence.
 *
 * Default value is <code>-1</code>
 *
 * @return {int} the value of property <code>sequence</code>
 * @public
 * @name sap.m.FacetFilterList#getSequence
 * @function
 */

/**
 * Setter for property <code>sequence</code>.
 *
 * Default value is <code>-1</code> 
 *
 * @param {int} iSequence  new value for property <code>sequence</code>
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#setSequence
 * @function
 */


/**
 * Getter for property <code>growing</code>.
 * Sets the growing(paging) feature of control.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>growing</code>
 * @public
 * @name sap.m.FacetFilterList#getGrowing
 * @function
 */

/**
 * Setter for property <code>growing</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bGrowing  new value for property <code>growing</code>
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#setGrowing
 * @function
 */


/**
 * Getter for property <code>growingThreshold</code>.
 * Number of items requested from the server. This property can be used only if "growing" property is set "true".
 *
 * Default value is <code>20</code>
 *
 * @return {int} the value of property <code>growingThreshold</code>
 * @public
 * @name sap.m.FacetFilterList#getGrowingThreshold
 * @function
 */

/**
 * Setter for property <code>growingThreshold</code>.
 *
 * Default value is <code>20</code> 
 *
 * @param {int} iGrowingThreshold  new value for property <code>growingThreshold</code>
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#setGrowingThreshold
 * @function
 */


/**
 * Getter for property <code>growingTriggerText</code>.
 * This text is displayed on the trigger button which is responsible to load new page at the end of the list. The default is a translated text ("Load More Data") coming from the message bundle.
 * This property can be used only if "growing" property is set "true".
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>growingTriggerText</code>
 * @public
 * @name sap.m.FacetFilterList#getGrowingTriggerText
 * @function
 */

/**
 * Setter for property <code>growingTriggerText</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sGrowingTriggerText  new value for property <code>growingTriggerText</code>
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#setGrowingTriggerText
 * @function
 */


/**
 * Getter for aggregation <code>items</code>.<br/>
 * A list of items for the facet.
 * 
 * @return {sap.m.FacetFilterItem[]}
 * @public
 * @name sap.m.FacetFilterList#getItems
 * @function
 */


/**
 * Inserts a item into the aggregation named <code>items</code>.
 *
 * @param {sap.m.FacetFilterItem}
 *          oItem the item to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the item should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the item is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the item is inserted at 
 *             the last position        
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#insertItem
 * @function
 */

/**
 * Adds some item <code>oItem</code> 
 * to the aggregation named <code>items</code>.
 *
 * @param {sap.m.FacetFilterItem}
 *            oItem the item to add; if empty, nothing is inserted
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#addItem
 * @function
 */

/**
 * Removes an item from the aggregation named <code>items</code>.
 *
 * @param {int | string | sap.m.FacetFilterItem} vItem the item to remove or its index or id
 * @return {sap.m.FacetFilterItem} the removed item or null
 * @public
 * @name sap.m.FacetFilterList#removeItem
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>items</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.m.FacetFilterItem[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.FacetFilterList#removeAllItems
 * @function
 */

/**
 * Checks for the provided <code>sap.m.FacetFilterItem</code> in the aggregation named <code>items</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.m.FacetFilterItem}
 *            oItem the item whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.FacetFilterList#indexOfItem
 * @function
 */
	

/**
 * Destroys all the items in the aggregation 
 * named <code>items</code>.
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#destroyItems
 * @function
 */


/**
 * Fired before the filter list is opened. 
 *
 * @name sap.m.FacetFilterList#listOpen
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'listOpen' event of this <code>sap.m.FacetFilterList</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.FacetFilterList</code>.<br/> itself. 
 *  
 * Fired before the filter list is opened. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.FacetFilterList</code>.<br/> itself.
 *
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#attachListOpen
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'listOpen' event of this <code>sap.m.FacetFilterList</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#detachListOpen
 * @function
 */

/**
 * Fire event listOpen to attached listeners.

 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.FacetFilterList#fireListOpen
 * @function
 */


/**
 * Triggered after the list of items is closed. 
 *
 * @name sap.m.FacetFilterList#listClose
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {sap.m.FacetFilterItem[]} oControlEvent.getParameters.selectedItems Array of selected Items.
 * @param {boolean} oControlEvent.getParameters.allSelected True if all filter items are selected.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'listClose' event of this <code>sap.m.FacetFilterList</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.FacetFilterList</code>.<br/> itself. 
 *  
 * Triggered after the list of items is closed. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.FacetFilterList</code>.<br/> itself.
 *
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#attachListClose
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'listClose' event of this <code>sap.m.FacetFilterList</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FacetFilterList#detachListClose
 * @function
 */

/**
 * Fire event listClose to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'selectedItems' of type <code>sap.m.FacetFilterItem[]</code> Array of selected Items.</li>
 * <li>'allSelected' of type <code>boolean</code> True if all filter items are selected.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.FacetFilterList} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.FacetFilterList#fireListClose
 * @function
 */


/**
 * Returns an array that contains all the FacetFilterItems that are selected.
 *
 * @name sap.m.FacetFilterList.prototype.getSelectedItems
 * @function

 * @type sap.m.FacetFilterItem[]
 * @public
 */


// Start of sap\m\FacetFilterList.js
jQuery.sap.require("sap.m.List");
jQuery.sap.require("sap.m.StandardListItem");
jQuery.sap.require("sap.m.Button");
jQuery.sap.require("sap.m.ButtonType");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");

/**
 * This file defines behavior for the control,
 */
sap.m.FacetFilterList.prototype.init = function() {

	this._bundle = sap.ui.getCore().getLibraryResourceBundle("sap.m");

	var that = this;
	this._list = new sap.m.List(this.getId() + "-filterlist", {
		growing : this.getGrowing(),
		growingThreshold : this.getGrowingThreshold(),
		growingTriggerText : this.getGrowingTriggerText(),
		showNoData : true,
		scrollToLoad : false,
		rememberSelections: false,
		mode : this.getMultiSelect() ? sap.m.ListMode.MultiSelect : sap.m.ListMode.SingleSelectMaster,

		selectionChange : function(oEvent) {
			that._handleSelectionChange(oEvent);
		},
		
		updateFinished : function(oEvent) {
			that._updateFinished(oEvent);
		},
		includeItemInSelection : true
	});

	this._searchField = new sap.m.SearchField(this.getId() + "-searchField", {
		width : "100%",
		placeholder : that._bundle.getText("FACETFILTER_SEARCH"),
		search : function(oEvent) {

			that._setItemsFilter();
		}
	});
	var headerBar = new sap.m.Bar(this.getId() + "-headerbar", {
		contentMiddle : this._searchField
	});

	this._cbSelectAll = new sap.m.CheckBox(this.getId() + "-selectAll", {
		selected : true,
		text: this._bundle.getText("FACETFILTER_ALL", [""]),
		select : function(oEvent) {

			if (!oEvent.getParameter("selected")) {
				this.setSelected(true);
			} else {
				that._deselectAll();
				that._list.removeSelections(true);
			}
		}
	});

	this._popover = new sap.m.Popover(this.getId() + "-popup", {
		placement : sap.m.PlacementType.Bottom,
		showHeader : true,
		beforeOpen : function(oEvent) {

			if(that.getMultiSelect() && !this.getSubHeader()) {
				var subHeaderBar = new sap.m.Bar({
					contentLeft : that._cbSelectAll
				});
				this.setSubHeader(subHeaderBar);
			}
			
			this.setInitialFocus(that.getId() + "-searchField");
		},
		afterClose : function(oEvent) {

			that._handlePopoverCloseEvent(oEvent);
		},
		horizontalScrolling : false,
		customHeader : headerBar,
		content : [ that._list ]
	});

	// Use this to set the minimum width of the popover. This is not the same
	// as setting contentWidth, which sets a fixed width size.
	this._popover.addStyleClass("sapMFFPop");
};

sap.m.FacetFilterList.prototype.setGrowing = function(bGrowing) {
	this._list.setGrowing(bGrowing);
	this.setProperty("growing", bGrowing);
};

sap.m.FacetFilterList.prototype.setGrowingThreshold = function(iGrowingThreshold) {
	this._list.setGrowingThreshold(iGrowingThreshold);
	this.setProperty("growingThreshold", iGrowingThreshold);
 };

sap.m.FacetFilterList.prototype.setGrowingTriggerText = function(sGrowingTriggerText) {
	this._list.setGrowingTriggerText(sGrowingTriggerText);
	this.setProperty("growingTriggerText", sGrowingTriggerText);	
};

/**
 * @private
 */
sap.m.FacetFilterList.prototype._deselectAll = function(oEvent) {
	var aFacetFilterItems = this.getItems();

	jQuery.each(aFacetFilterItems, function(index, value) {
		value.setProperty("selected", false, true);
	});
};

/**
 * @private
 */
sap.m.FacetFilterList.prototype._updateFinished = function(oEvent) {
	this._copySelectionToPopover();
};

/**
 * @private
 */
sap.m.FacetFilterList.prototype._handleSelectionChange = function(oEvent) {
	var values = oEvent.getParameters().listItems;
	var sModelName = this._modelName;
	var aFacetFilterItems = this.getItems();
	var that = this;

	jQuery.each(values, function(index, value) {
		if (value && !value.getBindingInfo("selected")) {
			var path = value.getBindingContext(sModelName).getPath();
			var bSingleSelect = !that.getMultiSelect();
			var bFound = false;
			for ( var i = 0; i < aFacetFilterItems.length; i++) {			
				if (!bFound && aFacetFilterItems[i].getBindingContext(sModelName).getPath() === path) {
					aFacetFilterItems[i].setProperty("selected",oEvent.getParameters().selected, true);
					bFound = true;
				} else if(bSingleSelect) {
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
sap.m.FacetFilterList.prototype._setItemsFilter = function() {

	var value = this._searchField.getValue();
	var binding = this._list.getBinding("items");
	if (binding) { // May not have a binding
		var path = this._list.getBindingInfo("items").template.getBindingInfo("title").parts[0].path;
		if (binding && path) {
			var filter = new sap.ui.model.Filter(path, sap.ui.model.FilterOperator.Contains, value);
			binding.filter([ filter ]);
			this._copySelectionToPopover();
			this._setCBSelectAll();
		}
	}
};
/**
 * @private
 */
sap.m.FacetFilterList.prototype._applyPopoverPersonalization = function() {

	var that = this;

	if (this.getParent()) {
		if (this.getParent().getShowPersonalization()) {
			if (!this._deleteFilterButton) {
				this._deleteFilterButton = new sap.m.Button(this.getId() + "-remove", {
					text : that._bundle.getText("FACETFILTER_REMOVE_FILTER"),
					width : "100%",
					press : function() {

						that.setActive(false);
						that._popover.close();
					}
				});
				this._popover.setFooter(this._deleteFilterButton);
			}
		} else {

			var oButton = this._popover.getFooter();
			if (oButton) {
				this._popover.setFooter(null);
				oButton.destroy();
				delete this._deleteFilterButton;
			}
		}
	}
};

/**
 * @private
 */
sap.m.FacetFilterList.prototype._copySelectionToPopover = function() {

	var aListItems = this._list.getItems();
	var aFacetFilterItems = this.getItems();
	var sModelName = this._modelName;
	var lastIndex = 0;

	jQuery.each(aFacetFilterItems, function(index, value) {

		if (!value.getBindingInfo("selected")) {
			for ( var i = lastIndex; i < aListItems.length; i++) {
				if (value.getBindingContext(sModelName) && value.getBindingContext(sModelName).getPath()){
					var path = value.getBindingContext(sModelName).getPath();
					if (aListItems[i].getBindingContext(sModelName) && aListItems[i].getBindingContext(sModelName).getPath()=== path){
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
sap.m.FacetFilterList.prototype._displayFacetFilterPopover = function(oEvent) {

	this._applyPopoverPersonalization();
	this.fireListOpen({});
	this._copySelectionToPopover();
	this._setCBSelectAll();
	this._popover.openBy(this._getFacetButton());
};

/**
 * @private
 */
sap.m.FacetFilterList.prototype._handlePopoverCloseEvent = function(oEvent) {

	this._fireListCloseEvent();
};

/**
 * @private
 */
sap.m.FacetFilterList.prototype._fireListCloseEvent = function() {

	var aSelectedItems = this.getSelectedItems();

	if (this.getParent().getType() === sap.m.FacetFilterType.Simple) {
		this._getFacetButton().setText(this._getSelectionText(aSelectedItems));
	}

	var bAllSelected = aSelectedItems.length === this.getItems().length || aSelectedItems.length === 0;

	this.fireListClose({
		selectedItems : aSelectedItems,
		allSelected : bAllSelected
	});
};

/**
 * @private
 */
sap.m.FacetFilterList.prototype._getFacetButton = function() {

	if (!this._button) {
		var that = this;
		this._button = new sap.m.Button({
			type : sap.m.ButtonType.Transparent,
			press : function(oEvent) {

				that._displayFacetFilterPopover(oEvent);
			},
			id : this.getId() + "-button"
		});
		this._button.setParent(this.getParent());
	}
	return this._button;
};

/**
 * @private
 */
sap.m.FacetFilterList.prototype.exit = function() {

	if (this._button) {
		this._button.destroy();
		this._button = undefined;
	}

	if (this._popover) {
		this._popover.destroy();
		this._popover = undefined;
	}
	
	if(this._cbSelectAll) {
		this._cbSelectAll.destroy();
		this._cbSelectAll = undefined;
	}
};

/**
 * This function returns an array that contains all the items that are selected for this facet filter list.
 * 
 * @returns Array containing selected items for this facet filter list
 * @public
 */
sap.m.FacetFilterList.prototype.getSelectedItems = function() {

	var aSelectedItems = [];
	var aListItems = this.getItems();
	if (aListItems.length > 0) {
		for ( var i = 0; i < aListItems.length; i++) {
			if (aListItems[i].getSelected()) {
				aSelectedItems.push(aListItems[i]);
			}
		}
	}

	return aSelectedItems;
};

/**
 * Get index value from StandardListItem custom data
 * 
 * @private
 */
sap.m.FacetFilterList.prototype._getIndex = function(oListItem) {

	var customData = oListItem.getCustomData();
	for ( var i = 0; i < customData.length; i++) {
		if (customData[i].getKey() === "index") {
			return customData[i].getValue();
		}
	}
};

/*
 * Set value for multiSelect property
 * 
 * @public
 */
sap.m.FacetFilterList.prototype.setMultiSelect = function(bMultiSelect) {

	if(bMultiSelect || bMultiSelect === undefined || bMultiSelect === null) {
		this._list.setMode(sap.m.ListMode.MultiSelect);
	} else {
		this._list.setMode(sap.m.ListMode.SingleSelectMaster);
	}
	this.setProperty("multiSelect", bMultiSelect, true);
};

/**
 * Update the filter's button text based on selections in the list.
 * 
 * @private
 */
sap.m.FacetFilterList.prototype._getSelectionText = function(aSelectedItems) {

	var sText = "";
	if (!aSelectedItems) {
		aSelectedItems = this.getSelectedItems();
	}

	if (aSelectedItems.length > 0 && aSelectedItems.length < this.getItems().length) {

		if (aSelectedItems.length === 1) { // Use selected item value for button label if only one selected
			sText = this._bundle.getText("FACETFILTER_ONE_SELECTION", [ this.getTitle(), aSelectedItems[0].getText() ]);
		} else {
			sText = this._bundle.getText("FACETFILTER_SUM_SELECTIONS", [ this.getTitle(), aSelectedItems.length ]);
		}
	} else {
		sText = this._bundle.getText("FACETFILTER_ALL", [ this.getTitle() ]);
	}
	return sText;
};

sap.m.FacetFilterList.prototype.unbindAggregation = function(sName, bSuppressReset) {

	if (sName === "items") {
		this._list.unbindAggregation(sName, bSuppressReset);
	}
	sap.ui.base.ManagedObject.prototype.unbindAggregation.apply(this, arguments);
};

sap.m.FacetFilterList.prototype.bindAggregation = function(sName, oBindingInfo) {

	if (sName === "items") {
		var sPath, oTemplate, aSorters, aFilters;

		var oStandardListItemTemplate = new sap.m.StandardListItem();
		var bIsArgsArray = typeof oBindingInfo == "string";
		if (bIsArgsArray) {
			sPath = arguments[1];
			oTemplate = arguments[2];
			aSorters = arguments[3];
			aFilters = arguments[4];

		} else {
			sPath = oBindingInfo.path;
			oTemplate = oBindingInfo.template;
			aSorters = oBindingInfo.sorter;
			aFilters = oBindingInfo.filters;
		}

		var oListBindingInfo = {
			path : sPath,
			template : oStandardListItemTemplate,
			sorter : aSorters,
			filters : aFilters
		};

		var oTextBinding = oTemplate.getBindingInfo("text");
		if (oTextBinding) {
			oStandardListItemTemplate.bindProperty("title", oTextBinding);
		}
		if (oTemplate.getBindingInfo("count")) {
			oStandardListItemTemplate.bindProperty("counter", oTemplate.getBindingInfo("count"));
		}

		if (oTemplate.getBindingInfo("selected")) {
			oStandardListItemTemplate.bindProperty("selected", oTemplate.getBindingInfo("selected"));
		}

		sap.ui.base.ManagedObject.prototype.bindAggregation.apply(this, arguments);

		this._list.bindAggregation(sName, oListBindingInfo);
		
		if(this._modelSync) {
			this._modelSync(this._list.getModel(this._modelName));
		}
		
	} else {
		sap.ui.base.ManagedObject.prototype.bindAggregation.apply(this, arguments);
	}
};

sap.m.FacetFilterList.prototype.setBindingContext = function(oContext, sName) {

	this._list.setBindingContext(oContext, sName);
	this._list.setModel(oContext.getModel());

	sap.ui.base.ManagedObject.prototype.setBindingContext.apply(this, arguments);
};

sap.m.FacetFilterList.prototype.setModel = function(oModel, sName) {

	this._modelName = sName;
	this._list.setModel(oModel, sName);
	sap.ui.base.ManagedObject.prototype.setModel.apply(this, arguments);
	return this;
};

sap.m.FacetFilterList.prototype.addItem = function(oItem) {

	if (!this.isBound("items")) {
		this._addStandardListItem(oItem);
	}
	this.addAggregation("items", oItem, true);
	return this;
};

sap.m.FacetFilterList.prototype.removeAllItems = function() {

	if (!this.isBound("items")) {
		this._list.removeAllAggregation("items");
	}
	return this.removeAllAggregation("items", true);
};

sap.m.FacetFilterList.prototype.removeItem = function(oItem) {

	if (!this.isBound("items")) {
		this._list.removeItem(this._list.getItems()[this.indexOfItem(oItem)]);
	}
	return this.removeAggregation("items", oItem, true);
};

sap.m.FacetFilterList.prototype.destroyItems = function(iIndex) {

	if (!this.isBound("items")) {
		this._list.destroyAggregation("items");
	}
	return this.destroyAggregation("items", true);
};

/**
 * @private
 */
sap.m.FacetFilterList.prototype._addStandardListItem = function(oItem) {

	var oStandardListItem = new sap.m.StandardListItem({
		title : oItem.getText(),
		counter : oItem.getCount(),
		selected : oItem.getSelected()
	});
	this._list.addItem(oStandardListItem);
};

/**
 * @private
 */
sap.m.FacetFilterList.prototype._setCBSelectAll = function() {

	if(this.getMultiSelect()) {
		var size = this.getSelectedItems().length;
		this._cbSelectAll.setSelected(size === 0);
	}
};

/**
* @private
*/
sap.m.FacetFilterList.prototype._setLiveSearch = function(bLiveSearch) {
	
	if(bLiveSearch) {
		this._searchField.attachLiveChange(this._setItemsFilter, this);
	} else {
		this._searchField.detachLiveChange(this._setItemsFilter, this);
	}	
};
