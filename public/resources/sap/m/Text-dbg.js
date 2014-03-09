/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.Text.
jQuery.sap.declare("sap.m.Text");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new Text.
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
 * <li>{@link #getText text} : string (default: '')</li>
 * <li>{@link #getTextDirection textDirection} : sap.ui.core.TextDirection (default: sap.ui.core.TextDirection.Inherit)</li>
 * <li>{@link #getVisible visible} : boolean (default: true)</li>
 * <li>{@link #getWrapping wrapping} : boolean (default: true)</li>
 * <li>{@link #getTextAlign textAlign} : sap.ui.core.TextAlign (default: sap.ui.core.TextAlign.Begin)</li>
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize</li>
 * <li>{@link #getMaxLines maxLines} : int</li></ul>
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
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * The Text control is used to display some continuous text.
 * @extends sap.ui.core.Control
 *
 * @author SAP AG 
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor   
 * @public
 * @name sap.m.Text
 */
sap.ui.core.Control.extend("sap.m.Text", { metadata : {

	// ---- object ----

	// ---- control specific ----
	library : "sap.m",
	properties : {
		"text" : {type : "string", group : "", defaultValue : '', bindable : "bindable"},
		"textDirection" : {type : "sap.ui.core.TextDirection", group : "Appearance", defaultValue : sap.ui.core.TextDirection.Inherit},
		"visible" : {type : "boolean", group : "Appearance", defaultValue : true},
		"wrapping" : {type : "boolean", group : "Appearance", defaultValue : true},
		"textAlign" : {type : "sap.ui.core.TextAlign", group : "Appearance", defaultValue : sap.ui.core.TextAlign.Begin},
		"width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
		"maxLines" : {type : "int", group : "Appearance", defaultValue : null}
	}
}});


/**
 * Creates a new subclass of class sap.m.Text with name <code>sClassName</code> 
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
 * @name sap.m.Text.extend
 * @function
 */


/**
 * Getter for property <code>text</code>.
 * Text to be displayed.
 *
 * Default value is <code>''</code>
 *
 * @return {string} the value of property <code>text</code>
 * @public
 * @name sap.m.Text#getText
 * @function
 */

/**
 * Setter for property <code>text</code>.
 *
 * Default value is <code>''</code> 
 *
 * @param {string} sText  new value for property <code>text</code>
 * @return {sap.m.Text} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Text#setText
 * @function
 */


/**
 * Binder for property <code>text</code>.
 *
 * @param {string} sPath path to a property in the model 
 * @param {function} [fnFormatter=null] the formatter function
 * @param {sap.ui.model.BindingMode} [sMode=Default] the binding mode to be used for this property binding (e.g. one way) 
 * @return {sap.m.Text} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Text#bindText
 * @function
 */

/**
 * Unbinder for property <code>text</code>.
 *
 * @return {sap.m.Text} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Text#unbindText
 * @function
 */


/**
 * Getter for property <code>textDirection</code>.
 * Available options for the text direction are LTR and RTL. By default the control inherits the text direction from its parent control.
 *
 * Default value is <code>Inherit</code>
 *
 * @return {sap.ui.core.TextDirection} the value of property <code>textDirection</code>
 * @public
 * @name sap.m.Text#getTextDirection
 * @function
 */

/**
 * Setter for property <code>textDirection</code>.
 *
 * Default value is <code>Inherit</code> 
 *
 * @param {sap.ui.core.TextDirection} oTextDirection  new value for property <code>textDirection</code>
 * @return {sap.m.Text} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Text#setTextDirection
 * @function
 */


/**
 * Getter for property <code>visible</code>.
 * Set this property to false to make text invisible.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visible</code>
 * @public
 * @name sap.m.Text#getVisible
 * @function
 */

/**
 * Setter for property <code>visible</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisible  new value for property <code>visible</code>
 * @return {sap.m.Text} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Text#setVisible
 * @function
 */


/**
 * Getter for property <code>wrapping</code>.
 * Set this property to false to disable the automatic text wrapping.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>wrapping</code>
 * @public
 * @name sap.m.Text#getWrapping
 * @function
 */

/**
 * Setter for property <code>wrapping</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bWrapping  new value for property <code>wrapping</code>
 * @return {sap.m.Text} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Text#setWrapping
 * @function
 */


/**
 * Getter for property <code>textAlign</code>.
 * Sets the horizontal alignment of the text.
 *
 * Default value is <code>Begin</code>
 *
 * @return {sap.ui.core.TextAlign} the value of property <code>textAlign</code>
 * @public
 * @name sap.m.Text#getTextAlign
 * @function
 */

/**
 * Setter for property <code>textAlign</code>.
 *
 * Default value is <code>Begin</code> 
 *
 * @param {sap.ui.core.TextAlign} oTextAlign  new value for property <code>textAlign</code>
 * @return {sap.m.Text} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Text#setTextAlign
 * @function
 */


/**
 * Getter for property <code>width</code>.
 * By default the Text control uses the full width available. Set this property to restrict the width to a custom value.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>width</code>
 * @public
 * @name sap.m.Text#getWidth
 * @function
 */

/**
 * Setter for property <code>width</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.CSSSize} sWidth  new value for property <code>width</code>
 * @return {sap.m.Text} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Text#setWidth
 * @function
 */


/**
 * Getter for property <code>maxLines</code>.
 * Limits the number of lines for wrapping texts.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {int} the value of property <code>maxLines</code>
 * @public
 * @since 1.13.2
 * @name sap.m.Text#getMaxLines
 * @function
 */

/**
 * Setter for property <code>maxLines</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {int} iMaxLines  new value for property <code>maxLines</code>
 * @return {sap.m.Text} <code>this</code> to allow method chaining
 * @public
 * @since 1.13.2
 * @name sap.m.Text#setMaxLines
 * @function
 */


// Start of sap\m\Text.js
jQuery.sap.require("sap.ui.core.ResizeHandler");

// when line-height is normal
sap.m.Text.normalLineHeight = 1.2;

sap.m.Text.prototype.setText = function(sText) {
	this.setProperty("text", sText , true);
	var oDomRef = this.getDomRef();
	if (oDomRef) {
		oDomRef.textContent = this.getText(true);
	}
	return this;
};

sap.m.Text.prototype.getText = function(bNormalize) {
	var sText = this.getProperty("text");
	if (bNormalize) {
		return sText.replace(/\r\n/g, "\n");
	}
	return sText;
};

sap.m.Text.prototype.onBeforeRendering = function() {
	this._cleanupResize();
};

sap.m.Text.prototype.onAfterRendering = function() {
	if (!this.getWrapping() || this.getMaxLines() < 2) {
		return;
	}

	if (sap.m.Text.hasNativeLineClamp) {
		// There is a bug with -webkit-line-clamp does not repaint sometimes
		// Here we try to handle repaint with the cheapest and the same result
		// https://code.google.com/p/chromium/issues/detail?id=265836
		jQuery.sap.delayedCall(0, this, function() {
			this.$().css("display", "-webkit-inline-box");
		});
	} else {
		this._clampText();
		this._registerResize();
	}
};

sap.m.Text.prototype.exit = function() {
	this._cleanupResize();
};

/**
 * Defines whether browser supports native line clamp or not
 *
 * @since 1.13.2
 * @protected
 * @static
 */
sap.m.Text.hasNativeLineClamp = (function() {
	return (typeof document.documentElement.style.webkitLineClamp != "undefined");
})();

/**
 * Ellipsis(…) text to indicate more text for browser which does not support native line clamp
 * Can be overwritten with 3dots(...) if fonts do not support this UTF-8 character.
 * NOTE: Changing this does not affect native ellipsis support
 *
 * @since 1.13.2
 * @protected
 */
sap.m.Text.prototype.ellipsis = '…';

// clean up resize handler stuff
sap.m.Text.prototype._cleanupResize = function() {
	this._deregisterResize();
	this._bClamping = false;
};

// generate proxy and register DOM resize handler
sap.m.Text.prototype._registerResize = function() {
	this._fnResizeProxy = this._fnResizeProxy || jQuery.proxy(this._clampText, this);
	this._sResizeListenerId = sap.ui.core.ResizeHandler.register(this, this._fnResizeProxy);
};

// remove DOM resize handler
sap.m.Text.prototype._deregisterResize = function() {
	if (this._sResizeListenerId) {
		sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);
		delete this._sResizeListenerId;
	}
};

// clamps the wrapping text if too long
sap.m.Text.prototype._clampText = function(oEvent) {
	if (this._bClamping) {
		return;
	}
	// lock until done
	this._bClamping = true;
	this._deregisterResize();

	var interval = (!oEvent || !sap.ui.Device.browser.internet_explorer) ? 0 : 50;
	jQuery.sap.delayedCall(interval, this, this._clampElement);
};

// process the real DOM clamping
sap.m.Text.prototype._clampElement = function() {
	// check maybe already destroyed
	var oText = this.getDomRef();
	if (!oText) {
		this._bClamping = false;
		return;
	}

	// init
	var nMidPos,
		nStartPos = 0,
		sText = this.getText(true),
		nEndPos = sText.length,
		nEllipsisLen = this.ellipsis.length,
		nClampHeight = this._clampHeight();

	oText.textContent = sText;
	if (oText.scrollHeight > nClampHeight) {
		// implementing binary search to find the position of ellipsis
		// complexity O(logn) so 65536 characters text can be found within 16 steps
		while ((nEndPos - nStartPos) > nEllipsisLen) {
			nMidPos = (nStartPos + nEndPos) >> 1;
			oText.textContent = sText.slice(0, nMidPos - nEllipsisLen) + this.ellipsis;
			if (oText.scrollHeight > nClampHeight) {
				nEndPos = nMidPos;
			} else {
				nStartPos = nMidPos;
			}
		}

		// last check maybe we overflowed on last character
		if (oText.scrollHeight > nClampHeight && nStartPos > 0) {
			oText.textContent = sText.slice(0, nStartPos - nEllipsisLen) + this.ellipsis;
		}
	}

	this._registerResize();
	this._bClamping = false;
};

// set and return the max height according to max-line property
sap.m.Text.prototype._clampHeight = function() {
	var $text = this.$(),
		lineHeight = parseFloat($text.css("line-height")),	// we should ignore "normal" line-height
		lineHeight = lineHeight || parseFloat($text.css("font-size")) * sap.m.Text.normalLineHeight,
		clampHeight = Math.floor(this.getMaxLines() * lineHeight);

	$text.css("max-height", clampHeight);
	return clampHeight;
};