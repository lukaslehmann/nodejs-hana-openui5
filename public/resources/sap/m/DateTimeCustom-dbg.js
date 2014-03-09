/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

(function($, oDevice) {

	var sOS = "",
		oDefaults = {},
		oCore = sap.ui.getCore(),
		oLocale = sap.m.getLocale(),
		sLanguage = oLocale.getLanguage(),
		oLocaleData = sap.m.getLocaleData(),
		oResourceBundle = oCore.getLibraryResourceBundle("sap.m"),
		_ = function(sText) {
			return oResourceBundle.getText("MOBISCROLL_" + sText);
		},
		rgxExcludeLiteral = "(?=([^']*'[^']*')*[^']*$)",
		sCssPath = $.sap.getModulePath("sap.ui.thirdparty.mobiscroll", "/css/"),
		oSettings = {
			endYear : new Date().getFullYear() + 10,
			lang : sLanguage
		},
		oi18n = {
			setText : _("SET"),
			cancelText : _("CANCEL"),
			monthText : _("MONTH"),
			dayText : _("DAY"),
			yearText : _("YEAR"),
			hourText : _("HOURS"),
			minuteText : _("MINUTES"),
			secText : _("SECONDS"),
			nowText : _("NOW"),
			dayNames : oLocaleData.getDaysStandAlone("wide"),
			dayNamesShort : oLocaleData.getDaysStandAlone("abbreviated"),
			monthNames : oLocaleData.getMonthsStandAlone("wide"),
			monthNamesShort : oLocaleData.getMonthsStandAlone("abbreviated")
		},
		oThemeParams = sap.ui.core.theming.Parameters.get();

	// inject resources
	$.sap.includeStyleSheet(sCssPath + "mobiscroll-core.css");
	$.sap.require("sap.ui.thirdparty.mobiscroll.js.mobiscroll-core"); // do not 'calculate' dependency names or analyzer will ignore them
	$.sap.require("sap.ui.thirdparty.mobiscroll.js.mobiscroll-datetime");

	// get default settings
	oDefaults = $("<input>").scroller({}).scroller("getInst").settings;

	// check platform dependency and OS then do the required settings
	if (oThemeParams["sapMPlatformDependent"] != "true") {
		var device = ["phone", "tablet", "desktop"].filter(function(d) {
				return oDevice.system[d];
			})[0],
			ucfirst = function(str) {
				if (!str) {
					return "";
				}
				return str.charAt(0).toUpperCase() + str.substr(1);
			},
			setDefaultsByTheme = function(key, type, prefix) {
				var value = oThemeParams["sapUiDTICustom" + ucfirst(prefix) + ucfirst(key)];
				if (value) {
					if (type == "bool") {
						oSettings[key] = (value.toLowerCase() == "true" ? true : false);
					} else if (type == "int") {
						value = parseInt(value, 10);
						!isNaN(value) && (oSettings[key] = value);
					} else {
						oSettings[key] = value;
					}
				}
				if (!prefix && device) {
					setDefaultsByTheme(key, type, device);
				}
			};

		oSettings.mode = "mixed";
		oSettings.display = "modal";
		oSettings.theme = "sapMDTICustom";
		setDefaultsByTheme("mode");
		setDefaultsByTheme("display");
		setDefaultsByTheme("animate");
		setDefaultsByTheme("rows", "int");
		setDefaultsByTheme("width", "int");
		setDefaultsByTheme("height", "int");
		setDefaultsByTheme("showLabel", "bool");
		setDefaultsByTheme("headerText", "bool");
		if (oSettings.headerText) {
			// mobiscroll needs text to replace
			oSettings.headerText = "{value}";
		}

		// load custom fonts
		$.sap.require("sap.ui.core.IconPool");
		sap.ui.core.IconPool.insertFontFaceStyle();
	} else if (oDevice.os.ios) {
		sOS = "ios";
		oSettings.display = "bubble";
	} else if (oDevice.os.android) {
		sOS = "android-ics";
		if (oDevice.os.version == 2.3) {
			// scroll mode is not responsive
			oSettings.mode = "clickpick";
			// 5 rows feels like scrollable
			oSettings.rows = 3;
		} else if (oDevice.os.version == 3.2) {
			// mixed mode has overlapping bug
			oSettings.mode = "scroller";
		}
	} else if (oDevice.browser.internet_explorer) {
		sOS = "wp";
	}

	// enable language settings
	$.scroller.i18n[sLanguage] = $.extend(oi18n);

	// do OS settings
	if (sOS) {
		oSettings.theme = (oDevice.os.android) ? sOS + " light" : sOS;
		$.sap.includeStyleSheet(sCssPath + "mobiscroll-" + sOS + ".css");
		$.sap.require("sap.ui.thirdparty.mobiscroll.js.mobiscroll-" + sOS);
		oSettings = $.extend({}, $.mobiscroll.themes[oSettings.theme].defaults, oSettings);
	}

	// enable instance management
	$.sap.require("sap.m.InstanceManager");

	// Add custom datetime methods to prototype
	$.extend(sap.m.DateTimeInput.prototype, {
		/**
		 * This method gets called from sap.m.InstanceManager,
		 * to close the opened mobiscroll dialog when the back button is clicked
		 *
		 * @private
		 */
		close : function() {
			this._$input.scroller("hide");
		},

		/**
		 * Mobiscroll title reformatter to support all cldr formats
		 * We can only get string value onChange/onWheel event
		 */
		_setScrollerHeader : function(sValue) {
			try {
				var oConfig = this._$input.scroller("getInst").settings,
					sFormat = !this.getType().indexOf("Date") ? oConfig.dateFormat : oConfig.timeFormat,
					oDate = $.mobiscroll.parseDate(sFormat, sValue);

				return sap.ui.core.format.DateFormat.getDateInstance({
					pattern : this.getDisplayFormat()
				}).format(oDate);
			} catch (e) {
				return sValue;
			}
		},

		/**
		 * Auto close for bubbles
		 */
		_autoClose : function(oEvent) {
			var oDomRef = this.getDomRef();
			if (oDomRef && oDomRef.contains(oEvent.target)) {
				oEvent.stopPropagation();
				oEvent.preventDefault();
				return;
			}

			var oDialog = document.querySelector(".sapMDTICustom .dwwr");
			if (oDialog && !oDialog.contains(oEvent.target)) {
				this._$input.scroller("hide");
			}
		},

		/**
		 * Restrict max width of the dialog
		 */
		_restrictMaxWidth : function($dialog) {
			//TODO : Find a better way to find out 22 instead of hard coding
			$dialog[0].querySelector(".dwwr").style.maxWidth = (document.documentElement.clientWidth - 22) + "px";
		},

		/**
		 * Handle window resize event
		 */
		_handleResize : function(oEvent) {
			this._restrictMaxWidth(oEvent.data.$dialog);
		},

		/**
		 * Handle key down event for buttons
		 */
		_handleBtnKeyDown : function(oEvent) {
			if (oEvent.keyCode === jQuery.sap.KeyCodes.ENTER ) {
				if (oEvent.target && jQuery(oEvent.target.parentElement).hasClass("dwb-c")) {
					//This means that "Return" was pressed with the
					//'Cancel' button having the focus: 'Cancel' wins.
					this._$input.scroller("cancel");
				} else {
					this._$input.scroller("select");
				}
			} else if (oEvent.keyCode === jQuery.sap.KeyCodes.ESCAPE) {
				this._$input.scroller("cancel");
			}
		},

		/**
		 * Date-time conversion for mobiscroll configuration
		 */
		_getScrollerConfig : function() {
			var that = this,
				sType = this.getType(),
				sFormat = this.getDisplayFormat(),
				fnAutoCloseProxy = $.proxy(this._autoClose, this),
				fnHandleResize = $.proxy(this._handleResize, this),
				fnHandleBtnKeyDown = $.proxy(this._handleBtnKeyDown, this),
				fnFocusInFirst, fnFocusInLast,
				$focusLeft = $("<span class='sapMFirstFE' tabIndex='0'/>"),
				$focusRight = $("<span class='sapMLastFE' tabIndex='0'/>"),
				fnKeyDown, $dialogToClean,
				oConfig = $.extend({}, oSettings, {
					preset : sType.toLowerCase(),
					disabled : !that.getEnabled() || !that.getEditable(),
					onShow : function($dialog) {
						// Special treatment for IE: with jQuery < 1.9 focus is fired twice in IE
						// Therefore, mobiscroll may open the scroller again, immediately after it
						// has been closed
						if (oDevice.browser.internet_explorer) {
							if (that._popupIsShown) {
								return;
							}
							that._popupIsShown = true;
						}

						sap.m.InstanceManager.addDialogInstance(that);
						$(window).on("resize.sapMDTICustom", {$dialog : $dialog}, fnHandleResize);
						//Fix a bug in mobiscroll-core.js line 805 (mobiscroll 2.7.2): their
						//'keydown.dw' handler always triggers a select, even if return was
						//pressed on the cancel button
						$(window).unbind('keydown.dw');
						$dialog.on('keydown.dw', fnHandleBtnKeyDown);

						if (oSettings.display == "bubble") {
							document.addEventListener($.support.touch ? "touchstart" : "mousedown", fnAutoCloseProxy, true);
						}
						if (sap.ui.Device.system.desktop) {
							// Amend keyboard navigation: see sap.m.Dialog.onfocusin for
							// an analogous procedure
							var $scrollerCont = $dialog.find('.dwcc'),
								$buttonBar = $dialog.find('.dwbc'),
								aFocusables = $scrollerCont.find(":focusable.dwww");

							$focusLeft.insertBefore($scrollerCont);
							fnFocusInLast = $.proxy(that._getFocusInHandler($buttonBar, false), that);
							$focusLeft.focusin(fnFocusInLast);

							$focusRight.insertAfter($buttonBar);
							fnFocusInFirst = $.proxy(that._getFocusInHandler($scrollerCont, true), that);
							$focusRight.focusin(fnFocusInFirst);

							//Make sure, the first scroller column has initial focus
							jQuery.sap.focus($scrollerCont.firstFocusableDomRef());

							//Support other keyboard events as well, e.g. LEFT, RIGHT
							$dialogToClean = $dialog;
							fnKeyDown = $.proxy(that._getKeyDownHandler(aFocusables), that);
							$dialog.keydown(fnKeyDown);
						}
					},
					onClose : function() {
						//Special treatment for IE: with jQuery < 1.9 focus is fired twice in IE
						//Therefore, mobiscroll may open the scroller again, immediately after it
						//has been closed
						if (oDevice.browser.internet_explorer) {
							that._popupIsShown = false;
						}
						sap.m.InstanceManager.removeDialogInstance(that);
						$(window).off("resize.sapMDTICustom", fnHandleResize);
						if (oSettings.display == "bubble") {
							document.removeEventListener($.support.touch ? "touchstart" : "mousedown", fnAutoCloseProxy, true);
						}

						//clean up listeners
						$focusLeft.unbind('focusin', fnFocusInLast);
						$focusRight.unbind('focusin', fnFocusInFirst);
						if ($dialogToClean) {
							$dialogToClean.unbind('keydown', fnKeyDown);
							$dialogToClean.unbind('keydown.dw', fnHandleBtnKeyDown);
						}
					},
					onMarkupReady : function($dialog, inst) {
						that._restrictMaxWidth($dialog);
						if (oSettings.theme != "sapMDTICustom") {
							$dialog.addClass("sapMDTICustom");
						}
						if (oSettings.headerText !== false) {
							$dialog.addClass("sapMDTICustomHdr");
						}

						// change button order for RTL
						if (sap.ui.getCore().getConfiguration().getRTL()) {
							var $buttonContainer = $dialog.find(".dwbc");
							var $cancelButton = $buttonContainer.find(".dwb-c");
							$cancelButton.prependTo($buttonContainer);
						}
					}
				});

			if (sType == "Date") {
				sFormat = this._convertDatePattern(sFormat);
				$.extend(oConfig, {
					dateFormat : sFormat,
					dateOrder : this._getLongDatePattern(sFormat.replace(/'.*?'/g, "")).replace(/[^ymd ]/ig, ""),
				});
			} else if (sType == "Time") {
				sFormat = this._convertTimePattern(sFormat);
				$.extend(oConfig, {
					timeFormat : sFormat,
					timeWheels : sFormat.replace(/'.*?'/g, "").replace(/[^hisa]/ig, "")
				});
			} else if (sType == "DateTime") {
				sFormat = this._convertDatePattern(this._convertTimePattern(sFormat));

				// date-time hack
				$.extend(oConfig, {
					dateFormat : sFormat,
					dateOrder : this._getLongDatePattern(sFormat.replace(/'.*?'/g, "")).replace(/[^ymd ]/ig, ""),
					rows :  this._getRowForDateTime(),
					timeWheels : sFormat,
					timeFormat : "",
					separator : ""
				});
			}

			// check given format is not supported by mobiscroll
			if (/[^ymdhisa\W]/i.test(sFormat)) {
				this._reformat = true;
				if (oSettings.headerText !== false) {
					oConfig.headerText = $.proxy(this._setScrollerHeader, this);
				}
			} else {
				this._reformat = false;
			}

			return oConfig;
		},

		/**
		 * Until mobiscroll fixes min height(360px) problem for date time
		 * we just decrease the row count to 3
		 */
		_getRowForDateTime : function() {
			var rows = oSettings.rows || oDefaults.rows;
			if (!rows || rows <= 3) {
				return 3;
			}
			return Math.min(window.innerWidth, window.innerHeight) < 360 ? 3 : rows;
		},

		/**
		 * Returns a handler function to focus first or last focusable component
		 * within a given jQuery element to be used as a handler for
		 * the 'focusin' event.
		 *
		 * @param $parent the element whose children shall be focussed
		 * @param first if true return a function to focus the $parent's first
		 * focusable element, otherwise return a function to focus $parent's last
		 * focusable element.
		 */
		_getFocusInHandler : function($parent, first) {
			return function() {
				var oElementToFocus = first ? $parent.firstFocusableDomRef() : $parent.lastFocusableDomRef();
				jQuery.sap.focus(oElementToFocus);
			};
		},

		/**
		 * Returns a handler function to deal with key events for keyboard
		 * navigation, that are not yet dealt with by the underlying mobiscroll
		 * dialog.
		 *
		 * @param aFocusables array of focusable elements within the mobiscroll dialog
		 */
		_getKeyDownHandler : function(aFocusables) {
			return function(oEvent){
				var iKeyCode = oEvent.which,
				bShift = oEvent.shiftKey,
				bAlt = oEvent.altKey,
				bCtrl = oEvent.ctrlKey;
				if (!bAlt && !bShift && !bCtrl) {
					//No modifiers pressed
					switch (iKeyCode) {
						//RIGHT
						case jQuery.sap.KeyCodes.ARROW_RIGHT:
							//Moves focus one column right to the selected field, e.g. from Hours to Minutes.
							//When focus is on the last column, move focus to the first column.
							var current = aFocusables.index(document.activeElement),
							$next = aFocusables.eq(current+1).length ? aFocusables.eq(current+1) : aFocusables.eq(0);
							$next.focus();
							break;
						case jQuery.sap.KeyCodes.ARROW_LEFT:
							//Moves focus one column left to the selected field, e.g. from Minutes to Hours.
							//When focus is on the first column, move focus to the last column.
							var current = aFocusables.index(document.activeElement),
							$previous = aFocusables.eq(current-1).length ? aFocusables.eq(current-1) : aFocusables.eq(aFocusables.length -1);
							$previous.focus();
							break;
						case jQuery.sap.KeyCodes.HOME:
							//Moves focus to the first column of the same row and same month
							aFocusables[0].focus();
							break;
						case jQuery.sap.KeyCodes.END:
							//Moves focus to the last column of the same row and same month
							aFocusables[aFocusables.length -1].focus();
							break;
						default:
							break;
					}
				} else if (bAlt && !bShift && !bCtrl) {
					//ALT pressed
					switch (iKeyCode) {
						case jQuery.sap.KeyCodes.ARROW_UP:
							//Keeps the current state and closes the dialog. Same as clicking “OK”.
							this._$input.scroller("select");
							break;
						default:
							break;
					}
				}
			};
		},

		/**
		 * cache often used regular expressions
		 */
		_rgxYear : new RegExp("y+" + rgxExcludeLiteral, "ig"),
		_rgxMonth : new RegExp("m+" + rgxExcludeLiteral, "ig"),
		_rgxDay : new RegExp("d+" + rgxExcludeLiteral, "g"),
		_rgxMinute : new RegExp("m" + rgxExcludeLiteral, "g"),
		_rgxAmPm : new RegExp("a" + rgxExcludeLiteral, "g"),
		_rgxDayOfWeekLong : new RegExp("EEEE" + rgxExcludeLiteral, "g"),
		_rgxDayOfWeekShort : new RegExp("E+" + rgxExcludeLiteral, "g"),


		/**
		 * Convert date pattern to long month name, 4 digit year, 2 digit day
		 */
		_getLongDatePattern : function(sPattern) {
			sPattern = (sPattern || this.getDisplayFormat()).replace(this._rgxYear, "YY");
			if (sOS == "wp") {	// for IE show day and month names to mimic native picker
				return sPattern.replace(this._rgxMonth, "mm MM").replace(this._rgxDay, "dd DD");
			}
			return sPattern.replace(this._rgxMonth, "MM").replace(this._rgxDay, "dd");
		},


		/**
		 * Converts the time pattern from CLDR to the mobiscroll time picker
		 * m is short month name, i = minute
		 */
		_convertTimePattern : function(sPattern) {
			sPattern = sPattern || this.getDisplayFormat();
			return sPattern.replace(this._rgxMinute, "i").replace(this._rgxAmPm, "A");
		},


		/**
		 * Converts the date pattern from CLDR to the one of the jQuery datePicker
		 * Month is coded in the different way
		 * TODO: Copied from core talk with core team to call method from somewhere else shared
		 * TODO: This implementation ignores the literals usage case, talk also with core team
		 */
		_convertDatePattern : function(sPattern) {
			sPattern = sPattern || this.getDisplayFormat();

			var iIndex1 = sPattern.indexOf("M"),
				iIndex2 = sPattern.lastIndexOf("M"),
				sFormat = sPattern,
				sNewMonth;

			if (iIndex1 == -1) {
				// no month defined with M, maybe using L (standalone)
				iIndex1 = sPattern.indexOf("L");
				iIndex2 = sPattern.lastIndexOf("L");
			}

			if (iIndex1 > -1) {
				switch (iIndex2-iIndex1) {
				case 0:
					sNewMonth = "m";
					break;
				case 1:
					sNewMonth = "mm";
					break;
				case 2:
					sNewMonth = "M";
					break;
				case 5:
					//narrow state not available in jQuery DatePicker -> use shortest one
					sNewMonth = "m";
					break;
				default:
					sNewMonth = "MM";
				break;
				}
				sFormat = sPattern.substring(0, iIndex1) + sNewMonth + sPattern.substring(iIndex2 + 1);
			}

			var sNewYear;
			iIndex1 = sFormat.indexOf("y");
			if (iIndex1 > -1) {
				iIndex2 = sFormat.lastIndexOf("y");
				if (iIndex2-iIndex1 == 1) {
					// two chanrs
					sNewYear = "y";
				} else {
					sNewYear = "yy";
				}
				sFormat = sFormat.substring(0, iIndex1) + sNewYear + sFormat.substring(iIndex2 + 1);
			}

			var sNewYearDay;
			iIndex1 = sFormat.indexOf("D");
			if (iIndex1 > -1) {
				iIndex2 = sFormat.lastIndexOf("D");

				if (iIndex2-iIndex1 == 1) {
					// two chanrs
					sNewYearDay = "o";
				} else {
					sNewYearDay = "oo";
				}
				sFormat = sFormat.substring(0, iIndex1) + sNewYearDay + sFormat.substring(iIndex2 + 1);
			}

			// EEEE = DD = day of week(long)
			// EEE, EE, E = D = day of week(short)
			sFormat = sFormat.replace(this._rgxDayOfWeekLong, "DD").replace(this._rgxDayOfWeekShort, "D");

			return sFormat;
		}
	});

})(jQuery, sap.ui.Device);
