/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

//Provides default renderer for control sap.ui.table.TreeTable
jQuery.sap.declare("sap.ui.table.TreeTableRenderer");
jQuery.sap.require("sap.ui.core.Renderer");
jQuery.sap.require("sap.ui.table.TableRenderer");

/**
 * @class TreeTable renderer.
 * @static
 */
sap.ui.table.TreeTableRenderer = sap.ui.core.Renderer.extend(sap.ui.table.TableRenderer);


sap.ui.table.TreeTableRenderer.renderTableCellControl = function(rm, oTable, oCell, iCellIndex) {
	if (oTable.isTreeBinding("rows") && iCellIndex === 0) {
		rm.write("<span class=\"sapUiTableTreeIcon sapUiTableTreeIconLeaf\" tabindex=\"-1\">&nbsp;</span>");
	}
	rm.renderControl(oCell);
};
