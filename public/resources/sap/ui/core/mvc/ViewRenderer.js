/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.mvc.ViewRenderer");sap.ui.core.mvc.ViewRenderer={};
sap.ui.core.mvc.ViewRenderer.addDisplayClass=function(r,c){if(c.getDisplayBlock()||(c.getWidth()==="100%"&&c.getHeight()==="100%")){r.addClass("sapUiViewDisplayBlock")}};
