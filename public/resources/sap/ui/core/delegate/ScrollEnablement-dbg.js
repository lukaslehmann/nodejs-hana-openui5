/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/**
 * @namespace
 * @name sap.ui.core.delegate
 * @public
 */

// Provides class sap.ui.core.delegate.ScrollEnablement
jQuery.sap.declare("sap.ui.core.delegate.ScrollEnablement");

jQuery.sap.require("sap.ui.base.Object");

(function($) {

	sap.ui.base.Object.extend("sap.ui.core.delegate.ScrollEnablement", /* @lends sap.ui.core.delegate.ScrollEnablement */ {

		/**
		 * Creates a ScrollEnablement delegate that can be attached to Controls requiring
		 * capabilities for scrolling of a certain part of their DOM on mobile devices.
		 *
		 * @class Delegate for touch scrolling on mobile devices
		 *
		 * @author SAP AG
		 *
		 * This delegate uses CSS (-webkit-overflow-scrolling) only if supported. Otherwise the desired
		 * scrolling library is used. Please also consider the documentation
		 * of the library for a proper usage.
		 *
		 * Controls that implement ScrollEnablement should additionally provide the getScrollDelegate method that returns
		 * the current instance of this delegate object
		 *
		 * @extends sap.ui.base.Object
		 * @name sap.ui.core.delegate.ScrollEnablement
		 * @experimental Since 1.5.2. This class is experimental and provides only limited functionality. Also the API might be changed in future.
		 *
		 * @param {sap.ui.core.Control} oControl the Control of which this Scroller is the delegate
		 * @param {string} sScrollContentDom the Id of the element within the DOM of the Control which should be scrollable
		 * @param {object} oConfig the configuration of the scroll delegate
		 * @param {boolean} [oConfig.horizontal=false] Whether the element should be scrollable horizontally
		 * @param {boolean} [oConfig.vertical=false] Whether the element should be scrollable vertically
		 * @param {boolean} [oConfig.zynga=false] If set, then the Zynga scroller (http://zynga.github.com/scroller/) is used otherwise iScroll (http://cubiq.org/iscroll-4) is used.
		 * @param {boolean} [oConfig.preventDefault=false] If set, the default of touchmove is prevented
		 * @param {boolean} [oConfig.nonTouchScrolling=false] If true, the delegate will also be active to allow touch like scrolling with the mouse on non-touch platforms; if set to "scrollbar", there will be normal scrolling with scrollbars and no touch-like scrolling where the content is dragged
		 *
		 * @version 1.16.8-SNAPSHOT
		 * @constructor
		 * @protected
		 */
		constructor : function(oControl, sScrollContentDom, oConfig) {

			sap.ui.base.Object.apply(this);

			this._oControl = oControl;
			this._oControl.addDelegate(this);
			this._sContentId = sScrollContentDom;
			this._bHorizontal = !!oConfig.horizontal;
			this._bVertical = !!oConfig.vertical;
			this._scrollX = 0;
			this._scrollY = 0;
			this._scroller = null;
			this._scrollbarClass = oConfig.scrollbarClass || false;
			this._bounce = oConfig.bounce;

			initDelegateMembers(this, oConfig);

			if(this._init){
				this._init.apply(this, arguments);
			}
		},

		/**
		 * Enable or disable horizontal scrolling.
		 *
		 * @param {boolean} bHorizontal set true to enable horizontal scrolling, false - to disable
		 * @protected
		 */
		setHorizontal : function(bHorizontal) {
			this._bHorizontal = !!bHorizontal;
			if(this._scroller) {
				if (this._zynga) {
					// Zynga keeps scrolling options internally
					this._scroller.options.scrollingX = this._bHorizontal;
				} else {
					// iScroll
					this._scroller.hScroll = this._scroller.hScrollbar = this._bHorizontal;
					this._scroller._scrollbar('h');
				}
			} else { // mouse scrolling
				var $Container = $.sap.byId(this._sContentId).parent();
				// make container scrollable into the configured directions
				$Container.css("overflow-x", this._bHorizontal ? "auto" : "hidden");
			}
		},

		/**
		 * Enable or disable vertical scrolling.
		 *
		 * @param {boolean} bVertical set true to enable vertical scrolling, false - to disable
		 * @protected
		 */
		setVertical : function(bVertical) {
			this._bVertical = !!bVertical;
			if(this._scroller) {
				if (this._zynga) {
					// Zynga options
					this._scroller.options.scrollingY = this._bVertical;
				} else {
					// iScroll
					this._scroller.vScroll = this._scroller.vScrollbar = this._bVertical;
					this._scroller._scrollbar('v');
				}
			} else { // mouse scrolling
				var $Container = $.sap.byId(this._sContentId).parent();
				// make container scrollable into the configured directions
				$Container.css("overflow-y", this._bVertical ? "auto" : "hidden");
			}
		},

		/**
		 * Get current setting for horizontal scrolling.
		 *
		 * @return {boolean} true if horizontal scrolling is enabled
		 * @protected
		 * @since 1.9.1
		 */
		getHorizontal : function() {
			return this._bHorizontal;
		},

		/**
		 * Get current setting for vertical scrolling.
		 *
		 * @return {boolean} true if vertical scrolling is enabled
		 * @protected
		 * @since 1.9.1
		 */
		getVertical : function() {
			return this._bVertical;
		},

		/**
		 * Setter for property <code>bounce</code>.
		 *
		 * @param {boolean} bBounce new value for property <code>bounce</code>.
		 * @protected
		 * @since 1.16.5
		 */
		setBounce: function(bBounce) {
			this._bounce = !!bBounce;
		},

		/**
		 * Set overflow control on top of scroll container.
		 *
		 * @param {sap.ui.core.Control} top control that should be normally hidden over
		 * the top border of the scroll container (pull-down content).
		 * This function is supported in iScroll delegates only. In MouseScroll delegates the element is not hidden and should have an appropriate rendering for being always displayed and should have an alternative way for triggering (e.g. a Button).
		 * @protected
		 * @since 1.9.2
		 */
		setPullDown : function(oControl) {
			this._oPullDown = oControl;
			return this;
		},

		/**
		 * Sets GrowingList control to scroll container
		 *
		 * @param {sap.m.GrowingList} GrowingList instance
		 * This function is supported in iScroll and mouse delegates only.
		 * @protected
		 * @since 1.11.0
		 */
		setGrowingList : function(oGrowingList, fnScrollLoadCallback) {
			this._oGrowingList = oGrowingList;
			this._fnScrollLoadCallback = jQuery.proxy(fnScrollLoadCallback, oGrowingList);
			return this;
		},

		/**
		 * Sets IconTabBar control to scroll container
		 *
		 * @param {sap.m.IconTabBar} IconTabBar instance
		 * This function is supported in iScroll only.
		 * @protected
		 * @since 1.16.1
		 */
		setIconTabBar : function(oIconTabBar, fnScrollEndCallback, fnScrollStartCallback) {
			this._oIconTabBar = oIconTabBar;
			this._fnScrollEndCallback = jQuery.proxy(fnScrollEndCallback, oIconTabBar);
			this._fnScrollStartCallback = jQuery.proxy(fnScrollStartCallback, oIconTabBar);
			return this;
		},


		scrollTo : function(x, y, time) {
			this._scrollX = x; // remember for later rendering
			this._scrollY = y;
			if (this._scroller) {
				if(this._zynga){ // Zynga
					if (!isNaN(time)){
						this._scroller.options.animationDuration = time;
					}
					this._scroller.scrollTo(x, y, !!time);

				} else { // iScroll
					this._scrollTo(x, y, time);
				}
			} else { // NativeMouseScroller
				this._scrollTo(x, y, time);
			}
			return this;
		},

		/**
		 * Destroys this Scrolling delegate.
		 *
		 * This function must be called by the control which uses this delegate in the <code>exit</code> function.
		 * @protected
		 */
		destroy : function() {
			if(this._exit){
				this._exit();
			}

			if(this._oControl){
				this._oControl.removeDelegate(this);
				this._oControl = undefined;
			}
		},

		/**
		 * Refreshes this Scrolling delegate.
		 *
		 * @protected
		 */
		refresh : function() {
			if(this._refresh){
				this._refresh();
			}
		}

	});





	/*
	 * Delegate members for usage of iScroll library
	 */
	var oIScrollDelegate = {

		getScrollTop : function() {
			return this._scrollY;
		},

		getScrollLeft : function() {
			return this._scrollX;
		},

		getMaxScrollTop : function() {
			return -this._scroller.maxScrollY;
		},

		_scrollTo : function(x, y, time) {
			this._scroller.scrollTo(-x, -y, time, false);
		},

		_refresh : function() {
			if (this._scroller && this._sScrollerId) {
				var oScroller = $.sap.domById(this._sScrollerId);
				if (oScroller && (oScroller.offsetHeight > 0)) { // only refresh if rendered and not collapsed to zero height (e.g. display: none)

					this._bIgnoreScrollEnd = true; // this refresh may introduce wrong position 0 after invisible rerendering
					this._scroller.refresh();
					this._bIgnoreScrollEnd = false;

					// and if scroller is not yet at the correct position (e.g. due to rerendering) move it there
					if (-this._scrollX != this._scroller.x || -this._scrollY != this._scroller.y) {
						this._scroller.scrollTo(-this._scrollX, -this._scrollY, 0);
					}

					// reset scrollTop of the section after webkit soft keyboard is closed
					if(this._scroller.wrapper && this._scroller.wrapper.scrollTop){
						this._scroller.wrapper.scrollTop = 0;
					}
				}
			}
		},

		_cleanup : function() {
			this._toggleResizeListeners(false);

			if (this._scroller) {
				this._scroller.stop();
				this._scrollX = -this._scroller.x; // remember position for after rendering
				var oScroller = $.sap.domById(this._sScrollerId);
				if (oScroller && (oScroller.offsetHeight > 0)) {
					this._scrollY = -this._scroller.y;
				}
				this._scroller.destroy();
				this._scroller = null;
			}
		},

		_toggleResizeListeners : function(bToggle){

			if(this._sScrollerResizeListenerId){
				sap.ui.core.ResizeHandler.deregister(this._sScrollerResizeListenerId);
				this._sScrollerResizeListenerId = null;
			}

			if(this._sContentResizeListenerId){
				sap.ui.core.ResizeHandler.deregister(this._sContentResizeListenerId);
				this._sContentResizeListenerId = null;
			}

			if(bToggle && this._sContentId && $.sap.domById(this._sContentId)){
				//TODO Prevent a double refresh
				var $fRefresh = $.proxy(this._refresh, this);
				this._sScrollerResizeListenerId = sap.ui.core.ResizeHandler.register( $.sap.domById(this._sScrollerId), $fRefresh );
				this._sContentResizeListenerId = sap.ui.core.ResizeHandler.register( $.sap.domById(this._sContentId), $fRefresh );
			}

		},

		onBeforeRendering : function() {
			this._cleanup();
		},

		onfocusin: function(evt) {
			// on Android Inputs need to be scrolled into view
			if (sap.ui.core.delegate.ScrollEnablement._bScrollToInput && sap.ui.Device.os.android) {
				var element = evt.srcElement;
				this._sTimerId && jQuery.sap.clearDelayedCall(this._sTimerId);
				if (element && element.nodeName &&
						(element.nodeName.toUpperCase() === "INPUT" || element.nodeName.toUpperCase() === "TEXTAREA")) {
					this._sTimerId = jQuery.sap.delayedCall(400, this, function() {
						var offset = this._scroller._offset(element);
						offset.top += 48;
						this._scroller.scrollTo(offset.left, offset.top);
					});
				}
			}
		},

		onAfterRendering : function() {
			var that = this,
				bBounce = (this._bounce !== undefined) ? this._bounce : sap.ui.Device.os.ios;

			var $Content = $.sap.byId(this._sContentId);
			this._sScrollerId = $Content.parent().attr("id");

			// Fix for displaced edit box overlay on scrolled pages in Android 4.x and 2.3.4 browsers:
			var bDontUseTransform = (
					!!sap.ui.Device.os.android &&
					!sap.ui.Device.browser.chrome &&
					(sap.ui.Device.os.version == 4 || !sap.ui.Device.os.versionStr.indexOf("2.3.4")) &&
					$Content.find("input,textarea").length
				);

			this._iTopOffset = this._oPullDown && this._oPullDown.getDomRef && this._oPullDown.getDomRef().offsetHeight || 0;

			var x = this._scrollX || 0,
				y = this._scrollY || 0;
			this._scroller = new window.iScroll(this._sScrollerId, {
				useTransition: true,
				useTransform: !bDontUseTransform,
				hideScrollbar: true,
				fadeScrollbar: true,
				bounce: !!bBounce,
				momentum: true,
				handleClick: false,	/* implicitly set to false otherwise we have double click event */
				hScroll: this._bHorizontal,
				vScroll: this._bVertical,
				x: -x,
				y: -y,
				topOffset: this._iTopOffset,
				scrollbarClass: this._scrollbarClass,
				onBeforeScrollStart: function(oEvent) {
					// A touch on a scrolling list means "stop scrolling" and not a tap.
					if(that._isScrolling){
						// Do not allow core to convert touchstart+touchend into a tap event during scrolling:
						oEvent.stopPropagation();
						// Disable native HTML behavior on <a> elements:
						oEvent.preventDefault();
					}
				},
				onScrollEnd: function() {
					if (!that._bIgnoreScrollEnd && that._scroller) { // that.scroller can be undefined when scrolled into the empty place
						that._scrollX = -that._scroller.x;
						that._scrollY = -that._scroller.y;
					}
					if (that._oPullDown) {
						that._oPullDown.doScrollEnd();
					}
					if (that._oGrowingList && that._fnScrollLoadCallback) {
						// start loading if 75% of the scroll container is scrolled
						var scrollThreshold = Math.floor(this.wrapperH / 4);
						var bInLoadingLimit = -this.maxScrollY + this.y < scrollThreshold;

						// user needs to scroll bottom and must be in loading range
						if (this.dirY > 0 && bInLoadingLimit) {
							that._fnScrollLoadCallback();
						}

					}
					if (that._oIconTabBar && that._fnScrollEndCallback) {
						that._fnScrollEndCallback();
					}

					that._isScrolling = false;
				},
				onRefresh: function(){
					if (that._oPullDown) {
						that._oPullDown.doRefresh();
					}
					// Reset resize listeners after each refresh to avoid concurrent errors like in
					// the following case:
					// 1. List height: 2000px. Resize handler remembers it
					// 2. PullToRefresh calls refresh, list is empty, height: 800px, iScroll remembers it
					// 3. List is filled again, no change, list height is 2000px.
					// 4. Resize handler checks after 200ms and finds no changes: iScroll has wrong size and
					//    must be refreshed.
					// Due to this, refresh and resize handler registration should be done synchronously
					that._toggleResizeListeners(true);
				},
				onScrollMove: function(oEvent){
					if(!that._isScrolling){
						// Workaround for problems with active input and textarea: close keyboard on scroll start
						var rIsTextField = /(INPUT|TEXTAREA)/i,
							oActiveEl = document.activeElement;
						if (rIsTextField.test(oActiveEl.tagName) && oEvent.target !== oActiveEl ) {
							oActiveEl.blur();
						}
					}
					that._isScrolling = true;
					if (that._oPullDown) {
						that._oPullDown.doScrollMove();
					}
					if (that._oIconTabBar && that._fnScrollStartCallback) {
						that._fnScrollStartCallback();
					}
				}
			});

			// Traverse the parents and check if any has a ScrollDelegate with the same vertical or horizontal scroll.
			// Controls that implement ScrollEnablement should provide the getScrollDelegate method.
			for (var oParent = this._oControl; oParent = oParent.oParent;) {
				var oSD = oParent.getScrollDelegate ? oParent.getScrollDelegate() : null;
				if(oSD && (oSD.getVertical() && this.getVertical() || oSD.getHorizontal() && this.getHorizontal())){
					this._scroller._sapui_isNested = true;
					break;
				}
			}

			// SAP modification: disable nested scrolling.
			this._scroller._move = function(oEvent){

				if(oEvent._sapui_handledByControl){ return; }

				// Enable scrolling of outer container when the inner container is scrolled to the end
				// so that a user can "pull out" contents that have been accidentally moved outside of
				// the scrolling container by momentum scrolling.
				if(this._sapui_isNested){
					oEvent._sapui_handledByControl =
						!(this.dirY < 0 && this.y >= 0) &&
						!(this.dirY > 0 && this.y <= this.maxScrollY) &&
						!(this.dirX < 0 && this.x >= 0) &&
						!(this.dirX > 0 && this.x <= this.maxScrollX);
				}
				window.iScroll.prototype._move.call(this,oEvent);
			};

			// re-apply scrolling position after rendering - but only if changed and the height is > 0
			var oScroller = $Content.parent()[0];
			if (oScroller && (oScroller.offsetHeight > 0)) {
				if (this._scrollX != -this._scroller.x || this._scrollY != -this._scroller.y){
					this._scroller.scrollTo(-this._scrollX, -this._scrollY, 0);
				}
			}

			// listen to size changes
			this._toggleResizeListeners(true);

		},

		ontouchmove : function(oEvent) {
			if(this._preventTouchMoveDefault) {
				//Prevent the default touch action e.g. scrolling the whole page
				oEvent.preventDefault();
			}
		}
	};





	/*
	 * Delegate members for usage of Zynga library
	 */
	var oZyngaDelegate = {
		_refresh : function() {
			if (this._scroller && this._sContentId && $.sap.domById(this._sContentId)) {
				var $Content = $.sap.byId(this._sContentId);
				var $Container = $Content.parent();
				this._scroller.setDimensions($Container.width(), $Container.height(), $Content.width(), $Content.height());
			}
		},

		_cleanup : function() {
			if(this._sScrollerResizeListenerId){
				sap.ui.core.ResizeHandler.deregister(this._sScrollerResizeListenerId);
				this._sScrollerResizeListenerId = null;
			}

			if(this._sContentResizeListenerId){
				sap.ui.core.ResizeHandler.deregister(this._sContentResizeListenerId);
				this._sContentResizeListenerId = null;
			}

			if (this._scroller) {
				var oVals = this._scroller.getValues();
				this._scrollX = oVals.left; // remember position for after rendering
				this._scrollY = oVals.top;
			}
		},

		onBeforeRendering : function() {
			this._cleanup();
		},

		onAfterRendering : function() {
			this._refresh();

			this._scroller.scrollTo(this._scrollX, this._scrollY, false);

			this._sContentResizeListenerId = sap.ui.core.ResizeHandler.register(
				$.sap.domById(this._sContentId),
				$.proxy(function(){
					if((!this._sContentId || !$.sap.domById(this._sContentId)) && this._sContentResizeListenerId){
						sap.ui.core.ResizeHandler.deregister(this._sContentResizeListenerId);
						this._sContentResizeListenerId = null;
					}else{
						this._refresh();
					}
				}, this)
			);
		},

		ontouchstart : function(oEvent) {
			// Don't react if initial down happens on a form element
			if (oEvent.target.tagName.match(/input|textarea|select/i)) {
				return;
			}

			this._scroller.doTouchStart(oEvent.touches, oEvent.timeStamp);
		},

		ontouchend : function(oEvent) {
			this._scroller.doTouchEnd(oEvent.timeStamp);
		},

		ontouchmove : function(oEvent) {
			this._scroller.doTouchMove(oEvent.touches, oEvent.timeStamp);
			if(this._preventTouchMoveDefault) {
				//Prevent the default touch action e.g. scrolling the whole page
				oEvent.preventDefault();
			} else {
				// Zynga relies on default browser behavior and
				// the app.control prevents default at window level in initMobile
				oEvent.stopPropagation();
			}
		}
	};

	var oNativeMouseScrollDelegate = {

		getScrollTop : function() {
			return this._scrollY || 0;
		},

		getScrollLeft : function() {
			return this._scrollX || 0;
		},

		getMaxScrollTop : function() {
			var $Container = $.sap.byId(this._sContentId).parent();
			if (!$Container.length) {
				return -1;
			}
			return $Container[0].scrollHeight - $Container.height();
		},

		onBeforeRendering: function() {
			if (this._sResizeListenerId) {
				sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);
				this._sResizeListenerId = null;
			}

			var $Container = $.sap.byId(this._sContentId).parent();
			if ($Container.length > 0) {
				if ($Container.height() > 0) {
					this._scrollX = $Container.scrollLeft(); // remember position for after rendering
					this._scrollY = $Container.scrollTop();
					// jQuery.sap.log.warning("ScrollEnablement.beforeRendering: scrollY set to " + this._scrollY);
				}
				$Container.unbind("scroll", this._onScroll);
			}
		},

		_onScroll: function(event) {
			var $this = $(this);
			var iContainerHeight = $this.height();
			var that = event.data.that;

			if (that._fnScrollLoadCallback && this.scrollHeight - $this.scrollTop() - iContainerHeight < 100) {
				// close to the bottom
				// TODO: if scrolling down
				that._fnScrollLoadCallback();
			}

			event.data.that._scrollX = $this.scrollLeft(); // remember position for after rendering
			event.data.that._scrollY = $this.scrollTop();
			// jQuery.sap.log.warning("ScrollEnablement._onScroll: scrollY set to " + this._scrollY);
		},

		onAfterRendering: function() {
			var $Container = $.sap.byId(this._sContentId).parent();

			// make container scrollable into the configured directions
			$Container
				.css("overflow-x", this._bHorizontal ? "auto" : "hidden")
				.css("overflow-y", this._bVertical ? "auto" : "hidden");

			// apply the previous scroll state
			$Container.scrollLeft(this._scrollX);
			var bHasHeight = ($Container.height() > 0);

			if (bHasHeight) {
				$Container.scrollTop(this._scrollY);
			}

			if (!bHasHeight || !!sap.ui.Device.browser.internet_explorer) {
				// element may be hidden and have height 0
				var that = this;
				this._sResizeListenerId = sap.ui.core.ResizeHandler.register($Container[0], function(){
					var $Container = $.sap.byId(that._sContentId).parent();
					if ($Container.height() > 0) {
						$Container.scrollTop(that._scrollY);
						that._readActualScrollPosition.apply(that); // store actual scroll position

						if (!!!sap.ui.Device.browser.internet_explorer) { // for IE the resize listener must remain in place for the case when navigating away and coming back. For the other browsers it seems to work fine without.
							sap.ui.core.ResizeHandler.deregister(that._sResizeListenerId);
							this._sResizeListenerId = null;
						}
					}
				});
			}

			// if a GrowingList wants to be informed, track the scrolling and call it once required
			$Container.scroll({that: this}, this._onScroll);
		},

		_readActualScrollPosition: function() {

			// if container has a size, this method reads the current scroll position and stores it as desired position
			var $Container = $.sap.byId(this._sContentId).parent();

			if ($Container.width() > 0) {
				this._scrollX = $Container.scrollLeft();
			}
			if ($Container.height() > 0) {
				this._scrollY = $Container.scrollTop();
				// jQuery.sap.log.warning("ScrollEnablement.scrollTo: scrollY corrected to " + this._scrollY);
			}
		},

		_scrollTo: function(x, y, time) {
			// jQuery.sap.log.warning("ScrollEnablement.scrollTo: scrollY set to " + this._scrollY);

			var $Container = $.sap.byId(this._sContentId).parent();
			if ($Container.length > 0) {
				if (time > 0) {
					$Container.animate({ scrollTop: y, scrollLeft: x }, time, jQuery.proxy(this._readActualScrollPosition, this));
				} else {
					$Container.scrollTop(y);
					$Container.scrollLeft(x);

					this._readActualScrollPosition(); // if container is too large no scrolling is possible
				}
			}
		}
	};





	/*
	 * Init delegator prototype according to various conditions.
	 */
	function initDelegateMembers(oScrollerInstance, oConfig) {
		var oDelegateMembers;

		if (!$.support.touch && !$.sap.simulateMobileOnDesktop && !oConfig.nonTouchScrolling) {  //TODO: Maybe find some better criteria
			// nothing to do on desktop browsers when disabled
			oDelegateMembers = {};

		} else if(!$.support.touch && !$.sap.simulateMobileOnDesktop && oConfig.nonTouchScrolling === "scrollbar") {
			// non-touch platforms with scrolling type "mouse"
			oDelegateMembers = {
				_init : function(oControl, sScrollContentId, oConfig) {
					$.extend(this, oNativeMouseScrollDelegate);
				}
			};

		} else {
			$.sap.require("jquery.sap.mobile");

			oDelegateMembers = {
				_init : function(oControl, sScrollContentDom, oConfig) {

					function createZyngaScroller(contentId, horizontal, vertical){
						var oScroller = new window.Scroller(function(left, top, zoom){
								var $Container = $.sap.byId(contentId).parent();
								$Container.scrollLeft(left);
								$Container.scrollTop(top);
							}, {
								scrollingX: horizontal,
								scrollingY: vertical,
								bouncing: false
						});
						return oScroller;
					}

					// What library to use?:
					var sLib = oConfig.zynga? "z":"i";
					// TODO: sLib = "n" for native scrolling?

					// Initialization
					this._preventTouchMoveDefault = !!oConfig.preventDefault;
					this._scroller = null;

					switch (sLib) {
						case "z": // Zynga library
							$.sap.require("sap.ui.thirdparty.zyngascroll");
							$.extend(this, oZyngaDelegate);
							this._zynga = true;
							this._scroller = createZyngaScroller(this._sContentId, this._bHorizontal, this._bVertical);
							break;
						default: // iScroll library
							$.sap.require("sap.ui.thirdparty.iscroll");
							$.extend(this, oIScrollDelegate);
							break;
					}
				},

				_exit : function() {
					if(this._cleanup){ this._cleanup(); }
					this._scroller = null;
				}
			};
		}

		// Copy over members to prototype
		$.extend(oScrollerInstance, oDelegateMembers);
	}

}(jQuery));
