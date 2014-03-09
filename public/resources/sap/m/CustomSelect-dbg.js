/*
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.CustomSelect");
jQuery.sap.require("sap.m.Select");

(function(_sap) {
	var sPath = "sap.ui.thirdparty.mobiscroll.",
		sCSSPath = sPath + "css",
		bPlatformDependent = sap.ui.core.theming.Parameters.get("sapMPlatformDependent") == "true",
		bAndroid23AndPlatformDependent = bPlatformDependent && sap.ui.Device.os.android && sap.ui.Device.os.version === 2.3,
		sTheme = bPlatformDependent ? "android-ics light" : "sapMCustomSlt";

	_sap.require("sap.m.InstanceManager");
	_sap.require(sPath + "js.mobiscroll-core");
	_sap.require(sPath + "js.mobiscroll-select");
	_sap.includeStyleSheet(_sap.getModulePath(sCSSPath, "/") + "mobiscroll-core.css");

	if (bPlatformDependent) {
		_sap.includeStyleSheet(_sap.getModulePath(sCSSPath, "/") + "mobiscroll-android-ics.css");
	}

	var fnGetMaxWidth = function() {
		return ((jQuery(document.defaultView).width() - 40) / parseFloat(sap.m.BaseFontSize)) + "rem";
	};

	/* =========================================================== */
	/*                   begin: lifecycle methods                  */
	/* =========================================================== */

	/**
	 * Required adaptations before rendering when using Mobiscroll.
	 *
	 * @private
	 */
	sap.m.Select.prototype._onBeforeRenderingCustom = function() {
		if (this._$HtmlSelect) {
			this._$HtmlSelect.scroller("destroy");
		}
	};

	/**
	 * Required adaptations after rendering when using Mobiscroll.
	 *
	 * @private
	 */
	sap.m.Select.prototype._onAfterRenderingCustom = function() {
		var self = this,
			InstanceManager = sap.m.InstanceManager,
			fnHandlePointerDown = jQuery.proxy(this._handlePointerDown, this),
			fnHandleResizeEvent = jQuery.proxy(this._handleResizeEvent, this);

		if (this._$HtmlSelect.length) {
			this._$HtmlSelect.scroller({

				/**
				 *	Options for controlling the modal dialog button labels and header text.
				 */

				// text for Cancel button
				cancelText: this._oRb.getText("SELECT_CANCEL"),

				// text for Set button
				setText: this._oRb.getText("SELECT_ACCEPT"),

				// language of the scroller
				lang: this._sLang,

				// specifies the speed in milliseconds to change values in clickpick mode with tap & hold
				delay: 300,

				// disables (true) or enables (false) the scroller
				disabled: !this.getEnabled(),

				// controls the positioning of the scroller. Possible options:
				// "modal", "inline", "bubble", "top", "bottom"
				display: sap.ui.Device.system.phone ? "modal" : "bubble",

				// Option to choose between modes.
				// Possible modes: 'mixed - ''scroller' - standard behaviour, 'clickpick' - '+' and '-' buttons
				mode: sap.ui.Device.system.phone || sap.ui.Device.system.tablet ? "scroller" : "mixed",

				// Preset configurations for select
				preset: "select",

				// show/hide labels above wheels
				showLabel: false,

				// Sets the scroller's visual appearance.
				// Supplied themes: 'android', 'android-ics', 'android-ics light', 'sense-ui', 'ios', 'jqm'
				theme: sTheme,

				// minimum width in pixels of the wheels, expand to fit values and labels
				width: 80,

				// height in pixels of one row on the wheel
				height: 40,

				// css class(es) to style the input which is shown instead of the original select element
				inputClass: "sapMSltInput",

				rows: sap.ui.Device.system.phone ? 3 : 5,

				/**
				 * Allows you to define your own event when the html markup of the scroller is generated,
				 * but it is not yet shown. It is usefull, if you want to make modifications to the markup
				 * (e.g. add custom elements), before the positioning runs.
				 * The function receives the jQuery object containing the generated html and the scroller instance as parameters.
				 * If returns false, close is prevented.
				 *
				 * @param {jQuery} $Html jQuery object containing the generated HTML
				 * @param {string} oScroller Scroller instance
				 */
				onMarkupReady: function($Html, oScroller) {

					// restrict the width of the popup
					$Html[0].querySelector(".dwwr").style.maxWidth = fnGetMaxWidth();
				},

				/**
				 * Gets called when the scroller appears.
				 *
				 * @param {jQuery} $Html  jQuery object containing the generated html
				 * @param {string} sValue The formatted value
				 * @param {object} oScroller Scroller instance
				 */
				onShow: function($Html, sValue, oScroller) {
					!bAndroid23AndPlatformDependent && document.addEventListener("touchstart", fnHandlePointerDown, true);
					jQuery(window).on("resize.sapMCustomSelect", { $domRef: $Html }, fnHandleResizeEvent);
					InstanceManager.addDialogInstance(self);
				},

				/**
				 * Allows you to define your own event when the scroller is closed.
				 * If returns false, close is prevented.
				 *
				 * @param {string} sValue Selected value as text
				 * @param {object} oScroller Scroller instance
				 **/
				onClose: function() {
					!bAndroid23AndPlatformDependent && document.removeEventListener("touchstart", fnHandlePointerDown, true);
					jQuery(window).off("resize.sapMCustomSelect", fnHandleResizeEvent);
					InstanceManager.removeDialogInstance(self);
				}
			});

			if (bAndroid23AndPlatformDependent) {
				setTimeout(function() {
					if (self.getWidth() === "auto") {
						self._$HtmlSelect[0].style.width = (self._$HtmlSelect.outerWidth() / parseFloat(sap.m.BaseFontSize)) + "rem";
					}

					self._$HtmlSelect.addClass("sapMSltNativeHidden");
				}, 0);
			}
		}
	};

	sap.m.Select.prototype._handlePointerDown = function(oEvent) {
		if (!document.querySelector(".sapMCustomSlt .dwwr").contains(oEvent.target)) {
			this.close();
		}
	};

	/**
	 * Close the opened select dialog when the back button is push.
	 *
	 * This method gets called from sap.m.InstanceManager, but previously it is needed
	 * to add the select instance to the instance manager by using sap.m.InstanceManager.addDialogInstance().
	 */
	sap.m.Select.prototype.close = function() {
		this._$HtmlSelect.scroller("hide");
	};

	/* =========================================================== */
	/*                   end: lifecycle methods                    */
	/* =========================================================== */


	/* =========================================================== */
	/*                      begin: event handlers                  */
	/* =========================================================== */

	sap.m.Select.prototype._ontouchmoveCustom = function(oEvent) {
		oEvent.stopPropagation();
		oEvent.preventDefault();
	};

	sap.m.Select.prototype._handleResizeEvent = function(oEvent) {
		oEvent.data.$domRef[0].querySelector(".dwwr").style.maxWidth = fnGetMaxWidth();
	};

	/* ============================================================ */
	/*                      end: event handlers                  	*/
	/* ============================================================ */

})(jQuery.sap);