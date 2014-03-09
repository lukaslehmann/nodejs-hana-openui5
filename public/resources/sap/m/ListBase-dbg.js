/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.ListBase.
jQuery.sap.declare("sap.m.ListBase");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new ListBase.
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
 * <li>{@link #getInset inset} : boolean (default: false)</li>
 * <li>{@link #getVisible visible} : boolean (default: true)</li>
 * <li>{@link #getHeaderText headerText} : string</li>
 * <li>{@link #getHeaderDesign headerDesign} : sap.m.ListHeaderDesign (default: sap.m.ListHeaderDesign.Standard)</li>
 * <li>{@link #getFooterText footerText} : string</li>
 * <li>{@link #getMode mode} : sap.m.ListMode (default: sap.m.ListMode.None)</li>
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize (default: '100%')</li>
 * <li>{@link #getIncludeItemInSelection includeItemInSelection} : boolean (default: false)</li>
 * <li>{@link #getShowUnread showUnread} : boolean (default: false)</li>
 * <li>{@link #getNoDataText noDataText} : string</li>
 * <li>{@link #getShowNoData showNoData} : boolean (default: true)</li>
 * <li>{@link #getModeAnimationOn modeAnimationOn} : boolean (default: true)</li>
 * <li>{@link #getShowSeparators showSeparators} : sap.m.ListSeparators (default: sap.m.ListSeparators.All)</li>
 * <li>{@link #getSwipeDirection swipeDirection} : sap.m.SwipeDirection (default: sap.m.SwipeDirection.Both)</li>
 * <li>{@link #getGrowing growing} : boolean (default: false)</li>
 * <li>{@link #getGrowingThreshold growingThreshold} : int (default: 20)</li>
 * <li>{@link #getGrowingTriggerText growingTriggerText} : string</li>
 * <li>{@link #getGrowingScrollToLoad growingScrollToLoad} : boolean (default: false)</li>
 * <li>{@link #getRememberSelections rememberSelections} : boolean (default: true)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getItems items} : sap.m.ListItemBase[]</li>
 * <li>{@link #getSwipeContent swipeContent} : sap.ui.core.Control</li>
 * <li>{@link #getHeaderToolbar headerToolbar} : sap.m.Toolbar</li>
 * <li>{@link #getInfoToolbar infoToolbar} : sap.m.Toolbar</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.ListBase#event:select select} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.ListBase#event:selectionChange selectionChange} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.ListBase#event:delete delete} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.ListBase#event:swipe swipe} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.ListBase#event:growingStarted growingStarted} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.ListBase#event:growingFinished growingFinished} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.ListBase#event:updateStarted updateStarted} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.ListBase#event:updateFinished updateFinished} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * sap.m.ListBase Control provides a basic functionality of List and Table. Selection, deletion, unread states and inset style are also maintained here.
 * 
 * Note: The ListBase including all contained items is completely re-rendered when the data of a bound model is changed. Due to the limited hardware resources of mobile devices this can lead to longer delays for lists with many items. As such the usage of a list is not recommended for these use cases.
 * @extends sap.ui.core.Control
 *
 * @author SAP AG 
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor   
 * @public
 * @since 1.16
 * @name sap.m.ListBase
 */
sap.ui.core.Control.extend("sap.m.ListBase", { metadata : {

	// ---- object ----
	publicMethods : [
		// methods
		"getSelectedItem", "setSelectedItem", "getSelectedItems", "setSelectedItemById", "removeSelections", "selectAll", "getSwipedItem", "swipeOut", "getGrowingInfo"
	],

	// ---- control specific ----
	library : "sap.m",
	properties : {
		"inset" : {type : "boolean", group : "Appearance", defaultValue : false},
		"visible" : {type : "boolean", group : "Appearance", defaultValue : true},
		"headerText" : {type : "string", group : "Misc", defaultValue : null},
		"headerDesign" : {type : "sap.m.ListHeaderDesign", group : "Appearance", defaultValue : sap.m.ListHeaderDesign.Standard, deprecated: true},
		"footerText" : {type : "string", group : "Misc", defaultValue : null},
		"mode" : {type : "sap.m.ListMode", group : "Behavior", defaultValue : sap.m.ListMode.None},
		"width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : '100%'},
		"includeItemInSelection" : {type : "boolean", group : "Behavior", defaultValue : false},
		"showUnread" : {type : "boolean", group : "Misc", defaultValue : false},
		"noDataText" : {type : "string", group : "Misc", defaultValue : null},
		"showNoData" : {type : "boolean", group : "Misc", defaultValue : true},
		"modeAnimationOn" : {type : "boolean", group : "Misc", defaultValue : true},
		"showSeparators" : {type : "sap.m.ListSeparators", group : "Appearance", defaultValue : sap.m.ListSeparators.All},
		"swipeDirection" : {type : "sap.m.SwipeDirection", group : "Misc", defaultValue : sap.m.SwipeDirection.Both},
		"growing" : {type : "boolean", group : "Behavior", defaultValue : false},
		"growingThreshold" : {type : "int", group : "Misc", defaultValue : 20},
		"growingTriggerText" : {type : "string", group : "Appearance", defaultValue : null},
		"growingScrollToLoad" : {type : "boolean", group : "Behavior", defaultValue : false},
		"rememberSelections" : {type : "boolean", group : "Behavior", defaultValue : true}
	},
	defaultAggregation : "items",
	aggregations : {
    	"items" : {type : "sap.m.ListItemBase", multiple : true, singularName : "item", bindable : "bindable"}, 
    	"swipeContent" : {type : "sap.ui.core.Control", multiple : false}, 
    	"headerToolbar" : {type : "sap.m.Toolbar", multiple : false}, 
    	"infoToolbar" : {type : "sap.m.Toolbar", multiple : false}
	},
	events : {
		"select" : {deprecated: true}, 
		"selectionChange" : {}, 
		"delete" : {}, 
		"swipe" : {allowPreventDefault : true}, 
		"growingStarted" : {deprecated: true}, 
		"growingFinished" : {deprecated: true}, 
		"updateStarted" : {}, 
		"updateFinished" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.ListBase with name <code>sClassName</code> 
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
 * @name sap.m.ListBase.extend
 * @function
 */

sap.m.ListBase.M_EVENTS = {'select':'select','selectionChange':'selectionChange','delete':'delete','swipe':'swipe','growingStarted':'growingStarted','growingFinished':'growingFinished','updateStarted':'updateStarted','updateFinished':'updateFinished'};


/**
 * Getter for property <code>inset</code>.
 * Inset style false/true
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>inset</code>
 * @public
 * @name sap.m.ListBase#getInset
 * @function
 */

/**
 * Setter for property <code>inset</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bInset  new value for property <code>inset</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#setInset
 * @function
 */


/**
 * Getter for property <code>visible</code>.
 * Invisible controls are not rendered
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visible</code>
 * @public
 * @name sap.m.ListBase#getVisible
 * @function
 */

/**
 * Setter for property <code>visible</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisible  new value for property <code>visible</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#setVisible
 * @function
 */


/**
 * Getter for property <code>headerText</code>.
 * The header text appearing in the list/table header.
 * Note: if "headerToolbar" aggregation is set, then this property is ignored.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>headerText</code>
 * @public
 * @name sap.m.ListBase#getHeaderText
 * @function
 */

/**
 * Setter for property <code>headerText</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sHeaderText  new value for property <code>headerText</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#setHeaderText
 * @function
 */


/**
 * Getter for property <code>headerDesign</code>.
 * List header style. Possible vales are "Standard" and "Plain"
 *
 * Default value is <code>Standard</code>
 *
 * @return {sap.m.ListHeaderDesign} the value of property <code>headerDesign</code>
 * @public
 * @since 1.14
 * @deprecated Since version 1.16. 
 * Has no functionality since 1.16
 * @name sap.m.ListBase#getHeaderDesign
 * @function
 */

/**
 * Setter for property <code>headerDesign</code>.
 *
 * Default value is <code>Standard</code> 
 *
 * @param {sap.m.ListHeaderDesign} oHeaderDesign  new value for property <code>headerDesign</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.14
 * @deprecated Since version 1.16. 
 * Has no functionality since 1.16
 * @name sap.m.ListBase#setHeaderDesign
 * @function
 */


/**
 * Getter for property <code>footerText</code>.
 * Footer Text
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>footerText</code>
 * @public
 * @name sap.m.ListBase#getFooterText
 * @function
 */

/**
 * Setter for property <code>footerText</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sFooterText  new value for property <code>footerText</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#setFooterText
 * @function
 */


/**
 * Getter for property <code>mode</code>.
 * Mode of a list (e.g. None, SingleSelect, MultiSelect, Delete, etc.)
 *
 * Default value is <code>None</code>
 *
 * @return {sap.m.ListMode} the value of property <code>mode</code>
 * @public
 * @name sap.m.ListBase#getMode
 * @function
 */

/**
 * Setter for property <code>mode</code>.
 *
 * Default value is <code>None</code> 
 *
 * @param {sap.m.ListMode} oMode  new value for property <code>mode</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#setMode
 * @function
 */


/**
 * Getter for property <code>width</code>.
 * Sets the width of the list.
 *
 * Default value is <code>100%</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>width</code>
 * @public
 * @name sap.m.ListBase#getWidth
 * @function
 */

/**
 * Setter for property <code>width</code>.
 *
 * Default value is <code>100%</code> 
 *
 * @param {sap.ui.core.CSSSize} sWidth  new value for property <code>width</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#setWidth
 * @function
 */


/**
 * Getter for property <code>includeItemInSelection</code>.
 * This property decides if the list item interacts with the selection. If it is "true", a tap on the item will set the selection control in front of the list item.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>includeItemInSelection</code>
 * @public
 * @name sap.m.ListBase#getIncludeItemInSelection
 * @function
 */

/**
 * Setter for property <code>includeItemInSelection</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bIncludeItemInSelection  new value for property <code>includeItemInSelection</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#setIncludeItemInSelection
 * @function
 */


/**
 * Getter for property <code>showUnread</code>.
 * Activates the unread feature for all items.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>showUnread</code>
 * @public
 * @name sap.m.ListBase#getShowUnread
 * @function
 */

/**
 * Setter for property <code>showUnread</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bShowUnread  new value for property <code>showUnread</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#setShowUnread
 * @function
 */


/**
 * Getter for property <code>noDataText</code>.
 * This text is displayed when the control has no data.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>noDataText</code>
 * @public
 * @name sap.m.ListBase#getNoDataText
 * @function
 */

/**
 * Setter for property <code>noDataText</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sNoDataText  new value for property <code>noDataText</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#setNoDataText
 * @function
 */


/**
 * Getter for property <code>showNoData</code>.
 * Enables an information text(see "noDataText" property) when the control has no data.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>showNoData</code>
 * @public
 * @name sap.m.ListBase#getShowNoData
 * @function
 */

/**
 * Setter for property <code>showNoData</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bShowNoData  new value for property <code>showNoData</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#setShowNoData
 * @function
 */


/**
 * Getter for property <code>modeAnimationOn</code>.
 * Defines if animations will be shown when activating or deactivating selection modes.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>modeAnimationOn</code>
 * @public
 * @name sap.m.ListBase#getModeAnimationOn
 * @function
 */

/**
 * Setter for property <code>modeAnimationOn</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bModeAnimationOn  new value for property <code>modeAnimationOn</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#setModeAnimationOn
 * @function
 */


/**
 * Getter for property <code>showSeparators</code>.
 * Defines which separator style will be used.
 *
 * Default value is <code>All</code>
 *
 * @return {sap.m.ListSeparators} the value of property <code>showSeparators</code>
 * @public
 * @name sap.m.ListBase#getShowSeparators
 * @function
 */

/**
 * Setter for property <code>showSeparators</code>.
 *
 * Default value is <code>All</code> 
 *
 * @param {sap.m.ListSeparators} oShowSeparators  new value for property <code>showSeparators</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#setShowSeparators
 * @function
 */


/**
 * Getter for property <code>swipeDirection</code>.
 * Direction of swipe(e.g LeftToRight, RightToLeft, Both) to bring in a control on the right hand side of the list item.
 *
 * Default value is <code>Both</code>
 *
 * @return {sap.m.SwipeDirection} the value of property <code>swipeDirection</code>
 * @public
 * @name sap.m.ListBase#getSwipeDirection
 * @function
 */

/**
 * Setter for property <code>swipeDirection</code>.
 *
 * Default value is <code>Both</code> 
 *
 * @param {sap.m.SwipeDirection} oSwipeDirection  new value for property <code>swipeDirection</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#setSwipeDirection
 * @function
 */


/**
 * Getter for property <code>growing</code>.
 * Sets the growing(paging) feature of control.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>growing</code>
 * @public
 * @since 1.16
 * @name sap.m.ListBase#getGrowing
 * @function
 */

/**
 * Setter for property <code>growing</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bGrowing  new value for property <code>growing</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.ListBase#setGrowing
 * @function
 */


/**
 * Getter for property <code>growingThreshold</code>.
 * Number of items requested from the server. To activate this you should set "growing" property to "true".
 *
 * Default value is <code>20</code>
 *
 * @return {int} the value of property <code>growingThreshold</code>
 * @public
 * @since 1.16
 * @name sap.m.ListBase#getGrowingThreshold
 * @function
 */

/**
 * Setter for property <code>growingThreshold</code>.
 *
 * Default value is <code>20</code> 
 *
 * @param {int} iGrowingThreshold  new value for property <code>growingThreshold</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.ListBase#setGrowingThreshold
 * @function
 */


/**
 * Getter for property <code>growingTriggerText</code>.
 * This text is displayed on the trigger button which is responsible to load new page at the end of the list. The default is a translated text ("Load More Data") coming from the message bundle.
 * This property can be used only if "growing" property is set "true" and scrollToLoad property is set "false".
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>growingTriggerText</code>
 * @public
 * @since 1.16
 * @name sap.m.ListBase#getGrowingTriggerText
 * @function
 */

/**
 * Setter for property <code>growingTriggerText</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sGrowingTriggerText  new value for property <code>growingTriggerText</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.ListBase#setGrowingTriggerText
 * @function
 */


/**
 * Getter for property <code>growingScrollToLoad</code>.
 * If true, user can scroll end to trigger a new page request. Otherwise a trigger button is displayed at the bottom of the list.
 * This property can be used only if "growing" property is set "true" and if you only have one instance of this control inside the scroll container(e.g Page).
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>growingScrollToLoad</code>
 * @public
 * @since 1.16
 * @name sap.m.ListBase#getGrowingScrollToLoad
 * @function
 */

/**
 * Setter for property <code>growingScrollToLoad</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bGrowingScrollToLoad  new value for property <code>growingScrollToLoad</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.ListBase#setGrowingScrollToLoad
 * @function
 */


/**
 * Getter for property <code>rememberSelections</code>.
 * By default, if you have binding then the control remembers selections after binding update(sorting, filter, refresh). If this is not a desired behavior for your use case, you can switch this off with setting it to "false".
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>rememberSelections</code>
 * @public
 * @since 1.16.6
 * @name sap.m.ListBase#getRememberSelections
 * @function
 */

/**
 * Setter for property <code>rememberSelections</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bRememberSelections  new value for property <code>rememberSelections</code>
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16.6
 * @name sap.m.ListBase#setRememberSelections
 * @function
 */


/**
 * Getter for aggregation <code>items</code>.<br/>
 * The items of this list or rows of the table.
 * 
 * @return {sap.m.ListItemBase[]}
 * @public
 * @name sap.m.ListBase#getItems
 * @function
 */


/**
 * Inserts a item into the aggregation named <code>items</code>.
 *
 * @param {sap.m.ListItemBase}
 *          oItem the item to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the item should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the item is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the item is inserted at 
 *             the last position        
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#insertItem
 * @function
 */

/**
 * Adds some item <code>oItem</code> 
 * to the aggregation named <code>items</code>.
 *
 * @param {sap.m.ListItemBase}
 *            oItem the item to add; if empty, nothing is inserted
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#addItem
 * @function
 */

/**
 * Removes an item from the aggregation named <code>items</code>.
 *
 * @param {int | string | sap.m.ListItemBase} vItem the item to remove or its index or id
 * @return {sap.m.ListItemBase} the removed item or null
 * @public
 * @name sap.m.ListBase#removeItem
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>items</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.m.ListItemBase[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.ListBase#removeAllItems
 * @function
 */

/**
 * Checks for the provided <code>sap.m.ListItemBase</code> in the aggregation named <code>items</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.m.ListItemBase}
 *            oItem the item whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.ListBase#indexOfItem
 * @function
 */
	

/**
 * Destroys all the items in the aggregation 
 * named <code>items</code>.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#destroyItems
 * @function
 */


/**
 * Binder for aggregation <code>items</code>.
 *
 * @param {string} sPath path to a list in the model 
 * @param {sap.ui.core.Element} oTemplate the control template for this aggregation
 * @param {sap.ui.model.Sorter} oSorter the initial sort order (optional)
 * @param {array} aFilters the predefined filters for this aggregation (optional)
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#bindItems
 * @function
 */

/**
 * Unbinder for aggregation <code>items</code>.
 *
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#unbindItems
 * @function
 */


/**
 * Getter for aggregation <code>swipeContent</code>.<br/>
 * User can swipe to bring in this control on the right hand side of a list item.
 * Note: This functionality gets disabled for non-touch devices.
 * 
 * @return {sap.ui.core.Control}
 * @public
 * @name sap.m.ListBase#getSwipeContent
 * @function
 */


/**
 * Setter for the aggregated <code>swipeContent</code>.
 * @param oSwipeContent {sap.ui.core.Control}
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#setSwipeContent
 * @function
 */
	

/**
 * Destroys the swipeContent in the aggregation 
 * named <code>swipeContent</code>.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#destroySwipeContent
 * @function
 */


/**
 * Getter for aggregation <code>headerToolbar</code>.<br/>
 * Header can be used as a Toolbar to add extra controls for user interactions.
 * Note: This aggregation overwrites "headerText" property.
 * 
 * @return {sap.m.Toolbar}
 * @public
 * @since 1.16
 * @name sap.m.ListBase#getHeaderToolbar
 * @function
 */


/**
 * Setter for the aggregated <code>headerToolbar</code>.
 * @param oHeaderToolbar {sap.m.Toolbar}
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.ListBase#setHeaderToolbar
 * @function
 */
	

/**
 * Destroys the headerToolbar in the aggregation 
 * named <code>headerToolbar</code>.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.ListBase#destroyHeaderToolbar
 * @function
 */


/**
 * Getter for aggregation <code>infoToolbar</code>.<br/>
 * InfoBar is placed below the header and can be used to show extra information to the user.
 * 
 * @return {sap.m.Toolbar}
 * @public
 * @since 1.16
 * @name sap.m.ListBase#getInfoToolbar
 * @function
 */


/**
 * Setter for the aggregated <code>infoToolbar</code>.
 * @param oInfoToolbar {sap.m.Toolbar}
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.ListBase#setInfoToolbar
 * @function
 */
	

/**
 * Destroys the infoToolbar in the aggregation 
 * named <code>infoToolbar</code>.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.ListBase#destroyInfoToolbar
 * @function
 */


/**
 * Event is fired when selection is changed by user interaction. In "multi-selection" mode, this event is also fired on "deselect" 
 *
 * @name sap.m.ListBase#select
 * @event
 * @deprecated Since version 1.16. 
 * Instead use "selectionChange" event.
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {sap.m.ListItemBase} oControlEvent.getParameters.listItem The list item which fired the select.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'select' event of this <code>sap.m.ListBase</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.ListBase</code>.<br/> itself. 
 *  
 * Event is fired when selection is changed by user interaction. In "multi-selection" mode, this event is also fired on "deselect" 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.ListBase</code>.<br/> itself.
 *
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @deprecated Since version 1.16. 
 * Instead use "selectionChange" event.
 * @name sap.m.ListBase#attachSelect
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'select' event of this <code>sap.m.ListBase</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @deprecated Since version 1.16. 
 * Instead use "selectionChange" event.
 * @name sap.m.ListBase#detachSelect
 * @function
 */

/**
 * Fire event select to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'listItem' of type <code>sap.m.ListItemBase</code> The list item which fired the select.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @protected
 * @deprecated Since version 1.16. 
 * Instead use "selectionChange" event.
 * @name sap.m.ListBase#fireSelect
 * @function
 */


/**
 * Event is fired when selection is changed via user interaction inside the control. 
 *
 * @name sap.m.ListBase#selectionChange
 * @event
 * @since 1.16
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {sap.m.ListItemBase} oControlEvent.getParameters.listItem The list item whose selection has changed. In "multi-selection" mode, only the up-most selected item is returned. This parameter can be used for single-selection modes.
 * @param {sap.m.ListItemBase[]} oControlEvent.getParameters.listItems This parameter is filled with array of list items whose selection has changed. This parameter can be used for multi-selection mode.
 * @param {boolean} oControlEvent.getParameters.selected This flag indicates whether the "listItem" parameter is selected or not.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'selectionChange' event of this <code>sap.m.ListBase</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.ListBase</code>.<br/> itself. 
 *  
 * Event is fired when selection is changed via user interaction inside the control. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.ListBase</code>.<br/> itself.
 *
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.ListBase#attachSelectionChange
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'selectionChange' event of this <code>sap.m.ListBase</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.ListBase#detachSelectionChange
 * @function
 */

/**
 * Fire event selectionChange to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'listItem' of type <code>sap.m.ListItemBase</code> The list item whose selection has changed. In "multi-selection" mode, only the up-most selected item is returned. This parameter can be used for single-selection modes.</li>
 * <li>'listItems' of type <code>sap.m.ListItemBase[]</code> This parameter is filled with array of list items whose selection has changed. This parameter can be used for multi-selection mode.</li>
 * <li>'selected' of type <code>boolean</code> This flag indicates whether the "listItem" parameter is selected or not.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @protected
 * @since 1.16
 * @name sap.m.ListBase#fireSelectionChange
 * @function
 */


/**
 * Event is fired when delete icon is pressed by user. 
 *
 * @name sap.m.ListBase#delete
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {sap.m.ListItemBase} oControlEvent.getParameters.listItem The list item which fired the delete.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'delete' event of this <code>sap.m.ListBase</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.ListBase</code>.<br/> itself. 
 *  
 * Event is fired when delete icon is pressed by user. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.ListBase</code>.<br/> itself.
 *
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#attachDelete
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'delete' event of this <code>sap.m.ListBase</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#detachDelete
 * @function
 */

/**
 * Fire event delete to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'listItem' of type <code>sap.m.ListItemBase</code> The list item which fired the delete.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.ListBase#fireDelete
 * @function
 */


/**
 * This event is fired when a user swipes to bring in a control and before swipeContent is shown on the right hand side of list item. So, you can easily change swipeContent according to swiped list item. Call the preventDefault method of the event object to disable swipe. 
 *
 * @name sap.m.ListBase#swipe
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {sap.m.ListItemBase} oControlEvent.getParameters.listItem The listitem which fired the swipe.
 * @param {sap.ui.core.Control} oControlEvent.getParameters.swipeContent Given swipeContent control to show on the right hand side of a list item.
 * @param {sap.ui.core.Control} oControlEvent.getParameters.srcControl Holds which control caused the swipe event in within the Item.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'swipe' event of this <code>sap.m.ListBase</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.ListBase</code>.<br/> itself. 
 *  
 * This event is fired when a user swipes to bring in a control and before swipeContent is shown on the right hand side of list item. So, you can easily change swipeContent according to swiped list item. Call the preventDefault method of the event object to disable swipe. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.ListBase</code>.<br/> itself.
 *
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#attachSwipe
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'swipe' event of this <code>sap.m.ListBase</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ListBase#detachSwipe
 * @function
 */

/**
 * Fire event swipe to attached listeners.
 *
 * Listeners may prevent the default action of this event using the preventDefault-method on the event object.
 * * 
 * Expects following event parameters:
 * <ul>
 * <li>'listItem' of type <code>sap.m.ListItemBase</code> The listitem which fired the swipe.</li>
 * <li>'swipeContent' of type <code>sap.ui.core.Control</code> Given swipeContent control to show on the right hand side of a list item.</li>
 * <li>'srcControl' of type <code>sap.ui.core.Control</code> Holds which control caused the swipe event in within the Item.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {boolean} whether to prevent the default action
 * @protected
 * @name sap.m.ListBase#fireSwipe
 * @function
 */


/**
 * This event is called when "growing" feature is enabled and before new page loaded. 
 *
 * @name sap.m.ListBase#growingStarted
 * @event
 * @since 1.16
 * @deprecated Since version 1.16.3. 
 * Instead, use "updateStarted" event.
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {int} oControlEvent.getParameters.actual Actual number of items.
 * @param {int} oControlEvent.getParameters.total Total number of items.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'growingStarted' event of this <code>sap.m.ListBase</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.ListBase</code>.<br/> itself. 
 *  
 * This event is called when "growing" feature is enabled and before new page loaded. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.ListBase</code>.<br/> itself.
 *
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @deprecated Since version 1.16.3. 
 * Instead, use "updateStarted" event.
 * @name sap.m.ListBase#attachGrowingStarted
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'growingStarted' event of this <code>sap.m.ListBase</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @deprecated Since version 1.16.3. 
 * Instead, use "updateStarted" event.
 * @name sap.m.ListBase#detachGrowingStarted
 * @function
 */

/**
 * Fire event growingStarted to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'actual' of type <code>int</code> Actual number of items.</li>
 * <li>'total' of type <code>int</code> Total number of items.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @protected
 * @since 1.16
 * @deprecated Since version 1.16.3. 
 * Instead, use "updateStarted" event.
 * @name sap.m.ListBase#fireGrowingStarted
 * @function
 */


/**
 * This event is called when "growing" feature is enabled and after new page loaded and DOM updated. 
 *
 * @name sap.m.ListBase#growingFinished
 * @event
 * @since 1.16
 * @deprecated Since version 1.16.3. 
 * Instead, use "updateFinished" event.
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {int} oControlEvent.getParameters.actual Actual number of items.
 * @param {int} oControlEvent.getParameters.total Total number of items.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'growingFinished' event of this <code>sap.m.ListBase</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.ListBase</code>.<br/> itself. 
 *  
 * This event is called when "growing" feature is enabled and after new page loaded and DOM updated. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.ListBase</code>.<br/> itself.
 *
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @deprecated Since version 1.16.3. 
 * Instead, use "updateFinished" event.
 * @name sap.m.ListBase#attachGrowingFinished
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'growingFinished' event of this <code>sap.m.ListBase</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @deprecated Since version 1.16.3. 
 * Instead, use "updateFinished" event.
 * @name sap.m.ListBase#detachGrowingFinished
 * @function
 */

/**
 * Fire event growingFinished to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'actual' of type <code>int</code> Actual number of items.</li>
 * <li>'total' of type <code>int</code> Total number of items.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @protected
 * @since 1.16
 * @deprecated Since version 1.16.3. 
 * Instead, use "updateFinished" event.
 * @name sap.m.ListBase#fireGrowingFinished
 * @function
 */


/**
 * This event is called before binding is updated. 
 *
 * @name sap.m.ListBase#updateStarted
 * @event
 * @since 1.16.3
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {string} oControlEvent.getParameters.reason The reason of update. Possible values are "Binding", "Filter", "Sort", "Growing", "Change", "Refresh", "Context"
 * @param {int} oControlEvent.getParameters.actual Actual number of items.
 * @param {int} oControlEvent.getParameters.total The total count of bound items. This parameter can be used if "growing" feature is enabled.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'updateStarted' event of this <code>sap.m.ListBase</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.ListBase</code>.<br/> itself. 
 *  
 * This event is called before binding is updated. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.ListBase</code>.<br/> itself.
 *
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16.3
 * @name sap.m.ListBase#attachUpdateStarted
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'updateStarted' event of this <code>sap.m.ListBase</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16.3
 * @name sap.m.ListBase#detachUpdateStarted
 * @function
 */

/**
 * Fire event updateStarted to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'reason' of type <code>string</code> The reason of update. Possible values are "Binding", "Filter", "Sort", "Growing", "Change", "Refresh", "Context"</li>
 * <li>'actual' of type <code>int</code> Actual number of items.</li>
 * <li>'total' of type <code>int</code> The total count of bound items. This parameter can be used if "growing" feature is enabled.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @protected
 * @since 1.16.3
 * @name sap.m.ListBase#fireUpdateStarted
 * @function
 */


/**
 * This event is called after binding and DOM is updated. 
 *
 * @name sap.m.ListBase#updateFinished
 * @event
 * @since 1.16.3
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {string} oControlEvent.getParameters.reason The reason of update. Possible values are "Binding", "Filter", "Sort", "Growing", "Change", "Refresh", "Context"
 * @param {int} oControlEvent.getParameters.actual Actual number of items.
 * @param {int} oControlEvent.getParameters.total The total count of bound items. This parameter can be used if "growing" feature is enabled.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'updateFinished' event of this <code>sap.m.ListBase</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.ListBase</code>.<br/> itself. 
 *  
 * This event is called after binding and DOM is updated. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.ListBase</code>.<br/> itself.
 *
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16.3
 * @name sap.m.ListBase#attachUpdateFinished
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'updateFinished' event of this <code>sap.m.ListBase</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.16.3
 * @name sap.m.ListBase#detachUpdateFinished
 * @function
 */

/**
 * Fire event updateFinished to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'reason' of type <code>string</code> The reason of update. Possible values are "Binding", "Filter", "Sort", "Growing", "Change", "Refresh", "Context"</li>
 * <li>'actual' of type <code>int</code> Actual number of items.</li>
 * <li>'total' of type <code>int</code> The total count of bound items. This parameter can be used if "growing" feature is enabled.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.ListBase} <code>this</code> to allow method chaining
 * @protected
 * @since 1.16.3
 * @name sap.m.ListBase#fireUpdateFinished
 * @function
 */


/**
 * Returns selected list item. When no item is selected, "null" is returned. When "multi-selection" is enabled and multiple items are selected, only the up-most selected item is returned.
 *
 * @name sap.m.ListBase.prototype.getSelectedItem
 * @function

 * @type sap.m.ListItemBase
 * @public
 */


/**
 * Selects or deselects the given list item.
 *
 * @name sap.m.ListBase.prototype.setSelectedItem
 * @function
 * @param {sap.m.ListItemBase} 
 *         oListItem
 *         The list item whose selection to be changed. This parameter is mandatory.
 * @param {boolean} 
 *         bSelect
 *         Sets selected status of the list item. Default value is true.

 * @type sap.m.ListBase
 * @public
 */


/**
 * Returns an array containing the selected list items. If no items are selected, an empty array is returned.
 *
 * @name sap.m.ListBase.prototype.getSelectedItems
 * @function

 * @type sap.m.ListItemBase[]
 * @public
 */


/**
 * Sets a list item to be selected by id. In single mode the method removes the previous selection.
 *
 * @name sap.m.ListBase.prototype.setSelectedItemById
 * @function
 * @param {string} 
 *         sId
 *         The id of the list item whose selection to be changed.
 * @param {boolean} 
 *         bSelect
 *         Sets selected status of the list item. Default value is true.

 * @type sap.m.ListBase
 * @public
 */


/**
 * Removes visible selections of the current selection mode.
 *
 * @name sap.m.ListBase.prototype.removeSelections
 * @function
 * @param {boolean} 
 *         bAll

 * @since 1.16.3 *         This control keeps old selections after filter or sorting. Set this parameter "true" to remove all selections.

 * @type sap.m.ListBase
 * @public
 */


/**
 * Select all items in "MultiSelection" mode.
 *
 * @name sap.m.ListBase.prototype.selectAll
 * @function

 * @type sap.m.ListBase
 * @public
 * @since 1.16
 */


/**
 * Returns swiped list item. When no item is swiped, "null" is returned.
 *
 * @name sap.m.ListBase.prototype.getSwipedItem
 * @function

 * @type sap.m.ListItemBase
 * @public
 */


/**
 * After swipeContent is shown, user can interact with this control(e.g Tap). After interaction is done, you can/should use this method to hide swipeContent from screen.
 * Note: If users try to tap inside of the list but outside of the swipeContent then control hides automatically.
 *
 * @name sap.m.ListBase.prototype.swipeOut
 * @function
 * @param {any} 
 *         oCallback
 *         This callback function is called with two parameters(swipedListItem and swipedContent) after swipe-out animation is finished.

 * @type sap.m.ListBase
 * @public
 */


/**
 * Returns growing information as object with "actual" and "total" keys.
 * Note: This function returns "null" if "growing" feature is disabled.
 *
 * @name sap.m.ListBase.prototype.getGrowingInfo
 * @function

 * @type object
 * @public
 * @since 1.16
 */


// Start of sap\m\ListBase.js
jQuery.sap.require("sap.ui.core.theming.Parameters");
jQuery.sap.require("sap.ui.core.delegate.ItemNavigation");

sap.m.ListBase.prototype.init = function() {
	this._oGrowingDelegate = null;
	this._bSelectionMode = false;
	this._bReceivingData = false;
	this._oSelectedItem = null;
	this._aSelectedPaths = [];
	this._aNavSections = [];
	this._bUpdating = false;
};

sap.m.ListBase.prototype.onBeforeRendering = function() {
	this._aNavSections.length = 0;
	if (this.hasOwnProperty("_$touchBlocker")) {
		this._removeSwipeContent();	// remove the swipe content from screen immediately
		delete this._$touchBlocker;	// delete touchBlocker to refresh
	}
};

sap.m.ListBase.prototype.onAfterRendering = function() {
	this._startItemNavigation();
	if (!this._oGrowingDelegate) {
		this._updateFinished();
	}
};

sap.m.ListBase.prototype.exit = function () {
	this._detachDataEvents();
	this._oSelectedItem = null;
	this._bReceivingData = false;
	this._aNavSections.length = 0;
	this._aSelectedPaths.length = 0;
	this._destroyGrowingDelegate();
	this._destroyItemNavigation();
};

sap.m.ListBase.prototype.updateItems = function(sReason) {
	if (this._oGrowingDelegate) {
		this._oGrowingDelegate.updateItems(sReason);
	} else {
		this._updateStarted(sReason);
		this.updateAggregation("items");
	}
};

sap.m.ListBase.prototype.bindAggregation = function(sName) {
	if (sName == "items" && this.isBound("items")) {
		this.removeSelections(true);
		this._oGrowingDelegate && this._oGrowingDelegate.reset();
	}
	return sap.ui.base.ManagedObject.prototype.bindAggregation.apply(this, arguments);
};

sap.m.ListBase.prototype.addAggregation = function (sAggregationName, oObject) {
	sAggregationName == "items" && this._applySettingsToItem(oObject);
	sap.ui.base.ManagedObject.prototype.addAggregation.apply(this, arguments);
	sAggregationName == "items" && this._applySelectionToItem(oObject);
	return this;
};

sap.m.ListBase.prototype.insertAggregation = function(sAggregationName, oObject) {
	sAggregationName == "items" && this._applySettingsToItem(oObject);
	sap.ui.base.ManagedObject.prototype.insertAggregation.apply(this, arguments);
	sAggregationName == "items" && this._applySelectionToItem(oObject);
	return this;
};

sap.m.ListBase.prototype.destroyAggregation = function(sAggregationName) {
	sAggregationName == "items" && (this._oSelectedItem = null);
	return sap.ui.base.ManagedObject.prototype.destroyAggregation.apply(this, arguments);
};

sap.m.ListBase.prototype.removeAggregation = function(sAggregationName) {
	var oObject = sap.ui.base.ManagedObject.prototype.removeAggregation.apply(this, arguments);
	if (sAggregationName == "items" && oObject && oObject === this._oSelectedItem) {
		this._oSelectedItem = null;
	}
	return oObject;
};

sap.m.ListBase.prototype.removeAllAggregation = function(sAggregationName) {
	sAggregationName == "items" && (this._oSelectedItem = null);
	return sap.ui.base.ManagedObject.prototype.removeAllAggregation.apply(this, arguments);
};

sap.m.ListBase.prototype.getId = function(sSuffix) {
	var sId = this.sId;
	return sSuffix ? sId + "-" + sSuffix : sId;
};

sap.m.ListBase.prototype.setGrowing = function(bGrowing) {
	bGrowing = !!bGrowing;
	if (this.getGrowing() != bGrowing) {
		this.setProperty("growing", bGrowing, !bGrowing);
		if (bGrowing) {
			jQuery.sap.require("sap.m.GrowingEnablement");
			this._oGrowingDelegate = new sap.m.GrowingEnablement(this, this.getItems().length);
		} else if (this._oGrowingDelegate) {
			this._oGrowingDelegate.destroy();
			this._oGrowingDelegate = null;
		}
	}
	return this;
};

sap.m.ListBase.prototype.setGrowingThreshold = function(iThreshold) {
	this.setProperty("growingThreshold", iThreshold, true);
	this._oItemNavigation && this._oItemNavigation.setPageSize(this.getGrowingThreshold());
	return this;
};

sap.m.ListBase.prototype.setGrowingTriggerText = function(sText) {
	this.setProperty("growingTriggerText", sText, true);
	if (this._oGrowingDelegate) {
		this._oGrowingDelegate.setTriggerText(this.getGrowingTriggerText());
	}
	return this;
};

sap.m.ListBase.prototype.setBackgroundDesign = function(sBgDesign) {
	var sBgDesignOld = this.getBackgroundDesign();
	this.setProperty("backgroundDesign", sBgDesign, true);
	this.$().removeClass("sapMListBG" + sBgDesignOld).addClass("sapMListBG" + this.getBackgroundDesign());
	return this;
};

sap.m.ListBase.prototype.setShowSeparators = function(sSeparators) {
	var sSeparatorsOld = this.getShowSeparators();
	this.setProperty("showSeparators", sSeparators, true);
	jQuery.sap.byId(this.getId("listUl")).removeClass("sapMListShowSeparators" + sSeparatorsOld).addClass("sapMListShowSeparators" + this.getShowSeparators());
	return this;
};

sap.m.ListBase.prototype.setIncludeItemInSelection = function(bInclude) {
	bInclude = this.validateProperty("includeItemInSelection", bInclude);
	if (bInclude != this.getIncludeItemInSelection()) {
		this.setProperty("includeItemInSelection", bInclude, true);
		this.getItems().forEach(function(oItem) {
			oItem._includeItemInSelection = bInclude;
			oItem.$().toggleClass("sapMLIBCursor", bInclude);
		});
	}
	return this;
};

sap.m.ListBase.prototype.setInset = function(bInset) {
	bInset = this.validateProperty("inset", bInset);
	if (bInset != this.getInset()) {
		this.setProperty("inset", bInset, true);
		if (this.getDomRef()) {
			this.$().toggleClass("sapMListInsetBG", bInset);
			jQuery.sap.byId(this.getId("listUl")).toggleClass("sapMListInset", bInset);
			this._setSwipePosition();
		}
	}
	return this;
};

sap.m.ListBase.prototype.setWidth = function(sWidth) {
	this.setProperty("width", sWidth, true);
	this.$().width(this.getWidth());
	return this;
};

sap.m.ListBase.prototype.setNoDataText = function(sNoDataText) {
	this.setProperty("noDataText", sNoDataText, true);
	jQuery.sap.byId(this.getId("nodata-text")).text(this.getNoDataText());
	return this;
};

sap.m.ListBase.prototype.getNoDataText = function() {
	var sNoDataText = this.getProperty("noDataText");
	if (!sNoDataText) {
		var oRB = sap.ui.getCore().getLibraryResourceBundle("sap.m");
		sNoDataText = oRB.getText("LIST_NO_DATA");
	}
	return sNoDataText;
};

sap.m.ListBase.prototype.getSelectedItem = function() {
	var aItems = this.getItems();
	for (var i = 0; i < aItems.length; i++) {
		if (aItems[i].getSelected()) {
			return aItems[i];
		}
	}
	return null;
};

sap.m.ListBase.prototype.setSelectedItem = function(oListItem, bSelect, bFireEvent) {
	if (!oListItem instanceof sap.m.ListItemBase) {
		jQuery.sap.log.warning("setSelectedItem is called without ListItem parameter on " + this);
		return;
	}
	if (this._bSelectionMode) {
		oListItem.setSelected((typeof bSelect == "undefined") ? true : !!bSelect);
		bFireEvent && this._fireSelectionChangeEvent([oListItem]);
	}
};

sap.m.ListBase.prototype.getSelectedItems = function() {
	return this.getItems().filter(function(oItem) {
		return oItem.getSelected();
	});
};

sap.m.ListBase.prototype.setSelectedItemById = function(sId, bSelect) {
	var oListItem = sap.ui.getCore().byId(sId);
	return this.setSelectedItem(oListItem, bSelect);
};

sap.m.ListBase.prototype.removeSelections = function(bAll, bFireEvent) {
	var aChangedListItems = [];
	this._oSelectedItem = null;
	bAll && (this._aSelectedPaths.length = 0);
	this.getItems().forEach(function(oItem) {
		if (oItem.getSelected()) {
			oItem.setSelected(false, true);
			aChangedListItems.push(oItem);
			!bAll && this._updateSelectedPaths(oItem);
		}
	}, this);

	if (bFireEvent && aChangedListItems.length) {
		this._fireSelectionChangeEvent(aChangedListItems);
	}
	return this;
};

sap.m.ListBase.prototype.selectAll = function (bFireEvent) {
	if (this.getMode() != "MultiSelect") {
		return this;
	}

	var aChangedListItems = [];
	this.getItems().forEach(function(oItem) {
		if (!oItem.getSelected()) {
			oItem.setSelected(true, true);
			aChangedListItems.push(oItem);
			this._updateSelectedPaths(oItem);
		}
	}, this);

	if (bFireEvent && aChangedListItems.length) {
		this._fireSelectionChangeEvent(aChangedListItems);
	}
	return this;
};

sap.m.ListBase.prototype.setMode = function(sMode) {
	var sOldMode = this.getMode();
	if (sOldMode != sMode) {
		this.setProperty("mode", sMode);
		this._bSelectionMode = this.getMode().indexOf("Select") > -1;
		if (sOldMode != "None") {
			this.removeSelections(true);
		}
	}
	return this;
};

sap.m.ListBase.prototype.getGrowingInfo = function() {
	if (this._oGrowingDelegate) {
		return this._oGrowingDelegate.getInfo();
	}
	return null;
};

sap.m.ListBase.prototype.setRememberSelections = function(bRemember) {
	this.setProperty("rememberSelections", bRemember, true);
	!this.getRememberSelections() && (this._aSelectedPaths.length = 0);
	return this;
};

/*
 * This function runs when setSelected is called from ListItemBase
 * @protected
 */
sap.m.ListBase.prototype.onItemSetSelected = function(oItem, bSelect) {
	if (this.getMode() == "MultiSelect") {
		this._updateSelectedPaths(oItem, bSelect);
		return;
	}

	if (bSelect) {
		this._aSelectedPaths.length = 0;
		this._oSelectedItem && this._oSelectedItem.setSelected(false, true);
		this._oSelectedItem = oItem;
	} else if (this._oSelectedItem === oItem) {
		this._oSelectedItem = null;
	}

	// update selection path for item
	this._updateSelectedPaths(oItem, bSelect);
};

/*
 * Returns items container DOM reference
 * @protected
 */
sap.m.ListBase.prototype.getItemsContainerDomRef = function() {
	return jQuery.sap.domById(this.getId("listUl"));
};

/*
 * This hook method is called if growing feature is enabled and before new page loaded
 * @protected
 */
sap.m.ListBase.prototype.onBeforePageLoaded = function(oGrowingInfo, sChangeReason) {
	this._updateStarted(sChangeReason, oGrowingInfo);
	this.fireGrowingStarted(oGrowingInfo);
};

/*
 * This hook method is called if growing feature is enabled and after new page loaded
 * @protected
 */
sap.m.ListBase.prototype.onAfterPageLoaded = function(oGrowingInfo, sChangeReason) {
	this._startItemNavigation();
	this.getShowNoData() && this.getMaxItemsCount() && jQuery.sap.byId(this.getId("nodata")).remove();
	this._updateFinished(sChangeReason, oGrowingInfo);
	this.fireGrowingFinished(oGrowingInfo);
};

/*
 * Adds navigation section that we can be navigate with alt + down/up
 * @protected
 */
sap.m.ListBase.prototype.addNavSection = function(sId) {
	this._aNavSections.push(sId);
	return sId;
};

/*
 * Returns the max items count.
 * If aggregation items is bound the count will be the length of the binding
 * otherwise the length of the list items aggregation will be returned
 * @protected
 */
sap.m.ListBase.prototype.getMaxItemsCount = function() {
	var oBinding = this.getBinding("items");
	if (oBinding) {
		return oBinding.getLength() || 0;
	}
	return this.getItems().length;
};

// attach to data events
sap.m.ListBase.prototype._attachDataEvents = function() {
	var oBinding = this.getBinding("items");
	if (oBinding) {
		oBinding.attachDataReceived(this._onDataReceived, this);
		oBinding.attachDataRequested(this._onDataRequested, this);
	}
};

// detach data events
sap.m.ListBase.prototype._detachDataEvents = function() {
	var oBinding = this.getBinding("items");
	if (oBinding) {
		oBinding.detachDataReceived(this._onDataReceived, this);
		oBinding.detachDataRequested(this._onDataRequested, this);
	}
};

// called from binding when data requested
sap.m.ListBase.prototype._onDataRequested = function() {
	this._bReceivingData = true;
};

// called from binding when data received
sap.m.ListBase.prototype._onDataReceived = function() {
	this._bReceivingData = false;
};

// called before update started via sorting/filtering/growing etc.
sap.m.ListBase.prototype._updateStarted = function(sReason, oInfo) {
	// check if update is already started and items are bound
	if (this._bUpdating || this._bReceivingData || !this.isBound("items")) {
		return;
	}

	// remember update status
	this._bUpdating = true;

	// attach data events
	this._attachDataEvents();

	// fire update started event
	this._sUpdateReason = jQuery.sap.charToUpperCase(sReason || "Binding");
	this.fireUpdateStarted({
		reason : this._sUpdateReason,
		actual : oInfo ? oInfo.actual : this.getItems().length,
		total : oInfo ? oInfo.total : this.getMaxItemsCount()
	});
};

// called after update finished via sorting/filtering/growing etc.
sap.m.ListBase.prototype._updateFinished = function(sReason, oInfo) {
	// check if update already started and items are bound
	if (!this._bUpdating || this._bReceivingData || !this.isBound("items")) {
		return;
	}

	// reset update status
	this._bUpdating = false;

	// detach data events
	this._detachDataEvents();

	// fire event should run delayed to make sure rendering phase is done
	jQuery.sap.delayedCall(0, this, function() {
		this.fireUpdateFinished({
			reason : this._sUpdateReason || sReason,
			actual : oInfo ? oInfo.actual : this.getItems().length,
			total : oInfo ? oInfo.total : this.getMaxItemsCount()
		});
	});
};

/*
 * Apply ListBase settings to given list item if selectable
 * TODO: There should be a better way to set these private variables
 */
sap.m.ListBase.prototype._applySettingsToItem = function(oItem, bOnlyProperties) {
	if (!oItem || !oItem.isSelectable()) {
		return oItem;
	}

	oItem._mode = this.getMode();
	oItem._listId = this.getId();
	oItem._showUnread = this.getShowUnread();
	oItem._modeAnimationOn = this.getModeAnimationOn();
	oItem._includeItemInSelection = this.getIncludeItemInSelection();
	if (bOnlyProperties) {
		return oItem;
	}

	// FIXME: very lame to share events
	oItem._select = this._select;
	oItem._delete = this._delete;

	if (!oItem.getParent() && oItem.getSelected()) {
		this.onItemSetSelected(oItem, true);
	}

	return oItem;
};

// select item if it was already selected before and not selected now
sap.m.ListBase.prototype._applySelectionToItem = function(oItem) {
	if (!this.getRememberSelections() || !oItem || !this._bSelectionMode || !this._aSelectedPaths.length || oItem.getSelected()) {
		return;
	}

	var sPath = oItem.getBindingContextPath();
	if (sPath && this._aSelectedPaths.indexOf(sPath) > -1) {
		oItem.setSelected(true);
	}
};

// List fires select event caused by checkbox/radiobutton
sap.m.ListBase.prototype._select = function(oEvent) {
	var oListItem = sap.ui.getCore().byId(this.oParent.getId()),
		oList = sap.ui.getCore().byId(oListItem._listId),
		bSelect = oEvent.getParameter("selected"),
		sMode = oList.getMode();

	oListItem.setSelected(bSelect);

	if (sMode == "MultiSelect") {
		oList._fireSelectionChangeEvent([oListItem]);
	} else if (oList._bSelectionMode && bSelect) {
		oList._fireSelectionChangeEvent([oListItem]);
	}
};

// List fires select event caused by the list item
sap.m.ListBase.prototype._selectTapped = function(oListItem) {
	this._fireSelectionChangeEvent([oListItem]);
};

// Fire selectionChange event and support old select event API
sap.m.ListBase.prototype._fireSelectionChangeEvent = function(aListItems) {
	var oListItem = aListItems && aListItems[0];
	if (!oListItem) {
		return;
	}

	// fire event
	this.fireSelectionChange({
		listItem : oListItem,
		listItems : aListItems,
		selected : oListItem.getSelected()
	});

	// support old API
	this.fireSelect({ listItem : oListItem });
};

// List fires delete event caused by the delete image
sap.m.ListBase.prototype._delete = function(oEvent) {
	var oListItem = sap.ui.getCore().byId(this.oParent.getId());
	var oList = sap.ui.getCore().byId(oListItem._listId);
	oList.fireDelete({
		listItem : oListItem
	});
};

// insert or remove given item's path from selection array
sap.m.ListBase.prototype._updateSelectedPaths = function(oItem, bSelect) {
	if (!this.getRememberSelections()) {
		return;
	}

	var sPath = oItem.getBindingContextPath();
	if (!sPath) {
		return;
	}

	bSelect = (typeof bSelect == "undefined") ? oItem.getSelected() : bSelect;
	var iIndex = this._aSelectedPaths.indexOf(sPath);
	if (bSelect) {
		iIndex < 0 && this._aSelectedPaths.push(sPath);
	} else {
		iIndex > -1 && this._aSelectedPaths.splice(iIndex, 1);
	}
};

sap.m.ListBase.prototype._destroyGrowingDelegate = function() {
	if (this._oGrowingDelegate) {
		this._oGrowingDelegate.destroy();
		this._oGrowingDelegate = null;
	}
};

sap.m.ListBase.prototype._destroyItemNavigation = function() {
	if (this._oItemNavigation) {
		this.removeEventDelegate(this._oItemNavigation);
		this._oItemNavigation.destroy();
		this._oItemNavigation = null;
	}
};

/**
 * After swipe content is shown on the right hand side of the list item
 * we will block the touch events and this method defines this touch blocker area.
 * It must be always child/ren of the area because we will listen parent's touch events
 *
 * @private
 */
sap.m.ListBase.prototype._getTouchBlocker = function() {
	return this._$touchBlocker || (this._$touchBlocker = this.$().children());
};

sap.m.ListBase.prototype._getSwipeContainer = function() {
	return this._$swipeContainer || (
		jQuery.sap.require("sap.m.InstanceManager"),
		this._$swipeContainer = jQuery("<div>", {
			"id" : this.getId("swp"),
			"class" : "sapMListSwp" + (sap.ui.core.theming.Parameters.get("sapMPlatformDependent") == "true" && jQuery.os.ios ? " sapMBar-CTX" : "")
		})
	);
};

sap.m.ListBase.prototype._setSwipePosition = function() {
	if (this._isSwipeActive) {
		return this._getSwipeContainer().css("top", this._swipedItem.$().position().top);
	}
};

sap.m.ListBase.prototype._renderSwipeContent = function() {
	var $listitem = this._swipedItem.$(),
		$container = this._getSwipeContainer();

	// add swipe container into list if it is not there
	this.$().prepend($container.css({
		top : $listitem.position().top,
		height : $listitem.outerHeight(true)
	}));

	// render swipe content into swipe container if needed
	if (this._bRerenderSwipeContent) {
		this._bRerenderSwipeContent = false;
		var rm = sap.ui.getCore().createRenderManager();
		rm.render(this.getSwipeContent(), $container.empty()[0]);
		rm.destroy();
	}

	// for method chaining
	return this;
};

sap.m.ListBase.prototype._swipeIn = function() {
	var that = this,	// scope
		$blocker = that._getTouchBlocker(),
		$container = that._getSwipeContainer();

	// render swipe content
	that._isSwipeActive = true;
	that._renderSwipeContent();

	// add to instance manager
	sap.m.InstanceManager.addDialogInstance(that);

	// maybe keyboard is opened
	window.document.activeElement.blur();

	// check orientation change and recalculate the position
	jQuery(window).on("resize.swp", function() {
		that._setSwipePosition();
	});

	// block touch events
	$blocker.css("pointer-events", "none").on("touchstart.swp", function(e){
		if (!$container[0].firstChild.contains(e.target)) {
			e.preventDefault();
			e.stopPropagation();
		}
	});

	// UX: swipeout is not interruptible till animation is finished
	$container.bind("webkitAnimationEnd animationend", function() {
		jQuery(this).unbind("webkitAnimationEnd animationend");
		// disable animation and focus to container
		$container.css("opacity", 1).focus();

		// check parents touchend for auto hide mode
		$blocker.parent().on("touchend.swp", function(e) {
			// checks if event source is coming from swipe container's first child
			if (!$container[0].firstChild.contains(e.target)) {
				that.swipeOut();
			}
		});
	}).removeClass("sapMListSwpOutAnim").addClass("sapMListSwpInAnim");
};

sap.m.ListBase.prototype._onSwipeOut = function(callback) {
	// remove container from DOM and disable animation event
	this._getSwipeContainer().css("opacity", 0).remove();

	// remove windows resize listener
	jQuery(window).off("resize.swp");

	// enable touch events again
	this._getTouchBlocker().css("pointer-events", "auto").off("touchstart.swp");

	if (typeof callback == "function") {
		callback.call(this, this._swipedItem, this.getSwipeContent());
	}

	this._isSwipeActive = false;

	// remove from instance manager
	sap.m.InstanceManager.removeDialogInstance(this);
};

sap.m.ListBase.prototype.swipeOut = function(callback) {
	if (!this._isSwipeActive) {
		return this;
	}

	var that = this,
		$container = this._getSwipeContainer();

	// stop listening parents touchend event
	this._getTouchBlocker().parent().off("touchend.swp");

	// add swipeout animation and listen this
	$container.bind("webkitAnimationEnd animationend", function() {
		jQuery(this).unbind("webkitAnimationEnd animationend");
		that._onSwipeOut(callback);
	}).removeClass("sapMListSwpInAnim").addClass("sapMListSwpOutAnim");

	return this;
};

/**
 * Close and hide the opened swipe content immediately
 * @private
 */
sap.m.ListBase.prototype._removeSwipeContent = function() {
	if (this._isSwipeActive) {
		this.swipeOut()._onSwipeOut();
	}
};

/**
 * This method is required from sap.m.InstanceManager
 * To remove swipe content when back button is pressed
 */
sap.m.ListBase.prototype.close = sap.m.ListBase.prototype._removeSwipeContent;

// called on swipe event to bring in the swipeContent control
sap.m.ListBase.prototype._onSwipe = function(oEvent) {
	var oContent = this.getSwipeContent(),
		oSrcControl = oEvent.srcControl;

	if (oContent && oSrcControl && jQuery.support.touch && !this._isSwipeActive && this !== oSrcControl && !this._eventHandledByControl) {
		// source can be anything so, check parents and find the list item
		for (var li = oSrcControl; li && !(li instanceof sap.m.ListItemBase); li = li.oParent);
		if (li instanceof sap.m.ListItemBase) {
			this._swipedItem = li;

			// fire event earlier to let the user change swipeContent according to list item
			// if the event not is canceled then start the animation
			this.fireSwipe({
				listItem : this._swipedItem,
				swipeContent : oContent,
				srcControl : oSrcControl
			}, true) && this._swipeIn();
		}
	}
};

sap.m.ListBase.prototype.ontouchstart = function(oEvent) {
	this._eventHandledByControl = oEvent.originalEvent._sapui_handledByControl;
};

sap.m.ListBase.prototype.onswipeleft = function(oEvent) {
	var exceptDirection = sap.ui.getCore().getConfiguration().getRTL() ? "RightToLeft" : "LeftToRight";

	if (this.getSwipeDirection() != exceptDirection) {
		this._onSwipe(oEvent);
	}
};

sap.m.ListBase.prototype.onswiperight = function(oEvent) {
	var exceptDirection = sap.ui.getCore().getConfiguration().getRTL() ? "LeftToRight" : "RightToLeft";

	if (this.getSwipeDirection() != exceptDirection) {
		this._onSwipe(oEvent);
	}
};

sap.m.ListBase.prototype.setSwipeDirection = function(sDirection) {
	return this.setProperty("swipeDirection", sDirection, true);
};

sap.m.ListBase.prototype.getSwipedItem = function() {
	return (this._isSwipeActive ? this._swipedItem : null);
};

sap.m.ListBase.prototype.setSwipeContent = function(oControl) {
	this._bRerenderSwipeContent = true;

	// prevent list from re-rendering on setSwipeContent
	return this.setAggregation("swipeContent", oControl, true);
};

sap.m.ListBase.prototype.invalidate = function(oOrigin) {
	if (oOrigin && oOrigin === this.getSwipeContent()) {
		this._bRerenderSwipeContent = true;
	}

	sap.ui.core.Control.prototype.invalidate.apply(this, arguments);
	return this;
};

sap.m.ListBase.prototype.addItemGroup = function(oGroup, oHeader, bSuppressInvalidate) {
	oHeader = oHeader || new sap.m.GroupHeaderListItem({
		title: oGroup.text || oGroup.key
	});

	this.addAggregation("items", oHeader, bSuppressInvalidate);
	return oHeader;
};

/* Keyboard Handling */
sap.m.ListBase.prototype._startItemNavigation = function() {
	if (!this.getItems().length) {
		this._destroyItemNavigation();
		return;
	}

	if (!this._oItemNavigation) {
		this._oItemNavigation = new sap.ui.core.delegate.ItemNavigation();
		this._oItemNavigation.setCycling(false);
		this.addEventDelegate(this._oItemNavigation);

		// TODO: Maybe we need a real paging algorithm here
		this._oItemNavigation.setPageSize(this.getGrowingThreshold());

		// implicitly setting table mode with one column
		// to disable up/down reaction on events of the cell
		this._oItemNavigation.setTableMode(true).setColumns(1);
	}

	// set navigation items
	var oItemsContainer = this.getItemsContainerDomRef();
	if (oItemsContainer) {
		this._oItemNavigation.setRootDomRef(oItemsContainer);
		this._oItemNavigation.setItemDomRefs(oItemsContainer.childNodes);
	}
};

/**
 * Returns ItemNavigation for controls uses List
 * @since 1.16.5
 * @protected
 */
sap.m.ListBase.prototype.getItemNavigation = function() {
	return this._oItemNavigation;
};

// Handle F6
sap.m.ListBase.prototype.onsapskipforward = function(oEvent) {
	jQuery.sap.byId(this.getId("after")).focus();
	oEvent.preventDefault();
};

// Handle Shift + F6
sap.m.ListBase.prototype.onsapskipback = function(oEvent) {
	this.$().focus();
	oEvent.preventDefault();
};

// Handle Alt + Down
sap.m.ListBase.prototype.onsapshow = function(oEvent) {
	if (oEvent.keyCode == jQuery.sap.KeyCodes.F4) {
		return;
	}
};

// Handle Alt + Up
sap.m.ListBase.prototype.onsaphide =  function(oEvent) {
};
