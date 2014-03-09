/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides default renderer for control sap.m.Text
jQuery.sap.declare("sap.m.TextRenderer");
jQuery.sap.require("sap.ui.core.Renderer");

/**
 * @class Text renderer
 * @author SAP AG
 * @static
 */
sap.m.TextRenderer = {};

/**
 * Dummy inheritance of static methods/functions.
 * @see sap.ui.core.Renderer.getTextAlign
 * @private
 */
sap.m.TextRenderer.getTextAlign = sap.ui.core.Renderer.getTextAlign;

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oText An object representation of the control that should be rendered.
 */
sap.m.TextRenderer.render = function(oRm, oText) {
	// Return immediately if control is invisible
	if (!oText.getVisible()) {
		return;
	}

	// get control values
	var sWidth = oText.getWidth(),
		sText = oText.getText(true),
		sTextDir = oText.getTextDirection(),
		sTooltip = oText.getTooltip_AsString(),
		nMaxLines = oText.getMaxLines(),
		bWrapping = oText.getWrapping(),
		sTextAlign = oText.getTextAlign();

	// start writing html
	oRm.write("<span");
	oRm.writeControlData(oText);
	oRm.addClass("sapMText");

	// set classes for wrapping
	if (!bWrapping || nMaxLines == 1) {
		oRm.addClass("sapMTextNoWrap");
	} else if (bWrapping) {
		// no space text must break
		if (!/\s/.test(sText)) {
			oRm.addClass("sapMTextBreakWord");
		}

		// handle line clamp
		if (nMaxLines > 1) {
			if (sap.m.Text.hasNativeLineClamp) {
				oRm.addClass("sapMTextLineClamp");
				oRm.addStyle("-webkit-line-clamp", nMaxLines);
			} else {
				oRm.addClass("sapMTextMaxLine");
			}
		}
	}

	// write style and attributes
	sWidth && oRm.addStyle("width", sWidth);
	sTextDir && oRm.writeAttribute("dir", sTextDir);
	sTooltip &&	oRm.writeAttributeEscaped("title", sTooltip);
	if (sTextAlign) {
		sTextAlign = this.getTextAlign(sTextAlign, sTextDir);
		if (sTextAlign) {
			oRm.addStyle("text-align", sTextAlign);
		}
	}

	// finish writing html
	oRm.writeClasses();
	oRm.writeStyles();
	oRm.write(">");
	oRm.writeEscaped(sText, bWrapping);
	oRm.write("</span>");
};