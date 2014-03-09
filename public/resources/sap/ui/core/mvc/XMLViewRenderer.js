/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.mvc.XMLViewRenderer");jQuery.sap.require("sap.ui.core.mvc.ViewRenderer");sap.ui.core.mvc.XMLViewRenderer={};
sap.ui.core.mvc.XMLViewRenderer.render=function(r,c){var $=c._$oldContent=sap.ui.core.RenderManager.findPreservedContent(c.getId());if($.length===0){var s=c.isSubView();if(!s){r.write("<div");r.writeControlData(c);r.addClass("sapUiView");r.addClass("sapUiXMLView");sap.ui.core.mvc.ViewRenderer.addDisplayClass(r,c);r.writeAttribute("data-sap-ui-preserve",c.getId());if(c.getWidth()){r.addStyle("width",c.getWidth())}if(c.getHeight()){r.addStyle("height",c.getHeight())}r.writeStyles();r.writeClasses();r.write(">")}for(var i=0;i<c._aParsedContent.length;i++){var f=c._aParsedContent[i];if(f&&typeof(f)==="string"){r.write(f)}else{r.renderControl(f)}}if(!s){r.write("</div>")}}else{r.renderControl(c.oAfterRenderingNotifier);r.write('<div id="sap-ui-dummy-'+c.getId()+'" class="sapUiHidden">');for(var i=0;i<c._aParsedContent.length;i++){var f=c._aParsedContent[i];if(typeof(f)!=="string"){jQuery.sap.byId(f.getId(),$).replaceWith('<div id="sap-ui-dummy-'+f.getId()+'" class="sapUiHidden"/>');r.renderControl(f)}}r.write('</div>')}};
