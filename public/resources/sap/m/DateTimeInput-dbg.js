/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.DateTimeInput.
jQuery.sap.declare("sap.m.DateTimeInput");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.m.InputBase");


/**
 * Constructor for a new DateTimeInput.
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
 * <li>{@link #getType type} : sap.m.DateTimeInputType (default: sap.m.DateTimeInputType.Date)</li>
 * <li>{@link #getDisplayFormat displayFormat} : string</li>
 * <li>{@link #getValueFormat valueFormat} : string</li>
 * <li>{@link #getDateValue dateValue} : object</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.DateTimeInput#event:change change} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.m.InputBase#constructor sap.m.InputBase}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Allows end users to interact with date and/or time and select from a date and/or time pad.
 * @extends sap.m.InputBase
 *
 * @author SAP AG 
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor   
 * @public
 * @since 1.9.1
 * @name sap.m.DateTimeInput
 */
sap.m.InputBase.extend("sap.m.DateTimeInput", { metadata : {

	// ---- object ----

	// ---- control specific ----
	library : "sap.m",
	properties : {
		"type" : {type : "sap.m.DateTimeInputType", group : "Data", defaultValue : sap.m.DateTimeInputType.Date},
		"displayFormat" : {type : "string", group : "Appearance", defaultValue : null},
		"valueFormat" : {type : "string", group : "Data", defaultValue : null},
		"dateValue" : {type : "object", group : "Data", defaultValue : null}
	},
	events : {
		"change" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.DateTimeInput with name <code>sClassName</code> 
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
 * @name sap.m.DateTimeInput.extend
 * @function
 */

sap.m.DateTimeInput.M_EVENTS = {'change':'change'};


/**
 * Getter for property <code>type</code>.
 * Type of DateTimeInput (e.g. Date, Time, DateTime)
 *
 * Default value is <code>Date</code>
 *
 * @return {sap.m.DateTimeInputType} the value of property <code>type</code>
 * @public
 * @name sap.m.DateTimeInput#getType
 * @function
 */

/**
 * Setter for property <code>type</code>.
 *
 * Default value is <code>Date</code> 
 *
 * @param {sap.m.DateTimeInputType} oType  new value for property <code>type</code>
 * @return {sap.m.DateTimeInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.DateTimeInput#setType
 * @function
 */


/**
 * Getter for property <code>displayFormat</code>.
 * Displays date value in this given format in text field. Default value is taken from locale settings.
 * If you use data-binding on value property with type sap.ui.model.type.Date then you can ignore this property or latter wins.
 * If user browser supports native picker then this property is overwritten by browser with locale settings.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>displayFormat</code>
 * @public
 * @name sap.m.DateTimeInput#getDisplayFormat
 * @function
 */

/**
 * Setter for property <code>displayFormat</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sDisplayFormat  new value for property <code>displayFormat</code>
 * @return {sap.m.DateTimeInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.DateTimeInput#setDisplayFormat
 * @function
 */


/**
 * Getter for property <code>valueFormat</code>.
 * Given value property should match with valueFormat to parse date. Default value is taken from locale settings.
 * You can set and get value in this format.
 * If you use data-binding on value property with type sap.ui.model.type.Date you can ignore this property or latter wins.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>valueFormat</code>
 * @public
 * @name sap.m.DateTimeInput#getValueFormat
 * @function
 */

/**
 * Setter for property <code>valueFormat</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sValueFormat  new value for property <code>valueFormat</code>
 * @return {sap.m.DateTimeInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.DateTimeInput#setValueFormat
 * @function
 */


/**
 * Getter for property <code>dateValue</code>.
 * This property as JavaScript Date Object can be used to assign a new value which is independent from valueFormat.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {object} the value of property <code>dateValue</code>
 * @public
 * @name sap.m.DateTimeInput#getDateValue
 * @function
 */

/**
 * Setter for property <code>dateValue</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {object} oDateValue  new value for property <code>dateValue</code>
 * @return {sap.m.DateTimeInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.DateTimeInput#setDateValue
 * @function
 */


/**
 * This event gets fired when the selection has finished and the value has changed. 
 *
 * @name sap.m.DateTimeInput#change
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {string} oControlEvent.getParameters.newValue The new string value of the control in given valueFormat(or locale format).
 * @param {object} oControlEvent.getParameters.newDateValue The new value of control as JavaScript Date Object or null if value is empty.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'change' event of this <code>sap.m.DateTimeInput</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.DateTimeInput</code>.<br/> itself. 
 *  
 * This event gets fired when the selection has finished and the value has changed. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.m.DateTimeInput</code>.<br/> itself.
 *
 * @return {sap.m.DateTimeInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.DateTimeInput#attachChange
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'change' event of this <code>sap.m.DateTimeInput</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.DateTimeInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.DateTimeInput#detachChange
 * @function
 */

/**
 * Fire event change to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'newValue' of type <code>string</code> The new string value of the control in given valueFormat(or locale format).</li>
 * <li>'newDateValue' of type <code>object</code> The new value of control as JavaScript Date Object or null if value is empty.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.DateTimeInput} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.DateTimeInput#fireChange
 * @function
 */


// Start of sap\m\DateTimeInput.js
jQuery.sap.require("sap.ui.core.theming.Parameters");
jQuery.sap.require("sap.ui.model.type.Date");

// sap.m.DateTimeCustom enables custom date time and adds related methods to prototype
jQuery.sap.require("sap.m.DateTimeCustom");

!function(oPrototype, $, oDevice) {

	var oi18n = sap.m.getLocaleData(),
		hasNativePicker = (function() {
			// if not platform dependent then we load custom picker
			if (sap.ui.core.theming.Parameters.get("sapMPlatformDependent") != "true") {
				return false;
			}

			// samsung galaxy android 4.1 has picker but it hangs after selection
			// in fact most of the android has some problems like opening a keyboard to type under Android 4.1
			// blackberry 10 has native pickers but no change event. Blur comes before picker shown and these makes pickers useless
			// Test page (http://jsfiddle.net/vve3W/2/light/)
			// there is no date time support for IE
			// http://caniuse.com/#feat=input-datetime
			if (oDevice.os.blackberry ||
				oDevice.browser.internet_explorer ||
				(oDevice.os.android && oDevice.browser.version <= 4.1 && !oDevice.browser.chrome)) {
				return false;
			}
		}());

	$.extend(oPrototype, {
		//In iOS5 date-time fields do not fire change/input events
		_hasChangeEventBug: oDevice.support.touch &&
							oDevice.os.ios &&
							oDevice.os.version < 6,
		_hasChangeEvent : true,
		_origin : "value",
		_super : sap.m.InputBase.prototype,
		_types : {
			Date : {
				isNative : hasNativePicker,
				valueFormat : oi18n.getDatePattern("short"),
				displayFormat : oi18n.getDatePattern("medium"),
				nativeFormat : "yyyy-MM-dd",
				nativeType : "date"
			},
			Time : {
				isNative : hasNativePicker,
				valueFormat : oi18n.getTimePattern("short"),
				displayFormat : oi18n.getTimePattern("short"),
				nativeFormat : "HH:mm:ss",
				nativeType : "time"
			},
			DateTime : {
				isNative : hasNativePicker,
				valueFormat : oi18n.getDateTimePattern("short"),	// does not include pattern but e.g "{1} {0}"
				displayFormat : oi18n.getDateTimePattern("short"),	// does not include pattern but e.g "{1} {0}"
				nativeFormat : "yyyy-MM-ddTHH:mm:ss" + (jQuery.os.ios ? ".S" : ""), //ios uses milliseconds
				nativeType : "datetime-local"	// without time-zone
			}
		}
	});

	//build DateTime formats from Date And Time values
	$.each(["Time", "Date"], function(nIndex, sType) {
		$.each(["valueFormat", "displayFormat"], function() {
			var oTypes = oPrototype._types;
			oTypes.DateTime[this] = oTypes.DateTime[this].replace("{" + nIndex + "}", oTypes[sType][this]);
		});
	});

}(sap.m.DateTimeInput.prototype, jQuery, sap.ui.Device);

/**
 * Overwrite sap.m.InputBase::onBeforeRendering
 */
sap.m.DateTimeInput.prototype.onBeforeRendering = function() {
	this._destroyCustomPicker();
	this._super.onBeforeRendering.call(this);
	if (!this.mProperties.hasOwnProperty("type")) {
		this.setType("Date");
	}
};

/**
 * Overwrite sap.m.InputBase::onAfterRendering
 */
sap.m.DateTimeInput.prototype.onAfterRendering = function() {
	this._super.onAfterRendering.call(this);

	if (!this._hasChangeEvent) {
		this._changeProxy = this._changeProxy || jQuery.proxy(this._onChange, this);
		this._$input.bind("blur focus", this._changeProxy);
	}

	if (!this.isNative()) {
		this._$input[0].type = "text";
		this._$input.scroller(this._getScrollerConfig());
	} else {
		this._$input[0].type = this._types[this.getType()].nativeType;
	}

	this._showValue();
};

sap.m.DateTimeInput.prototype.exit = function() {
	this._destroyCustomPicker();
	this._super.exit.call(this);
};

/**
 * Defines the width of the input. Default value is 100%
 *
 * @public
 * @param {string} sWidth
 */
sap.m.DateTimeInput.prototype.setWidth = function(sWidth) {
	return sap.m.InputBase.prototype.setWidth.call(this, sWidth || "100%");
};


/**
 * This function can be used  to assign new value and this is relevant with valueFormat property(see valueFormat) but independent from what is going to display on the field(see displayFormat).
 * Another way to assign new value is using dateValue property in JsView(see dateValue).
 * If you use both at the same time, latter wins.
 *
 * Also "Now" literal can be assigned as a parameter to show the current date and/or time.
 *
 * @public
 * @param {string} sValue
 * @return {sap.m.DateTimeInput}
 */
sap.m.DateTimeInput.prototype.setValue = function(sValue) {
	sValue = this.validateProperty("value", sValue);
	if (sValue.toLowerCase() == "now") {
		return this.setDateValue(new Date());
	}
	this.setProperty("value", sValue);
	this._origin = "value";
	this._getFormatFromBinding();
	return this;
};


sap.m.DateTimeInput.prototype.setDateValue = function(oValue) {
	this._isDate(oValue);
	this._origin = "dateValue";
	this.setProperty("dateValue", oValue);
	if (!this.getDomRef()) {
		// set the string value property from date object if control is not yet rendered
		this.setProperty("value", sap.ui.core.format.DateFormat.getDateInstance({
			pattern : this.getValueFormat()
		}).format(oValue), true);
	}
	return this;
};

/**
 * Return assigned dateValue property or converts value to JS Date Object.
 * Returns null for empty values
 *
 * @public
 * @return {Object}
 */
sap.m.DateTimeInput.prototype.getDateValue = function() {
	if (this._origin == "dateValue") {
		return this.getProperty("dateValue");
	}

	var sValue = this.getProperty("value");
	if (!sValue) {
		return null;
	}

	return sap.ui.core.format.DateFormat.getDateInstance({
		pattern : this.getValueFormat()
	}).parse(sValue);
};

sap.m.DateTimeInput.prototype.getDisplayFormat = function() {
	return this.getProperty("displayFormat") || this._types[this.getType()].displayFormat;
};

sap.m.DateTimeInput.prototype.getValueFormat = function() {
	return this.getProperty("valueFormat") || this._types[this.getType()].valueFormat;
};

sap.m.DateTimeInput.prototype.getNativeFormat = function() {
	return this._types[this.getType()].nativeFormat;
};

sap.m.DateTimeInput.prototype.isNative = function(sType) {
	var oType = this._types[sType || this.getType()];
	if (typeof oType.isNative == "undefined") {
		oType.isNative = this._hasNativeSupport();
	}

	return oType.isNative;
};


// Check native elements on new type set
sap.m.DateTimeInput.prototype.setType = function(sType) {
	this.setProperty("type", sType);

	// reach prototype values
	delete this._hasChangeEvent;
	delete this._showLabelAsPlaceholder;

	if (this.isNative()) {
		if (this._hasChangeEventBug) {
			this._hasChangeEvent = false;
		}
		if (this._showLabelAsPlaceholder === null) {
			this._showLabelAsPlaceholder = true;	//native pickers still need self-made placeholder
		}
	}

	return this;
};

// Check given is JS Date Object and throw error if not
sap.m.DateTimeInput.prototype._isDate = function(oValue) {
	if (!sap.m.isDate(oValue)) {
		throw new Error("Type Error: Expected JavaScript Date Object for property dateValue of " + this);
	}
	return true;
};

/**
 * Overwrite sap.m.InputBase::_onChange
 * Change/Input or Focus/Blur event handler
 * Also called without parameter to update input value
 */
sap.m.DateTimeInput.prototype._onChange = function(oEvent) {
	var oDate = null,
		sNewValue = this._$input.val(),
		sOldValue = this.getProperty("value");

	if (sNewValue) {
		if (!this.isNative()) {
			oDate = this._$input.scroller("getDate");
			this.getType() == "Date" && oDate.setHours(0, 0, 0, 0);

			// reformat for CLDR
			oEvent && this._reformat && this._$input.val(
				sap.ui.core.format.DateFormat.getDateInstance({
					pattern : this.getDisplayFormat()
				}).format(oDate)
			);
		} else {
			sNewValue = this._$input.val();
			oDate = sap.ui.core.format.DateFormat.getDateInstance({
				pattern : this.getNativeFormat()
			}).parse(sNewValue);
		}

		if (!isNaN(oDate)) {
			sNewValue = sap.ui.core.format.DateFormat.getDateInstance({
				pattern : this.getValueFormat()
			}).format(oDate);
		} else {
			sNewValue = "";
			oDate = null;
		}
	}

	if (sOldValue == sNewValue) {
		return;
	}

	this.setProperty("value", sNewValue, true);
	this.setProperty("dateValue", oDate, true);
	this._setLabelVisibility();

	if (oEvent && oEvent.type != "focus") {
		this.fireChange({
			newValue : sNewValue,
			newDateValue : oDate
		});
	}
};

/**
 * Destroy custom picker if available
 */
sap.m.DateTimeInput.prototype._destroyCustomPicker = function() {
	if (this._$input && this._$input.scroller) {
		this._$input.scroller("hide");
		this._$input.scroller("destroy");
	}
};

/**
 * Checks if new HTML5 types are supported by browser
 *
 * This method only checks what the name is saying
 * So, does not cache the result for you
 * Do not call too often
 */
sap.m.DateTimeInput.prototype._hasNativeSupport = function(sType) {
	var bSupported, sUnSupportedValue = ":)",
		oElem = document.createElement("input");

	sType = sType || this._types[this.getType()].nativeType;
	oElem.setAttribute("type", sType);

	// If browser doesn't support, it will ignore the type and set to "text".
	bSupported = (oElem.type !== "text");

	// in android, type is still correct even if it is not supported
	// lets set unsupported value to force validation.
	if (bSupported) {
		oElem.value = sUnSupportedValue;
		bSupported = (oElem.value != sUnSupportedValue);
	}
	return bSupported;
};

sap.m.DateTimeInput.prototype._setInputValue = function(sValue) {
	this._$input.val(sValue);
	this._onChange();
};

/**
 * Do the required conversion and set input value
 */
sap.m.DateTimeInput.prototype._showValue = function() {
	var date = this.getProperty(this._origin);
	if (!date) {
		return;
	}

	if (this._origin == "value") {
		date = sap.ui.core.format.DateFormat.getDateInstance({
			pattern : this.getValueFormat()
		}).parse(date);

		if (+date == +sap.m.getInvalidDate()) {
			jQuery.sap.log.error( "Format Error: value property " + this.getValue()
								+ " does not match with valueFormat " + this.getValueFormat()
								+ " of " + this );
			this._setInputValue("");
			return;
		}
	} else {
		this._isDate(date);
	}

	if (!this.isNative()) {
		this._$input.scroller("setDate", date, false);
	}

	this._setInputValue(
		sap.ui.core.format.DateFormat.getDateInstance({
			pattern : this.isNative() ? this.getNativeFormat() : this.getDisplayFormat()
		}).format(date)
	);
};

/**
 * Check data-binding for value property
 * Get according pattern from type settings
 */
sap.m.DateTimeInput.prototype._getFormatFromBinding = function() {
	var oBindingInfo = this.getBindingInfo("value");
	if (!oBindingInfo) {
		return;
	}

	var oBindingType = oBindingInfo.type;
	if (!oBindingType || !(oBindingType instanceof sap.ui.model.type.Date)) {
		return;
	}

	var sFormat = oBindingType.getOutputPattern();
	this.setProperty("valueFormat", sFormat, true);
	this.setProperty("displayFormat", sFormat, true);
	return sFormat;
};

/**
 * Opens scroller via keyboard [F4] or [ALT]+[DOWN]
 */
sap.m.DateTimeInput.prototype.onsapshow = function(oEvent) {
	if (this.getDomRef() && !this.isNative() && this._$input.scroller) {
		this._$input.scroller("show");
	}
	oEvent.preventDefault();
};
