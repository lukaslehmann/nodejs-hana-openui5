/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.m.ToolbarRenderer");
jQuery.sap.require("sap.ui.core.Renderer");

/**
 * @class Toolbar renderer.
 * @static
 */
sap.m.ToolbarRenderer = {};

sap.m.ToolbarRenderer.render = function(rm, oToolbar) {
	var aContents = oToolbar.getContent();
	if (!oToolbar.getVisible() || !aContents.length) {
		return;
	}

	rm.write("<div");
	rm.writeControlData(oToolbar);
	rm.addClass("sapMTB");

	if (!sap.m.Toolbar.hasFlexBoxSupport) {
		rm.addClass("sapMTBNoFlex");
	} else if (!sap.m.Toolbar.hasNewFlexBoxSupport) {
		rm.addClass("sapMTBOldFlex");
	} else {
		rm.addClass("sapMTBNewFlex");
	}

	if (oToolbar.getActive()) {
		rm.addClass("sapMTBActive");
		rm.writeAttribute("tabindex", "0");
	} else {
		rm.addClass("sapMTBInactive");
		rm.writeAttribute("tabindex", "-1");
	}

	rm.addClass(oToolbar._getContextClass());

	var sWidth = oToolbar.getWidth();
	var sHeight = oToolbar.getHeight();
	sWidth && rm.addStyle("width", sWidth);
	sHeight && rm.addStyle("height", sHeight);

	rm.writeClasses();
	rm.writeStyles();
	rm.write(">");

	aContents.forEach(function(oContent) {
		rm.renderControl(oContent);
	});

	rm.write("</div>");
};
