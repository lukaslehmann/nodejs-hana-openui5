/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.ux3.OverlayContainer");jQuery.sap.require("sap.ui.ux3.library");jQuery.sap.require("sap.ui.ux3.Overlay");sap.ui.ux3.Overlay.extend("sap.ui.ux3.OverlayContainer",{metadata:{library:"sap.ui.ux3",defaultAggregation:"content",aggregations:{"content":{type:"sap.ui.core.Control",multiple:true,singularName:"content"}}}});
sap.ui.ux3.OverlayContainer.prototype._setFocusLast=function(){var f=jQuery.sap.byId(this.getId()+"-content").lastFocusableDomRef();if(!f&&this.getCloseButtonVisible()){f=jQuery.sap.domById(this.getId()+"-close")}else if(!f&&this.getOpenButtonVisible()){f=jQuery.sap.domById(this.getId()+"-openNew")}jQuery.sap.focus(f)};
sap.ui.ux3.OverlayContainer.prototype._setFocusFirst=function(){if(this.getOpenButtonVisible()){jQuery.sap.focus(jQuery.sap.domById(this.getId()+"-openNew"))}else if(this.getCloseButtonVisible()){jQuery.sap.focus(jQuery.sap.domById(this.getId()+"-close"))}else{jQuery.sap.focus(jQuery.sap.byId(this.getId()+"-content").firstFocusableDomRef())}};
