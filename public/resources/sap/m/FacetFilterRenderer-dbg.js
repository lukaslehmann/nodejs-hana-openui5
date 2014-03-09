/**
 * @copyright
 */

jQuery.sap.declare("sap.m.FacetFilterRenderer");

/**
 * @class FacetFilter renderer.
 * @static
 */
sap.m.FacetFilterRenderer = {};

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 * 
 * @param {sap.ui.core.RenderManager}
 *            oRm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control}
 *            oControl an object representation of the control that should be rendered
 */
sap.m.FacetFilterRenderer.render = function(oRm, oControl) {

	// return immediately if control is invisible
	if (!oControl.getVisible()) {
		return;
	}

	// write the HTML into the render manager
	oRm.write("<div");
	oRm.writeControlData(oControl);
	oRm.addClass("sapMFF");
	if (oControl._lastScrolling) {
		oRm.addClass("sapMFFScrolling");
	} else {
		oRm.addClass("sapMFFNoScrolling");
	}
	oRm.writeClasses();

	oRm.write(">");
	
	var oFlowType = oControl._getType();

	
	switch(oFlowType) {
	
		case sap.m.FacetFilterType.Simple: 
			sap.m.FacetFilterRenderer.renderSimpleFlow(oRm, oControl);
			break;
		
		case sap.m.FacetFilterType.Light: 
			sap.m.FacetFilterRenderer.renderLightFlow(oRm, oControl);
			break;
	}

	oRm.write("</div>");
};

sap.m.FacetFilterRenderer.renderLightFlow = function(oRm, oControl) {

	oControl._summaryBar.setActive(true);
	sap.m.FacetFilterRenderer.renderSummaryBar (oRm, oControl);
};


sap.m.FacetFilterRenderer.renderSimpleFlow = function(oRm, oControl) {
	
	if (!oControl._getShowSummaryBar()) {
		if (jQuery.device.is.desktop) {
			oRm.renderControl(oControl._getScrollingArrow("left"));
		}
		
		// render the div for the carousel
		oRm.write("<div id='" + oControl.getId() + "-head'");
		oRm.writeControlData(oControl);
		oRm.addClass("sapMFFHead");
		oRm.writeClasses();

		oRm.write(">");
		sap.m.FacetFilterRenderer.renderItems (oRm, oControl);
		
		if (oControl.getShowPersonalization()) {
			sap.m.FacetFilterRenderer.renderPersonalization (oRm, oControl);
		}
		oRm.write("</div>");
		
		if (jQuery.device.is.desktop) {
			oRm.renderControl(oControl._getScrollingArrow("right"));
		}
		
		oRm.write("<span");
		oRm.addClass("sapMFFResetIcon");
		oRm.writeClasses();
		oRm.write(">");
		oRm.renderControl(oControl._resetIcon.setVisible(oControl.getShowReset()));
		oRm.write("</span>");
		
	} else {
		sap.m.FacetFilterRenderer.renderSummaryBar (oRm, oControl);		
	}
};


sap.m.FacetFilterRenderer.renderItems = function(oRm, oControl) {

	var aLists = oControl.getLists();
	var aActiveList = sap.m.FacetFilterRenderer.setSequenceOnItems(aLists);
	
	if (aActiveList.length > 1) {
		aActiveList.sort(function(a,b){return a.getSequence() - b.getSequence()});
	}
	
	for(var i = 0; i < aActiveList.length; i++) {
		var oFFList = aActiveList[i];
		oFFList._getFacetButton().setText(oFFList._getSelectionText());
		oRm.renderControl(oFFList._getFacetButton());
	}
};


sap.m.FacetFilterRenderer.renderPersonalization = function(oRm, oControl) {

	oRm.renderControl(oControl._facetAddIcon);
};


sap.m.FacetFilterRenderer.renderSummaryBar = function(oRm, oControl) {

	oControl._summaryBar.getContent()[0].setText(oControl.getSummaryText());
	oControl._resetIcon.setVisible(oControl.getShowReset());
	
	oRm.write("<div");
	oRm.writeAttribute("id", oControl.getId() + "-summaryBarDiv");
	oRm.addClass("sapMTB-Info-CTX");
	oRm.writeClasses();
	oRm.write(">");
	oRm.renderControl(oControl._summaryBar);
	oRm.write("</div>"); 
};


sap.m.FacetFilterRenderer.setSequenceOnItems = function(oLists) {

	var iMaxSequence = -1;
	var aActiveList = [];
	
	// if the filter list is not active, make its sequence -1
	if (oLists) {
		for (var i = 0; i < oLists.length; i++) {
			if (!oLists[i].getActive()) {
				oLists[i].setSequence(-1);
			}
			else {
				if (oLists[i].getSequence() > iMaxSequence) {
					iMaxSequence = oLists[i].getSequence();
				}
				aActiveList.push(oLists[i]);
			}
		}
		
		for (var j = 0; j < aActiveList.length; j++) {
			if (aActiveList[j].getSequence() == -1) {
				iMaxSequence = iMaxSequence + 1;
				aActiveList[j].setSequence(iMaxSequence);
			}
		}
	}
	
	
	return aActiveList;
};

