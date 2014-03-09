/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.tmpl.TemplateControlRenderer");sap.ui.core.tmpl.TemplateControlRenderer={};
sap.ui.core.tmpl.TemplateControlRenderer.render=function(r,c){var i=c.isInline();if(!i){r.write("<div");r.writeControlData(c);r.writeStyles();r.writeClasses();r.write(">")}var R=this.renderTemplate||c.getTemplateRenderer();if(R){R.apply(this,arguments)}if(!i){r.write("</div>")}};
