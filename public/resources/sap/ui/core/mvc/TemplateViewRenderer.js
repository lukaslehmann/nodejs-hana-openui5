/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.mvc.TemplateViewRenderer");jQuery.sap.require("sap.ui.core.mvc.ViewRenderer");sap.ui.core.mvc.TemplateViewRenderer={};
sap.ui.core.mvc.TemplateViewRenderer.render=function(r,c){var a=r;a.write("<div");a.writeControlData(c);a.addClass("sapUiView");a.addClass("sapUiTmplView");sap.ui.core.mvc.ViewRenderer.addDisplayClass(a,c);a.addStyle("width",c.getWidth());a.addStyle("height",c.getHeight());a.writeStyles();a.writeClasses();a.write(">");a.renderControl(c._oTemplate);a.write("</div>")};
