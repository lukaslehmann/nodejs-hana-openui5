/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.Bar.
jQuery.sap.declare("sap.m.Bar");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new Bar.
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
 * <li>{@link #getEnableFlexBox enableFlexBox} : boolean (default: false)</li>
 * <li>{@link #getTranslucent translucent} : boolean (default: false)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getContentLeft contentLeft} : sap.ui.core.Control[]</li>
 * <li>{@link #getContentMiddle contentMiddle} : sap.ui.core.Control[]</li>
 * <li>{@link #getContentRight contentRight} : sap.ui.core.Control[]</li></ul>
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
 * A bar that is usually used on top of pages
 * @extends sap.ui.core.Control
 *
 * @author SAP AG 
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor   
 * @public
 * @name sap.m.Bar
 */
sap.ui.core.Control.extend("sap.m.Bar", { metadata : {

	// ---- object ----

	// ---- control specific ----
	library : "sap.m",
	properties : {
		"enableFlexBox" : {type : "boolean", group : "Misc", defaultValue : false, deprecated: true},
		"translucent" : {type : "boolean", group : "Appearance", defaultValue : false}
	},
	aggregations : {
    	"contentLeft" : {type : "sap.ui.core.Control", multiple : true, singularName : "contentLeft"}, 
    	"contentMiddle" : {type : "sap.ui.core.Control", multiple : true, singularName : "contentMiddle"}, 
    	"contentRight" : {type : "sap.ui.core.Control", multiple : true, singularName : "contentRight"}
	}
}});


/**
 * Creates a new subclass of class sap.m.Bar with name <code>sClassName</code> 
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
 * @name sap.m.Bar.extend
 * @function
 */


/**
 * Getter for property <code>enableFlexBox</code>.
 * If this flag is set to true, ContentMiddle will be rendered as a HBox and layoutData can be used to allocate available space
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>enableFlexBox</code>
 * @public
 * @deprecated Since version 1.16. 
 * 
 * This property is no longer supported, instead, ContentMiddle will always occupy 100% width when no ContentLeft and ContentRight are being set.
 * @name sap.m.Bar#getEnableFlexBox
 * @function
 */

/**
 * Setter for property <code>enableFlexBox</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bEnableFlexBox  new value for property <code>enableFlexBox</code>
 * @return {sap.m.Bar} <code>this</code> to allow method chaining
 * @public
 * @deprecated Since version 1.16. 
 * 
 * This property is no longer supported, instead, ContentMiddle will always occupy 100% width when no ContentLeft and ContentRight are being set.
 * @name sap.m.Bar#setEnableFlexBox
 * @function
 */


/**
 * Getter for property <code>translucent</code>.
 * A boolean value indicating whether the bar is partially translucent.
 * It is only applied for mobile devices.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>translucent</code>
 * @public
 * @since 1.12
 * @name sap.m.Bar#getTranslucent
 * @function
 */

/**
 * Setter for property <code>translucent</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bTranslucent  new value for property <code>translucent</code>
 * @return {sap.m.Bar} <code>this</code> to allow method chaining
 * @public
 * @since 1.12
 * @name sap.m.Bar#setTranslucent
 * @function
 */


/**
 * Getter for aggregation <code>contentLeft</code>.<br/>
 * this is the left content area, usually containing button or App Icon. If this is overlapped by the right content, its content will disappear and text will show an elipsis.
 * 
 * @return {sap.ui.core.Control[]}
 * @public
 * @name sap.m.Bar#getContentLeft
 * @function
 */


/**
 * Inserts a contentLeft into the aggregation named <code>contentLeft</code>.
 *
 * @param {sap.ui.core.Control}
 *          oContentLeft the contentLeft to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the contentLeft should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the contentLeft is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the contentLeft is inserted at 
 *             the last position        
 * @return {sap.m.Bar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Bar#insertContentLeft
 * @function
 */

/**
 * Adds some contentLeft <code>oContentLeft</code> 
 * to the aggregation named <code>contentLeft</code>.
 *
 * @param {sap.ui.core.Control}
 *            oContentLeft the contentLeft to add; if empty, nothing is inserted
 * @return {sap.m.Bar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Bar#addContentLeft
 * @function
 */

/**
 * Removes an contentLeft from the aggregation named <code>contentLeft</code>.
 *
 * @param {int | string | sap.ui.core.Control} vContentLeft the contentLeft to remove or its index or id
 * @return {sap.ui.core.Control} the removed contentLeft or null
 * @public
 * @name sap.m.Bar#removeContentLeft
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>contentLeft</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.ui.core.Control[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.Bar#removeAllContentLeft
 * @function
 */

/**
 * Checks for the provided <code>sap.ui.core.Control</code> in the aggregation named <code>contentLeft</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.ui.core.Control}
 *            oContentLeft the contentLeft whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.Bar#indexOfContentLeft
 * @function
 */
	

/**
 * Destroys all the contentLeft in the aggregation 
 * named <code>contentLeft</code>.
 * @return {sap.m.Bar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Bar#destroyContentLeft
 * @function
 */


/**
 * Getter for aggregation <code>contentMiddle</code>.<br/>
 * This is the middle content area. Controls such as label, segmented buttons, Select should be placed here. Content that are placed here will be centrally positioned, if there is enough space. If the right or left content overlaps the middle content, the middle content will be centered in the space between the left and the right content.
 * 
 * @return {sap.ui.core.Control[]}
 * @public
 * @name sap.m.Bar#getContentMiddle
 * @function
 */


/**
 * Inserts a contentMiddle into the aggregation named <code>contentMiddle</code>.
 *
 * @param {sap.ui.core.Control}
 *          oContentMiddle the contentMiddle to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the contentMiddle should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the contentMiddle is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the contentMiddle is inserted at 
 *             the last position        
 * @return {sap.m.Bar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Bar#insertContentMiddle
 * @function
 */

/**
 * Adds some contentMiddle <code>oContentMiddle</code> 
 * to the aggregation named <code>contentMiddle</code>.
 *
 * @param {sap.ui.core.Control}
 *            oContentMiddle the contentMiddle to add; if empty, nothing is inserted
 * @return {sap.m.Bar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Bar#addContentMiddle
 * @function
 */

/**
 * Removes an contentMiddle from the aggregation named <code>contentMiddle</code>.
 *
 * @param {int | string | sap.ui.core.Control} vContentMiddle the contentMiddle to remove or its index or id
 * @return {sap.ui.core.Control} the removed contentMiddle or null
 * @public
 * @name sap.m.Bar#removeContentMiddle
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>contentMiddle</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.ui.core.Control[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.Bar#removeAllContentMiddle
 * @function
 */

/**
 * Checks for the provided <code>sap.ui.core.Control</code> in the aggregation named <code>contentMiddle</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.ui.core.Control}
 *            oContentMiddle the contentMiddle whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.Bar#indexOfContentMiddle
 * @function
 */
	

/**
 * Destroys all the contentMiddle in the aggregation 
 * named <code>contentMiddle</code>.
 * @return {sap.m.Bar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Bar#destroyContentMiddle
 * @function
 */


/**
 * Getter for aggregation <code>contentRight</code>.<br/>
 * this is the right content area. Controls such as Action buttons or Search field could be placed here.
 * 
 * @return {sap.ui.core.Control[]}
 * @public
 * @name sap.m.Bar#getContentRight
 * @function
 */


/**
 * Inserts a contentRight into the aggregation named <code>contentRight</code>.
 *
 * @param {sap.ui.core.Control}
 *          oContentRight the contentRight to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the contentRight should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the contentRight is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the contentRight is inserted at 
 *             the last position        
 * @return {sap.m.Bar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Bar#insertContentRight
 * @function
 */

/**
 * Adds some contentRight <code>oContentRight</code> 
 * to the aggregation named <code>contentRight</code>.
 *
 * @param {sap.ui.core.Control}
 *            oContentRight the contentRight to add; if empty, nothing is inserted
 * @return {sap.m.Bar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Bar#addContentRight
 * @function
 */

/**
 * Removes an contentRight from the aggregation named <code>contentRight</code>.
 *
 * @param {int | string | sap.ui.core.Control} vContentRight the contentRight to remove or its index or id
 * @return {sap.ui.core.Control} the removed contentRight or null
 * @public
 * @name sap.m.Bar#removeContentRight
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>contentRight</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.ui.core.Control[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.Bar#removeAllContentRight
 * @function
 */

/**
 * Checks for the provided <code>sap.ui.core.Control</code> in the aggregation named <code>contentRight</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.ui.core.Control}
 *            oContentRight the contentRight whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.Bar#indexOfContentRight
 * @function
 */
	

/**
 * Destroys all the contentRight in the aggregation 
 * named <code>contentRight</code>.
 * @return {sap.m.Bar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Bar#destroyContentRight
 * @function
 */


// Start of sap\m\Bar.js
/**
 * @private
 */

sap.m.Bar.prototype.onBeforeRendering = function() {
	this._removeAllListeners();
};

sap.m.Bar.prototype.onAfterRendering = function() {
	this._handleResize();
};

/**
 * Called when the control is destroyed.
 *
 * @private
 */
sap.m.Bar.prototype.exit = function() {
	this._removeAllListeners();

	if(this._oflexBox) {

		this._oflexBox.destroy();
		this._oflexBox = null;

	}

	this.$midBarPH = null;
	this.$rightBar = null;
	this.$leftBar = null;
};

/**
 * @private
 */
sap.m.Bar._aResizeHandlers = ["_sResizeListenerId", "_sResizeListenerIdMid", "_sResizeListenerIdRight", "_sResizeListenerIdLeft"];

/**
 * removes all resize listeners, that the bar could have registered.
 * @private
 */
sap.m.Bar.prototype._removeAllListeners = function() {
	var that = this;

	sap.m.Bar._aResizeHandlers.forEach(function(sItem) {

		that._removeListenerFailsave(sItem);

	});
};

/**
 * Removes a listener with the specified name and sets it to null, if the listener is defined.
 *
 * @private
 */
sap.m.Bar.prototype._removeListenerFailsave = function(sListenerName) {
	if (this[sListenerName]) {

		sap.ui.core.ResizeHandler.deregister(this[sListenerName]);
		this[sListenerName] = null;

	}
};

/**
 * Invoked, when bar is rerendered, its size changed, or the size of one for the content bars changed
 * @private
 */
sap.m.Bar.prototype._handleResize = function() {
	this._removeAllListeners();

	var sId = this.getId(),

		bContentLeft = !!this.getContentLeft().length,
		bContentMiddle = !!this.getContentMiddle().length,
		bContentRight = !!this.getContentRight().length;

	//No content was set yet - no need to listen to resizes
	if(!bContentLeft && !bContentMiddle && !bContentRight) {
		return;
	}

	this.$leftBar = jQuery.sap.byId( sId + "-BarLeft");
	this.$rightBar = jQuery.sap.byId( sId + "-BarRight");
	this.$midBarPH = jQuery.sap.byId( sId + "-BarPH");

	this._updatePosition(bContentLeft, bContentMiddle, bContentRight);

	this._sResizeListenerId = sap.ui.core.ResizeHandler.register(this.getDomRef(), jQuery.proxy(this._handleResize, this));
	

	if(this.getEnableFlexBox()) {
		return;
	}
	
	if(bContentLeft) {
		this._sResizeListenerIdLeft = sap.ui.core.ResizeHandler.register(this.$leftBar[0], jQuery.proxy(this._handleResize, this));
	}

	if(bContentMiddle) {
		this._sResizeListenerIdMid = sap.ui.core.ResizeHandler.register(this.$midBarPH[0], jQuery.proxy(this._handleResize, this));
	}

	if(bContentRight) {
		this._sResizeListenerIdRight = sap.ui.core.ResizeHandler.register(this.$rightBar[0], jQuery.proxy(this._handleResize, this));
	}
};

/**
 * Repositions the bar. 
 * If there is only one aggregation filled, this aggregation will take 100% of the bars space.
 * @private
 */
sap.m.Bar.prototype._updatePosition = function(bContentLeft, bContentMiddle, bContentRight) {
	var bUseFlex = this.getEnableFlexBox();

	if (!bContentLeft && !bContentRight) {

		this.$midBarPH.css({ width : '100%'});
		return;

	}

	if(bContentLeft && !bContentMiddle && !bContentRight) {

		this.$leftBar.css({ width : '100%'});
		return;

	}

	if(!bContentLeft && !bContentMiddle && bContentRight) {

		this.$rightBar.css({ width : '100%'});
		return;

	}

	var iBarWidth = this.$().outerWidth(true);

	// reset to default
	this.$rightBar.css({ width : "" });
	this.$leftBar.css({ width : "" });
	this.$midBarPH.css({ position : "", width : "", visibility : 'hidden' });

	var iRBWidth = this.$rightBar.outerWidth(true);

	//right bar is bigger than the bar - only show the right bar
	if(iRBWidth > iBarWidth) {

		if(bContentLeft) {
			this.$leftBar.css({ width : "0px" });
		}

		if(bContentMiddle) {
			this.$midBarPH.css({ width : "0px" });
		}

		this.$rightBar.css({ width : iBarWidth + "px"});
		return;

	}

	var iLBWidth = this._getBarContainerWidth(this.$leftBar);

	// handle the case when left and right content are wider than the bar itself
	if (iBarWidth < (iLBWidth + iRBWidth)) {

		// this scenario happens mostly when a very long title text is set in the left content area
		// hence we make sure the rightContent always has enough space and reduce the left content area width accordingly
		iLBWidth = iBarWidth - iRBWidth;

		this.$leftBar.width(iLBWidth);
		this.$midBarPH.width(0);
		return;

	}

	//middle bar will be shown
	var oMidBarPHCss = this._getMidBarCss(iRBWidth, iBarWidth, iLBWidth);
	this.$midBarPH.css(oMidBarPHCss);

};

/**
 * Returns the css for the contentMiddle aggregation. It is centered if there is enough space for it to fit between the left and right content.
 * If not it will be centered between those two.
 * @returns {object} the new $midBarPh css
 */
sap.m.Bar.prototype._getMidBarCss = function(iRBWidth, iBarWidth, iLBWidth) {
	var iMBPHWidth = this.$midBarPH.outerWidth(true),
		oMBPHPosition = this.$midBarPH.position();

	var bRtl = sap.ui.getCore().getConfiguration().getRTL(),
		sLeftOrRight = bRtl ? "right" : "left",
		oMidBarCss = { visibility : "" };

	if (this.getEnableFlexBox()) {

		iMBPHWidth = iBarWidth - iLBWidth - iRBWidth - parseInt(this.$midBarPH.css('margin-left'), 10) - parseInt(this.$midBarPH.css('margin-right'), 10);

		oMidBarCss = jQuery.extend(oMidBarCss, {
			position : 'absolute',
			width : iMBPHWidth + "px"
		});

		oMidBarCss[sLeftOrRight] = iLBWidth;

		//calculation for flex is done
		return oMidBarCss;

	}

	var iSpaceBetweenLeftAndRight = iBarWidth - iLBWidth - iRBWidth;

	var iMidBarStartingPoint = (iBarWidth / 2) - (iMBPHWidth / 2);
	var bLeftContentIsOverlapping = iLBWidth > iMidBarStartingPoint;

	var iMidBarEndPoint = (iBarWidth / 2) + (iMBPHWidth / 2);
	var bRightContentIsOverlapping = (iBarWidth - iRBWidth) < iMidBarEndPoint;

	if (iSpaceBetweenLeftAndRight > 0 && (bLeftContentIsOverlapping || bRightContentIsOverlapping)) {

		//Left or Right content is overlapping the Middle content
		oMidBarCss = jQuery.extend(oMidBarCss, {
				// place the middle positioned element directly next to the end of left content area
				position : 'absolute',
				//Use the remaining space
				width : iSpaceBetweenLeftAndRight + "px"
			});

		oMidBarCss.left = bRtl ? iRBWidth : iLBWidth;
	}

	var $midBar = jQuery.sap.byId(this.getId() + "-BarMiddle"),
		iMBWidth = $midBar.outerWidth(true);

	if (oMidBarCss.width > iMBWidth) {

		oMidBarCss.width = iMBWidth;

	}

	return oMidBarCss;

};

/**
 * @returns {integer} the width of one of the bar containers
 */
sap.m.Bar.prototype._getBarContainerWidth = function($container) {
	var i,
		iContainerWidth = 0,
		aContainerChildren = $container.children(),
		iContainerChildrenTotalWidth = 0;

	// Chrome browser has a problem in providing the correct div size when image inside does not have width explicitly set
	if (sap.ui.Device.browser.webkit) {

		for (i= 0; i < aContainerChildren.length; i++) {

			iContainerChildrenTotalWidth += jQuery(aContainerChildren[i]).outerWidth(true);

		}

		iContainerWidth = $container.outerWidth(true);

	} else {

		// IE & firefox has a rounding issue with JQuery.outerWidth
		var oContainerChildrenStyle;

		for(i= 0; i < aContainerChildren.length; i++){

			oContainerChildrenStyle = window.getComputedStyle(aContainerChildren[i]);

			if (oContainerChildrenStyle.width == "auto") {

				iContainerChildrenTotalWidth += jQuery(aContainerChildren[i]).width() + 1; //add an additional 1 pixel because of rounding issue.

			} else {

				iContainerChildrenTotalWidth += parseFloat(oContainerChildrenStyle.width);

			}

			iContainerChildrenTotalWidth += parseFloat(oContainerChildrenStyle.marginLeft);
			iContainerChildrenTotalWidth += parseFloat(oContainerChildrenStyle.marginRight);
			iContainerChildrenTotalWidth += parseFloat(oContainerChildrenStyle.paddingLeft);
			iContainerChildrenTotalWidth += parseFloat(oContainerChildrenStyle.paddingRight);
		}

		var oContainerComputedStyle = window.getComputedStyle($container[0]);

		iContainerWidth += parseFloat(oContainerComputedStyle.width);
		iContainerWidth += parseFloat(oContainerComputedStyle.marginLeft);
		iContainerWidth += parseFloat(oContainerComputedStyle.marginRight);
		iContainerWidth += parseFloat(oContainerComputedStyle.paddingLeft);
		iContainerWidth += parseFloat(oContainerComputedStyle.paddingRight);

	}

	if (iContainerWidth < iContainerChildrenTotalWidth) {

		iContainerWidth = iContainerChildrenTotalWidth;

	}

	return iContainerWidth;
};
