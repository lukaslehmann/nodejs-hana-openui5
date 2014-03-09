/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.table.TreeTableRenderer");jQuery.sap.require("sap.ui.core.Renderer");jQuery.sap.require("sap.ui.table.TableRenderer");sap.ui.table.TreeTableRenderer=sap.ui.core.Renderer.extend(sap.ui.table.TableRenderer);
sap.ui.table.TreeTableRenderer.renderTableCellControl=function(r,t,c,C){if(t.isTreeBinding("rows")&&C===0){r.write("<span class=\"sapUiTableTreeIcon sapUiTableTreeIconLeaf\" tabindex=\"-1\">&nbsp;</span>")}r.renderControl(c)};
