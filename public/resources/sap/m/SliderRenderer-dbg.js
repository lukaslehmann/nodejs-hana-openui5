/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.m.SliderRenderer");

/**
 * @class Slider renderer.
 * @static
 */
sap.m.SliderRenderer = {};

/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
sap.m.SliderRenderer.CSS_CLASS = "sapMSlider";

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oSlider an object representation of the slider that should be rendered
 */
sap.m.SliderRenderer.render = function(oRenderManager, oSlider) {
	var fValue = oSlider.getValue(),
		sName = oSlider.getName(),
		bEnabled = oSlider.getEnabled(),
		sTooltip = oSlider.getTooltip_AsString();

	// avoid render when not visible
	if (!oSlider.getVisible()) {
		return;
	}

	oRenderManager.write("<div");
	oRenderManager.addClass(sap.m.SliderRenderer.CSS_CLASS);

	if (!bEnabled) {
		oRenderManager.addClass(sap.m.SliderRenderer.CSS_CLASS + "Disabled");
	}

	oRenderManager.addStyle("width", oSlider.getWidth());
	oRenderManager.addStyle("visibility", "hidden");
	oRenderManager.writeClasses();
	oRenderManager.writeStyles();
	oRenderManager.writeControlData(oSlider);

	if (sTooltip) {
		oRenderManager.writeAttributeEscaped("title", sTooltip);
	}

	oRenderManager.write(">");

		oRenderManager.write('<div');
			oRenderManager.addClass(sap.m.SliderRenderer.CSS_CLASS + "Inner");

			if (!bEnabled) {
				oRenderManager.addClass(sap.m.SliderRenderer.CSS_CLASS + "InnerDisabled");
			}

			oRenderManager.writeClasses();
			oRenderManager.writeStyles();
			oRenderManager.write(">");

			if (oSlider.getProgress()) {
				oRenderManager.write('<div class="' + sap.m.SliderRenderer.CSS_CLASS + 'Progress" style="width: ' +  oSlider._sProgressValue + '"></div>');
			}

			this._renderHandle(oRenderManager, oSlider, fValue, bEnabled);

		oRenderManager.write("</div>");

		if (sName) {
			this._renderInput(oRenderManager, oSlider, fValue, bEnabled, sName);
		}

	oRenderManager.write("</div>");
};

sap.m.SliderRenderer._renderHandle = function(oRenderManager, oSlider, fValue, bEnabled) {
	oRenderManager.write('<span');
	oRenderManager.addClass(sap.m.SliderRenderer.CSS_CLASS + "Handle");
	oRenderManager.addStyle(sap.m.Slider._bRtl ? "right" : "left", oSlider._sProgressValue);

	// WAI-ARIA
	oRenderManager.writeAccessibilityState(oSlider, {
		role: "slider",
		orientation: "horizontal",
		valuemin: oSlider.getMin(),
		valuemax: oSlider.getMax(),
		valuenow: fValue,
		valuetext: fValue,
		live: "assertive",
		disabled: !oSlider.getEnabled()
	});

	oRenderManager.writeClasses();
	oRenderManager.writeStyles();

	oRenderManager.writeAttribute("title", fValue);

	if (bEnabled) {
		oRenderManager.writeAttribute("tabindex", "0");
	}

	oRenderManager.write('><span class="' + sap.m.SliderRenderer.CSS_CLASS + 'HandleInner"></span></span>');
};

sap.m.SliderRenderer._renderInput = function(oRenderManager, oSlider, fValue, bEnabled, sName) {
	oRenderManager.write('<input type="text" class="' + sap.m.SliderRenderer.CSS_CLASS + 'Input"');

	if (!bEnabled) {
		oRenderManager.write("disabled");
	}

	oRenderManager.writeAttributeEscaped("name", sName);
	oRenderManager.writeAttribute("value", fValue);

	oRenderManager.write("/>");
};