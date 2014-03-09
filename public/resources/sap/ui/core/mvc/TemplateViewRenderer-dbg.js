/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides default renderer for JSView
jQuery.sap.declare("sap.ui.core.mvc.TemplateViewRenderer");
jQuery.sap.require("sap.ui.core.mvc.ViewRenderer");

/**
 * @class TemplateView renderer.
 * @static
 */
sap.ui.core.mvc.TemplateViewRenderer = {
};


/**
 * Renders the Template, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the Render-Output-Buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.ui.core.mvc.TemplateViewRenderer.render = function(oRenderManager, oControl){
	// convenience variable
	var rm = oRenderManager;

	// write the HTML into the render manager
	rm.write("<div");
	rm.writeControlData(oControl);
	rm.addClass("sapUiView");
	rm.addClass("sapUiTmplView");
	sap.ui.core.mvc.ViewRenderer.addDisplayClass(rm, oControl);
	rm.addStyle("width", oControl.getWidth());
	rm.addStyle("height", oControl.getHeight());
	rm.writeStyles();
	rm.writeClasses();
	rm.write(">");
	
	rm.renderControl(oControl._oTemplate);

	rm.write("</div>");
};