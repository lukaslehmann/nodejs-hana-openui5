/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.Toolbar.
jQuery.sap.declare("sap.m.Toolbar");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new Toolbar.
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
 * <li>{@link #getVisible visible} : boolean (default: true)</li>
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize</li>
 * <li>{@link #getActive active} : boolean (default: false)</li>
 * <li>{@link #getEnabled enabled} : boolean (default: true)</li>
 * <li>{@link #getHeight height} : sap.ui.core.CSSSize (default: '')</li>
 * <li>{@link #getDesign design} : sap.m.ToolbarDesign (default: sap.m.ToolbarDesign.Auto)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getContent content} : sap.ui.core.Control[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.Toolbar#event:press press} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * The Toolbar control is a horizontal items container that can be used to get an input from user or just to display output.
 * @extends sap.ui.core.Control
 *
 * @author SAP AG 
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor   
 * @public
 * @since 1.16
 * @name sap.m.Toolbar
 */
sap.ui.core.Control.extend("sap.m.Toolbar", { metadata : {

	// ---- object ----

	// ---- control specific ----
	library : "sap.m",
	properties : {
		"visible" : {type : "boolean", group : "Appearance", defaultValue : true},
		"width" : {type : "sap.ui.core.CSSSize", group : "Appearance", defaultValue : null},
		"active" : {type : "boolean", group : "Behavior", defaultValue : false},
		"enabled" : {type : "boolean", group : "Behavior", defaultValue : true},
		"height" : {type : "sap.ui.core.CSSSize", group : "Appearance", defaultValue : ''},
		"design" : {type : "sap.m.ToolbarDesign", group : "Appearance", defaultValue : sap.m.ToolbarDesign.Auto}
	},
	defaultAggregation : "content",
	aggregations : {
    	"content" : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}
	},
	events : {
		"press" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.Toolbar with name <code>sClassName</code> 
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
 * @name sap.m.Toolbar.extend
 * @function
 */

sap.m.Toolbar.M_EVENTS = {'press':'press'};


/**
 * Getter for property <code>visible</code>.
 * Sets the visibility of the control.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visible</code>
 * @public
 * @name sap.m.Toolbar#getVisible
 * @function
 */

/**
 * Setter for property <code>visible</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisible  new value for property <code>visible</code>
 * @return {sap.m.Toolbar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Toolbar#setVisible
 * @function
 */


/**
 * Getter for property <code>width</code>.
 * Defines the width of the control.
 * By default the Toolbar is block element, if the the width is not explicitly set, control will simply have its own natural size.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>width</code>
 * @public
 * @name sap.m.Toolbar#getWidth
 * @function
 */

/**
 * Setter for property <code>width</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.CSSSize} sWidth  new value for property <code>width</code>
 * @return {sap.m.Toolbar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Toolbar#setWidth
 * @function
 */


/**
 * Getter for property <code>active</code>.
 * Indicates that the whole toolbar is clickable. Press event of this control is fired only if this property is set "true"
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>active</code>
 * @public
 * @name sap.m.Toolbar#getActive
 * @function
 */

/**
 * Setter for property <code>active</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bActive  new value for property <code>active</code>
 * @return {sap.m.Toolbar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Toolbar#setActive
 * @function
 */


/**
 * Getter for property <code>enabled</code>.
 * Sets the enabled property of all controls defined in the content aggregation. Note: This property is not for the toolbar itself. See also the active property.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>enabled</code>
 * @public
 * @name sap.m.Toolbar#getEnabled
 * @function
 */

/**
 * Setter for property <code>enabled</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bEnabled  new value for property <code>enabled</code>
 * @return {sap.m.Toolbar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Toolbar#setEnabled
 * @function
 */


/**
 * Getter for property <code>height</code>.
 * Defines the height of the control.
 * By default the height property depends on the theme and the design property.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>height</code>
 * @public
 * @name sap.m.Toolbar#getHeight
 * @function
 */

/**
 * Setter for property <code>height</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.CSSSize} sHeight  new value for property <code>height</code>
 * @return {sap.m.Toolbar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Toolbar#setHeight
 * @function
 */


/**
 * Getter for property <code>design</code>.
 * Defines the toolbar design. Design settings are theme-dependent and can also define the default toolbar height.
 *
 * Default value is <code>Auto</code>
 *
 * @return {sap.m.ToolbarDesign} the value of property <code>design</code>
 * @public
 * @since 1.16.8
 * @name sap.m.Toolbar#getDesign
 * @function
 */

/**
 * Setter for property <code>design</code>.
 *
 * Default value is <code>Auto</code> 
 *
 * @param {sap.m.ToolbarDesign} oDesign  new value for property <code>design</code>
 * @return {sap.m.Toolbar} <code>this</code> to allow method chaining
 * @public
 * @since 1.16.8
 * @name sap.m.Toolbar#setDesign
 * @function
 */


/**
 * Getter for aggregation <code>content</code>.<br/>
 * The content of the toolbar
 * 
 * @return {sap.ui.core.Control[]}
 * @public
 * @name sap.m.Toolbar#getContent
 * @function
 */


/**
 * Inserts a content into the aggregation named <code>content</code>.
 *
 * @param {sap.ui.core.Control}
 *          oContent the content to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the content should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the content is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the content is inserted at 
 *             the last position        
 * @return {sap.m.Toolbar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Toolbar#insertContent
 * @function
 */

/**
 * Adds some content <code>oContent</code> 
 * to the aggregation named <code>content</code>.
 *
 * @param {sap.ui.core.Control}
 *            oContent the content to add; if empty, nothing is inserted
 * @return {sap.m.Toolbar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Toolbar#addContent
 * @function
 */

/**
 * Removes an content from the aggregation named <code>content</code>.
 *
 * @param {int | string | sap.ui.core.Control} vContent the content to remove or its index or id
 * @return {sap.ui.core.Control} the removed content or null
 * @public
 * @name sap.m.Toolbar#removeContent
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>content</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.ui.core.Control[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.Toolbar#removeAllContent
 * @function
 */

/**
 * Checks for the provided <code>sap.ui.core.Control</code> in the aggregation named <code>content</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.ui.core.Control}
 *            oContent the content whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.Toolbar#indexOfContent
 * @function
 */
	

/**
 * Destroys all the content in the aggregation 
 * named <code>content</code>.
 * @return {sap.m.Toolbar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Toolbar#destroyContent
 * @function
 */


/**
 * If "active" property is set "true" then "press" event is fired when user clicks on the toolbar. 
 *
 * @name sap.m.Toolbar#press
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {sap.ui.core.Control} oControlEvent.getParameters.srcControl Holds which control caused the press event within the toolbar.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'press' event of this <code>sap.m.Toolbar</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.Toolbar</code>.<br/> itself. 
 *  
 * If "active" property is set "true" then "press" event is fired when user clicks on the toolbar. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.Toolbar</code>.<br/> itself.
 *
 * @return {sap.m.Toolbar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Toolbar#attachPress
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'press' event of this <code>sap.m.Toolbar</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.Toolbar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Toolbar#detachPress
 * @function
 */

/**
 * Fire event press to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'srcControl' of type <code>sap.ui.core.Control</code> Holds which control caused the press event within the toolbar.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.Toolbar} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.Toolbar#firePress
 * @function
 */


// Start of sap\m\Toolbar.js
jQuery.sap.require("sap.m.ToolbarSpacer");
jQuery.sap.require("sap.ui.core.ResizeHandler");
jQuery.sap.require("sap.ui.core.EnabledPropagator");
sap.ui.core.EnabledPropagator.call(sap.m.Toolbar.prototype);

/*
 * Checks whether the given width is relative or not
 *
 * @static
 * @protected
 * @param {String} sWidth
 * @return {Boolean}
 */
sap.m.Toolbar.isRelativeWidth = function(sWidth) {
	return /^([-+]?\d+%|auto|inherit|)$/i.test(sWidth);
};

/*
 * Returns the ceiled sub-pixel width of the given element
 *
 * @static
 * @protected
 * @param {Node} oDomRef DOM Node
 * @return {Number} ceiled sub-pixel(0 or 1)
 */
sap.m.Toolbar.getSubPixelWidth = function(oDomRef) {
	if (!oDomRef || !oDomRef.style) {
		return 0;
	}

	var sWidth = window.getComputedStyle(oDomRef).getPropertyValue("width");
	return Math.ceil(parseFloat(sWidth) % 1) || 0;
};

/*
 * Checks the given element horizontally overflowed
 *
 * @static
 * @protected
 * @param {jQuery} $Element jQuery Object
 * @return {Boolean} whether overflow or not
 */
sap.m.Toolbar.checkOverflow = function($Element) {
	if (!$Element || !$Element.length) {
		return false;
	}

	$Element.children().each(function() {
		var sOrigWidth = sap.m.Toolbar.getOrigWidth(this);
		this.style.width = sOrigWidth;
	});

	return $Element[0].scrollWidth > $Element[0].clientWidth;
};

/*
 * Returns the original width(currently only control width) via DOMRef
 * TODO: This function is not smart enough to detect DOM width changes
 * But tracking width changes is also expensive
 * (last and original width values must be keep in DOM and need update)
 * For now we assume app developers call setWidth from the control
 *
 * @static
 * @protected
 * @param {Node} oDomRef DOM Node
 * @return {String} width
 */
sap.m.Toolbar.getOrigWidth = function(oDomRef) {
	if (!oDomRef || !oDomRef.id) {
		return "";
	}

	var oControl = sap.ui.getCore().byId(oDomRef.id);
	if (!oControl || !oControl.getWidth) {
		return "auto";
	}

	return oControl.getWidth();
};

/*
 * Checks DOMRef whether shrinkable or not and marks according to second param
 * Percent widths and text nodes(without fixed width) are shrinkable
 *
 * @static
 * @protected
 * @param {jQuery} $Element jQuery Object
 * @param {String} [sShrinkClass] shrink item class name
 */
sap.m.Toolbar.checkShrinkable = function($Element, sShrinkClass) {
	if (!$Element || !$Element.length) {
		return;
	}

	var oDomRef = $Element[0];
	var sWidth = this.getOrigWidth(oDomRef);
	if (!this.isRelativeWidth(sWidth) || $Element.is(":hidden")) {
		return;
	}

	if (sWidth.indexOf("%") > 0 || (oDomRef.firstChild || {}).nodeType == 3) {
		$Element.addClass(sShrinkClass);
		return true;
	}
};

/*
 * Grow-Shrink flexbox polyfill for Toolbar
 *
 * @static
 * @protected
 * @param {jQuery} $Element The container of flex items
 * @param {String} [sFlexClass] flex item class name
 * @param {String} [sShrinkClass] shrink item class name
 */
sap.m.Toolbar.flexie = function($Element, sFlexClass, sShrinkClass) {
	// check element exists and visible. jQuery does not check the visibility with ":hidden" filter
	if (!$Element || !$Element.length ||  $Element.css("visibility") == "hidden" || $Element.is(":hidden")) {
		return;
	}

	var iInnerWidth = 0,
		iTotalPercent = 0,
		aFlexItems = [],
		aPercentItems = [],
		nOuterWidth = $Element.width(),
		$Children = $Element.children(),
		bOverflow = this.checkOverflow($Element),
		pushPercentItem = function($item, nPercent) {
			var nBoxSizing = 0;
			var nWidth = $item.width();
			iTotalPercent += nPercent;
			iInnerWidth += $item.outerWidth(true) - nWidth;
			if ($item.css("box-sizing") == "border-box") {
				nBoxSizing = $item.outerWidth() - nWidth;
			}
			aPercentItems.push({
				boxSizing : nBoxSizing,
				percent : nPercent,
				el : $item[0]
			});
		},
		canPercentItemsFit = function() {
			if (aPercentItems.length) {
				var nRemainWidth = nOuterWidth - iInnerWidth;
				aPercentItems.forEach(function(oItem) {
					var nWidth = (nOuterWidth * oItem.percent) / 100;
					nRemainWidth -= Math.floor(nWidth);
				});
				return (nRemainWidth >= 0);
			}
		},
		setWidths = function(iTotalWidth) {
			var iSumOfWidth = 0;
			aPercentItems.forEach(function(oItem) {
				var nRelativePercent = Math.min(100, (oItem.percent * 100) / iTotalPercent);
				var nWidth = oItem.boxSizing + Math.floor((iTotalWidth * nRelativePercent) / 100);
				var sWidth = nWidth + "px";
				oItem.el.style.width = sWidth;
				iSumOfWidth += nWidth;
			});

			iTotalWidth -= iSumOfWidth;
			if (iTotalWidth > 1) {
				aFlexItems.forEach(function(oFlexItemDomRef) {
					oFlexItemDomRef.style.width = Math.floor(iTotalWidth / aFlexItems.length) + "px";
				});
			}
		};

	// start calculation
	$Children.each(function() {
		var $Child = jQuery(this);
		var sWidth = this.style.width;
		var bAutoWidth = !sWidth || sWidth == "auto" || sWidth == "inherit";
		if (bAutoWidth && sFlexClass && $Child.hasClass(sFlexClass)) {
			// flexible item
			aFlexItems.push(this);
			this.style.width = "0px";
		} else if ($Child.is(":hidden")) {
			// invisible item
			return;
		} else if (sWidth.indexOf("%") > 0) {
			// percent items
			var nPercent = parseFloat(sWidth);
			pushPercentItem($Child, nPercent);
		} else if (bOverflow && bAutoWidth && (this.firstChild || {}).nodeType == 3) {
			// if toolbar overflow then text nodes should behave like percent items
			pushPercentItem($Child, ($Child.width() * 100 / nOuterWidth));
		} else {
			var iSubPixel = sap.m.Toolbar.getSubPixelWidth($Child[0]);
			iInnerWidth += $Child.outerWidth(true) + iSubPixel;

			// (in IE9) if toolbar is placed in a container which has absolute position and if inner item
			// has sub pixel width(probably caused by auto width) then after calculation even the size is correct,
			// browser increases the width of toolbar container and this cause a new resize handler trigger again.
			// here as a workaround we set the absolute width and browser calculates it correctly
			if (iSubPixel) {
				$Child.width(iSubPixel + ($Child.css("box-sizing") == "border-box" ? $Child.outerWidth() : $Child.width()));
			}
		}
	});

	// check if there is still place for flex
	var nRemainWidth = nOuterWidth - iInnerWidth;
	if (nRemainWidth > 0) {
		setWidths(canPercentItemsFit() ? nOuterWidth : nRemainWidth);
	}
};

// decides toolbar has flexbox support
sap.m.Toolbar.hasFlexBoxSupport = jQuery.support.flexBoxLayout;

// decides toolbar has new flexbox support
sap.m.Toolbar.hasNewFlexBoxSupport = (function() {
	var oStyle = document.documentElement.style;
	return (oStyle.flex !== undefined || oStyle.msFlex !== undefined);
}());

sap.m.Toolbar.prototype.onBeforeRendering = function() {
	this._deregisterResize();
};

sap.m.Toolbar.prototype.onAfterRendering = function() {
	// define behaviour according to flex support
	if (sap.m.Toolbar.hasNewFlexBoxSupport) {
		this._markShrinkableContents();
	} else if (sap.m.Toolbar.hasFlexBoxSupport) {
		this._resetOverflow();
	} else {
		this._reflexie();
	}

	// register resize handler if needed
	this._registerResize();
};

sap.m.Toolbar.prototype.exit = function() {
	this._deregisterResize();
};

sap.m.Toolbar.prototype.addContent = function(oContent) {
	this.addAggregation("content", oContent);
	this._attachContentPropertyChange(oContent);
	return this;
};

sap.m.Toolbar.prototype.insertContent = function(oContent, iIndex) {
	this.insertAggregation("content", oContent, iIndex);
	this._attachContentPropertyChange(oContent);
	return this;
};

sap.m.Toolbar.prototype.removeContent = function(vContent) {
	vContent = this.removeAggregation("content", vContent);
	this._detachContentPropertyChange(vContent);
	return vContent;
};

sap.m.Toolbar.prototype.removeAllContent = function() {
	var aContents = this.removeAllAggregation("content") || [];
	aContents.forEach(function(oContent) {
		this._detachContentPropertyChange(oContent);
	}, this);
	return aContents;
};

// handle press event
sap.m.Toolbar.prototype.ontap = function(oEvent) {
	this.getActive() && this.firePress({
		srcControl : oEvent.srcControl || this
	});
};

// keyboard handling mimic the tap/click event
sap.m.Toolbar.prototype.onsapenter = sap.m.Toolbar.prototype.ontap;
sap.m.Toolbar.prototype.onsapspace = sap.m.Toolbar.prototype.ontap;

sap.m.Toolbar.prototype.ontouchstart = function(oEvent) {
	// for control who need to know if they should handle touch events of toolbar
	oEvent.originalEvent._sapui_handledByControl = this.getActive();
};

// Reset the overflow add mark with classname if overflows
sap.m.Toolbar.prototype._resetOverflow = function() {
	var $this = this.$();
	$this.removeClass("sapMTBOverflow");
	var bOverflow = $this[0].scrollWidth > $this[0].clientWidth;
	bOverflow && $this.addClass("sapMTBOverflow");
};

// called when a content property is changed
sap.m.Toolbar.prototype._onContentPropertyChanged = function(oEvent) {
	if (!sap.m.Toolbar.hasFlexBoxSupport || oEvent.getParameter("name") != "width") {
		return;
	}

	// check and mark percent widths
	var oControl = oEvent.getSource();
	var bPercent = oControl.getWidth().indexOf("%") > 0;
	oControl.$().toggleClass("sapMTBShrinkItem", bPercent);
};

// check and mark shrinkable contents with class name
sap.m.Toolbar.prototype._markShrinkableContents = function() {
	this.getContent().forEach(function(oControl) {
		sap.m.Toolbar.checkShrinkable(oControl.$(), "sapMTBShrinkItem");
	});
};

// attach property change handler for the given control
sap.m.Toolbar.prototype._attachContentPropertyChange = function(oControl) {
	oControl.attachEvent("_change", this._onContentPropertyChanged, this);
};

// detach property change handler from given control
sap.m.Toolbar.prototype._detachContentPropertyChange = function(oControl) {
	oControl.detachEvent("_change", this._onContentPropertyChanged, this);
};

// register interval timer to detect inner content size is changed
sap.m.Toolbar.prototype._registerContentResize = function() {
	sap.ui.getCore().attachIntervalTimer(this._handleContentResize, this);
};

// deregister interval timer for inner content
sap.m.Toolbar.prototype._deregisterContentResize = function() {
	sap.ui.getCore().detachIntervalTimer(this._handleContentResize, this);
};

// register toolbar resize handler
sap.m.Toolbar.prototype._registerToolbarResize = function() {
	// register resize handler only if toolbar has relative width
	if (sap.m.Toolbar.isRelativeWidth(this.getWidth())) {
		var fnResizeProxy = jQuery.proxy(this._handleToolbarResize, this);
		this._sResizeListenerId = sap.ui.core.ResizeHandler.register(this, fnResizeProxy);
	}
};

// deregister toolbar resize handlers
sap.m.Toolbar.prototype._deregisterToolbarResize = function() {
	sap.ui.getCore().detachIntervalTimer(this._handleContentResize, this);
	if (this._sResizeListenerId) {
		sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);
		this._sResizeListenerId = null;
	}
};

// register resize handlers
sap.m.Toolbar.prototype._registerResize = function() {
	if (!sap.m.Toolbar.hasNewFlexBoxSupport) {
		this._registerToolbarResize();
		this._registerContentResize();
	}
};

// deregister resize handlers
sap.m.Toolbar.prototype._deregisterResize = function() {
	if (!sap.m.Toolbar.hasNewFlexBoxSupport) {
		this._deregisterToolbarResize();
		this._deregisterContentResize();
	}
};

// get the end position of last content
sap.m.Toolbar.prototype._getEndPoint = function() {
	var iEndPoint = 0;
	var oDomRef = this.getDomRef();
	if (oDomRef && oDomRef.lastElementChild) {
		iEndPoint = oDomRef.lastElementChild.offsetLeft;
		if (!sap.ui.getCore().getConfiguration().getRTL()) {
			iEndPoint += oDomRef.lastElementChild.offsetWidth;
		}
	}
	return iEndPoint;
};

// recalculate flexbox layout
sap.m.Toolbar.prototype._reflexie = function() {
	this._deregisterContentResize();
	sap.m.Toolbar.flexie(this.$(), sap.m.ToolbarSpacer.flexClass);
	this._endPoint = this._getEndPoint();
	this._registerContentResize();
};

// handle toolbar resize
sap.m.Toolbar.prototype._handleToolbarResize = function() {
	if (!sap.m.Toolbar.hasFlexBoxSupport) {
		this._reflexie();
	} else if (!sap.m.Toolbar.hasNewFlexBoxSupport) {
		this._resetOverflow();
	}
};

// handle inner content resize
sap.m.Toolbar.prototype._handleContentResize = function() {
	if (this._endPoint != this._getEndPoint()) {
		this._reflexie();
	}
};

// Augment 'design' property setter. If 'bCheckAutoDesign' is set,
// the sDesign property will not be changed. The corresponding visual
// design will only be applied if the toolbar's design property was 'Auto'.
sap.m.Toolbar.prototype.setDesign = function(sDesign, bCheckAutoDesign) {
	sDesign = this.validateProperty("design", sDesign);

	if (this.getDesign() != sDesign) {
		//For 'Auto', toolbar containers need to specify the
		//context class themselves (see for example sap.m.ListBaseRenderer)
		if (sap.m.ToolbarDesign.Auto != sDesign) {
			this._setContextClass("sapMTB-"+ sDesign +"-CTX", !bCheckAutoDesign);
		} else {
			//remove current context class
			var $this = this.$();
			//remove old class
			$this.removeClass(this._contextClass);
		}

		//Do suppress rerendering
		if (!bCheckAutoDesign) {
			this.setProperty("design", sDesign, true);
		}
	}

	return this;
};


// Private setter for private property _contextClass
sap.m.Toolbar.prototype._setContextClass = function(sClass, bForceChange) {
	// make sure that _contextClass can only be changed if design is
	// 'Auto'. If a design is specified for the toolbar, it should be
	// applied.
	if (bForceChange || sap.m.ToolbarDesign.Auto === this.getDesign()) {
		var $this = this.$();
		//remove old class first
		$this.removeClass(this._contextClass);
		this._contextClass = sClass;
		//now set the new context class
		$this.addClass(this._contextClass);
	}
};

sap.m.Toolbar.prototype._getContextClass = function() {
	return this._contextClass;
};
