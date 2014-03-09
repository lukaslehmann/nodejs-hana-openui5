/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.layout.GridData.
jQuery.sap.declare("sap.ui.layout.GridData");
jQuery.sap.require("sap.ui.layout.library");
jQuery.sap.require("sap.ui.core.LayoutData");


/**
 * Constructor for a new GridData.
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
 * <li>{@link #getSpan span} : sap.ui.layout.GridSpan</li>
 * <li>{@link #getIndent indent} : sap.ui.layout.GridIndent</li>
 * <li>{@link #getVisibleOnLarge visibleOnLarge} : boolean (default: true)</li>
 * <li>{@link #getVisibleOnMedium visibleOnMedium} : boolean (default: true)</li>
 * <li>{@link #getVisibleOnSmall visibleOnSmall} : boolean (default: true)</li>
 * <li>{@link #getMoveBackwards moveBackwards} : sap.ui.layout.GridIndent</li>
 * <li>{@link #getMoveForward moveForward} : sap.ui.layout.GridIndent</li>
 * <li>{@link #getLinebreak linebreak} : boolean (default: false)</li>
 * <li>{@link #getLinebreakL linebreakL} : boolean (default: false)</li>
 * <li>{@link #getLinebreakM linebreakM} : boolean (default: false)</li>
 * <li>{@link #getLinebreakS linebreakS} : boolean (default: false)</li>
 * <li>{@link #getSpanLarge spanLarge} : int</li>
 * <li>{@link #getSpanMedium spanMedium} : int</li>
 * <li>{@link #getSpanSmall spanSmall} : int</li>
 * <li>{@link #getIndentLarge indentLarge} : int</li>
 * <li>{@link #getIndentMedium indentMedium} : int</li>
 * <li>{@link #getIndentSmall indentSmall} : int</li></ul>
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
 * In addition, all settings applicable to the base type {@link sap.ui.core.LayoutData#constructor sap.ui.core.LayoutData}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Grid layout data
 * @extends sap.ui.core.LayoutData
 *
 * @author SAP AG 
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor   
 * @public
 * @since 1.15.0
 * @name sap.ui.layout.GridData
 */
sap.ui.core.LayoutData.extend("sap.ui.layout.GridData", { metadata : {

	// ---- object ----

	// ---- control specific ----
	library : "sap.ui.layout",
	properties : {
		"span" : {type : "sap.ui.layout.GridSpan", group : "Behavior", defaultValue : null},
		"indent" : {type : "sap.ui.layout.GridIndent", group : "Behavior", defaultValue : null},
		"visibleOnLarge" : {type : "boolean", group : "Behavior", defaultValue : true},
		"visibleOnMedium" : {type : "boolean", group : "Behavior", defaultValue : true},
		"visibleOnSmall" : {type : "boolean", group : "Behavior", defaultValue : true},
		"moveBackwards" : {type : "sap.ui.layout.GridIndent", group : "Misc", defaultValue : null},
		"moveForward" : {type : "sap.ui.layout.GridIndent", group : "Misc", defaultValue : null},
		"linebreak" : {type : "boolean", group : "Misc", defaultValue : false},
		"linebreakL" : {type : "boolean", group : "Misc", defaultValue : false},
		"linebreakM" : {type : "boolean", group : "Misc", defaultValue : false},
		"linebreakS" : {type : "boolean", group : "Misc", defaultValue : false},
		"spanLarge" : {type : "int", group : "Behavior", defaultValue : null},
		"spanMedium" : {type : "int", group : "Behavior", defaultValue : null},
		"spanSmall" : {type : "int", group : "Behavior", defaultValue : null},
		"indentLarge" : {type : "int", group : "Behavior", defaultValue : null},
		"indentMedium" : {type : "int", group : "Behavior", defaultValue : null},
		"indentSmall" : {type : "int", group : "Behavior", defaultValue : null}
	}
}});


/**
 * Creates a new subclass of class sap.ui.layout.GridData with name <code>sClassName</code> 
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
 * @name sap.ui.layout.GridData.extend
 * @function
 */


/**
 * Getter for property <code>span</code>.
 * A string type that represents Grid's span values for large, medium and small screens. Allowed values are separated by space Letters L, M or S followed by number of columns from 1 to 12 that the container has to take, for example: "L2 M4 S6", "M12", "s10" or "l4 m4". Note that the parameters has to be provided in the order large medium small.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.layout.GridSpan} the value of property <code>span</code>
 * @public
 * @name sap.ui.layout.GridData#getSpan
 * @function
 */

/**
 * Setter for property <code>span</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.layout.GridSpan} sSpan  new value for property <code>span</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setSpan
 * @function
 */


/**
 * Getter for property <code>indent</code>.
 * A string type that represents Grid's span values for large, medium and small screens. Allowed values are separated by space Letters L, M or S followed by number of columns from 1 to 12 that the container has to take, for example: "L2 M4 S6", "M12", "s10" or "l4 m4". Note that the parameters has to be provided in the order large medium small.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.layout.GridIndent} the value of property <code>indent</code>
 * @public
 * @name sap.ui.layout.GridData#getIndent
 * @function
 */

/**
 * Setter for property <code>indent</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.layout.GridIndent} sIndent  new value for property <code>indent</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setIndent
 * @function
 */


/**
 * Getter for property <code>visibleOnLarge</code>.
 * Defines if this Control is visible on Large screens.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visibleOnLarge</code>
 * @public
 * @name sap.ui.layout.GridData#getVisibleOnLarge
 * @function
 */

/**
 * Setter for property <code>visibleOnLarge</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisibleOnLarge  new value for property <code>visibleOnLarge</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setVisibleOnLarge
 * @function
 */


/**
 * Getter for property <code>visibleOnMedium</code>.
 * Defines if this Control is visible on Medium size screens.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visibleOnMedium</code>
 * @public
 * @name sap.ui.layout.GridData#getVisibleOnMedium
 * @function
 */

/**
 * Setter for property <code>visibleOnMedium</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisibleOnMedium  new value for property <code>visibleOnMedium</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setVisibleOnMedium
 * @function
 */


/**
 * Getter for property <code>visibleOnSmall</code>.
 * Defines if this Control is visible on small screens.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visibleOnSmall</code>
 * @public
 * @name sap.ui.layout.GridData#getVisibleOnSmall
 * @function
 */

/**
 * Setter for property <code>visibleOnSmall</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisibleOnSmall  new value for property <code>visibleOnSmall</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setVisibleOnSmall
 * @function
 */


/**
 * Getter for property <code>moveBackwards</code>.
 * Optional. Moves a cell backwards so many columns as specified.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.layout.GridIndent} the value of property <code>moveBackwards</code>
 * @public
 * @name sap.ui.layout.GridData#getMoveBackwards
 * @function
 */

/**
 * Setter for property <code>moveBackwards</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.layout.GridIndent} sMoveBackwards  new value for property <code>moveBackwards</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setMoveBackwards
 * @function
 */


/**
 * Getter for property <code>moveForward</code>.
 * Optional. Moves a cell forwards so many columns as specified.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.layout.GridIndent} the value of property <code>moveForward</code>
 * @public
 * @name sap.ui.layout.GridData#getMoveForward
 * @function
 */

/**
 * Setter for property <code>moveForward</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.layout.GridIndent} sMoveForward  new value for property <code>moveForward</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setMoveForward
 * @function
 */


/**
 * Getter for property <code>linebreak</code>.
 * Optional. If this property is set to true, the control on all-size screens causes a line break within the Grid and becomes the first within the next line.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>linebreak</code>
 * @public
 * @name sap.ui.layout.GridData#getLinebreak
 * @function
 */

/**
 * Setter for property <code>linebreak</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bLinebreak  new value for property <code>linebreak</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setLinebreak
 * @function
 */


/**
 * Getter for property <code>linebreakL</code>.
 * Optional. If this property is set to true, the control on large screens causes a line break within the Grid and becomes the first within the next line.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>linebreakL</code>
 * @public
 * @name sap.ui.layout.GridData#getLinebreakL
 * @function
 */

/**
 * Setter for property <code>linebreakL</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bLinebreakL  new value for property <code>linebreakL</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setLinebreakL
 * @function
 */


/**
 * Getter for property <code>linebreakM</code>.
 * Optional. If this property is set to true, the control on medium sized screens causes a line break within the Grid and becomes the first within the next line.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>linebreakM</code>
 * @public
 * @name sap.ui.layout.GridData#getLinebreakM
 * @function
 */

/**
 * Setter for property <code>linebreakM</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bLinebreakM  new value for property <code>linebreakM</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setLinebreakM
 * @function
 */


/**
 * Getter for property <code>linebreakS</code>.
 * Optional. If this property is set to true, the control on small screens causes a line break within the Grid and becomes the first within the next line.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>linebreakS</code>
 * @public
 * @name sap.ui.layout.GridData#getLinebreakS
 * @function
 */

/**
 * Setter for property <code>linebreakS</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bLinebreakS  new value for property <code>linebreakS</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setLinebreakS
 * @function
 */


/**
 * Getter for property <code>spanLarge</code>.
 * Optional. Defines a span value for large screens. This value overwrites the value for large screens defined in the parameter "span".
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {int} the value of property <code>spanLarge</code>
 * @public
 * @name sap.ui.layout.GridData#getSpanLarge
 * @function
 */

/**
 * Setter for property <code>spanLarge</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {int} iSpanLarge  new value for property <code>spanLarge</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setSpanLarge
 * @function
 */


/**
 * Getter for property <code>spanMedium</code>.
 * Optional. Defines a span value for medium size screens. This value overwrites the value for medium screens defined in the parameter "span".
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {int} the value of property <code>spanMedium</code>
 * @public
 * @name sap.ui.layout.GridData#getSpanMedium
 * @function
 */

/**
 * Setter for property <code>spanMedium</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {int} iSpanMedium  new value for property <code>spanMedium</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setSpanMedium
 * @function
 */


/**
 * Getter for property <code>spanSmall</code>.
 * Optional. Defines a span value for small screens. This value overwrites the value for small screens defined in the parameter "span".
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {int} the value of property <code>spanSmall</code>
 * @public
 * @name sap.ui.layout.GridData#getSpanSmall
 * @function
 */

/**
 * Setter for property <code>spanSmall</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {int} iSpanSmall  new value for property <code>spanSmall</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setSpanSmall
 * @function
 */


/**
 * Getter for property <code>indentLarge</code>.
 * Optional. Defines a span value for large screens. This value overwrites the value for large screens defined in the parameter "indent".
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {int} the value of property <code>indentLarge</code>
 * @public
 * @name sap.ui.layout.GridData#getIndentLarge
 * @function
 */

/**
 * Setter for property <code>indentLarge</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {int} iIndentLarge  new value for property <code>indentLarge</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setIndentLarge
 * @function
 */


/**
 * Getter for property <code>indentMedium</code>.
 * Optional. Defines a span value for medium size screens. This value overwrites the value for medium screens defined in the parameter "indent".
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {int} the value of property <code>indentMedium</code>
 * @public
 * @name sap.ui.layout.GridData#getIndentMedium
 * @function
 */

/**
 * Setter for property <code>indentMedium</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {int} iIndentMedium  new value for property <code>indentMedium</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setIndentMedium
 * @function
 */


/**
 * Getter for property <code>indentSmall</code>.
 * Optional. Defines a span value for small screens. This value overwrites the value for small screens defined in the parameter "indent".
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {int} the value of property <code>indentSmall</code>
 * @public
 * @name sap.ui.layout.GridData#getIndentSmall
 * @function
 */

/**
 * Setter for property <code>indentSmall</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {int} iIndentSmall  new value for property <code>indentSmall</code>
 * @return {sap.ui.layout.GridData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.GridData#setIndentSmall
 * @function
 */


// Start of sap\ui\layout\GridData.js
/**
 * This file defines behavior for the control
 */
(function() {

	sap.ui.layout.GridData.prototype._setStylesInternal = function(sStyles) {
		if (sStyles && sStyles.length > 0) {
			this._sStylesInternal = sStyles;
		} else {
			this._sStylesInternal = undefined;
		}
	};
	
	/*
	 * Get span information for the large screens
     * @return {integer} the value of the span 
     * @private
     */   	

	sap.ui.layout.GridData.prototype._getEffectiveSpanLarge = function() {

		var iSpan = this.getSpanLarge();
		if (iSpan && (iSpan > 0) && (iSpan < 13)) {
			return iSpan;
		}

		var SPANPATTERN = /L([1-9]|1[0-2])(?:\s|$)/i;

		var aSpan = SPANPATTERN.exec(this.getSpan());

		if (aSpan) {
			var span = aSpan[0];
			if (span) {
				span = span.toUpperCase();
				if (span.substr(0,1) === "L") {
					return parseInt(span.substr(1));
				}
			}
		}
		return undefined;
	};
	
	/*
	 * Get span information for the medium screens @return {integer} the value
	 * of the span @private
	 */   	
	sap.ui.layout.GridData.prototype._getEffectiveSpanMedium = function() {
		var iSpan = this.getSpanMedium();
		if (iSpan && (iSpan > 0) && (iSpan < 13)) {
			return iSpan;
		}

		var SPANPATTERN = /M([1-9]|1[0-2])(?:\s|$)/i;

		var aSpan = SPANPATTERN.exec(this.getSpan());

		if (aSpan) {
			var span = aSpan[0];
			if (span) {
				span = span.toUpperCase();
				if (span.substr(0,1) === "M") {
					return parseInt(span.substr(1));
				}
			}
		}
		return undefined;
	};
	
	/*
	 * Get span information for the small screens
     * @return {integer} the value of the span 
     * @private
     */   	
	sap.ui.layout.GridData.prototype._getEffectiveSpanSmall = function() {
		var iSpan = this.getSpanSmall();
		if (iSpan && (iSpan > 0) && (iSpan < 13)) {
			return iSpan;
		}

		var SPANPATTERN = /S([1-9]|1[0-2])(?:\s|$)/i;

		var aSpan = SPANPATTERN.exec(this.getSpan());

		if (aSpan) {
			var span = aSpan[0];
			if (span) {
				span = span.toUpperCase();
				if (span.substr(0,1) === "S") {
					return parseInt(span.substr(1));
				}
			}
		}
		return undefined;
	};
	
	
	
}());
