/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides default renderer for View
jQuery.sap.declare("sap.ui.core.mvc.ViewRenderer");

/**
 * @class View renderer.
 * @static
 */
sap.ui.core.mvc.ViewRenderer = {
};

sap.ui.core.mvc.ViewRenderer.addDisplayClass = function(rm, oControl) {
	if (oControl.getDisplayBlock() || (oControl.getWidth() === "100%" && oControl.getHeight() === "100%")) {
		rm.addClass("sapUiViewDisplayBlock");
	}
};