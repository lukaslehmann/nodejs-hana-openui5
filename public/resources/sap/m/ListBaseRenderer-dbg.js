/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.m.ListBaseRenderer");
jQuery.sap.require("sap.ui.core.theming.Parameters");

/**
 * @class List renderer.
 * @static
 */
sap.m.ListBaseRenderer = {};

/**
 * Renders the HTML for the given control, using the provided
 * {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager}
 *          oRenderManager the RenderManager that can be used for writing to the
 *          Render-Output-Buffer
 * @param {sap.ui.core.Control}
 *          oControl an object representation of the control that should be
 *          rendered
 */
sap.m.ListBaseRenderer.render = function(rm, oControl) {
	// return immediately if control is invisible
	if (!oControl.getVisible()) {
		return;
	}

	// container
	rm.write("<div");
	rm.addClass("sapMList");
	rm.writeControlData(oControl);
	rm.writeAttribute("tabindex", "-1");
	if (oControl.getInset()) {
		rm.addClass("sapMListInsetBG");
	}
	if (oControl.getWidth()) {
		rm.addStyle("width", oControl.getWidth());
	}

	// background
	if (oControl.setBackgroundDesign) {
		rm.addClass("sapMListBG" + oControl.getBackgroundDesign());
	}

	// run hook method
	this.renderContainerAttributes(rm, oControl);

	rm.writeStyles();
	rm.writeClasses();
	rm.write(">");

	// render header
	var sHeaderText = oControl.getHeaderText();
	var oHeaderTBar = oControl.getHeaderToolbar();
	if (oHeaderTBar) {
		oControl.addNavSection(oHeaderTBar.getId());
		oHeaderTBar.setDesign(sap.m.ToolbarDesign.Transparent, true);
		rm.renderControl(oHeaderTBar);
	} else if (sHeaderText) {
		rm.write("<div class='sapMListHdr'>");
		rm.writeEscaped(sHeaderText);
		rm.write("</div>");
	}

	// render info bar
	var oInfoTBar = oControl.getInfoToolbar();
	if (oInfoTBar) {
		oControl.addNavSection(oInfoTBar.getId());
		oInfoTBar.setDesign(sap.m.ToolbarDesign.Info, true);
		rm.renderControl(oInfoTBar);
	}

	// run hook method to start building list
	this.renderListStartAttributes(rm, oControl);

	// list attributes
	rm.addClass("sapMListUl");
	rm.writeAttribute("tabindex", "-1");
	rm.writeAttribute("id", oControl.getId("listUl"));

	// separators
	rm.addClass("sapMListShowSeparators" + oControl.getShowSeparators());

	// modes
	rm.addClass("sapMListMode" + oControl.getMode());

	// inset
	oControl.getInset() && rm.addClass("sapMListInset");

	rm.writeClasses();
	rm.write(">");

	// run hook method to render list head attributes
	this.renderListHeadAttributes(rm, oControl);

	// render child controls
	var aItems = oControl.getItems();
	var bRenderItems = this.shouldRenderItems(oControl);

	//TODO: There should be a better way to set these private variables
	bRenderItems && aItems.forEach(function(oItem){
		oControl._applySettingsToItem(oItem, true);
		rm.renderControl(oItem);
	});

	// render no-data if needed
	if ((!bRenderItems || !aItems.length) && oControl.getShowNoData()) {
		// hook method to render no data
		this.renderNoData(rm, oControl);
	}

	// run hook method to finish building list
	this.renderListEndAttributes(rm, oControl);

	// render growing delegate if available
	if (oControl.getGrowing() && oControl._oGrowingDelegate) {
		oControl._oGrowingDelegate.render(rm);
	}

	// footer
	if (oControl.getFooterText()) {
		rm.write("<footer class='sapMListFtr'>");
		rm.writeEscaped(oControl.getFooterText());
		rm.write("</footer>");
	}

	// dummy after focusable area
	rm.write("<div tabindex='-1'");
	rm.writeAttribute("id", oControl.getId("after"));
	rm.write("></div>");

	// done
	rm.write("</div>");
};

/**
 * This hook method is called to render container attributes
 *
 * @param {sap.ui.core.RenderManager} rm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.m.ListBaseRenderer.renderContainerAttributes = function(rm, oControl) {
};

/**
 * This hook method is called after <ul> and before first <li>
 *
 * @param {sap.ui.core.RenderManager} rm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.m.ListBaseRenderer.renderListHeadAttributes = function(rm, oControl) {
};

/**
 * This hook method is called to render list tag
 *
 * @param {sap.ui.core.RenderManager} rm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.m.ListBaseRenderer.renderListStartAttributes = function(rm, oControl) {
	rm.write("<ul");
};

/**
 * This hook method is called to finish list rendering
 *
 * @param {sap.ui.core.RenderManager} rm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.m.ListBaseRenderer.renderListEndAttributes = function(rm, oControl) {
	rm.write("</ul>");
};

/**
 * This hook method is called to render no data field
 *
 * @param {sap.ui.core.RenderManager} rm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.m.ListBaseRenderer.renderNoData = function(rm, oControl) {
	rm.write("<li id='"+ oControl.getId("nodata") + "' class='sapMLIB sapMListNoData'>");
	rm.write("<span id='"+ oControl.getId("nodata-text") + "'>");
	rm.writeEscaped(oControl.getNoDataText());
	rm.write("</span></li>");
};

/**
 * This hook method is called to determine whether items should render or not
 *
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.m.ListBaseRenderer.shouldRenderItems = function(oControl) {
	return true;
};
