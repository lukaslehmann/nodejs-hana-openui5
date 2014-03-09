/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.ui.commons.PasswordFieldRenderer");
jQuery.sap.require("sap.ui.commons.TextFieldRenderer");

/**
 * @class PasswordFieldRenderer.
 * @static
 */
sap.ui.commons.PasswordFieldRenderer = sap.ui.core.Renderer.extend(sap.ui.commons.TextFieldRenderer);


/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.fw.RenderManager}.
 *
 * @param {sap.ui.fw.RenderManager} oRenderManager the RenderManager that can be used for writing to the Render-Output-Buffer
 * @param {sap.ui.fw.Control} oControl an object representation of the control that should be rendered
 */
sap.ui.commons.PasswordFieldRenderer.renderInnerAttributes = function(rm, oTextField) {
	rm.writeAttribute('type', 'password');
};


sap.ui.commons.PasswordFieldRenderer.renderTextFieldEnabled = function(rm, oTextField) {
	if (!oTextField.getEnabled() && !oTextField.getEditable()) {
		// "disabled" may not be rendered because the Jaws screenreader then reads the password
		// use "readonly" instead
		// but write it only if it has not yet been written by the TextFieldRenderer
		rm.writeAttribute('readonly', 'readonly');
		rm.writeAttribute('tabindex', '-1'); // apart from that, act as if disabled, e.g. no tab-stop
	} else {
		rm.writeAttribute('tabindex', '0'); // editable and readonly have a tab-stop
	}
};


// this method uses "readonly" instead of "disabled" because with "disabled" the Jaws screenreader reads the password
sap.ui.commons.PasswordFieldRenderer.setEnabled = function(oTextField, bEnabled) {
	var oTfRef = jQuery.sap.domById(oTextField.getId());

	if (bEnabled) {
		if (oTextField.getEditable()) {
			jQuery(oTfRef).removeClass('sapUiTfDsbl').addClass('sapUiTfStd');
			jQuery(oTfRef).removeAttr('readonly').attr('tabindex', '0');
		} else {
			jQuery(oTfRef).removeClass('sapUiTfDsbl').addClass('sapUiTfRo');
			jQuery(oTfRef).attr('tabindex', '0');
		}
	} else {
		if (oTextField.getEditable()) {
			jQuery(oTfRef).removeClass('sapUiTfStd').addClass('sapUiTfDsbl');
			jQuery(oTfRef).attr('readonly', 'readonly').attr('tabindex', '-1');
		} else {
			jQuery(oTfRef).removeClass('sapUiTfRo').addClass('sapUiTfDsbl');
			jQuery(oTfRef).attr( 'tabindex', '-1');
		}
	}
};

