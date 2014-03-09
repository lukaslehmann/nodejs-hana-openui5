/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.m.BarRenderer");

/**
 * @class Bar renderer.
 * @static
 */
sap.m.BarRenderer = {};

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 * 
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the Render-Output-Buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.m.BarRenderer.render = function(rm, oControl) { 
	var i = 0;

	switch (oControl._context) {
	case 'header':
		//render header element 
		rm.write("<header");
		break;
	case 'footer':
		//render footer element 
		rm.write("<footer");
		rm.addClass("sapMFooter-CTX");
		break;
	default: 
		//render div element as default 
		rm.write("<div");
		break;
	}
	rm.writeControlData(oControl);
	rm.addClass("sapMBar");

	if (oControl.getTranslucent() && (sap.ui.Device.support.touch  || jQuery.sap.simulateMobileOnDesktop)) {
		rm.addClass("sapMBarTranslucent");
	}

	rm.addClass("sapMBar-CTX");
	rm.writeClasses();
	
	var sTooltip = oControl.getTooltip_AsString();
	if (sTooltip) {
		rm.writeAttributeEscaped("title", sTooltip);
	}
	
	rm.write(">"); 

	//left content area
	rm.write("<div id='"); 
	rm.write(oControl.getId());
	rm.write("-BarLeft' class='sapMBarLeft' >");
	var aLContent = oControl.getContentLeft();
	for(i=0; i< aLContent.length; i++){
		rm.renderControl(aLContent[i]);
	}
	rm.write("</div>");

	//middle content area 
	rm.write("<div id='"); 
	rm.write(oControl.getId());
	rm.write("-BarMiddle' class='sapMBarMiddle' >");
	if (oControl.getEnableFlexBox()){
		oControl._oflexBox = oControl._oflexBox || new sap.m.HBox(oControl.getId() + "-BarPH", {alignItems: "Center"}).addStyleClass("sapMBarPH").setParent(oControl, null, true);
		aMContent = oControl.getContentMiddle();
		for(i=0; i<aMContent.length; i++){
			oControl._oflexBox.addItem(aMContent[i]);
		}
		rm.renderControl(oControl._oflexBox);
	} else {
		rm.write("<div id='" + oControl.getId() + "-BarPH' class='sapMBarPH' >"); //place holder
		var aMContent = oControl.getContentMiddle();
		for(i=0; i<aMContent.length; i++){
			rm.renderControl(aMContent[i]);
		}
		rm.write("</div>");
	}
	rm.write("</div>");


	//right content area
	rm.write("<div id='" + oControl.getId() + "-BarRight'");
	rm.addClass('sapMBarRight');
	if(sap.ui.getCore().getConfiguration().getRTL()){
		rm.addClass("sapMRTL");
	}
	rm.writeClasses();
	rm.write(">");
	var aRContent = oControl.getContentRight();
	for(i=0; i<aRContent.length; i++){
		rm.renderControl(aRContent[i]);
	}
	rm.write("</div>");
	
	switch (oControl._context) {
	case 'header':
		rm.write("</header>");
		break;
	case 'footer':
		rm.write("</footer>");
		break;
	default: 
		rm.write("</div>");
		break;
	}
	
};