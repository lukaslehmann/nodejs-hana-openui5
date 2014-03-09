/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides class sap.ui.core.ResizeHandler
jQuery.sap.declare("sap.ui.core.ResizeHandler");
jQuery.sap.require("sap.ui.base.Object");
jQuery.sap.require("sap.ui.Global");
jQuery.sap.require("jquery.sap.script");

(function(){

	// local logger, by default only logging errors
	var log = jQuery.sap.log.getLogger("sap.ui.core.ResizeHandler", jQuery.sap.log.Level.ERROR);

	/**
	 * Reference to the Core (implementation view, not facade)
	 * @type {sap.ui.core.Core} 
	 */
	var oCoreRef = null;

	/** 
	 * API for resize handling on registered DOM elements and controls.
	 * 
	 * This API provides firing of resize events on all browsers by regularly 
	 * checking width and height of registered DOM elements and controls and firing events accordingly.
	 * 
	 * @namespace
	 * @name sap.ui.core.ResizeHandler
	 * @public
	 */
	
	sap.ui.base.Object.extend("sap.ui.core.ResizeHandler", /** @lends sap.ui.core.ResizeHandler */ {

		constructor : function(oCore) {
			sap.ui.base.Object.apply(this);

			oCoreRef = oCore;

			this.aResizeListeners = [];
			this.bRegistered = false;

			this.iIdCounter = 0;

			this.fDestroyHandler = jQuery.proxy(this.destroy, this);

			jQuery(window).bind("unload", this.fDestroyHandler);
		}

	});
	
	function clearListener(oResizeHandler){
		if(oResizeHandler.bRegistered){
			oResizeHandler.bRegistered = false;
			sap.ui.getCore().detachIntervalTimer(oResizeHandler.checkSizes, oResizeHandler);
		}
	};

	/**
	 * Destroy method of the Resize Handler.
	 * It unregisters the event handlers.
	 *
	 * @param {jQuery.Event} oEvent the event that initiated the destruction of the ResizeHandler
	 * @private
	 */
	sap.ui.core.ResizeHandler.prototype.destroy = function(oEvent) {
		jQuery(window).unbind("unload", this.fDestroyHandler);
		oCoreRef = null;
		this.aResizeListeners = [];
		clearListener(this);
	};

	/**
	 * Attaches listener to resize event.
	 *
	 * @param {DOMElement|Control} oRef the DOM reference or a control
	 * @param {function} fHandler the event handler function
	 * @return {string} Registration-ID for later detaching.
	 * @private
	 */
	sap.ui.core.ResizeHandler.prototype.attachListener = function(oRef, fHandler){
		var bIsControl = oRef instanceof sap.ui.core.Control,
			oDom = bIsControl ? oRef.getDomRef() : oRef,
			iWidth = oDom ? oDom.offsetWidth : 0,
			iHeight = oDom ? oDom.offsetHeight : 0,
			sId = "rs-" + new Date().valueOf() + "-" + this.iIdCounter++,
			dbg = (bIsControl ? ("Control " + oRef.getId()) : (oRef.id ? oRef.id : String(oRef)));

		if(!this.bRegistered){
			this.bRegistered = true;
			sap.ui.getCore().attachIntervalTimer(this.checkSizes, this);
		}

		this.aResizeListeners.push({sId: sId, oDomRef: bIsControl ? null : oRef, oControl: bIsControl ? oRef : null, fHandler: fHandler, iWidth: iWidth, iHeight: iHeight, dbg: dbg});
		log.debug("registered " + dbg);

		return sId;
	};

	/**
	 * Detaches listener from resize event.
	 *
	 * @param {string} Registration-ID returned from attachListener
	 * @private
	 */
	sap.ui.core.ResizeHandler.prototype.detachListener = function(sId){
		var that = this;
		jQuery.each(this.aResizeListeners, function(index, oResizeListener){
			if(oResizeListener.sId == sId){
				that.aResizeListeners.splice(index,1);
				log.debug("deregistered " + sId);
				return false; //break the loop
			};
		});

		// if list is empty now, stop interval
		if(this.aResizeListeners.length == 0){
			clearListener(this);
		}
	};


	/**
	 * Check sizes of resize elements.
	 * @private
	 */
	sap.ui.core.ResizeHandler.prototype.checkSizes = function() {
		var bDebug = log.isLoggable();
		if ( bDebug ) { 
			log.debug("checkSizes:"); 
		} 
		jQuery.each(this.aResizeListeners, function(index, oResizeListener){
			if(oResizeListener){
				var bCtrl = !!oResizeListener.oControl,
					oDomRef = bCtrl ? oResizeListener.oControl.getDomRef() : oResizeListener.oDomRef;
					
				if ( oDomRef && jQuery.contains(document.documentElement, oDomRef)) { //check that domref is still active 
					
					var iOldWidth = oResizeListener.iWidth,
						iOldHeight = oResizeListener.iHeight,
						iNewWidth = oDomRef.offsetWidth,
						iNewHeight = oDomRef.offsetHeight;
				
					if(iOldWidth != iNewWidth || iOldHeight != iNewHeight){
						oResizeListener.iWidth = iNewWidth;
						oResizeListener.iHeight = iNewHeight;
						
						var oEvent = jQuery.Event("resize");
						oEvent.target = oDomRef;
						oEvent.currentTarget = oDomRef;
						oEvent.size = {width: iNewWidth, height: iNewHeight};
						oEvent.oldSize = {width: iOldWidth, height: iOldHeight};
						oEvent.control = bCtrl ? oResizeListener.oControl : null;
						
						if ( bDebug ) { 
							log.debug("resize detected for '" + oResizeListener.dbg + "': " + oEvent.oldSize.width + "x" + oEvent.oldSize.height + " -> " + oEvent.size.width + "x" + oEvent.size.height); 
						}
						
						oResizeListener.fHandler(oEvent);
					}

				}
			}
		});
	};

	/**
	 * Registers the given handler for resize events on the given
	 * DOM reference or Control.
	 *
	 * @param {DOMElement|Control} oRef the Control or the DOM reference for which the given handler should be registered (beside the window)
	 * @param {function} fHandler the handler which should be called on a resize event
	 * @return {string} Registration ID which can be used for deregistering
	 * @name sap.ui.core.ResizeHandler#register
	 * @function
	 * @public
	 */
	sap.ui.core.ResizeHandler.register = function(oRef, fHandler) {
		if(!oCoreRef || !oCoreRef.oResizeHandler) {
			return null;
		}
		return oCoreRef.oResizeHandler.attachListener(oRef, fHandler);
	};

	/**
	 * Deregisters the registered handler for resize events with the given ID.
	 *
	 * @param {string} Registration ID
	 * @name sap.ui.core.ResizeHandler#deregister
	 * @function
	 * @public
	 */
	sap.ui.core.ResizeHandler.deregister = function(sId) {
		if(!oCoreRef || !oCoreRef.oResizeHandler) {
			return;
		}
		oCoreRef.oResizeHandler.detachListener(sId);
	};
	
	/**
	 * Deregisters all registered handler for resize events for the given control.
	 *
	 * @param {string} sControlId the control Id
	 * @name sap.ui.core.ResizeHandler#deregisterAllForControl
	 * @function
	 * @private
	 */
	sap.ui.core.ResizeHandler.deregisterAllForControl = function(sControlId) {
		if(!oCoreRef || !oCoreRef.oResizeHandler) {
			return;
		}
		
		var aIds = [];
		jQuery.each(oCoreRef.oResizeHandler.aResizeListeners, function(index, oResizeListener){
			if(oResizeListener && oResizeListener.oControl && oResizeListener.oControl.getId() === sControlId){
				aIds.push(oResizeListener.sId);
			};
		});
		jQuery.each(aIds, function(index, sId){
			sap.ui.core.ResizeHandler.deregister(sId);
		});
	};

}());