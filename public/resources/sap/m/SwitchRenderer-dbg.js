/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.m.SwitchRenderer");

/**
 * @class Switch renderer.
 * @static
 */
sap.m.SwitchRenderer = {};

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the Render-Output-Buffer
 * @param {sap.ui.core.Control} oSwitch an object representation of the control that should be rendered
 */
sap.m.SwitchRenderer.render = function(oRenderManager, oSwitch) {
	var bState = oSwitch.getState(),
		sState = bState ? oSwitch._sOn : oSwitch._sOff,
		sTooltip = oSwitch.getTooltip_AsString(),
		sType = oSwitch.getType(),
		bDefault = (sType === "Default"),
		bDisabled =  !oSwitch.getEnabled(),
		sName = oSwitch.getName();

	// suppress rendering if not visible
	if (!oSwitch.getVisible()) {
		return;
	}

	oRenderManager.write('<div');
	oRenderManager.addClass("sapMSwtCont");

	if (bDisabled) {
		oRenderManager.addClass("sapMSwtContDisabled");
	}

	oRenderManager.writeClasses();
	oRenderManager.writeStyles();
	oRenderManager.writeControlData(oSwitch);

	if (sTooltip) {
		oRenderManager.writeAttributeEscaped("title", sTooltip);
	}

	oRenderManager.write(">");

		oRenderManager.write("<div");
		oRenderManager.addClass("sapMSwt");
		bState ? oRenderManager.addClass("sapMSwtOn") : oRenderManager.addClass("sapMSwtOff");
		oRenderManager.addClass("sapMSwt" + sType);

		if (bDisabled) {
			oRenderManager.addClass("sapMSwtDisabled");
		}

		oRenderManager.writeClasses();
		oRenderManager.write('>');
			oRenderManager.write('<div class="sapMSwtInner">');

				// text
				this._renderText(oRenderManager, oSwitch, bDefault);

				// handle
				this._renderHandle(oRenderManager, oSwitch, sState, bDisabled);

			oRenderManager.write("</div>");

		oRenderManager.write("</div>");

		if (sName) {

			// checkbox
			this._renderCheckbox(oRenderManager, oSwitch, sName, sState, bState, bDisabled);
		}

	oRenderManager.write("</div>");
};

sap.m.SwitchRenderer._renderText = function(oRenderManager, oSwitch, bDefault) {

	// on
	oRenderManager.write('<div class="sapMSwtText sapMSwtTextOn">');
		oRenderManager.write("<span>");
			if (bDefault) {
				oRenderManager.writeEscaped(oSwitch._sOn);
			}
		oRenderManager.write("</span>");
	oRenderManager.write("</div>");

	// off
	oRenderManager.write('<div class="sapMSwtText sapMSwtTextOff">');
		oRenderManager.write("<span>");
			if (bDefault) {
				oRenderManager.writeEscaped(oSwitch._sOff);
			}
		oRenderManager.write("</span>");
	oRenderManager.write("</div>");
};

sap.m.SwitchRenderer._renderHandle = function(oRenderManager, oSwitch, sState, bDisabled) {
	oRenderManager.write('<div class="sapMSwtHandle"');

	if (!bDisabled) {
		oRenderManager.writeAttribute("tabindex", "0");
	}

	oRenderManager.writeAttributeEscaped("data-sap-ui-swt", sState);
	oRenderManager.write("></div>");
};

sap.m.SwitchRenderer._renderCheckbox = function(oRenderManager, oSwitch, sName, sState, bState, bDisabled) {
	oRenderManager.write('<input type="checkbox"');

	oRenderManager.writeAttributeEscaped("name", sName);

	oRenderManager.writeAttribute("id", oSwitch.getId() + "-input");

	if (bState) {
		oRenderManager.writeAttribute("checked", "checked");
	}

	if (bDisabled) {
		oRenderManager.writeAttribute("disabled", "disabled");
	}

	oRenderManager.writeAttributeEscaped("value", sState);

	oRenderManager.write(">");
};