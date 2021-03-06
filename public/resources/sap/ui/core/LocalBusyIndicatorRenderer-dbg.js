/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.LocalBusyIndicatorRenderer");

/**
 * @class LocalBusyIndicator renderer.
 * @static
 */
sap.ui.core.LocalBusyIndicatorRenderer = {};

(function() {
	/**
	 * Renders the HTML for the given control, using the provided
	 * {@link sap.ui.core.RenderManager}.
	 * 
	 * @param {sap.ui.core.RenderManager}
	 *            oRm the RenderManager that can be used for writing to the
	 *            render output buffer
	 * @param {sap.ui.core.Control}
	 *            oControl an object representation of the control that should
	 *            be rendered
	 */
	sap.ui.core.LocalBusyIndicatorRenderer.render = function(oRm, oControl) {
		oRm.write("<div");
		oRm.writeControlData(oControl);

		oRm.addClass("sapUiLocalBusyIndicator");
		oRm.writeClasses();
		oRm.write(">");

		fnRenderFlickerDivs(oRm, oControl);

		oRm.write("</div>");
	};

	var fnRenderFlickerDivs = function(oRm, oControl) {
		var sId = oControl.getId();
		var sIdAnimation = sId + "-animation";
		var aBoxEnum = [ "-leftBox", "-middleBox", "-rightBox" ];

		oRm.write('<div');
		oRm.writeAttribute('id', sIdAnimation);
		oRm.addClass("sapUiLocalBusyIndicatorAnimation");
		oRm.writeClasses();
		oRm.write(">");

		for ( var i = 0; i < aBoxEnum.length; i++) {
			oRm.write('<div');
			oRm.addClass("sapUiLocalBusyIndicatorBox");
			oRm.writeClasses();
			oRm.writeAttribute("id", sId + aBoxEnum[i]);
			oRm.write(">");
			oRm.write("</div>");

		}

		oRm.write("</div>");
	};
}());