/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.m.SelectRenderer");
jQuery.sap.require("sap.ui.core.ValueStateSupport");

/**
 * @class Select renderer.
 * @static
 */
sap.m.SelectRenderer = {};

/**
 * CSS class to be applied to the HTML root element of the Select control.
 * @type {string}
 */
sap.m.SelectRenderer.CSS_CLASS = "sapMSlt";

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the render output buffer.
 * @param {sap.m.Select} oSelect an object representation of the control that should be rendered.
 */
sap.m.SelectRenderer.render = function(oRenderManager, oSelect) {
	var	oSelectedItem = oSelect.getSelectedItem(),
		sSelectedItemText = oSelectedItem ? oSelectedItem.getText() : "",
		sTooltip = sap.ui.core.ValueStateSupport.enrichTooltip(oSelect, oSelect.getTooltip_AsString()),
		sId = oSelect.getId() + "-nat",
		sType = oSelect.getType(),
		sIconURI = oSelect.getIcon(),
		bAutoAdjustWidth = oSelect.getAutoAdjustWidth(),
		bEnabled = oSelect.getEnabled();
		//bArrowVisible = oSelect.getArrowVisible();

	// suppress rendering if not visible
	if (!oSelect.getVisible()) {
		return;
	}

	oRenderManager.write("<div");
	this.addStyleClass(oRenderManager, oSelect);
	oRenderManager.addClass(sap.m.SelectRenderer.CSS_CLASS);

	oRenderManager.addClass(sap.m.SelectRenderer.CSS_CLASS + oSelect.getType());

	if (!bEnabled) {
		oRenderManager.addClass(sap.m.SelectRenderer.CSS_CLASS + "Disabled");
	}

	if (bAutoAdjustWidth) {
		oRenderManager.addClass(sap.m.SelectRenderer.CSS_CLASS + "AutoAdjustedWidth");
	} else {
		oRenderManager.addStyle("width", oSelect.getWidth());
	}

	if (sIconURI) {
		oRenderManager.addClass(sap.m.SelectRenderer.CSS_CLASS + "WithIcon");
	}

//	if (bArrowVisible) {
		oRenderManager.addClass(sap.m.SelectRenderer.CSS_CLASS + "WithArrow");
//	}

	oRenderManager.addStyle("max-width", oSelect.getMaxWidth());

	oRenderManager.writeControlData(oSelect);

	oRenderManager.writeStyles();
	oRenderManager.writeClasses();

	if (sTooltip) {
		oRenderManager.writeAttributeEscaped("title", sTooltip);
	}

	if (bEnabled) {
		oRenderManager.writeAttribute("tabindex", "0");
	}

	oRenderManager.write(">");

		switch (sType) {
			case sap.m.SelectType.Default:
				this._renderLabel(oRenderManager, oSelect, sId, sSelectedItemText);

				//if (bArrowVisible) {
					this._renderArrow(oRenderManager);
				//}

				break;

			case sap.m.SelectType.IconOnly:
				this._renderIcon(oRenderManager, sIconURI);
				break;

			// no default
		}

		if (oSelect._isRequiredSelectElement()) {
			this._renderSelectElement(oRenderManager, oSelect, sId, bEnabled, sSelectedItemText);
		}

	oRenderManager.write("</div>");
};

/**
 * Renders the select's label, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the render output buffer.
 * @param {sap.m.Select} oSelect an object representation of the control that should be rendered.
 * @param {string} sId
 * @param {string} sSelectedItemText
 * @private
 */
sap.m.SelectRenderer._renderLabel = function(oRenderManager, oSelect, sId, sSelectedItemText) {
	oRenderManager.write('<label class="' + sap.m.SelectRenderer.CSS_CLASS + 'Label"');
	oRenderManager.writeAttribute("for", sId);

	oRenderManager.write(">");
		oRenderManager.writeEscaped(sSelectedItemText);
	oRenderManager.write('</label>');
};

/**
 * Renders the select's arrow, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the render output buffer.
 * @private
 */
sap.m.SelectRenderer._renderArrow = function(oRenderManager) {
	oRenderManager.write('<span class="' + sap.m.SelectRenderer.CSS_CLASS + 'Arrow"></span>');
};

/**
 * Renders the select's icon, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the render output buffer.
 * @param {string} sIconURI
 * @private
 */
sap.m.SelectRenderer._renderIcon = function(oRenderManager, sIconURI) {
	oRenderManager.writeIcon(sIconURI, sap.m.SelectRenderer.CSS_CLASS + "Icon");
};

/**
 * Renders the HTMLSelectElement for the select control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the render output buffer.
 * @param {sap.m.Select} oSelect an object representation of the select that should be rendered.
 * @param {string} sId
 * @param {boolean} bEnabled
 * @param {string} sSelectedItemText
 * @private
 */
sap.m.SelectRenderer._renderSelectElement = function(oRenderManager, oSelect, sId, bEnabled, sSelectedItemText) {
	var sName = oSelect.getName();

	oRenderManager.write("<select");
	oRenderManager.writeAttribute("id", sId);

	if (sName) {
		oRenderManager.writeAttributeEscaped("name", sName);
	}

	if (!bEnabled) {
		oRenderManager.write(" disabled");
	}

	oRenderManager.writeAttribute("tabindex", "-1");

	oRenderManager.write(">");

		this._renderOptions(oRenderManager, oSelect, sSelectedItemText);

	oRenderManager.write("</select>");
};

/**
 * Renders the HTMLOptionElement(s) for the select control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the render output buffer.
 * @param {sap.m.Select} oSelect an object representation of the select that should be rendered.
 * @param {string} sSelectedItemText
 * @private
 */
sap.m.SelectRenderer._renderOptions = function(oRenderManager, oSelect, sSelectedItemText) {
	var aItems = oSelect.getItems(),
		aItemsLength = aItems.length,
		sSelectedItemId = oSelect.getAssociation("selectedItem"),
		i = 0;

	// rendering options
	for (; i < aItemsLength; i++) {
		oRenderManager.write("<option");
			oRenderManager.writeAttribute("id", aItems[i].getId());
			oRenderManager.writeAttributeEscaped("value", (aItems[i].getKey() !== "") ? aItems[i].getKey() : aItems[i].getId());

			if (aItems[i].getId() === sSelectedItemId) {
				oRenderManager.write(" selected");
			}

			if (!aItems[i].getEnabled()) {
				oRenderManager.write(" disabled");
			}

			oRenderManager.write(">");
			oRenderManager.writeEscaped(aItems[i].getText());
		oRenderManager.write("</option>");
	}

	if (aItemsLength === 0) {
		oRenderManager.write("<option>" + sSelectedItemText + "</option>");
	}
};

/**
 * This method is reserved for derived class to add extra classes to the HTML root element of the control.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oSelect an object representation of the control that should be rendered.
 * @protected
 */
sap.m.SelectRenderer.addStyleClass = function(oRenderManager, oSelect) {};