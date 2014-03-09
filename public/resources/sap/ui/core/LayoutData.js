/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.LayoutData");jQuery.sap.require("sap.ui.core.library");jQuery.sap.require("sap.ui.core.Element");sap.ui.core.Element.extend("sap.ui.core.LayoutData",{metadata:{"abstract":true,library:"sap.ui.core"}});
sap.ui.core.LayoutData.prototype.invalidate=function(){var p=this.getParent();if(p&&p.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){p=p.getParent()}if(p){var l=p.getParent();if(l){var e=jQuery.Event("LayoutDataChange");e.srcControl=p;l._handleEvent(e)}}};
sap.ui.core.LayoutData.prototype.setLayoutData=function(l){return this};
