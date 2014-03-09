/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ActionSelect");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.m.Select");sap.m.Select.extend("sap.m.ActionSelect",{metadata:{library:"sap.m",associations:{"buttons":{type:"sap.m.Button",multiple:true,singularName:"button"}}}});
sap.m.ActionSelect.prototype.hasContent=function(){return sap.m.Select.prototype.hasContent.call(this)||!!this.getButtons().length};
sap.m.ActionSelect.prototype.addContent=function(p){var c=sap.ui.getCore(),p=p||this.getPopup();this.getButtons().forEach(function(b){p.addContent(c.byId(b))})};
sap.m.ActionSelect.prototype.onAfterRenderingPopup=function(){sap.m.Select.prototype.onAfterRenderingPopup.call(this);this.getPopup().addStyleClass(sap.m.ActionSelectRenderer.CSS_CLASS+"Popup")};
