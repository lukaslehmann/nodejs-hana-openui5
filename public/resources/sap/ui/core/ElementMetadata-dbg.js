/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides class sap.ui.core.ElementMetadata
jQuery.sap.declare("sap.ui.core.ElementMetadata");
jQuery.sap.require("sap.ui.base.ManagedObjectMetadata");

/**
 * Creates a new metadata object for a UIElement subclass.
 *
 * @param {string} sClassName fully qualified name of the class that is described by this metadata object
 * @param {object} oStaticInfo static info to construct the metadata from
 *
 * @class
 * @author SAP
 * @version 1.16.8-SNAPSHOT
 * @since 0.8.6
 */
sap.ui.core.ElementMetadata = function(sClassName, oClassInfo) {

	// call super constructor
	sap.ui.base.ManagedObjectMetadata.apply(this, arguments);
};

//chain the prototypes
sap.ui.core.ElementMetadata.prototype = jQuery.sap.newObject(sap.ui.base.ManagedObjectMetadata.prototype);

/**
 * Calculates a new id based on a prefix.
 *
 * @return {string} A (hopefully unique) control id
 * @public
 * @function
 */
sap.ui.core.ElementMetadata.uid = sap.ui.base.ManagedObjectMetadata.uid;

/**
 * By default, the element name is equal to the class name
 * @return {string} the qualified name of the UIElement class
 * @public
 */
sap.ui.core.ElementMetadata.prototype.getElementName = function() {
	return this._sClassName;
};

/**
 * Determines the class name of the renderer for the described control class.
 */
sap.ui.core.ElementMetadata.prototype.getRendererName = function() {
	return this._sRendererName;
};

/**
 * Retrieves the renderer for the described control class
 */
sap.ui.core.ElementMetadata.prototype.getRenderer = function() {

	// determine name via function for those legacy controls that override getRendererName()
	var sRendererName = this.getRendererName();

	if ( !sRendererName ) {
		return;
	}

	// check if renderer class exists already
	var fnRendererClass = jQuery.sap.getObject(sRendererName);
	if(fnRendererClass) {
		return fnRendererClass;
	}

	// if not, try to load a module with the same name
	jQuery.sap.require(sRendererName);
	return jQuery.sap.getObject(sRendererName);
};

sap.ui.core.ElementMetadata.prototype.applySettings = function(oClassInfo) {

	var oStaticInfo = oClassInfo.metadata;

	this._sVisibility = oStaticInfo["visibility"] || "public";

	// remove renderer stuff before calling super.
	var vRenderer = oClassInfo.hasOwnProperty("renderer") ? (oClassInfo.renderer || "") : undefined;
	delete oClassInfo.renderer;

	sap.ui.base.ManagedObjectMetadata.prototype.applySettings.call(this, oClassInfo);

	this._sRendererName = this.getName() + "Renderer";

	if ( typeof vRenderer !== "undefined" ) {

		if ( typeof vRenderer === "string" ) {
			this._sRendererName = vRenderer || undefined;
			return;
		}
		if ( typeof vRenderer === "function" ) {
			vRenderer = { render : vRenderer };
		}

		var oParent = this.getParent();
		var oBaseRenderer;
		if ( oParent && oParent instanceof sap.ui.core.ElementMetadata ) {
			oBaseRenderer = oParent.getRenderer();
		}
		if ( !oBaseRenderer ) {
			jQuery.sap.require("sap.ui.core.Renderer");
			oBaseRenderer = sap.ui.core.Renderer;
		}
		var oRenderer = jQuery.sap.newObject(oBaseRenderer);
		jQuery.extend(oRenderer, vRenderer);
		jQuery.sap.setObject(this.getRendererName(), oRenderer);
	}
};

sap.ui.core.ElementMetadata.prototype.afterApplySettings = function() {
	sap.ui.base.ManagedObjectMetadata.prototype.afterApplySettings.apply(this, arguments);
	this.register && this.register(this);
};

sap.ui.core.ElementMetadata.prototype.isHidden = function() {
	return this._sVisibility === "hidden";
};
